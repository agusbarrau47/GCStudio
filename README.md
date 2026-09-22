# GC Studio — Academia digital premium (LMS + e-commerce)

Plataforma educativa propia de **GC Studio** (Geraldine Colman): landing de venta, campus
privado del alumno, reproductor de clases, progreso, panel de administración, pagos y video.

Construida a partir del material real de dos cursos:

- **Laminado de Cejas** (Full Brows) — 5 módulos · 12 clases
- **Lifting de Pestañas** (Lash Lifting) — 4 módulos · 12 clases
- **Bundle Full** — ambos cursos

> El contenido educativo se derivó exclusivamente de los PDFs y videos reales del curso.
> No se inventó información técnica. Ver `COURSE_ARCHITECTURE.md`.

---

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS 3** (design system GC Studio)
- **Supabase** — Postgres + Auth + Row Level Security
- **Mercado Pago** (pagos) · arquitectura extensible a Stripe
- **Cloudflare Stream** (video con signed URLs) · arquitectura extensible a Mux
- **Vitest** (tests de lógica crítica)
- Deploy objetivo: **Vercel**

## Estructura

```
gcstudio/
├─ src/
│  ├─ app/                       # rutas (App Router)
│  │  ├─ page.tsx                # landing
│  │  ├─ cursos/[slug]/          # página de venta (curso + bundle)
│  │  ├─ login, registro, reset/ # auth
│  │  ├─ dashboard/              # "Mis cursos"
│  │  ├─ campus/[courseSlug]/    # home de curso + player [lessonSlug]
│  │  ├─ checkout/               # success / pending / failure / mock
│  │  ├─ admin/                  # panel (cursos, alumnos, enrollments)
│  │  └─ api/                    # checkout, webhooks/mercadopago, dev-login
│  ├─ components/                # UI (marca, header, player, etc.)
│  ├─ config/site.config.ts      # CONFIG CENTRAL (precios, contacto, políticas)
│  ├─ content/courses.ts         # FUENTE DE VERDAD del contenido de cursos
│  ├─ lib/
│  │  ├─ domain/                 # lógica pura testeable (acceso, progreso, pagos)
│  │  ├─ data/                   # repositorios (mock ↔ Supabase)
│  │  ├─ payments/               # PaymentProvider (MercadoPago + mock)
│  │  ├─ video/                  # VideoProvider (Cloudflare + mock)
│  │  ├─ supabase/               # clientes server / client / admin
│  │  └─ auth/                   # sesión y guards
│  └─ middleware.ts              # refresh de sesión + protección de rutas
├─ supabase/
│  ├─ migrations/                # 0001 schema · 0002 RLS · 0003 funciones/triggers
│  └─ seed.sql                   # seed de cursos (generado desde content/courses.ts)
├─ scripts/generate-seed.mjs     # regenera supabase/seed.sql
├─ public/media/                 # portadas (frames reales) + PDFs del curso
├─ .env.example                  # variables de entorno
├─ SETUP.md                      # pasos exactos para conectar servicios
├─ LAUNCH_CHECKLIST.md           # checklist de lanzamiento
└─ COURSE_ARCHITECTURE.md        # arquitectura educativa (módulos/clases)
```

## Desarrollo local

```bash
npm install
cp .env.example .env.local      # opcional: sin esto corre en MODO MOCK
npm run dev                      # http://localhost:3000
```

**Modo mock (sin servicios):** si no configurás Supabase, la app corre con datos de ejemplo.
En `/login` vas a ver botones "Entrar como alumna / admin" para recorrer todo el campus.
La alumna demo tiene **Laminado activo** y **Lifting sin acceso** (para ver el gating), con
67% de progreso en Laminado. El flujo de compra usa un checkout simulado.

> **Seguridad:** en producción el modo mock **nunca** concede acceso (ver
> `assertMockNotInProduction`). Para producción hay que conectar Supabase.

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir el build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run test` | Tests (Vitest) |
| `npm run seed:generate` | Regenera `supabase/seed.sql` desde `content/courses.ts` |

## Estado de QA (verificado)

- `lint` ✓ · `typecheck` ✓ · `test` ✓ (24 tests) · `build` ✓
- Smoke test funcional: auth, gating por enrollment, compra→enrollment→acceso,
  protección de rol admin, progreso y render de contenido real.

## Conexiones externas pendientes

Todo lo implementable sin credenciales ya está hecho. Falta **solo** pegar credenciales y
configurar proveedores. Los pasos exactos están en **`SETUP.md`**:

1. Crear proyecto Supabase, correr migraciones y seed, pegar keys.
2. Configurar Mercado Pago (access token) y registrar el webhook.
3. Configurar Cloudflare Stream (subir los 2 videos) y pegar credenciales.
4. (Opcional) Google OAuth en Supabase.
5. Cargar precios reales en `site.config.ts`.
6. Deploy en Vercel + dominio.
