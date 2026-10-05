"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/context/cart-context";
import type { StoreSettings } from "@/lib/commerce/orders";

const fmt = (val: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(val);

export function TiendaCheckout({
  defaultName,
  settings,
}: {
  defaultName: string;
  settings: StoreSettings;
}) {
  const { items, subtotalArs, totalItems } = useCart();
  const [method, setMethod] = useState<"retiro" | "envio">("retiro");
  const [f, setF] = useState({ name: defaultName, phone: "", address: "", city: "", province: "", zip: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const freeOver = settings.freeShippingThresholdArs;
  const shipCost =
    method === "envio" ? (freeOver != null && subtotalArs >= freeOver ? 0 : settings.shippingFlatArs) : 0;
  const total = subtotalArs + shipCost;

  function set<K extends keyof typeof f>(k: K, v: string) {
    setF((p) => ({ ...p, [k]: v }));
  }

  async function pay() {
    setError(null);
    if (!f.name.trim() || !f.phone.trim()) {
      setError("Completá tu nombre y teléfono.");
      return;
    }
    if (method === "envio" && !f.address.trim()) {
      setError("Ingresá la dirección de envío.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
          shipping: { method, ...f },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo iniciar el pago");
      window.location.href = data.redirectUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al procesar el pago");
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader authed />
      <main className="pt-24 pb-20">
        <div className="shell max-w-3xl">
          <Link href="/productos" className="link-nav">← Seguir comprando</Link>
          <h1 className="mt-4 font-display text-3xl text-ink">Finalizar compra</h1>

          {items.length === 0 ? (
            <div className="surface mt-8 p-10 text-center">
              <p className="font-display text-xl text-ink">Tu carrito está vacío</p>
              <Link href="/productos" className="btn-primary btn-sm mt-4">Ver productos</Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Form */}
              <div className="surface p-6 space-y-5">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55 mb-2">Entrega</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setMethod("retiro")} className={`rounded-xl border p-3 text-left text-sm ${method === "retiro" ? "border-gold bg-gold/10 font-semibold" : "border-ink/10"}`}>
                      <span className="block text-[13px]">Retiro en Recoleta</span>
                      <span className="text-[11px] text-gold-dark">Gratis</span>
                    </button>
                    <button type="button" onClick={() => setMethod("envio")} className={`rounded-xl border p-3 text-left text-sm ${method === "envio" ? "border-gold bg-gold/10 font-semibold" : "border-ink/10"}`}>
                      <span className="block text-[13px]">Envío a domicilio</span>
                      <span className="text-[11px] text-ink/50">{shipCost > 0 ? fmt(shipCost) : freeOver != null ? "Gratis desde " + fmt(freeOver) : "A coordinar"}</span>
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <L label="Nombre y apellido"><input className="in" value={f.name} onChange={(e) => set("name", e.target.value)} /></L>
                  <L label="Teléfono / WhatsApp"><input className="in" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="11 ..." /></L>
                  {method === "envio" && (
                    <>
                      <L label="Dirección" full><input className="in" value={f.address} onChange={(e) => set("address", e.target.value)} placeholder="Calle y número, piso/depto" /></L>
                      <L label="Localidad"><input className="in" value={f.city} onChange={(e) => set("city", e.target.value)} /></L>
                      <L label="Provincia"><input className="in" value={f.province} onChange={(e) => set("province", e.target.value)} /></L>
                      <L label="Código postal"><input className="in" value={f.zip} onChange={(e) => set("zip", e.target.value)} /></L>
                      <L label="Notas (opcional)" full><input className="in" value={f.notes} onChange={(e) => set("notes", e.target.value)} /></L>
                    </>
                  )}
                </div>
              </div>

              {/* Resumen */}
              <div className="surface p-6 h-fit lg:sticky lg:top-24">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">Resumen ({totalItems})</p>
                <ul className="mt-3 space-y-2 border-b border-ink/10 pb-3 text-sm">
                  {items.map((it) => (
                    <li key={it.product.id} className="flex justify-between gap-2 text-ink/75">
                      <span className="min-w-0 truncate">{it.product.name} ×{it.quantity}</span>
                      <span className="shrink-0">{fmt(it.product.priceArs * it.quantity)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 space-y-1 text-sm text-ink/70">
                  <div className="flex justify-between"><span>Subtotal</span><span>{fmt(subtotalArs)}</span></div>
                  <div className="flex justify-between"><span>Envío</span><span>{method === "envio" ? (shipCost > 0 ? fmt(shipCost) : "Gratis") : "—"}</span></div>
                </div>
                <div className="mt-3 flex justify-between border-t border-ink/10 pt-3">
                  <span className="font-display text-lg text-ink">Total</span>
                  <span className="font-display text-2xl text-gold-dark font-bold">{fmt(total)}</span>
                </div>
                <button type="button" onClick={pay} disabled={loading} className="btn-primary w-full mt-5">
                  {loading ? "Redirigiendo…" : "Pagar con Mercado Pago"}
                </button>
                {error && <p role="alert" className="mt-2 text-sm text-blush">{error}</p>}
                <p className="mt-2 text-center text-[10px] text-ink/45">Pago seguro. El despacho se coordina tras acreditarse el pago.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function L({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">{label}</span>
      {children}
    </label>
  );
}
