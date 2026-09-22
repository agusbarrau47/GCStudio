/**
 * Detección de entorno y modo de ejecución.
 *
 * MODO MOCK: si faltan las variables de Supabase, la app funciona con datos de ejemplo
 * (content/courses.ts) para poder visualizar TODO antes de conectar servicios.
 *
 * REGLA DE SEGURIDAD: en producción el modo mock NUNCA otorga acceso a contenido premium.
 * Ver assertMockNotInProduction().
 */

function read(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

export const env = {
  supabaseUrl: read("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: read("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRole: read("SUPABASE_SERVICE_ROLE_KEY"),

  paymentProvider: (read("PAYMENT_PROVIDER") || "mock") as "mock" | "mercadopago" | "stripe",
  mercadopagoAccessToken: read("MERCADOPAGO_ACCESS_TOKEN"),
  mercadopagoWebhookSecret: read("MERCADOPAGO_WEBHOOK_SECRET"),

  videoProvider: (read("VIDEO_PROVIDER") || "mock") as "mock" | "cloudflare" | "mux",
  cloudflareAccountId: read("CLOUDFLARE_ACCOUNT_ID"),
  cloudflareApiToken: read("CLOUDFLARE_API_TOKEN"),
  cloudflareStreamKeyId: read("CLOUDFLARE_STREAM_KEY_ID"),
  cloudflareStreamKeyJwk: read("CLOUDFLARE_STREAM_KEY_JWK"),

  appUrl: read("NEXT_PUBLIC_APP_URL") || "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV || "development",
};

/** True cuando NO hay Supabase configurado: la app corre con datos mock. */
export const isMockMode = !env.supabaseUrl || !env.supabaseAnonKey;

export const isProduction = env.nodeEnv === "production";

/**
 * Barrera dura: si estamos en producción y en modo mock, cualquier ruta que
 * conceda acceso a contenido premium debe abortar. El mock es solo para desarrollo.
 */
export function assertMockNotInProduction(): void {
  if (isProduction && isMockMode) {
    throw new Error(
      "GCStudio: modo mock detectado en producción. Configurá Supabase (ver SETUP.md) antes de desplegar. El acceso a contenido premium está deshabilitado en mock+producción."
    );
  }
}

/** ¿Puede el modo mock conceder acceso? Solo fuera de producción. */
export function mockAccessAllowed(): boolean {
  return isMockMode && !isProduction;
}
