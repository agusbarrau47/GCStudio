import { cookies } from "next/headers";
import type { Profile, Role } from "@/lib/types";
import { isMockMode, mockAccessAllowed } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MOCK_PROFILE_STUDENT, MOCK_PROFILE_ADMIN } from "@/lib/data/mock-store";

export const MOCK_ROLE_COOKIE = "gcstudio_mock_role";

/**
 * Devuelve el perfil autenticado o null.
 *
 * - Modo real: lee la sesión de Supabase y el perfil de la tabla `profiles`.
 * - Modo mock (solo desarrollo): devuelve un perfil demo. El rol se controla con
 *   una cookie de desarrollo para poder probar student/admin.
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  if (isMockMode) {
    if (!mockAccessAllowed()) return null; // producción + mock => sin sesión
    const store = await cookies();
    const role = (store.get(MOCK_ROLE_COOKIE)?.value as Role | undefined) ?? "student";
    return role === "admin" ? MOCK_PROFILE_ADMIN : MOCK_PROFILE_STUDENT;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .eq("id", user.id)
    .single();

  if (!profile) {
    // Perfil aún no creado por el trigger; devolvemos uno mínimo como student.
    return {
      id: user.id,
      email: user.email ?? "",
      fullName: (user.user_metadata?.full_name as string) ?? null,
      role: "student",
      createdAt: user.created_at ?? new Date().toISOString(),
    };
  }

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    role: (profile.role as Role) ?? "student",
    createdAt: profile.created_at,
  };
}

export async function requireProfile(): Promise<Profile | null> {
  return getCurrentProfile();
}

export async function isAdmin(): Promise<boolean> {
  const p = await getCurrentProfile();
  return p?.role === "admin";
}
