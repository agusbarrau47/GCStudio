import { NextResponse } from "next/server";
import { mockAccessAllowed } from "@/lib/env";
import { MOCK_ROLE_COOKIE } from "@/lib/auth/session";

/**
 * Acceso demo SOLO en desarrollo (modo mock, fuera de producción).
 * Setea una cookie de rol para recorrer el campus/admin sin Supabase.
 * En producción devuelve 404: el mock nunca concede acceso.
 */
export async function GET(request: Request) {
  if (!mockAccessAllowed()) {
    return new NextResponse("No disponible", { status: 404 });
  }
  const url = new URL(request.url);
  const role = url.searchParams.get("role") === "admin" ? "admin" : "student";
  const next = url.searchParams.get("next") || (role === "admin" ? "/admin" : "/dashboard");

  const res = NextResponse.redirect(new URL(next, url.origin));
  res.cookies.set(MOCK_ROLE_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return res;
}
