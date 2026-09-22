import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Restablecer contraseña" };

export default function ResetPage() {
  return (
    <AuthShell
      title="Restablecer contraseña"
      subtitle="Te enviamos un enlace para crear una nueva."
      footer={
        <Link href="/login" className="text-gold-dark hover:underline">
          Volver a ingresar
        </Link>
      }
    >
      <AuthForm mode="reset-request" />
    </AuthShell>
  );
}
