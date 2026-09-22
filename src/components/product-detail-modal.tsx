"use client";

import Link from "next/link";
import type { Product } from "@/lib/types/product";
import { useCart } from "@/lib/context/cart-context";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addItem } = useCart();

  if (!product) return null;

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleAddAndClose = () => {
    addItem(product);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/65 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl bg-[#FAF6F0]/95 backdrop-blur-2xl border border-[#DFCDB8] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-6 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-ink/15 text-ink/70 hover:bg-cream-200"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-cream-200 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-semibold border border-[#E0D3C0]">
            {product.category}
          </span>
          {product.anmatApproved && (
            <span className="rounded-full bg-gold/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-gold-dark font-bold">
              ✓ Aprobado ANMAT
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-2xl sm:text-3xl text-ink font-semibold">
          {product.name}
        </h3>
        <p className="mt-2 font-display text-2xl font-bold text-gold-dark">
          {formatPrice(product.priceArs)}
        </p>

        <div className="mt-4 space-y-4 text-xs text-ink/75 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-bold mb-1">
              Descripción
            </h4>
            <p>{product.description}</p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-bold mb-1">
              Beneficios destacados
            </h4>
            <ul className="space-y-1 pl-1">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="text-gold-dark">✦</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-cream-100 p-3.5 border border-ink/5">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-bold mb-1">
              Modo de aplicación / uso
            </h4>
            <p className="text-[11px] text-ink/70">{product.howToUse}</p>
          </div>

          {product.crossSell && (
            <div className="rounded-xl bg-gold/10 p-3.5 border border-gold/25 text-xs text-gold-dark">
              <span className="font-bold">✦ {product.crossSell.badge}: </span>
              <Link href={product.crossSell.url} className="font-semibold underline">
                {product.crossSell.title}
              </Link>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between gap-4">
          <button type="button" onClick={onClose} className="btn-ghost btn-sm">
            Volver
          </button>
          <button
            type="button"
            onClick={handleAddAndClose}
            className="btn-primary flex-1"
          >
            Agregar al carrito ({formatPrice(product.priceArs)})
          </button>
        </div>
      </div>
    </div>
  );
}
