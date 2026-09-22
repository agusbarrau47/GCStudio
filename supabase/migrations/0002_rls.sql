-- GCStudio · Row Level Security
-- Regla base: el frontend nunca es la única barrera. El acceso se decide en la DB.

-- Helper: ¿el usuario actual es admin? SECURITY DEFINER evita recursión de políticas.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

-- Helper: ¿el usuario tiene enrollment activo en un curso?
create or replace function public.has_active_enrollment(target_course text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from enrollments e
    where e.user_id = auth.uid()
      and e.course_id = target_course
      and e.status = 'active'
  );
$$;

-- Enable RLS en todas las tablas.
alter table profiles enable row level security;
alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table lesson_resources enable row level security;
alter table purchases enable row level security;
alter table purchase_items enable row level security;
alter table enrollments enable row level security;
alter table lesson_progress enable row level security;
alter table payment_events enable row level security;   -- sin políticas => solo service role
alter table video_assets enable row level security;

-- ------------------------------------------------------------- PROFILES
create policy "profiles_select_self_or_admin" on profiles
  for select using (id = auth.uid() or public.is_admin());

create policy "profiles_update_self" on profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "profiles_admin_all" on profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- --------------------------------------------------------------- COURSES
create policy "courses_select_published_or_admin" on courses
  for select using (status = 'published' or public.is_admin());

create policy "courses_admin_write" on courses
  for all using (public.is_admin()) with check (public.is_admin());

-- --------------------------------------------------------------- MODULES
-- Título/estructura visible si el curso está publicado, el alumno está inscripto, o admin.
create policy "modules_select" on modules
  for select using (
    public.is_admin()
    or public.has_active_enrollment(course_id)
    or exists (select 1 from courses c where c.id = course_id and c.status = 'published')
  );

create policy "modules_admin_write" on modules
  for all using (public.is_admin()) with check (public.is_admin());

-- --------------------------------------------------------------- LESSONS
-- Contenido completo de la clase: solo admin o alumno con enrollment activo.
create policy "lessons_select_enrolled_or_admin" on lessons
  for select using (public.is_admin() or public.has_active_enrollment(course_id));

create policy "lessons_admin_write" on lessons
  for all using (public.is_admin()) with check (public.is_admin());

create policy "resources_select_enrolled_or_admin" on lesson_resources
  for select using (
    public.is_admin()
    or exists (
      select 1 from lessons l
      where l.id = lesson_id and public.has_active_enrollment(l.course_id)
    )
  );

create policy "resources_admin_write" on lesson_resources
  for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------- PURCHASES
create policy "purchases_select_own_or_admin" on purchases
  for select using (user_id = auth.uid() or public.is_admin());

create policy "purchases_insert_own" on purchases
  for insert with check (user_id = auth.uid());

-- Las actualizaciones de estado (pagado) las hace el webhook con service role (bypass RLS).
create policy "purchases_admin_update" on purchases
  for update using (public.is_admin()) with check (public.is_admin());

create policy "purchase_items_select_own_or_admin" on purchase_items
  for select using (
    public.is_admin()
    or exists (select 1 from purchases p where p.id = purchase_id and p.user_id = auth.uid())
  );

create policy "purchase_items_insert_own" on purchase_items
  for insert with check (
    exists (select 1 from purchases p where p.id = purchase_id and p.user_id = auth.uid())
  );

-- ----------------------------------------------------------- ENROLLMENTS
create policy "enrollments_select_own_or_admin" on enrollments
  for select using (user_id = auth.uid() or public.is_admin());

-- Alta/baja de acceso: admin desde el panel; el webhook usa service role (bypass).
create policy "enrollments_admin_write" on enrollments
  for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------- LESSON_PROGRESS
create policy "progress_select_own_or_admin" on lesson_progress
  for select using (user_id = auth.uid() or public.is_admin());

create policy "progress_insert_own" on lesson_progress
  for insert with check (user_id = auth.uid() and public.has_active_enrollment(course_id));

create policy "progress_update_own" on lesson_progress
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "progress_delete_own" on lesson_progress
  for delete using (user_id = auth.uid());

-- ---------------------------------------------------------- VIDEO_ASSETS
create policy "video_assets_admin" on video_assets
  for all using (public.is_admin()) with check (public.is_admin());
