-- GCStudio · Evaluaciones por módulo (gate de avance)
-- Registra qué módulos tiene aprobados cada alumno. Un módulo se desbloquea al
-- aprobar la evaluación del módulo anterior.

create table if not exists module_quiz_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  course_id text not null references courses(id) on delete cascade,
  module_id text not null references modules(id) on delete cascade,
  passed boolean not null default false,
  passed_at timestamptz,
  attempts integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (user_id, module_id)          -- un registro por alumno/módulo (idempotente)
);
create index if not exists idx_mqp_user_course on module_quiz_progress(user_id, course_id);

alter table module_quiz_progress enable row level security;

-- El alumno ve y gestiona su propio progreso de evaluaciones; el admin ve todo.
create policy "mqp_select_own_or_admin" on module_quiz_progress
  for select using (user_id = auth.uid() or public.is_admin());

create policy "mqp_insert_own" on module_quiz_progress
  for insert with check (user_id = auth.uid() and public.has_active_enrollment(course_id));

create policy "mqp_update_own" on module_quiz_progress
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "mqp_admin_all" on module_quiz_progress
  for all using (public.is_admin()) with check (public.is_admin());

drop trigger if exists trg_mqp_touch on module_quiz_progress;
create trigger trg_mqp_touch before update on module_quiz_progress
  for each row execute function public.touch_updated_at();
