import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CourseCard } from "@/components/course-card";
import { COURSES } from "@/content/courses";
import { getCurrentProfile } from "@/lib/auth/session";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Cursos y Formación Profesional — GC Studio Academia",
  description:
    "Aprende las técnicas más demandadas del mercado estético: Laminado de Cejas y Lash Lifting. Formación 100% online dictada por Geraldine Colman con campus privado.",
};

export default async function CursosPage() {
  const profile = await getCurrentProfile();
  const authed = !!profile;

  return (
    <>
      <SiteHeader authed={authed} />
      <main className="pt-24 pb-20">
        {/* HERO CURSOS */}
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
            <p className="eyebrow">Academia Digital · Formación Profesional</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-tight text-ink">
              Capacitación online en{" "}
              <span className="font-script text-gold-dark">cejas y pestañas</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/70">
              El método y la experiencia de {siteConfig.brand.founder}, ordenados en un campus privado.
              Clases en video HD con clientas reales, fichas técnicas descargables, química del pelo y bioseguridad ANMAT.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="#catalogo" className="btn-primary">
                Explorar cursos
              </Link>
              <Link href={authed ? "/dashboard" : "/registro"} className="btn-ghost">
                {authed ? "Ir a mi campus" : "Crear mi cuenta gratis"}
              </Link>
            </div>

            {/* METRICAS */}
            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              <div>
                <p className="font-display text-2xl text-gold-dark font-bold">100%</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">Online o Presencial</p>
              </div>
              <div>
                <p className="font-display text-2xl text-gold-dark font-bold">De por vida</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">Acceso & Respaldo</p>
              </div>
              <div>
                <p className="font-display text-2xl text-gold-dark font-bold">ANMAT</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">Protocolos seguros</p>
              </div>
            </div>

            {/* BANNER DE RESPALDO DESCARGABLE Y SEGURIDAD LEGAL */}
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-gold/40 bg-gradient-to-r from-[#FAF2E1]/70 via-white/80 to-[#FAF2E1]/70 p-5 text-left shadow-sm backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/20 text-xl text-gold-dark">
                    🛡️
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-dark font-bold">
                        Garantía de Respaldo Total
                      </span>
                      <span className="rounded-full bg-wine/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-wine font-bold border border-wine/20">
                        100% Descargable
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-ink/80">
                      <strong>Tu inversión protegida de por vida:</strong> Todo el material de estudio, manuales técnicos oficiales en PDF, fichas de visagismo, protocolos de bioseguridad ANMAT y consentimientos son <strong>100% descargables</strong> a tu computadora o pendrive.
                    </p>
                    <p className="mt-1 text-[11px] text-ink/60">
                      Tenés la seguridad jurídica y técnica de conservar tu copia offline para siempre, protegido ante cualquier caída de servidores o contingencias. Avalado en nuestros{" "}
                      <Link href="/terminos" className="font-semibold underline text-ink hover:text-gold-dark">
                        términos y condiciones
                      </Link>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SELECTOR DE MODALIDAD */}
            <div className="mt-10 flex justify-center gap-3">
              <a
                href="#catalogo-online"
                className="rounded-full border border-ink/15 bg-white/80 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-ink/75 hover:border-gold hover:text-ink transition-all shadow-sm"
              >
                💻 Ver Cursos Online
              </a>
              <a
                href="#catalogo-presencial"
                className="rounded-full border border-gold/40 bg-[#FAF2E1]/60 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-ink hover:bg-[#FAF2E1] transition-all shadow-sm"
              >
                📍 Ver Cursos Presenciales (Recoleta)
              </a>
            </div>
          </div>
        </section>

        {/* CATÁLOGO DE CURSOS ONLINE */}
        <section className="py-16" id="catalogo-online">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="rounded-full bg-gold/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-dark font-bold border border-gold/30">
                  Modalidad 100% Online
                </span>
                <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                  Cursos Online con Campus Privado
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink/60">
                Cursá a tu propio ritmo con clases en video HD, asistencia técnica y descarga completa de manuales para tu copia de seguridad offline.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {COURSES.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </div>
        </section>

        {/* BUNDLE DESTACADO */}
        <section className="py-12">
          <div className="shell">
            <div className="surface-elevated overflow-hidden p-8 md:p-12 grid gap-8 md:grid-cols-[1.5fr_1fr] items-center border border-gold/30 bg-gradient-to-br from-white/90 via-cream-50/80 to-cream-100/60">
              <div>
                <span className="rounded-full bg-gold/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-dark font-bold border border-gold/30">
                  Formación Integral
                </span>
                <h3 className="mt-4 font-display text-3xl text-ink md:text-4xl">
                  Bundle Completo: Laminado de Cejas + Lash Lifting
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink/75">
                  Dominá los dos servicios más rentables del rubro estético. Accedé al temario unificado con 24 clases,
                  demostración paso a paso en modelos reales, fichas de visagismo y protocolos de bioseguridad.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-ink/80">
                  <li className="flex items-center gap-2">
                    <span className="text-gold-dark font-bold">✓</span> Ambas formaciones con acceso ilimitado de por vida
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gold-dark font-bold">✓</span> Química capilar, tiempos de acción y curvaturas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gold-dark font-bold">✓</span> Descarga total de manuales PDF y consentimientos para tu respaldo offline
                  </li>
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/cursos/bundle-full" className="btn-primary">
                    Ver detalles del Bundle
                  </Link>
                  <a
                    href={siteConfig.contact.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                  >
                    Consultar formas de pago
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5D7C5] bg-white/80 p-6 space-y-4 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                  Beneficio de cursada
                </p>
                <p className="font-display text-4xl text-gold-dark font-bold">2 en 1</p>
                <p className="text-xs text-ink/65 leading-relaxed">
                  Ahorrá tiempo y dinero aprendiendo las dos técnicas complementarias que tus clientas piden juntas en cabina.
                </p>
                <div className="pt-2 border-t border-ink/10">
                  <span className="inline-block rounded-full bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-bold border border-gold/25">
                    Ideal para comenzar tu negocio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN CURSOS PRESENCIALES (RECOLETA) */}
        <section className="py-20 border-t border-ink/10 bg-cream-100/30" id="catalogo-presencial">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="rounded-full bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-dark font-bold border border-gold/25">
                  Modalidad Presencial VIP · Arenales 1999 (Recoleta)
                </span>
                <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                  Formaciones Presenciales 1 a 1
                </h2>
              </div>
              <p className="max-w-md text-sm text-ink/60">
                Entrenamiento exclusivo en cabina privada junto a {siteConfig.brand.founder}. Práctica directa sobre modelo viva, corrección postural y kit profesional incluido.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {/* OPCIÓN PRESENCIAL 1: LASH LIFTING */}
              <div className="surface-elevated flex flex-col justify-between p-8 border border-gold/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-28 w-28 bg-gradient-to-bl from-gold/20 to-transparent rounded-bl-full pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dark font-bold">
                      Opción Presencial 1 · Intensivo
                    </span>
                    <span className="rounded-full bg-gold/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold-dark font-bold border border-gold/30">
                      Cupos Reducidos (1 a 1)
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl md:text-3xl text-ink font-semibold">
                    Masterclass Presencial: Lash Lifting & Botox
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ink/70">
                    Jornada completa de perfeccionamiento técnico en nuestro salón de Arenales 1999. Desarrollá la técnica exacta de curvatura según la anatomía ocular de la clienta.
                  </p>

                  <div className="mt-6 space-y-3 rounded-xl border border-ink/10 bg-white/70 p-4 text-xs text-ink/80">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink font-bold">
                      ¿Qué incluye esta formación?
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-gold-dark font-bold">✦</span>
                        <span><strong>Práctica real sobre modelo viva</strong> en cabina privada supervisada paso a paso.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold-dark font-bold">✦</span>
                        <span><strong>Kit profesional completo de Lash Lifting</strong> (rindes de 25 servicios con productos ANMAT).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold-dark font-bold">✦</span>
                        <span><strong>Certificación física oficial</strong> emitida por GC Studio con aval de especialización.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold-dark font-bold">✦</span>
                        <span><strong>Bonificación especial:</strong> Acceso permanente al campus online y <strong>descarga completa de todo el material</strong> para respaldo offline ilimitado.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50 block">
                      Lugar & Formato
                    </span>
                    <span className="text-xs font-semibold text-ink">
                      Arenales 1999, Recoleta · 1 Jornada VIP
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/5491164857085?text=${encodeURIComponent(
                      "Hola Geraldine! Me interesa coordinar fecha para el Curso Presencial 1 a 1 de Lash Lifting & Botox en el estudio de Recoleta. ¿Qué fechas tienen disponibles?"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary btn-sm w-full sm:w-auto"
                  >
                    Consultar fechas y reservar
                  </a>
                </div>
              </div>

              {/* OPCIÓN PRESENCIAL 2: LAMINADO DE CEJAS */}
              <div className="surface-elevated flex flex-col justify-between p-8 border border-gold/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-28 w-28 bg-gradient-to-bl from-gold/15 to-transparent rounded-bl-full pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dark font-bold">
                      Opción Presencial 2 · Intensivo
                    </span>
                    <span className="rounded-full bg-gold/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold-dark font-bold border border-gold/25">
                      Cupos Reducidos (1 a 1)
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl md:text-3xl text-ink font-semibold">
                    Masterclass Presencial: Laminado & Visagismo con Hilo
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ink/70">
                    Aprende la técnica de diseño y arquitectura de cejas más codiciada. Mapeo simétrico con hilo inductor, alisado químico no invasivo y colorimetría personalizada.
                  </p>

                  <div className="mt-6 space-y-3 rounded-xl border border-ink/10 bg-white/70 p-4 text-xs text-ink/80">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink font-bold">
                      ¿Qué incluye esta formación?
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-gold-dark font-bold">✦</span>
                        <span><strong>Práctica intensiva sobre modelo real</strong> en cabina del estudio Recoleta.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold-dark font-bold">✦</span>
                        <span><strong>Kit profesional de Laminado & Visagismo</strong> completo con hilo teñido y activos ANMAT.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold-dark font-bold">✦</span>
                        <span><strong>Certificado impreso oficial</strong> de Master en Laminado y Diseño de Cejas.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold-dark font-bold">✦</span>
                        <span><strong>Bonificación especial:</strong> Acceso permanente al campus online y <strong>descarga completa de todo el material</strong> para respaldo offline ilimitado.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50 block">
                      Lugar & Formato
                    </span>
                    <span className="text-xs font-semibold text-ink">
                      Arenales 1999, Recoleta · 1 Jornada VIP
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/5491164857085?text=${encodeURIComponent(
                      "Hola Geraldine! Me interesa coordinar fecha para el Curso Presencial 1 a 1 de Laminado de Cejas & Visagismo con Hilo en Recoleta. ¿Qué fechas tienen disponibles?"
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary btn-sm w-full sm:w-auto"
                  >
                    Consultar fechas y reservar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA EL CAMPUS */}
        <section className="border-t border-ink/10 bg-cream-100/40 py-20">
          <div className="shell">
            <div className="text-center max-w-2xl mx-auto">
              <p className="eyebrow">Experiencia educativa</p>
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                ¿Cómo es cursar en el campus GC Studio?
              </h2>
              <p className="mt-4 text-sm text-ink/65">
                Diseñamos una plataforma limpia, intuitiva y responsive para que estudies desde tu computadora, tablet o celular, con respaldo permanente.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <CampusPillar
                step="01"
                title="Clases en Video HD"
                desc="Grabaciones en primer plano con clientas reales, mostrando cada movimiento y aplicación."
              />
              <CampusPillar
                step="02"
                title="Conceptos Clave"
                desc="Resúmenes técnicos por clase para repasar tiempos de exposición, milímetros y curvaturas."
              />
              <CampusPillar
                step="03"
                title="Respaldo 100% Descargable"
                desc="Descargá checklists, guías y fichas a tu disco para tener tu copia permanente sin depender de internet."
              />
              <CampusPillar
                step="04"
                title="Evaluación & Certificación"
                desc="Seguimiento de tu progreso clase por clase con cuestionarios prácticos para certificar tu técnica."
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function CampusPillar({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="surface p-6 flex flex-col justify-between">
      <div>
        <span className="font-mono text-xs text-gold-dark font-bold">/{step}</span>
        <h4 className="mt-3 font-display text-lg text-ink font-semibold">{title}</h4>
        <p className="mt-2 text-xs leading-relaxed text-ink/65">{desc}</p>
      </div>
    </div>
  );
}
