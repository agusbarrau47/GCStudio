-- GCStudio · Esquema inicial
-- PostgreSQL / Supabase. Ejecutar en orden (0001 → 0002 → 0003).

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------------ ENUMS
do $$ begin
  create type course_status as enum ('draft', 'published');
exception when duplicate_object then null; end $$;

do $$ begin
  create type enrollment_status as enum ('active', 'revoked');
exception when duplicate_object then null; end $$;

do $$ begin
  create type purchase_status as enum ('pending','paid','rejected','cancelled','refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type user_role as enum ('student','admin');
exception when duplicate_object then null; end $$;

-- --------------------------------------------------------------- PROFILES
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role user_role not null default 'student',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- COURSES
create table if not exists courses (
  id text primary key,                 -- ej: course-laminado (estable, coincide con el código)
  slug text not null unique,
  title text not null,
  subtitle text,
  description text,
  level text,
  status course_status not null default 'draft',
  video_duration_seconds numeric,
  video_asset_id text,                 -- UID en el proveedor de video (Cloudflare Stream)
  cover_image text,
  price_ars integer,                   -- null = precio no configurado (FALTANTE)
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- MODULES
create table if not exists modules (
  id text primary key,
  course_id text not null references courses(id) on delete cascade,
  position integer not null,
  title text not null,
  summary text,
  created_at timestamptz not null default now(),
  unique (course_id, position)
);
create index if not exists idx_modules_course on modules(course_id);

-- ---------------------------------------------------------------- LESSONS
create table if not exists lessons (
  id text primary key,
  module_id text not null references modules(id) on delete cascade,
  course_id text not null references courses(id) on delete cascade,
  slug text not null,
  position integer not null,
  title text not null,
  summary text,
  source text,                         -- video | pdf | both
  content jsonb not null default '[]', -- bloques de contenido web derivados del material
  objectives jsonb not null default '[]',
  highlights jsonb not null default '[]',
  video_start_seconds integer,         -- NO CONFIRMADO: se cargan desde el Admin
  video_end_seconds integer,
  created_at timestamptz not null default now(),
  unique (course_id, slug)
);
create index if not exists idx_lessons_module on lessons(module_id);
create index if not exists idx_lessons_course on lessons(course_id);

-- ------------------------------------------------------- LESSON_RESOURCES
create table if not exists lesson_resources (
  id text primary key,
  lesson_id text not null references lessons(id) on delete cascade,
  title text not null,
  type text not null,                  -- pdf | checklist | guide | table | link
  url text,
  body jsonb,                          -- contenido embebido opcional
  position integer not null default 0
);
create index if not exists idx_resources_lesson on lesson_resources(lesson_id);

-- -------------------------------------------------------------- PURCHASES
create table if not exists purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  status purchase_status not null default 'pending',
  amount_ars integer,
  provider text not null default 'mercadopago',
  provider_ref text,                   -- preference id / payment id
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_purchases_user on purchases(user_id);

create table if not exists purchase_items (
  id uuid primary key default gen_random_uuid(),
  purchase_id uuid not null references purchases(id) on delete cascade,
  product_id text not null,            -- course-laminado | course-lifting | bundle-full
  title text not null,
  amount_ars integer
);
create index if not exists idx_purchase_items_purchase on purchase_items(purchase_id);

-- ------------------------------------------------------------ ENROLLMENTS
create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  course_id text not null references courses(id) on delete cascade,
  status enrollment_status not null default 'active',
  source_purchase_id uuid references purchases(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (user_id, course_id)          -- idempotencia de acceso
);
create index if not exists idx_enrollments_user on enrollments(user_id);
create index if not exists idx_enrollments_course on enrollments(course_id);

-- --------------------------------------------------------- LESSON_PROGRESS
create table if not exists lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  course_id text not null references courses(id) on delete cascade,
  lesson_id text not null references lessons(id) on delete cascade,
  completed boolean not null default false,
  completed_at timestamptz,
  last_accessed_at timestamptz,
  unique (user_id, lesson_id)          -- un registro por alumno/clase
);
create index if not exists idx_progress_user_course on lesson_progress(user_id, course_id);

-- ---------------------------------------------------------- PAYMENT_EVENTS
-- Idempotencia de webhooks: cada evento del proveedor se registra una sola vez.
create table if not exists payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_event_id text not null,
  raw jsonb,
  created_at timestamptz not null default now(),
  unique (provider, provider_event_id)
);

-- ----------------------------------------------------------- VIDEO_ASSETS
-- Registro de assets de video por curso (proveedor + uid + estado de subida).
create table if not exists video_assets (
  id uuid primary key default gen_random_uuid(),
  course_id text not null references courses(id) on delete cascade,
  provider text not null,              -- cloudflare | mux
  provider_uid text not null,
  ready boolean not null default false,
  created_at timestamptz not null default now(),
  unique (provider, provider_uid)
);
