import { redirect } from "next/navigation";
import type { Profile } from "@/lib/types";
import { assertMockNotInProduction } from "@/lib/env";
import { getCurrentProfile } from "./session";

/** Exige sesión. Redirige a /login con next. Aborta en producción+mock. */
export async function requireAuthProfile(next: string): Promise<Profile> {
  assertMockNotInProduction();
  const profile = await getCurrentProfile();
  if (!profile) {
    redirect(`/login?next=${encodeURIComponent(next)}`);
  }
  return profile;
}

/** Exige rol admin. Redirige a /login o /dashboard según corresponda. */
export async function requireAdminProfile(next: string): Promise<Profile> {
  const profile = await requireAuthProfile(next);
  if (profile.role !== "admin") {
    redirect("/dashboard");
  }
  return profile;
}
