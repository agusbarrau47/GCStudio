import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GoogleReviews } from "@/components/google-reviews";
import { ServicesCatalog } from "@/components/services-catalog";
import { getCurrentProfile } from "@/lib/auth/session";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Lista de Precios & Servicios — GC Studio Recoleta",
  description:
    "Lista de precios oficial de GC Studio en Recoleta. Lifting de pestañas, laminado de cejas, limpiezas faciales, dermaplaning, capping gel y belleza de manos y pies.",
};

export default async function ServiciosPage() {
  const profile = await getCurrentProfile();
  const authed = !!profile;

  return (
    <>
      <SiteHeader authed={authed} />
      <main className="pt-24 pb-20">
        {/* HERO SERVICIOS */}
        <section className="relative overflow-hidden py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-gold/15 to-blush/25 blur-[140px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[-10%] h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-wine/10 via-blush/15 to-transparent blur-[130px]"
          />

          <div className="shell text-center">
            <p className="eyebrow">Studio en Recoleta · Arenales 1999</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-tight text-ink">
              Lista de precios &{" "}
              <span className="font-script text-gold-dark">servicios oficiales</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/70">
              Cada procedimiento en GC Studio está pensado para realzar tu belleza natural
              con productos aprobados por ANMAT, técnicas avanzadas y atención individual en nuestro salón.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Reservar turno por WhatsApp
              </a>
              <a
                href="#catalogo"
                className="btn-ghost"
              >
                Ver lista de precios ↓
              </a>
            </div>
          </div>
        </section>

        {/* PILLARS / HIGHLIGHTS */}
        <section className="border-y border-ink/10 bg-cream-100/40 py-10">
          <div className="shell grid grid-cols-2 gap-4 md:grid-cols-4">
            <PillarItem num="01" title="Cejas" desc="Laminado, visagismo & henna HD" />
            <PillarItem num="02" title="Lifting" desc="Curvatura clásica & técnica coreana" />
            <PillarItem num="03" title="Faciales" desc="Limpieza profunda & dermaplaning" />
            <PillarItem num="04" title="Uñas" desc="Semi, capping gel & belleza podal" />
          </div>
        </section>

        {/* CATÁLOGO DE SERVICIOS */}
        <section className="py-20" id="catalogo">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div>
                <p className="eyebrow">Menú de tratamientos oficial</p>
                <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                  Elegí tu próximo servicio
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink/65">
                Atendemos de forma exclusiva en cabina privada en Arenales 1999 (Recoleta). Consultanos fechas y horarios disponibles por WhatsApp directo.
              </p>
            </div>

            <ServicesCatalog />
          </div>
        </section>

        {/* BANNER RECOLETA / PROTOCOLO */}
        <section className="border-t border-ink/10 bg-cream-100/50 py-16">
          <div className="shell">
            <div className="surface-elevated p-8 md:p-12 grid gap-8 md:grid-cols-[1.5fr_1fr] items-center">
              <div>
                <p className="eyebrow">Turnos & Políticas</p>
                <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                  ¿Cómo agendar tu cita en Recoleta?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  Para garantizar tu horario de forma exclusiva, los turnos se reservan con una seña previa vía transferencia o Mercado Pago.
                  Nos encontramos en <strong>Arenales 1999 (Recoleta, CABA)</strong> en un espacio relajado, higiénico y climatizado.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    Escribinos al WhatsApp
                  </a>
                  <Link href="/contacto" className="btn-ghost">
                    Ver ubicación y horarios
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 space-y-3">
                <h4 className="font-mono text-xs uppercase tracking-[0.18em] text-gold-dark font-bold">
                  Compromiso GC Studio
                </h4>
                <p className="text-xs text-ink/75 leading-relaxed">
                  ✓ Materiales esterilizados y descartables para cada clienta.
                </p>
                <p className="text-xs text-ink/75 leading-relaxed">
                  ✓ Productos verificados y autorizados por ANMAT.
                </p>
                <p className="text-xs text-ink/75 leading-relaxed">
                  ✓ Diagnóstico previo para cuidar la salud de tu vello y piel.
                </p>
                <p className="text-xs text-ink/75 leading-relaxed">
                  ✓ Asesoramiento personalizado post-servicio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OPINIONES REALES DE CLIENTAS */}
        <GoogleReviews
          title="Opiniones reales en Google Maps"
          subtitle="Conocé la experiencia de quienes ya confían el cuidado de su mirada y bienestar en nuestro salón de Recoleta."
          limit={3}
          className="border-t border-ink/10 bg-cream-100/30"
        />
      </main>
      <SiteFooter />
    </>
  );
}

function PillarItem({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-gold-dark font-semibold">/{num}</span>
      <div>
        <p className="font-display text-sm font-semibold text-ink">{title}</p>
        <p className="text-[11px] text-ink/55">{desc}</p>
      </div>
    </div>
  );
}
