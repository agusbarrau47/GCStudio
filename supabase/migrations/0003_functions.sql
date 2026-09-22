-- GCStudio · Triggers y funciones

-- 1) Crear el perfil automáticamente cuando se registra un usuario en auth.users.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    new.raw_user_meta_data->>'full_name',
    'student'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2) Evitar escalada de privilegios: un usuario no puede cambiarse el rol a sí mismo.
--    Solo un admin puede modificar el rol de un perfil.
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'No autorizado a cambiar el rol';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_role_escalation on profiles;
create trigger trg_prevent_role_escalation
  before update on profiles
  for each row execute function public.prevent_role_escalation();

-- 3) updated_at automático.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_courses_touch on courses;
create trigger trg_courses_touch before update on courses
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_purchases_touch on purchases;
create trigger trg_purchases_touch before update on purchases
  for each row execute function public.touch_updated_at();
