"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para el browser. Lee las variables públicas.
 * Si no están configuradas devuelve null (modo mock): los formularios de auth
 * muestran un aviso de "modo desarrollo".
 */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createBrowserClient(url, anon);
}

export const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
