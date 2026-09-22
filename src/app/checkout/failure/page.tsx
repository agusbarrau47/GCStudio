import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { siteConfig } from "@/config/site.config";

export default function CheckoutFailurePage() {
  return (
    <AuthShell
      title="No se pudo completar el pago"
      subtitle="No se realizó ningún cobro. Podés intentar de nuevo o escribirnos."
    >
      <div className="space-y-3">
        <Link href="/#cursos" className="btn-primary w-full">
          Volver a los cursos
        </Link>
        <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noreferrer" className="btn-ghost w-full">
          Escribir por WhatsApp
        </a>
      </div>
    </AuthShell>
  );
}
