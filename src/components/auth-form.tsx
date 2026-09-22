"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Mode = "login" | "register" | "reset-request" | "reset-update";

export function AuthForm({
  mode,
  next = "/dashboard",
}: {
  mode: Mode;
  next?: string;
}) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const mock = !supabase;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!supabase) {
      setNotice(
        "Modo desarrollo: la autenticación real requiere configurar Supabase (ver SETUP.md). Usá el acceso demo de abajo."
      );
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push(next);
        router.refresh();
      } else if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          },
        });
        if (error) throw error;
        setNotice(
          "Te enviamos un email para confirmar tu cuenta. Revisá tu bandeja de entrada."
        );
      } else if (mode === "reset-request") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset/confirmar`,
        });
        if (error) throw error;
        setNotice("Si el email existe, te enviamos un enlace para restablecer tu contraseña.");
      } else if (mode === "reset-update") {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setNotice("Contraseña actualizada. Ya podés ingresar.");
        setTimeout(() => router.push("/login"), 1200);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  async function googleSignIn() {
    if (!supabase) {
      setNotice("Modo desarrollo: configurá Google OAuth en Supabase (ver SETUP.md).");
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) setError(error.message);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {mode === "register" && (
        <Field
          id="fullName"
          label="Nombre completo"
          type="text"
          value={fullName}
          onChange={setFullName}
          autoComplete="name"
        />
      )}

      {mode !== "reset-update" && (
        <Field
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
      )}

      {(mode === "login" || mode === "register" || mode === "reset-update") && (
        <Field
          id="password"
          label={mode === "reset-update" ? "Nueva contraseña" : "Contraseña"}
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          minLength={6}
        />
      )}

      {mode === "login" && (
        <div className="text-right">
          <a href="/reset" className="link-nav normal-case">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-xl border border-wine/50 bg-wine/10 px-4 py-3 text-sm text-blush">
          {error}
        </p>
      )}
      {notice && (
        <p className="rounded-xl border border-gold/40 bg-gold/[0.06] px-4 py-3 text-sm text-ink/85">
          {notice}
        </p>
      )}

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading
          ? "Procesando…"
          : mode === "login"
            ? "Ingresar"
            : mode === "register"
              ? "Crear cuenta"
              : mode === "reset-update"
                ? "Guardar contraseña"
                : "Enviar enlace"}
      </button>

      {(mode === "login" || mode === "register") && (
        <>
          <div className="relative py-2 text-center">
            <span className="relative z-10 bg-transparent px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
              o
            </span>
            <span className="absolute inset-x-0 top-1/2 h-px bg-ink/10" aria-hidden="true" />
          </div>
          <button type="button" onClick={googleSignIn} className="btn-ghost w-full">
            Continuar con Google
          </button>
        </>
      )}

      {mock && (
        <div className="mt-4 rounded-xl border border-gold/25 bg-gold/[0.04] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-dark font-semibold">
            Acceso demo (desarrollo)
          </p>
          <p className="mt-1 text-xs text-ink/60">
            Sin Supabase configurado. Entrá para recorrer el campus.
          </p>
          <div className="mt-3 flex gap-2">
            <a href="/api/dev-login?role=student&next=/dashboard" className="btn-wine btn-sm flex-1">
              Entrar como alumna
            </a>
            <a href="/api/dev-login?role=admin&next=/admin" className="btn-ghost btn-sm flex-1">
              Entrar como admin
            </a>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
  required,
  minLength,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.16em] text-ink/60">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/15 bg-ink/[0.03] px-4 py-3 text-ink outline-none transition-colors focus:border-gold/60"
      />
    </div>
  );
}
