"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./brand-mark";
import { useCart } from "@/lib/context/cart-context";
import { siteConfig } from "@/config/site.config";

const NAV = [
  { label: "Servicios", href: "/servicios", desc: "Tratamientos y lista de precios oficial" },
  { label: "Cursos", href: "/cursos", desc: "Academia online & formaciones 1 a 1" },
  { label: "Tienda", href: "/productos", desc: "Kits e insumos profesionales" },
  { label: "Metodología", href: "/metodologia", desc: "Protocolos, seguridad y técnica" },
  { label: "El Studio", href: "/contacto", desc: "Ubicación en Recoleta, mapa y turnos" },
];

export function SiteHeader({ authed }: { authed?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  // Bloqueo de scroll de página de fondo cuando el menú móvil está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-ink/10 bg-[#FAF6F0] backdrop-blur-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)]">
        <div className="shell flex h-full items-center justify-between">
          <Link href="/" aria-label="GC Studio — inicio" className="shrink-0">
            <BrandMark size="sm" />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`link-nav transition-colors ${
                    active ? "text-gold-dark font-bold underline underline-offset-8 decoration-gold" : ""
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {/* Botón Carrito */}
            <button
              type="button"
              onClick={openCart}
              aria-label="Abrir carrito de compras"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-white/70 hover:border-gold hover:bg-white text-ink/80 transition-all shadow-sm"
            >
              <span className="text-base" aria-hidden="true">🛍️</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-gradient-to-r from-[#FAF2E1] to-[#EBD6B0] text-[#2C2114] font-mono text-[10px] font-bold shadow-sm border border-[#DEC498]/60">
                  {totalItems}
                </span>
              )}
            </button>

            {authed ? (
              <Link href="/dashboard" className="btn-primary btn-sm">
                Mi campus
              </Link>
            ) : (
              <>
                <Link href="/login" className="link-nav">
                  Ingresar
                </Link>
                <Link href="/registro" className="btn-primary btn-sm">
                  Crear cuenta
                </Link>
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={openCart}
              aria-label="Abrir carrito de compras"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-ink/20 bg-white/90 text-ink shadow-sm"
            >
              <span className="text-base" aria-hidden="true">🛍️</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-gradient-to-r from-[#FAF2E1] to-[#EBD6B0] text-[#2C2114] font-mono text-[9px] font-bold border border-[#DEC498]">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Botón menú hamburguesa de alto contraste */}
            <button
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-ink/20 bg-white/90 text-ink shadow-sm active:scale-95 transition-transform"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              onClick={() => setOpen((v) => !v)}
            >
              <div className="relative h-3.5 w-4 flex flex-col justify-between items-center pointer-events-none">
                <span
                  className={`block h-0.5 w-full bg-[#181818] rounded-full transition-all duration-300 ${
                    open ? "translate-y-1.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-[#181818] rounded-full transition-all duration-200 ${
                    open ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-[#181818] rounded-full transition-all duration-300 ${
                    open ? "-translate-y-1.5 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* OVERLAY DE MENÚ MÓVIL 100% SÓLIDO, NÍTIDO Y SIN TRANSPARENCIAS MOLESTAS */}
      {open && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-40 bg-[#FAF6F0] flex flex-col justify-between overflow-y-auto px-6 py-6 md:hidden animate-fade-in shadow-2xl border-t border-ink/10"
        >
          <div className="space-y-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-dark font-bold">
              Menú Principal · GC Studio
            </p>

            <nav aria-label="Navegación mobile" className="flex flex-col">
              {NAV.map((n) => {
                const active = pathname === n.href;
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-3.5 border-b border-ink/10 transition-colors ${
                      active ? "text-gold-dark font-bold" : "text-ink hover:text-gold-dark"
                    }`}
                  >
                    <div>
                      <span className="font-display text-2xl block">{n.label}</span>
                      <span className="text-[11px] text-ink/50 mt-0.5 block">{n.desc}</span>
                    </div>
                    <span className="font-mono text-sm text-gold-dark font-bold">→</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 space-y-4">
            {/* Acciones de cuenta */}
            {authed ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="btn-primary w-full text-center justify-center"
              >
                Ingresar a Mi Campus
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="btn-ghost btn-sm text-center justify-center font-bold"
                >
                  Ingresar
                </Link>
                <Link
                  href="/registro"
                  onClick={() => setOpen(false)}
                  className="btn-primary btn-sm text-center justify-center font-bold"
                >
                  Crear cuenta
                </Link>
              </div>
            )}

            {/* Agendamiento directo WhatsApp */}
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary btn-sm w-full flex items-center justify-center gap-2"
            >
              <span>💬</span>
              <span>Reservar turno por WhatsApp</span>
            </a>

            {/* Datos del Studio */}
            <div className="pt-3 text-center">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50 font-semibold">
                {siteConfig.brand.address}
              </p>
              <p className="text-[11px] text-ink/70 mt-0.5">
                Atención personalizada con cita previa
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
