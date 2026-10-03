-- GCStudio · Precios editables (online + presencial)
-- Tabla key/value para que el Admin modifique todos los precios sin redeploy.
-- Lectura pública (los precios se muestran en el sitio); escritura solo admin.

create table if not exists pricing (
  key text primary key,            -- laminado_online | lifting_online | bundle_online | laminado_presencial | lifting_presencial | bundle_presencial
  label text not null,
  modality text not null,          -- online | presencial
  course_key text not null,        -- laminado | lifting | bundle
  price_ars integer,               -- null = a confirmar
  position integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table pricing enable row level security;

drop policy if exists "pricing_select_public" on pricing;
create policy "pricing_select_public" on pricing
  for select using (true);

drop policy if exists "pricing_admin_write" on pricing;
create policy "pricing_admin_write" on pricing
  for all using (public.is_admin()) with check (public.is_admin());

drop trigger if exists trg_pricing_touch on pricing;
create trigger trg_pricing_touch before update on pricing
  for each row execute function public.touch_updated_at();

insert into pricing (key, label, modality, course_key, price_ars, position) values
  ('laminado_online',      'Laminado de Cejas - Online',              'online',     'laminado',  40000, 1),
  ('lifting_online',       'Lifting de Pestanas - Online',            'online',     'lifting',   40000, 2),
  ('bundle_online',        'Bundle (Laminado + Lifting) - Online',    'online',     'bundle',    55000, 3),
  ('laminado_presencial',  'Laminado de Cejas - Presencial',          'presencial', 'laminado',  90000, 4),
  ('lifting_presencial',   'Lifting de Pestanas - Presencial',        'presencial', 'lifting',   90000, 5),
  ('bundle_presencial',    'Bundle (Laminado + Lifting) - Presencial','presencial', 'bundle',   125000, 6)
on conflict (key) do nothing;
