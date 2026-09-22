import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";

export default function CheckoutPendingPage() {
  return (
    <AuthShell
      title="Pago en proceso"
      subtitle="Tu pago está siendo procesado. Te habilitamos el acceso apenas se acredite."
    >
      <Link href="/dashboard" className="btn-primary w-full">
        Volver a mi campus
      </Link>
    </AuthShell>
  );
}
