-- GCStudio · Órdenes de la tienda (productos) + configuración de envío

-- Distinguir compras de cursos vs productos, y guardar datos de envío.
alter table purchases add column if not exists kind text not null default 'course';
alter table purchases add column if not exists shipping jsonb;

-- Configuración de la tienda (fila única). Costo de envío editable desde el Admin.
create table if not exists store_settings (
  id integer primary key default 1,
  shipping_flat_ars integer not null default 0,
  free_shipping_threshold_ars integer,
  updated_at timestamptz not null default now(),
  constraint store_settings_single_row check (id = 1)
);

alter table store_settings enable row level security;

drop policy if exists "store_settings_select_public" on store_settings;
create policy "store_settings_select_public" on store_settings
  for select using (true);

drop policy if exists "store_settings_admin_write" on store_settings;
create policy "store_settings_admin_write" on store_settings
  for all using (public.is_admin()) with check (public.is_admin());

drop trigger if exists trg_store_settings_touch on store_settings;
create trigger trg_store_settings_touch before update on store_settings
  for each row execute function public.touch_updated_at();

insert into store_settings (id, shipping_flat_ars, free_shipping_threshold_ars)
values (1, 0, null)
on conflict (id) do nothing;
