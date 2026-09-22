"use client";

import { useState, useMemo } from "react";
import {
  SALON_SERVICES,
  SALON_ADDONS,
  formatServicePrice,
  type ServiceCategory,
} from "@/content/services";

const CATEGORIES: ("Todos" | ServiceCategory)[] = [
  "Todos",
  "Cejas y Pestañas",
  "Uñas",
  "Faciales",
];

export function ServicesCatalog() {
  const [activeCategory, setActiveCategory] = useState<"Todos" | ServiceCategory>("Todos");

  const filteredServices = useMemo(() => {
    if (activeCategory === "Todos") return SALON_SERVICES;
    return SALON_SERVICES.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      {/* SELECTOR DE CATEGORÍAS */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#FAF2E1]/60 via-[#F4E7CE]/55 to-[#EBD6B0]/60 backdrop-blur-md text-[#2C2114] shadow-sm font-bold border border-[#DEC498]/50"
                  : "bg-white/80 text-ink/65 hover:bg-white hover:text-ink border border-ink/10"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* GRILLA DE SERVICIOS */}
      <div className="mt-10 sm:mt-12 grid gap-6 md:grid-cols-2">
        {filteredServices.map((s) => (
          <article
            key={s.id}
            className="surface-elevated flex flex-col justify-between rounded-[24px] p-5 sm:p-7 md:p-8 border border-[#E8DDD0] bg-white/95 transition-all duration-300 hover:border-[#DECBB5] hover:shadow-[0_16px_36px_-12px_rgba(60,40,20,0.08)] hover:-translate-y-1"
          >
            <div>
              {/* Encabezado: Categoría y Duración */}
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-cream-200 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-semibold border border-[#E0D3C0]">
                  {s.category}
                </span>
                <span className="font-mono text-xs text-ink/50 flex items-center gap-1.5">
                  <svg
                    className="h-3.5 w-3.5 text-gold-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {s.duration}
                </span>
              </div>

              {/* Título y Precio Oficial */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl text-ink font-semibold">{s.name}</h3>
                <span className="font-display text-2xl font-bold text-gold-dark shrink-0">
                  {formatServicePrice(s.priceArs)}
                </span>
              </div>

              <p className="mt-2.5 text-sm leading-relaxed text-ink/70">{s.description}</p>

              {/* Beneficios */}
              <div className="mt-5 border-t border-ink/10 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-bold">
                  Beneficios del tratamiento
                </p>
                <ul className="mt-2 space-y-1.5">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-ink/80">
                      <span className="text-gold-dark font-bold">✦</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cuidados */}
              <div className="mt-4 rounded-xl bg-cream-100/70 p-3 text-[11px] text-ink/70 border border-ink/5">
                <span className="font-semibold text-ink/90">Cuidado post-sesión: </span>
                {s.care}
              </div>
            </div>

            {/* Pie de tarjeta: Tag y Botón WhatsApp */}
            <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-gold-dark font-semibold">
                {s.tag || "Atención personalizada"}
              </span>
              <a
                href={`https://wa.me/5491164857085?text=${encodeURIComponent(s.waMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-primary btn-sm w-full sm:w-auto text-center"
              >
                Pedir turno por WhatsApp
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* SECCIÓN ADICIONALES DE UÑAS & RETIROS */}
      {(activeCategory === "Todos" || activeCategory === "Uñas") && (
        <div className="mt-12 sm:mt-16 rounded-[26px] border border-[#E8DDD0] bg-gradient-to-br from-white/95 via-white/90 to-[#FAF4EA]/40 p-5 sm:p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-ink/10">
            <div>
              <span className="rounded-full bg-cream-200 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-semibold border border-[#E0D3C0]">
                Uñas & Manicuría
              </span>
              <h3 className="mt-3 font-display text-2xl text-ink font-semibold">
                Adicionales, Retiros y Diseños
              </h3>
              <p className="mt-1 text-xs text-ink/65 max-w-xl">
                Podés sumar cualquiera de estos complementos a tu sesión de esmaltado semi, capping gel o belleza de pies.
              </p>
            </div>
            <a
              href={`https://wa.me/5491164857085?text=${encodeURIComponent(
                "Hola! Quisiera consultar por adicionales de manicuría (retiro/french/deco)."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost btn-sm shrink-0 w-full sm:w-auto text-center"
            >
              Consultar por WhatsApp
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SALON_ADDONS.map((add) => (
              <div
                key={add.id}
                className="rounded-2xl border border-ink/10 bg-white/80 p-5 flex flex-col justify-between hover:border-[#DECBB5] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-display text-base font-semibold text-ink">{add.name}</h4>
                    <span className="font-display text-base font-bold text-gold-dark">
                      {formatServicePrice(add.priceArs)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-ink/65 leading-relaxed">{add.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
