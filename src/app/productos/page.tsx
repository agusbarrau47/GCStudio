"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { ProductDetailModal } from "@/components/product-detail-modal";
import { PRODUCTS } from "@/content/products";
import type { Product, ProductCategory } from "@/lib/types/product";
import { siteConfig } from "@/config/site.config";

const CATEGORIES: Array<"Todos" | ProductCategory> = [
  "Todos",
  "Kits Profesionales",
  "Aftercare & Hogar",
  "Insumos & Descartables",
  "Skincare & Mirada",
];

export default function ProductosPage() {
  const [activeCategory, setActiveCategory] = useState<"Todos" | ProductCategory>("Todos");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = PRODUCTS.filter((p) => {
    const matchCategory = activeCategory === "Todos" || p.category === activeCategory;
    const matchSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <SiteHeader />
      <main className="pt-24 pb-20">
        {/* HERO MARKETPLACE */}
        <section className="relative overflow-hidden py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-gold/15 to-blush/25 blur-[140px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[-10%] h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-wine/10 via-blush/15 to-transparent blur-[130px]"
          />

          <div className="shell text-center">
            <p className="eyebrow">Tienda Oficial · Insumos & Aftercare</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-tight text-ink">
              Marketplace de productos{" "}
              <span className="font-script text-gold-dark">profesionales</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/75">
              Kits oficiales para alumnas del campus e insumos de cuidado en casa para clientas del salón.
              Productos testeados y aprobados por ANMAT con retiro sin cargo en Recoleta y envíos a todo el país.
            </p>

            {/* BUSCADOR */}
            <div className="mx-auto mt-8 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar kit, sérum, insumos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-full border border-[#E2D5C3] bg-white/90 px-6 py-3.5 pl-12 text-sm text-ink placeholder:text-ink/40 shadow-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 text-lg">
                  🔍
                </span>
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink/40 hover:text-ink"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* TABS DE CATEGORÍAS */}
        <section className="border-y border-ink/10 bg-[#FAF6F0]/95 py-3.5 sticky top-16 z-40 backdrop-blur-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)]">
          <div className="shell">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap rounded-full px-5 py-2 font-mono text-xs uppercase tracking-[0.14em] font-semibold transition-all ${
                      active
                        ? "bg-gradient-to-r from-[#FAF2E1]/60 via-[#F4E7CE]/55 to-[#EBD6B0]/60 backdrop-blur-md text-[#2C2114] shadow-sm font-bold border border-[#DEC498]/50"
                        : "bg-white/70 text-ink/65 hover:bg-white hover:text-ink border border-ink/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* GRILLA DE PRODUCTOS */}
        <section className="py-16">
          <div className="shell">
            <div className="flex items-center justify-between gap-4 mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink/50">
                Mostrando {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-2 text-xs text-ink/60">
                <span>📍 Retiro gratis en Arenales 1999 (Recoleta)</span>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="surface p-12 text-center space-y-3 my-8">
                <p className="font-display text-xl text-ink">No se encontraron productos</p>
                <p className="text-xs text-ink/60 max-w-sm mx-auto">
                  Intentá con otra palabra de búsqueda o cambiá el filtro de categoría.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("Todos");
                    setSearch("");
                  }}
                  className="btn-primary btn-sm mt-2"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenDetail={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CROSS-SELLING DUAL BANNER */}
        <section className="border-t border-ink/10 bg-cream-100/40 py-16">
          <div className="shell grid gap-8 md:grid-cols-2">
            {/* Banner Alumnas */}
            <div className="surface-elevated relative overflow-hidden rounded-[26px] p-8 md:p-10 flex flex-col justify-between space-y-6 border border-[#E8DDD0] bg-gradient-to-br from-white/95 via-white/85 to-[#FAF4EA]/50 group transition-all duration-300 hover:border-[#DECBB5] hover:shadow-[0_20px_45px_-15px_rgba(60,40,20,0.07)]">
              {/* Subtle ambient lighting accent in corner */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-semibold border border-gold/25">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-dark/60" />
                    Para Alumnas del Campus
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl md:text-[26px] text-ink font-semibold leading-snug">
                  Aprendé con los mismos insumos de la tienda
                </h3>
                <p className="mt-2.5 text-xs md:text-sm text-ink/70 leading-relaxed max-w-lg">
                  Todos nuestros kits profesionales están calibrados con los tiempos, curvaturas y técnicas
                  que enseña Geraldine Colman en los videos del campus virtual.
                </p>
              </div>
              <div className="relative z-10 pt-2">
                <Link href="/cursos" className="btn-primary btn-sm">
                  Ver Cursos Online →
                </Link>
              </div>
            </div>

            {/* Banner Clientas Salón */}
            <div className="surface-elevated relative overflow-hidden rounded-[26px] p-8 md:p-10 flex flex-col justify-between space-y-6 border border-[#E8DDD0] bg-gradient-to-br from-white/95 via-white/85 to-[#F7EEF1]/50 group transition-all duration-300 hover:border-[#DECBB5] hover:shadow-[0_20px_45px_-15px_rgba(60,40,20,0.07)]">
              {/* Subtle ambient lighting accent in corner */}
              <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-wine/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-wine/8 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-wine font-semibold border border-wine/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-wine/60" />
                    Para Clientas del Salón
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl md:text-[26px] text-ink font-semibold leading-snug">
                  Mantené tu lifting y laminado impecable
                </h3>
                <p className="mt-2.5 text-xs md:text-sm text-ink/70 leading-relaxed max-w-lg">
                  El cuidado posterior en casa es el 50% del éxito. Con el sérum fortificante y la espuma
                  limpiadora sin aceites tu tratamiento dura semanas más.
                </p>
              </div>
              <div className="relative z-10 pt-2">
                <Link href="/servicios" className="btn-ghost btn-sm">
                  Conocer Servicios en Recoleta →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* POLÍTICAS DE ENTREGA Y PAGO */}
        <section className="py-16">
          <div className="shell">
            <div className="surface p-8 md:p-12 grid gap-6 sm:grid-cols-3 text-center">
              <div className="space-y-2">
                <span className="text-2xl">📍</span>
                <h4 className="font-display text-lg text-ink font-semibold">Retiro en Recoleta</h4>
                <p className="text-xs text-ink/65 leading-relaxed">
                  Retirá tu pedido sin costo en Arenales 1999 coordinando previamente el horario.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-2xl">🚚</span>
                <h4 className="font-display text-lg text-ink font-semibold">Envíos a Todo el País</h4>
                <p className="text-xs text-ink/65 leading-relaxed">
                  Despachamos por Correo Argentino o mensajería en CABA con empaque protector.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-2xl">💳</span>
                <h4 className="font-display text-lg text-ink font-semibold">Medios de Pago</h4>
                <p className="text-xs text-ink/65 leading-relaxed">
                  Aboná por transferencia bancaria o dinero en cuenta de Mercado Pago en un clic.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL DETALLE DE PRODUCTO */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <SiteFooter />
    </>
  );
}
