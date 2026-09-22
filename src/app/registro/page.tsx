import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Crear cuenta" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Sumate al campus de GC Studio."
      footer={
        <>
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="text-gold-dark hover:underline">
            Ingresar
          </Link>
        </>
      }
    >
      <AuthForm mode="register" next={next || "/dashboard"} />
    </AuthShell>
  );
}
