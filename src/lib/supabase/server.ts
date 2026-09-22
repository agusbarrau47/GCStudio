import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { env, isMockMode } from "@/lib/env";

/**
 * Cliente Supabase para Server Components / Route Handlers.
 * Devuelve null en modo mock (sin credenciales), y el resto del código
 * cae en la capa de datos mock. Ver lib/data/*.
 */
export async function createSupabaseServerClient() {
  if (isMockMode) return null;

  const cookieStore = await cookies();

  return createServerClient(env.supabaseUrl!, env.supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // set() puede fallar en Server Components; el middleware refresca la sesión.
        }
      },
    },
  });
}
