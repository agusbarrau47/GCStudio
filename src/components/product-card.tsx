"use client";

import Link from "next/link";
import type { Product } from "@/lib/types/product";
import { useCart } from "@/lib/context/cart-context";

interface ProductCardProps {
  product: Product;
  onOpenDetail?: (product: Product) => void;
}

export function ProductCard({ product, onOpenDetail }: ProductCardProps) {
  const { addItem } = useCart();

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <article className="surface flex flex-col justify-between overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div>
        {/* Top bar with category & badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-cream-200 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-semibold border border-[#E0D3C0]">
            {product.category}
          </span>
          {product.badge && (
            <span className="rounded-full bg-gold/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-gold-dark font-bold border border-gold/30">
              {product.badge}
            </span>
          )}
        </div>

        {/* Visual placeholder box */}
        <div
          onClick={() => onOpenDetail?.(product)}
          className="mt-4 aspect-[4/3] rounded-2xl bg-gradient-to-br from-cream-100 via-cream-200/60 to-white/90 border border-[#E5D8C6] grid place-items-center p-6 text-center cursor-pointer group"
        >
          <div className="space-y-1 transition-transform duration-300 group-hover:scale-105">
            <span className="text-3xl">✨</span>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dark font-bold">
              GC Studio Beauty
            </p>
            <p className="text-[11px] text-ink/50 max-w-[180px] truncate">
              {product.name}
            </p>
          </div>
        </div>

        {/* Info */}
        <h3
          onClick={() => onOpenDetail?.(product)}
          className="mt-4 font-display text-xl text-ink font-semibold leading-snug cursor-pointer hover:text-gold-dark transition-colors"
        >
          {product.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-ink/65 line-clamp-2">
          {product.shortDesc}
        </p>

        {/* Cross-Sell Hook */}
        {product.crossSell && (
          <div className="mt-3.5 flex items-center gap-1.5 rounded-lg bg-gold/10 px-2.5 py-1.5 text-[11px] text-gold-dark border border-gold/25">
            <span className="font-bold">✦</span>
            <span className="truncate">
              {product.crossSell.badge}:{" "}
              <strong className="underline">{product.crossSell.title}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Footer with Price & Actions */}
      <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between gap-3">
        <div>
          <span className="font-display text-xl font-bold text-gold-dark">
            {formatPrice(product.priceArs)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenDetail && (
            <button
              type="button"
              onClick={() => onOpenDetail(product)}
              className="btn-ghost btn-sm"
            >
              Info
            </button>
          )}
          <button
            type="button"
            onClick={() => addItem(product)}
            className="btn-primary btn-sm"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
