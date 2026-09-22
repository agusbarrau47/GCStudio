import { createClient } from "@supabase/supabase-js";
import { env, isMockMode } from "@/lib/env";

/**
 * Cliente con SERVICE ROLE. SOLO para código server-side de confianza
 * (webhooks de pago, tareas administrativas). NUNCA se importa en el cliente.
 * La service role key nunca lleva prefijo NEXT_PUBLIC_.
 */
export function createSupabaseAdminClient() {
  if (isMockMode || !env.supabaseServiceRole) return null;
  return createClient(env.supabaseUrl!, env.supabaseServiceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
