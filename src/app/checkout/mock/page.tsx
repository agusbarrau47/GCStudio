import Link from "next/link";
import { notFound } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { mockAccessAllowed } from "@/lib/env";

/** Pantalla de pago SIMULADO (solo desarrollo). */
export default async function MockCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ purchase?: string }>;
}) {
  if (!mockAccessAllowed()) notFound();
  const { purchase } = await searchParams;

  return (
    <AuthShell
      title="Pago simulado"
      subtitle="Modo desarrollo — no se procesa ningún cobro real."
    >
      <div className="space-y-4">
        <p className="rounded-xl border border-blush/30 bg-blush/5 px-4 py-3 text-sm text-ink/75">
          Este checkout es una simulación para poder recorrer el flujo completo sin
          conectar Mercado Pago. En producción, el acceso se concede únicamente por el
          webhook validado del proveedor.
        </p>
        <a
          href={`/api/checkout/mock-confirm?purchase=${purchase ?? ""}`}
          className="btn-primary w-full"
        >
          Simular pago aprobado
        </a>
        <Link href="/dashboard" className="btn-ghost w-full">
          Cancelar
        </Link>
      </div>
    </AuthShell>
  );
}
