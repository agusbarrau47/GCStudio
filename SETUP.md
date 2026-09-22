# SETUP.md — Conectar GC Studio a producción

Guía quirúrgica. Seguila paso a paso. Cada paso dice exactamente qué copiar y dónde pegar.
Todo lo que se podía implementar sin credenciales **ya está hecho**; acá solo conectás servicios.

Al final tenés que tener un archivo `.env.local` (local) y las mismas variables cargadas en
Vercel (producción).

---

## 0. Antes de empezar

```bash
npm install
cp .env.example .env.local
```

Abrí `.env.local` en tu editor. Vas a ir completando sus valores en los pasos siguientes.

---

## 1. SUPABASE (base de datos + auth)

1. Entrá a https://supabase.com y creá una cuenta.
2. **New project**. Elegí nombre (ej. `gcstudio`), una contraseña de base (guardala) y región
   (ej. South America / São Paulo).
3. Esperá a que el proyecto termine de crearse (1–2 min).
4. En el menú lateral: **Project Settings → API**.
5. Copiá **Project URL** y pegalo en `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   ```
6. En la misma pantalla, copiá **anon public** key y pegala en:
   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
7. Copiá **service_role** key (secreta) y pegala en:
   ```
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```
   > La `service_role` NO lleva `NEXT_PUBLIC_`. Nunca la expongas en el cliente ni la subas a git.

### 1.1 Correr las migraciones y el seed

Opción A — desde el panel (más simple):

1. Menú lateral: **SQL Editor → New query**.
2. Abrí el archivo `supabase/migrations/0001_init.sql`, copiá TODO su contenido, pegalo y **Run**.
3. Repetí con `supabase/migrations/0002_rls.sql` → **Run**.
4. Repetí con `supabase/migrations/0003_functions.sql` → **Run**.
5. Repetí con `supabase/migrations/0004_module_quiz.sql` (evaluaciones por módulo) → **Run**.
6. Repetí con `supabase/seed.sql` (carga los 2 cursos, módulos y clases) → **Run**.

Opción B — con Supabase CLI (si la tenés instalada):

```bash
supabase link --project-ref TU_REF
supabase db push        # aplica migrations/
psql "TU_CONNECTION_STRING" -f supabase/seed.sql
```

### 1.2 Configurar el callback de Auth

1. Menú lateral: **Authentication → URL Configuration**.
2. En **Site URL** poné tu dominio de producción (ej. `https://gcstudio.com`) o
   `http://localhost:3000` para probar local.
3. En **Redirect URLs** agregá:
   ```
   http://localhost:3000/auth/callback
   https://TU-DOMINIO/auth/callback
   ```

### 1.3 Crear el primer ADMIN

1. Arrancá la app (`npm run dev`) y registrate en `/registro` con el email de Geraldine.
2. Confirmá el email (revisá la bandeja; en dev Supabase manda el link).
3. En Supabase: **Table Editor → profiles**, encontrá tu fila y cambiá `role` de `student` a
   `admin`. Guardá.
4. Volvé a la app: ahora tenés el link **Admin** y acceso a `/admin`.

> El registro crea el `profile` automáticamente (trigger `on_auth_user_created`).
> Un usuario no puede auto-asignarse `admin` (lo bloquea el trigger `prevent_role_escalation`).

---

## 2. MERCADO PAGO (pagos)

1. Entrá a https://www.mercadopago.com.ar/developers y logueate con la cuenta de GC Studio.
2. **Tus integraciones → Crear aplicación**. Tipo: *Pagos online* / Checkout Pro.
3. En **Credenciales de producción**, copiá el **Access Token**.
4. Pegalo en `.env.local`:
   ```
   PAYMENT_PROVIDER=mercadopago
   MERCADOPAGO_ACCESS_TOKEN=APP_USR-....
   ```
5. (Recomendado) Inventá un secreto para el webhook y pegalo:
   ```
   MERCADOPAGO_WEBHOOK_SECRET=un-secreto-largo-y-random
   ```

### 2.1 Registrar el webhook

1. En la aplicación de Mercado Pago: **Webhooks / Notificaciones**.
2. URL de producción a registrar:
   ```
   https://TU-DOMINIO/api/webhooks/mercadopago?secret=EL-MISMO-SECRETO-DE-ARRIBA
   ```
   (Si no usás secret, registrá `https://TU-DOMINIO/api/webhooks/mercadopago`.)
3. Evento a seleccionar: **Pagos** (payment).
4. Guardá.

### 2.2 Probar en sandbox

1. Usá las credenciales de **prueba** y las tarjetas de test de Mercado Pago.
2. Comprá un curso desde la app → pagá → el webhook debe marcar la compra `paid` y crear el
   `enrollment`. Verificá en Supabase (tablas `purchases` y `enrollments`).

