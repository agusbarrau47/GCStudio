# GC Studio — Conexiones pendientes (solo pegar credenciales)

Todo el código está listo. Cada bloque abajo es una conexión que depende de una
credencial tuya. Pegás el valor donde se indica y queda funcionando.

## 1. Cobro de cursos (Mercado Pago) — PRIORIDAD
Código 100% listo (Checkout Pro + webhook + alta de acceso). Solo faltan variables en Vercel.

1. MercadoPago → Tus integraciones → creá una app (Checkout Pro) → Credenciales de **producción** → copiá el **Access Token** (`APP_USR-...`). Para probar sin cobrar real, usá las de **prueba** (`TEST-...`).
2. En Vercel (Settings → Environment Variables), editá y pegá el valor:
   - `MERCADOPAGO_ACCESS_TOKEN` = tu Access Token
   - `SUPABASE_SERVICE_ROLE_KEY` = Supabase → Settings → API Keys → Legacy → service_role → Reveal (si ya tiene valor, dejala)
   - `PAYMENT_PROVIDER` = `mercadopago`
3. Redeploy (Deployments → ⋯ → Redeploy).
4. Avisame y verifico el flujo completo.

## 2. Login con Google
1. Google Cloud Console → APIs & Services → Credentials → Create OAuth client ID (Web).
   - Authorized redirect URI: `https://bkwkjmyquibmllfcsvud.supabase.co/auth/v1/callback`
   - Authorized JavaScript origin: `https://gc-studio-jade.vercel.app`
2. Copiá Client ID y Client Secret.
3. Supabase → Authentication → Sign In / Providers → Google → Enable → pegá Client ID y Secret → Save.
4. En Vercel: `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED` = `true` (esto muestra el botón "Continuar con Google", que hoy está oculto para no mostrarlo roto). Redeploy.

## 3. Mail de confirmación personalizado (Resend + SMTP)
Supabase no deja editar la plantilla hasta conectar un SMTP propio.
1. Creá cuenta en resend.com → verificá tu dominio (o usá el dominio de pruebas) → API Keys → creá una key.
2. Resend → SMTP: host `smtp.resend.com`, puerto `465`, usuario `resend`, contraseña = tu API key.
3. Supabase → Authentication → Emails → SMTP Settings → cargá esos datos + remitente (ej. `no-reply@tudominio.com`, "GC Studio") → Save.
4. Avisame: escribo y cargo la plantilla branded de GC Studio (confirmación de cuenta y reset de contraseña).

## 4. Subida de videos (Cloudflare Stream)
El admin ya tiene "Subir video directo" (reanudable, soporta archivos grandes). Falta habilitar Stream.
1. Cloudflare → Stream (activar; requiere plan de Stream).
2. Account ID: en la URL del dashboard o en Stream → copiá el **Account ID**.
3. My Profile → API Tokens → Create Token → permiso **Stream: Edit** → copiá el token.
4. En Vercel:
   - `CLOUDFLARE_ACCOUNT_ID` = Account ID
   - `CLOUDFLARE_API_TOKEN` = el token
   - `VIDEO_PROVIDER` = `cloudflare`
5. Redeploy. Luego en Admin → Cursos → (curso) → "Subir video directo".

## Precios y Tienda (ya funcionando, sin credenciales)
- Admin → Precios: edita online/presencial de cada curso y bundle.
- Admin → Tienda: agrega/edita/oculta/elimina productos.
- Falta correr en Supabase la migración de productos: `supabase/migrations/0006_products.sql` (SQL Editor → pegar → Run). Hasta entonces la tienda muestra el catálogo por defecto.
