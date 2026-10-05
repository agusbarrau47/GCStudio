import type { Metadata } from "next";
import { adminListProductOrders } from "@/lib/data/orders";
import { formatPrice } from "@/config/site.config";

export const metadata: Metadata = { title: "Admin · Órdenes" };
export const dynamic = "force-dynamic";

const STATUS_ES: Record<string, string> = {
  pending: "Pendiente de pago",
  paid: "Pagada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
  refunded: "Reembolsada",
};

export default async function AdminOrdersPage() {
  const orders = await adminListProductOrders();

  return (
    <>
      <h1 className="font-display text-3xl text-ink">Órdenes de la tienda</h1>
      <p className="mt-2 text-ink/60">Pedidos de productos para despachar. Solo las pagadas requieren envío.</p>

      {orders.length === 0 ? (
        <div className="surface mt-8 p-10 text-center text-ink/60">Todavía no hay pedidos de productos.</div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider font-bold ${o.status === "paid" ? "bg-gold/20 text-gold-dark" : "bg-ink/10 text-ink/60"}`}>
                    {STATUS_ES[o.status] ?? o.status}
                  </span>
                  <span className="font-mono text-xs text-ink/50">
                    {new Date(o.createdAt).toLocaleString("es-AR")}
                  </span>
                </div>
                <span className="font-display text-xl text-gold-dark font-bold">{formatPrice(o.amountArs ?? 0)}</span>
              </div>

              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">Productos</p>
                  <ul className="mt-1 text-sm text-ink/80">
                    {o.items.map((i, idx) => (
                      <li key={idx} className="flex justify-between gap-2">
                        <span className="min-w-0 truncate">{i.title}</span>
                        <span className="shrink-0 text-ink/50">{formatPrice(i.amountArs ?? 0)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">Entrega</p>
                  {o.shipping ? (
                    <div className="mt-1 text-sm text-ink/80">
                      <p className="font-semibold">{o.shipping.method === "envio" ? "Envío a domicilio" : "Retiro en Recoleta"}</p>
                      <p>{o.shipping.name} · {o.shipping.phone}</p>
                      {o.shipping.method === "envio" && (
                        <p className="text-ink/60">
                          {o.shipping.address}
                          {o.shipping.city ? `, ${o.shipping.city}` : ""}
                          {o.shipping.province ? `, ${o.shipping.province}` : ""}
                          {o.shipping.zip ? ` (${o.shipping.zip})` : ""}
                        </p>
                      )}
                      {o.shipping.notes && <p className="text-ink/50 italic">“{o.shipping.notes}”</p>}
                    </div>
                  ) : (
                    <p className="mt-1 text-sm text-ink/50">—</p>
                  )}
                  {o.buyerEmail && <p className="mt-1 font-mono text-[11px] text-ink/40">{o.buyerEmail}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
