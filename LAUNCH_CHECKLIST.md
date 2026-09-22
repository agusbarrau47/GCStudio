# LAUNCH_CHECKLIST.md — GC Studio

Marcá cada ítem a medida que lo completás. Los pasos exactos están en `SETUP.md`.

## Supabase
- [ ] Proyecto creado
- [ ] `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` cargadas
- [ ] Migración `0001_init.sql` ejecutada
- [ ] Migración `0002_rls.sql` ejecutada (RLS)
- [ ] Migración `0003_functions.sql` ejecutada (triggers)
- [ ] Migración `0004_module_quiz.sql` ejecutada (evaluaciones por módulo)
- [ ] `seed.sql` ejecutado (2 cursos, 9 módulos, 24 clases cargados)
- [ ] Callback de Auth configurado (`/auth/callback`)
- [ ] Primer usuario ADMIN creado (role = admin en `profiles`)
- [ ] RLS probado: un alumno NO ve cursos/clases de otro ni contenido sin enrollment

## Auth
- [ ] Registro probado (crea profile automáticamente)
- [ ] Login probado
- [ ] Logout probado
- [ ] Reset de contraseña probado (enviar enlace + setear nueva)
- [ ] Google OAuth probado (si se activó)
- [ ] Rutas protegidas: sin sesión, `/dashboard` `/campus` `/admin` redirigen a login

## Cursos (contenido)
- [ ] Laminado de Cejas cargado (5 módulos · 12 clases)
- [ ] Lifting de Pestañas cargado (4 módulos · 12 clases)
- [ ] Módulos y clases verificados contra `COURSE_ARCHITECTURE.md`
- [ ] Recursos (PDFs, checklists, fichas) verificados
- [ ] Evaluaciones por módulo probadas: al aprobar se desbloquea el módulo siguiente; al fallar aparece la sugerencia de repaso
- [ ] Precios reales cargados en `site.config.ts` (laminado, lifting, bundle)
- [ ] Términos y privacidad reemplazados (no placeholder)

## Pagos (Mercado Pago)
- [ ] `PAYMENT_PROVIDER=mercadopago` y `MERCADOPAGO_ACCESS_TOKEN` cargados
- [ ] Webhook registrado en Mercado Pago (`/api/webhooks/mercadopago`)
- [ ] `MERCADOPAGO_WEBHOOK_SECRET` configurado y coincide con la URL registrada
- [ ] Pago en sandbox probado
- [ ] Enrollment automático tras pago probado (compra `paid` → `enrollment` activo)
- [ ] Idempotencia probada (una notificación duplicada NO duplica accesos)
- [ ] Bundle probado (habilita ambos cursos)

## Video (Cloudflare Stream)
- [ ] `VIDEO_PROVIDER=cloudflare`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` cargados
- [ ] Video de Laminado subido y UID pegado en Admin
- [ ] Video de Lifting subido y UID pegado en Admin
- [ ] "Require signed URLs" activado + signing key cargada (`CLOUDFLARE_STREAM_KEY_ID`, `..._JWK`)
- [ ] Reproducción probada dentro del campus (alumno con acceso)
- [ ] Protección probada (sin enrollment activo no hay video)

## Vercel
- [ ] Proyecto importado desde GitHub
- [ ] Todas las variables de entorno configuradas en Vercel
- [ ] `NEXT_PUBLIC_APP_URL` apunta al dominio final
- [ ] Deploy exitoso
- [ ] Dominio conectado (DNS)
- [ ] URLs de callback (Supabase) y webhook (Mercado Pago) actualizadas al dominio final

## QA final (probar en producción)
- [ ] Mobile (375 / 390 px)
- [ ] Tablet
- [ ] Desktop
- [ ] Landing → compra → registro/login → acceso
- [ ] Curso → módulos → clase → video → completar → progreso
- [ ] "Continuar curso" lleva a la clase correcta
- [ ] Logout
- [ ] Admin: publicar/despublicar, alumnos, enrollments
- [ ] Seguridad: `SUPABASE_SERVICE_ROLE_KEY` NO expuesta en el cliente
- [ ] Seguridad: modo mock deshabilitado en producción (acceso denegado si falta Supabase)

## Decisiones a tomar antes del lanzamiento
- [ ] Precio de cada curso y del bundle
- [ ] Política de devolución / reembolso y términos de inscripción
- [ ] Razón social / datos fiscales para facturación
- [ ] Email de contacto oficial (hay 2 detectados: `gcstudioba@gmail.com` y `geraldinecolman2@gmail.com`)
- [ ] Dominio definitivo
