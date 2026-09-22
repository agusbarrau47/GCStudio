"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/context/cart-context";
import { siteConfig } from "@/config/site.config";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotalArs, totalItems } =
    useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<"retiro" | "envio">("retiro");

  if (!isOpen) return null;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let message = `¡Hola GC Studio! 👋 Quiero realizar el siguiente pedido de la tienda online:\n\n`;

    items.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}* x${item.quantity} — ${formatPrice(
        item.product.priceArs * item.quantity
      )}\n`;
    });

    message += `\n💰 *Subtotal*: ${formatPrice(subtotalArs)}`;
    message += `\n📍 *Modalidad de entrega*: ${
      deliveryMethod === "retiro"
        ? "Retiro sin cargo en Recoleta (Arenales 1999)"
        : "Envío a domicilio (A coordinar costo según zona)"
    }`;
    message += `\n\n¿Me confirman disponibilidad y datos para realizar la transferencia / pago? ¡Muchas gracias!`;

    const url = `https://wa.me/5491164857085?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/65 backdrop-blur-md transition-opacity animate-fade-up"
        onClick={closeCart}
      />

      {/* Panel */}
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#FAF6F0]/95 backdrop-blur-3xl shadow-[0_0_60px_rgba(0,0,0,0.3)] border-l border-[#DECDB8]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5 bg-white/90 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-xl text-ink font-semibold">Mi Carrito</h2>
            <span className="rounded-full bg-gold/20 px-2 py-0.5 font-mono text-xs font-bold text-gold-dark">
              {totalItems}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 text-ink/70 hover:bg-cream-200 hover:text-ink transition-colors"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cream-200 text-2xl">
                🛍️
              </div>
              <p className="font-display text-lg text-ink">Tu carrito está vacío</p>
              <p className="text-xs text-ink/60 max-w-xs mx-auto">
                Explorá nuestros kits oficiales para alumnas y productos de aftercare para el cuidado diario.
              </p>
              <button
                type="button"
                onClick={closeCart}
                className="btn-primary btn-sm mt-2"
              >
                Ver catálogo de productos
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-ink/10">
              {items.map((it) => (
                <li key={it.product.id} className="py-4 flex gap-4 items-start">
                  <div className="h-16 w-16 shrink-0 rounded-xl bg-cream-200 border border-[#E0D3C0] grid place-items-center text-xs text-ink/40">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gold-dark text-center px-1">
                      {it.product.category.split(" ")[0]}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-semibold text-ink leading-tight">
                      {it.product.name}
                    </h4>
                    <p className="mt-1 font-mono text-xs text-gold-dark font-bold">
                      {formatPrice(it.product.priceArs)}
                    </p>

                    {/* Quantity controls */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-[#E0D3C0] bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(it.product.id, it.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs text-ink/70 hover:text-ink hover:bg-cream-100 rounded-l-full"
                          aria-label="Disminuir cantidad"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-xs font-semibold text-ink">
                          {it.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(it.product.id, it.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs text-ink/70 hover:text-ink hover:bg-cream-100 rounded-r-full"
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(it.product.id)}
                        className="text-[11px] font-mono text-wine hover:underline"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Cross-selling callout if items present */}
          {items.length > 0 && (
            <div className="rounded-2xl bg-gold/15 border border-gold/35 p-4 text-xs text-ink/85 shadow-sm">
              <span className="font-bold text-gold-dark">✦ Tip de compra: </span>
              Podés combinar kits profesionales para tus cursos con productos de cuidado diario y retirar todo junto en nuestro salón de Recoleta.
            </div>
          )}
        </div>

        {/* Footer with Checkout */}
        {items.length > 0 && (
          <div className="border-t border-ink/10 bg-white/95 backdrop-blur-md p-6 space-y-4">
            {/* Delivery Selector */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60 font-semibold mb-2">
                Método de entrega
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("retiro")}
                  className={`rounded-xl border p-2.5 text-left text-xs transition-all ${
                    deliveryMethod === "retiro"
                      ? "border-gold bg-gold/10 text-ink font-semibold"
                      : "border-ink/10 bg-white text-ink/65 hover:border-ink/20"
                  }`}
                >
                  <p className="font-semibold text-[11px]">Retiro en Salón</p>
                  <p className="text-[10px] text-gold-dark">Gratis · Recoleta</p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod("envio")}
                  className={`rounded-xl border p-2.5 text-left text-xs transition-all ${
                    deliveryMethod === "envio"
                      ? "border-gold bg-gold/10 text-ink font-semibold"
                      : "border-ink/10 bg-white text-ink/65 hover:border-ink/20"
                  }`}
                >
                  <p className="font-semibold text-[11px]">Envío a Domicilio</p>
                  <p className="text-[10px] text-ink/50">CABA y todo el país</p>
                </button>
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex items-center justify-between pt-2 border-t border-ink/10">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink/60">
                Subtotal estimado
              </span>
              <span className="font-display text-2xl font-bold text-gold-dark">
                {formatPrice(subtotalArs)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="btn-primary w-full shadow-md"
            >
              Comprar por WhatsApp directo
            </button>

            <p className="text-center text-[10px] text-ink/50 leading-tight">
              Aceptamos transferencia bancaria y Mercado Pago. Al enviar tu pedido coordinamos el pago y despacho inmediato.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
