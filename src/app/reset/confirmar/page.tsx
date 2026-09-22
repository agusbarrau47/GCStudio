import type { Metadata } from "next";
import { AuthShell } from "@/components/auth-shell";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Nueva contraseña" };

export default function ResetConfirmPage() {
  return (
    <AuthShell title="Nueva contraseña" subtitle="Elegí tu nueva contraseña.">
      <AuthForm mode="reset-update" />
    </AuthShell>
  );
}
