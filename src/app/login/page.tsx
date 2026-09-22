import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Ingresar" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <AuthShell
      title="Ingresar"
      subtitle="Entrá a tu campus de GC Studio."
      footer={
        <>
          ¿No tenés cuenta?{" "}
          <Link href="/registro" className="text-gold-dark hover:underline">
            Crear cuenta
          </Link>
        </>
      }
    >
      <AuthForm mode="login" next={next || "/dashboard"} />
    </AuthShell>
  );
}
