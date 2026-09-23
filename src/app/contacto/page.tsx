import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GoogleReviews } from "@/components/google-reviews";
import { getCurrentProfile } from "@/lib/auth/session";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "El Studio en Recoleta & Turnos — GC Studio",
  description:
    "Visitanos en Arenales 1999, Recoleta, CABA. Turnos personalizados vía WhatsApp para lifting de pestañas, cejas, limpiezas faciales y manicuría.",
};

export default async function ContactoPage() {
  const profile = await getCurrentProfile();
  const authed = !!profile;

  return (
    <>
      <SiteHeader authed={authed} />
      <main className="pt-24 pb-20">
        {/* HERO CONTACTO / STUDIO */}
        <section className="relative overflow-hidden py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-gold/15 to-blush/25 blur-3xl transform-gpu will-change-transform"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[-10%] h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-wine/10 via-blush/15 to-transparent blur-3xl transform-gpu will-change-transform"
          />

          <div className="shell text-center">
            <p className="eyebrow">Nuestro Espacio · Recoleta, Buenos Aires</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-tight text-ink">
              El Studio &{" "}
              <span className="font-script text-gold-dark">reserva de turnos</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/70">
              Un ambiente íntimo, cálido y cuidado hasta el último detalle en el corazón de Recoleta.
              Atención exclusiva con cita previa para garantizar tu tranquilidad y tiempo.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Escribir por WhatsApp directo
              </a>
              <a
                href={siteConfig.contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                Ver fotos en Instagram
              </a>
            </div>
          </div>
        </section>

        {/* DETALLE DEL LOCAL Y DATOS */}
        <section className="py-16">
          <div className="shell grid gap-8 md:grid-cols-12">
            {/* INFORMACIÓN PRÁCTICA */}
            <div className="md:col-span-7 space-y-6">
              <div className="surface p-8">
                <h2 className="font-display text-2xl text-ink">Datos de contacto y ubicación</h2>
                <dl className="mt-6 space-y-4 divide-y divide-ink/10">
                  <div className="pt-3 flex items-start justify-between gap-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-ink/50">
                      Dirección
                    </dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      {siteConfig.brand.address}
                    </dd>
                  </div>
                  <div className="pt-4 flex items-start justify-between gap-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-ink/50">
                      WhatsApp Turnos
                    </dt>
                    <dd className="text-right text-sm font-medium text-gold-dark">
                      <a
                        href={siteConfig.contact.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline"
                      >
                        {siteConfig.contact.whatsapp}
                      </a>
                    </dd>
                  </div>
                  <div className="pt-4 flex items-start justify-between gap-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-ink/50">
                      Instagram
                    </dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      <a
                        href={siteConfig.contact.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gold-dark hover:underline"
                      >
                        {siteConfig.contact.instagram}
                      </a>
                    </dd>
                  </div>
                  <div className="pt-4 flex items-start justify-between gap-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-ink/50">
                      Email Consultas
                    </dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
                        {siteConfig.contact.email}
                      </a>
                    </dd>
                  </div>
                  <div className="pt-4 flex items-start justify-between gap-4">
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-ink/50">
                      Modalidad
                    </dt>
                    <dd className="text-right text-sm font-medium text-ink">
                      Exclusivamente con turno previo
                    </dd>
                  </div>
                </dl>
              </div>

              {/* MAPA ILUSTRATIVO / CÓMO LLEGAR */}
              <div className="surface p-8">
                <h3 className="font-display text-xl text-ink">Cómo llegar a Arenales 1999</h3>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed">
                  Estamos ubicados a pasos de Av. Santa Fe y Av. Callao, con fácil acceso a múltiples líneas de colectivos (12, 39, 68, 152, 111) y la estación Callao de la Línea D de subte.
                </p>
                  <div className="mt-6 rounded-2xl overflow-hidden border border-ink/10 bg-cream-200/50 p-6 text-center">
                    <span className="font-mono text-xs text-gold-dark uppercase tracking-[0.18em] font-bold">
                      Recoleta · Buenos Aires
                    </span>
                    <p className="mt-2 text-xs text-ink/65">
                      Arenales 1999 (esq. Ayacucho)
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2.5">
                      <a
                        href={siteConfig.contact.googleMapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost btn-sm"
                      >
                        Abrir en Google Maps ↗
                      </a>
                      <a
                        href={siteConfig.contact.googleReviewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary btn-sm"
                      >
                        ★ Dejar opinión en Google
                      </a>
                    </div>
                  </div>
              </div>
            </div>

            {/* PROTOCOLO DE RESERVAS */}
            <div className="md:col-span-5 space-y-6">
              <div className="surface-elevated p-8">
                <span className="rounded-full bg-wine/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-wine font-bold border border-wine/20">
                  Información Importante
                </span>
                <h3 className="mt-4 font-display text-2xl text-ink">
                  Protocolo de Turnos & Seña
                </h3>
                <ul className="mt-5 space-y-3.5 text-xs text-ink/75 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-gold-dark font-bold">1.</span>
                    <span>Los turnos se reservan con una <strong>seña previa</strong> mediante transferencia bancaria o Mercado Pago.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-gold-dark font-bold">2.</span>
                    <span>Tolerancia de espera: <strong>10 minutos</strong> para no superponer turnos de otras clientas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-gold-dark font-bold">3.</span>
                    <span>Cancelaciones o reprogramaciones con al menos <strong>24 horas de anticipación</strong> para conservar tu seña.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-gold-dark font-bold">4.</span>
                    <span>Para servicios de cejas o pestañas, asistir <strong>sin maquillaje</strong> en la zona ocular.</span>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-ink/10">
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary w-full"
                  >
                    Agendar por WhatsApp
                  </a>
                </div>
              </div>

              {/* DUDAS ACADÉMICAS */}
              <div className="surface p-6">
                <h4 className="font-display text-lg text-ink">¿Consultas sobre los cursos online?</h4>
                <p className="mt-2 text-xs leading-relaxed text-ink/65">
                  Si querés capacitarte o tenés dudas sobre el contenido del campus, podés escribirnos al mismo WhatsApp o revisar la sección de cursos.
                </p>
                <Link href="/cursos" className="btn-ghost btn-sm mt-4 w-full">
                  Ir al catálogo de cursos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* OPINIONES REALES GOOGLE MAPS */}
        <GoogleReviews className="border-t border-ink/10 bg-cream-100/30" />
      </main>
      <SiteFooter />
    </>
  );
}
