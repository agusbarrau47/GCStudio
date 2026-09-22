import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env, isMockMode } from "@/lib/env";

/** Intercambia el code de OAuth / confirmación de email por una sesión. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/dashboard";

  if (isMockMode) {
    return NextResponse.redirect(new URL(next, url.origin));
  }

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(env.supabaseUrl!, env.supabaseAnonKey!, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    });
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
