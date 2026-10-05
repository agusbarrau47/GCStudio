import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { getCurrentProfile } from "@/lib/auth/session";
import { getPurchaseById } from "@/lib/data/purchases";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ purchase?: string }>;
}) {
  const { purchase } = await searchParams;
  const profile = await getCurrentProfile();
  const record = profile && purchase ? await getPurchaseById(purchase, profile.id) : null;
  const paid = record?.status === "paid";
  const isProduct =
    record?.kind === "product" ||
    (record?.items?.some((i) => i.productId === "shipping" || i.productId.startsWith("prod-")) ?? false);

  return (
    <AuthShell
      title={paid ? "¡Listo!" : "Recibimos tu compra"}
      subtitle={
        isProduct
          ? paid
            ? "Tu pago fue acreditado. Coordinamos la entrega a la brevedad."
            : "Estamos confirmando el pago. En cuanto se acredite, coordinamos la entrega."
          : paid
            ? "Tu acceso quedó habilitado."
            : "Estamos confirmando el pago. En cuanto se acredite, verás el curso en tu campus."
      }
    >
      <div className="space-y-4">
        {record && (
          <div className="surface p-4 text-sm text-ink/75">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold-dark/70">
              Compra
            </p>
            {record.items.map((i) => (
              <p key={i.productId} className="mt-1">
                {i.title}
              </p>
            ))}
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">
              Estado: {record.status}
            </p>
          </div>
        )}
        <Link href={isProduct ? "/productos" : "/dashboard"} className="btn-primary w-full">
          {isProduct ? "Seguir comprando" : "Ir a mi campus"}
        </Link>
      </div>
    </AuthShell>
  );
}
