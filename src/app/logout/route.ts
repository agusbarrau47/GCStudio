import { NextResponse } from "next/server";
import { isMockMode } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MOCK_ROLE_COOKIE } from "@/lib/auth/session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const res = NextResponse.redirect(new URL("/", url.origin));

  if (isMockMode) {
    res.cookies.delete(MOCK_ROLE_COOKIE);
    return res;
  }

  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  return res;
}

export const POST = GET;
