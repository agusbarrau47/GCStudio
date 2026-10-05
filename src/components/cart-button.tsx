"use client";

import { useCart } from "@/lib/context/cart-context";

export function CartButton({ className = "" }: { className?: string }) {
  const { totalItems, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="Abrir carrito de compras"
      className={`relative grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-white/70 hover:border-gold hover:bg-white text-ink/80 transition-all shadow-sm ${className}`}
    >
      <span className="text-base" aria-hidden="true">🛍️</span>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-gradient-to-r from-[#FAF2E1] to-[#EBD6B0] text-[#2C2114] font-mono text-[10px] font-bold shadow-sm border border-[#DEC498]/60">
          {totalItems}
        </span>
      )}
    </button>
  );
}