> El acceso se concede **solo** por el webhook validado, nunca por volver a `/success`.
> El webhook es idempotente (tabla `payment_events`): notificaciones duplicadas no duplican accesos.

---

## 3. VIDEO — CLOUDFLARE STREAM

1. Entrá a https://dash.cloudflare.com → **Stream**.
2. Copiá tu **Account ID** (está en la URL del dashboard o en la home de Stream) → `.env.local`:
   ```
   VIDEO_PROVIDER=cloudflare
   CLOUDFLARE_ACCOUNT_ID=xxxxxxxxxxxxxxxx
   ```
3. **My Profile → API Tokens → Create Token** con permiso **Stream: Edit**. Copiá el token:
   ```
   CLOUDFLARE_API_TOKEN=xxxxxxxx
   ```

### 3.1 Subir los videos

1. En **Stream → Upload**, subí:
   - `Curso Laminado de cejas Video.mp4`
   - `Curso Lifting Video.mp4`
   (Los archivos originales están en tu carpeta `GCStudio`. NO se modifican.)
2. Cuando terminen de procesar, copiá el **UID** de cada video.
3. En la app, entrá a **/admin/cursos**, abrí cada curso y pegá el UID en
   **"Video del curso"** → Guardar. (Eso setea `courses.video_asset_id`.)

### 3.2 Proteger el video (signed URLs) — recomendado

1. En cada video de Stream, activá **Require signed URLs**.
2. **Stream → Settings → Keys → Create signing key**. Vas a obtener un `key id` y un JWK.
3. Pegá el key id y el JWK (codificado en base64) en `.env.local`:
   ```
   CLOUDFLARE_STREAM_KEY_ID=xxxx
   CLOUDFLARE_STREAM_KEY_JWK=<jwk-en-base64>
   ```
   Para codificar el JWK a base64:
   ```bash
   echo -n '{"...tu-jwk-json..."}' | base64
   ```

> La autorización por enrollment se valida en el server antes de generar la fuente de video.
> Con signed URLs, el acceso directo sin token queda bloqueado. (Ningún sistema evita 100% la
> grabación de pantalla; el objetivo es impedir el acceso trivial no autorizado.)

---

## 4. GOOGLE OAUTH (opcional)

1. https://console.cloud.google.com → creá credenciales **OAuth 2.0 Client ID** (tipo Web).
2. Authorized redirect URI:
   ```
   https://TU-REF.supabase.co/auth/v1/callback
   ```
3. Copiá Client ID y Secret.
4. En Supabase: **Authentication → Providers → Google**, pegá Client ID y Secret y activá.
5. El botón "Continuar con Google" ya está en la app.

---

## 5. PRECIOS Y DATOS COMERCIALES (FALTANTE — cargar)

Editá `src/config/site.config.ts`:

```ts
pricing: {
  laminadoArs: 0,   // ← poné el precio real en ARS (ej. 45000)
  liftingArs: 0,    // ←
  bundleArs: 0,     // ←
  currency: "ARS",
},
```

También revisá/actualizá en ese archivo (hay placeholders marcados FALTANTE):
- `brand.legalName` (razón social / datos fiscales)
- `policies.refund` y `policies.terms` (política de devolución y términos)
- Los datos de contacto ya están cargados con los reales detectados en el material
  (WhatsApp, email, dirección) — verificá que sean correctos.

Las páginas `/terminos` y `/privacidad` tienen texto placeholder: reemplazalo por el real.

> Sin precio cargado, en producción el checkout devuelve un aviso y no cobra (no se inventan precios).

---

## 6. VERCEL (deploy)

1. Subí el proyecto a un repo de GitHub.
2. Entrá a https://vercel.com → **Add New → Project** → importá el repo.
3. Framework: Next.js (autodetectado).
4. En **Environment Variables**, cargá TODAS las variables de tu `.env.local`
   (Supabase, Mercado Pago, Cloudflare, `NEXT_PUBLIC_APP_URL=https://TU-DOMINIO`).
5. **Deploy**.
6. **Domains**: agregá tu dominio y seguí las instrucciones de DNS.
7. Volvé a Supabase (paso 1.2) y a Mercado Pago (paso 2.1) y actualizá las URLs con el dominio final.

---

## 7. Regenerar el seed si editás contenido

Si cambiás `src/content/courses.ts` (textos, clases, recursos):

```bash
npm run seed:generate     # regenera supabase/seed.sql
```

Luego volvé a correr `supabase/seed.sql` en el SQL Editor (usa `on conflict do update`,
así que actualiza sin duplicar).

---

Listo. Con estos pasos GC Studio queda operativo en producción.
Cualquier duda de estado, mirá `LAUNCH_CHECKLIST.md`.
