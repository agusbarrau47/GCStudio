import Link from "next/link";
import { BrandIntro } from "@/components/brand-intro";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CourseCard } from "@/components/course-card";
import { GoogleReviews } from "@/components/google-reviews";
import { COURSES } from "@/content/courses";
import { PRODUCTS } from "@/content/products";
import { getCurrentProfile } from "@/lib/auth/session";
import { siteConfig } from "@/config/site.config";

export default async function LandingPage() {
  const profile = await getCurrentProfile();
  const authed = !!profile;

  return (
    <>
      <BrandIntro />
      <SiteHeader authed={authed} />
      <main className="pt-16">
        <Hero />
        <ServiciosOverview />
        <CursosSection />
        <TiendaSection />
        <MetodologiaSection />
        <StudioLocationSection />
        <GoogleReviews />
        <Faq />
        <ClosingCTA authed={authed} />
      </main>
      <SiteFooter />
    </>
  );
}

/* ---------------------------------------------------------------- HERO */

const RAIL = [
  "Lifting de pestañas",
  "Laminado de cejas",
  "Visagismo con hilo",
  "Limpiezas faciales",
  "Shock de hidratación",
  "Kapping gel",
  "Nail art sutil",
  "Academia online",
  "Bioseguridad ANMAT",
];

function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-gold/15 to-blush/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-10%] h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-wine/10 via-blush/15 to-transparent blur-[130px]"
      />
      <div className="shell grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="animate-fade-up">
          <p className="eyebrow">Centro de Estética & Academia · Recoleta, CABA</p>
          <h1 className="mt-4 sm:mt-5 max-w-[17ch] font-display text-[clamp(2.15rem,5.5vw,4.4rem)] leading-[1.08] text-ink">
            Realzamos tu belleza natural con{" "}
            <span className="font-script text-gold-dark block sm:inline">precisión y estilo</span>
          </h1>
          <p className="mt-5 sm:mt-6 max-w-[42rem] text-base sm:text-lg leading-relaxed text-ink/75">
            Lifting de pestañas, diseño y laminado de cejas, limpiezas faciales y manicuría premium
            en nuestro salón de Recoleta. Y para quienes buscan profesionalizarse, nuestra academia digital con campus privado.
          </p>

          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3.5 sm:gap-4">
            <Link href="/servicios" className="btn-primary w-full sm:w-auto text-center justify-center">
              Ver nuestros servicios
            </Link>
            <Link href="/cursos" className="btn-ghost w-full sm:w-auto text-center justify-center">
              Academia de cursos online
            </Link>
          </div>

          <div className="mt-8 sm:mt-10 grid max-w-xl grid-cols-3 gap-2 sm:gap-4 border-t border-ink/10 pt-5 sm:pt-6">
            <HeroMeta k="Salón" v="Arenales 1999" />
            <HeroMeta k="Academia" v="100% Online" />
            <HeroMeta k="Calidad" v="ANMAT certificada" />
          </div>
        </div>

        <aside className="surface-elevated animate-fade-up p-5 sm:p-7 space-y-4 sm:space-y-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dark font-bold">
              GC Studio
            </span>
            <span className="rounded-full bg-gold/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-semibold border border-gold/25">
              Recoleta
            </span>
          </div>
          <h2 className="font-display text-2xl text-ink leading-snug">
            Citas personalizadas en nuestro salón
          </h2>
          <p className="text-xs leading-relaxed text-ink/65">
            Atención uno a uno en cabina privada. Reservá tu turno para lifting, cejas, faciales o uñas.
          </p>
          <ul className="space-y-2.5 text-xs text-ink/80 pt-1">
            <li className="flex items-center gap-2">
              <span className="text-gold-dark font-bold">✦</span>
              <span>Laminado & Visagismo con hilo</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold-dark font-bold">✦</span>
              <span>Lash Lifting + Keratina y tinte</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold-dark font-bold">✦</span>
              <span>Higiene profunda & Glow facial</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gold-dark font-bold">✦</span>
              <span>Kapping gel & Semipermanente</span>
            </li>
          </ul>
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary btn-sm mt-4 w-full flex items-center justify-center text-center"
          >
            Pedir turno por WhatsApp
          </a>
        </aside>
      </div>

      {/* Rail continuo de especialidades */}
      <div
        className="relative flex items-center gap-0 overflow-hidden border-y border-ink/10 py-4 bg-cream-100/40"
        aria-label="Servicios y especialidades."
      >
        <div className="flex shrink-0 animate-rail gap-8 pr-8 hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap">
          {[...RAIL, ...RAIL].map((item, i) => (
            <span
              key={i}
              aria-hidden={i >= RAIL.length}
              className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-ink/50"
            >
              {item} <span className="text-gold-dark/50">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroMeta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-display text-base font-semibold text-gold-dark">{v}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">{k}</p>
    </div>
  );
}

/* ------------------------------------------- 1. SERVICIOS OVERVIEW */

const CORE_SERVICES = [
  {
    cat: "Cejas y Pestañas",
    title: "Lifting de pestañas",
    desc: "Curvatura clásica desde la raíz con tinte negro y keratina ($35.000) o la innovadora Técnica Coreana ultra suave ($40.000).",
    price: "$ 35.000",
    time: "60 a 75 min",
    href: "/servicios#catalogo",
  },
  {
    cat: "Cejas y Pestañas",
    title: "Laminado & Cejas HD",
    desc: "Laminado alisador fijador ($32.900), Cejas HD con styling y henna botánica ($22.000) o diseño y perfilado con hilo ($20.000).",
    price: "$ 32.900",
    time: "45 a 60 min",
    href: "/servicios#catalogo",
  },
  {
    cat: "Uñas",
    title: "Semi, Capping & Pies",
    desc: "Esmaltado semipermanente ruso ($26.500), capping gel ($28.000), capping polygel ($30.000) y belleza integral de pies ($27.000).",
    price: "Desde $ 26.500",
    time: "60 a 90 min",
    href: "/servicios#catalogo",
  },
  {
    cat: "Faciales",
    title: "Higiene Facial & Dermaplaning",
    desc: "Limpieza facial profunda con extracciones ($43.000) y protocolo con dermaplaning para textura efecto porcelana ($45.000).",
    price: "$ 43.000",
    time: "60 a 90 min",
    href: "/servicios#catalogo",
  },
];

function ServiciosOverview() {
  return (
    <section id="servicios" className="py-24 border-t border-ink/10">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">Servicios en el Studio · Arenales 1999</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-tight text-ink">
              Tratamientos pensados para resaltar tus rasgos
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/servicios" className="btn-primary btn-sm">
              Ver lista de precios completa
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE_SERVICES.map((s) => (
            <div key={s.title} className="surface-elevated rounded-[24px] p-6 flex flex-col justify-between border border-[#E8DDD0] hover:border-[#DECBB5] hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-cream-200 px-3 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-semibold border border-[#E0D3C0]">
                    {s.cat}
                  </span>
                  <span className="font-mono text-[11px] text-ink/50">{s.time}</span>
                </div>
                <h3 className="mt-4 font-display text-xl text-ink font-semibold">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink/65">{s.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
                <span className="font-display text-base font-bold text-gold-dark">{s.price}</span>
                <Link href={s.href} className="text-xs font-mono uppercase tracking-[0.14em] text-ink font-semibold hover:text-gold-dark hover:underline">
                  Precios & turnos →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- 2. CURSOS SECTION */

function CursosSection() {
  return (
    <section id="cursos" className="border-t border-ink/10 bg-cream-100/40 py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Academia Digital GC Studio</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-tight text-ink">
              Cursos profesionales online
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/cursos" className="btn-primary btn-sm">
              Ver todos los cursos
            </Link>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/70">
          Formaciones completas con acceso de por vida. Aprendé el paso a paso en modelos reales,
          con química capilar y bioseguridad para brindar servicios seguros y de alta rentabilidad.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {COURSES.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>

        {/* Garantía de respaldo y Cursos Presenciales */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="surface-elevated p-6 rounded-[22px] flex items-start gap-3.5 border border-[#E8DDD0] bg-gradient-to-br from-white/95 via-white/90 to-[#FAF4EA]/40">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-xl text-gold-dark">
              🛡️
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-semibold border border-gold/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-dark/60" />
                  Garantía de Respaldo
                </span>
                <span className="font-mono text-[10px] text-ink/40">100% Descargable</span>
              </div>
              <p className="mt-2 text-xs text-ink/75 leading-relaxed">
                Todo el material didáctico, protocolos ANMAT y fichas son descargables a tu disco para tu copia offline permanente, garantizado en nuestros{" "}
                <Link href="/terminos" className="underline font-semibold text-ink hover:text-gold-dark">
                  términos y condiciones
                </Link>.
              </p>
            </div>
          </div>

          <div className="surface-elevated p-6 rounded-[22px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#E8DDD0] bg-gradient-to-br from-white/95 via-white/90 to-[#F7EEF1]/40">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-wine/8 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-wine font-semibold border border-wine/20">
                <span className="h-1.5 w-1.5 rounded-full bg-wine/60" />
                Recoleta · Arenales 1999
              </span>
              <h4 className="mt-2 font-display text-lg text-ink font-semibold">
                ¿Buscás formación presencial 1 a 1?
              </h4>
              <p className="mt-1 text-xs text-ink/70 leading-relaxed max-w-md">
                Masterclasses intensivas en cabina privada con modelo viva y kit profesional incluido.
              </p>
            </div>
            <Link href="/cursos#catalogo-presencial" className="btn-wine btn-sm shrink-0 self-start sm:self-center">
              Ver Presenciales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- 2b. TIENDA / MARKETPLACE */

function TiendaSection() {
  const featured = PRODUCTS.slice(0, 4);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="tienda" className="border-t border-ink/10 py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Tienda Oficial · Kits & Aftercare</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-tight text-ink">
              Insumos pro y cuidado en casa
            </h2>
          </div>
          <Link href="/productos" className="btn-primary btn-sm">
            Explorar toda la tienda
          </Link>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink/70">
          Kits de inicio oficiales para las alumnas del campus e insumos de mantenimiento
          para que las clientas extiendan la vida de su lifting y laminado.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <div key={p.id} className="surface flex flex-col justify-between p-6 hover:-translate-y-1 transition-transform">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-cream-200 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold-dark font-bold border border-[#E0D3C0]">
                    {p.category.split(" ")[0]}
                  </span>
                  {p.badge && (
                    <span className="font-mono text-[9px] text-wine font-semibold truncate max-w-[120px]">
                      {p.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-lg text-ink font-semibold leading-snug">
                  {p.name}
                </h3>
                <p className="mt-2 text-xs text-ink/65 line-clamp-2">
                  {p.shortDesc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-ink/10 flex items-center justify-between">
                <span className="font-display text-base font-bold text-gold-dark">
                  {formatPrice(p.priceArs)}
                </span>
                <Link href="/productos" className="btn-ghost btn-sm text-[10px]">
                  Ver en tienda
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- 3. METODOLOGÍA SECTION */

const STEPS = [
  { t: "Diagnóstico & Visagismo", d: "Medición morfométrica y evaluación del tipo de pelo o piel." },
  { t: "Química & Tiempos ANMAT", d: "Uso de marcas reguladas con control estricto de exposición." },
  { t: "Técnica Precisa", d: "Aplicación milimétrica que respeta la salud y caída natural." },
  { t: "Cuidado Post-Servicio", d: "Asesoramiento y guías de mantenimiento en casa." },
];

function MetodologiaSection() {
  return (
    <section id="metodologia" className="border-t border-ink/10 py-24">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">Criterio Profesional</p>
            <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-tight text-ink">
              El método GC Studio
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Link href="/metodologia" className="btn-ghost btn-sm">
              Conocer más sobre el método
            </Link>
          </div>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[#E8DEC8] bg-[#E8DEC8] md:grid-cols-4 shadow-sm">
          {STEPS.map((s, i) => (
            <li key={s.t} className="bg-white/85 p-6 hover:bg-white transition-colors">
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-gold" aria-hidden="true" />
                <span className="font-mono text-xs text-gold-dark font-semibold">
                  {String(i + 1).padStart(2, "0")} / {STEPS.length}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg text-ink font-semibold">{s.t}</h3>
              <p className="mt-2 text-xs text-ink/65 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------- 4. EL STUDIO SECTION */

function StudioLocationSection() {
  return (
    <section id="studio" className="border-t border-ink/10 bg-cream-100/50 py-24">
      <div className="shell grid gap-12 md:grid-cols-2 items-center">
        <div>
          <p className="eyebrow">Ubicación & Reservas</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-tight text-ink">
            Vení a conocernos a Recoleta
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-ink/75">
            Nuestro espacio en <strong>{siteConfig.brand.address}</strong> fue pensado para desconectar del ritmo de la ciudad.
            Cada sesión es individual y con turno previo para que disfrutes de tu momento de cuidado.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Pedir turno por WhatsApp
            </a>
            <a
              href={siteConfig.contact.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              Ver en Google Maps ↗
            </a>
          </div>
        </div>

        <div className="surface-elevated p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-ink/10">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink/50">Dirección</span>
            <span className="text-xs font-semibold text-ink">{siteConfig.brand.address}</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-ink/10">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink/50">Turnos</span>
            <span className="text-xs font-semibold text-gold-dark">{siteConfig.contact.whatsapp}</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-ink/10">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink/50">Instagram</span>
            <span className="text-xs font-semibold text-ink">{siteConfig.contact.instagram}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink/50">Modalidad</span>
            <span className="text-xs font-semibold text-ink">Cita previa exclusiva</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- 5. FAQ */

const FAQS = [
  {
    q: "¿Cómo reservo un turno para el salón en Recoleta?",
    a: "Escribinos directamente por WhatsApp. Te compartimos los días y horarios disponibles y coordinamos tu turno con una seña previa.",
  },
  {
    q: "¿Necesito experiencia previa para hacer los cursos online?",
    a: "No. Nuestros cursos de Laminado y Lash Lifting comienzan desde los fundamentos anatómicos y químicos hasta la práctica profesional avanzada.",
  },
  {
    q: "¿Qué productos recomiendan y utilizan?",
    a: "Tanto en los servicios como en los cursos capacitamos exclusivamente con insumos autorizados por ANMAT para garantizar la salud de cada clienta.",
  },
  {
    q: "¿Cuánto tiempo de acceso tengo al comprar un curso?",
    a: "El acceso es de por vida a través de tu cuenta en el campus virtual, incluyendo todas las actualizaciones futuras de material.",
  },
  {
    q: "¿Dónde queda exactamente el local?",
    a: "Estamos ubicados en Arenales 1999, en el barrio de Recoleta (CABA), a pocos metros de las avenidas Santa Fe y Callao.",
  },
];

function Faq() {
  return (
    <section id="faq" className="border-t border-ink/10 py-24">
      <div className="shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="faq-h" className="mt-3 font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight text-ink">
            Todo lo que necesitás saber
          </h2>
          <p className="mt-4 text-xs leading-relaxed text-ink/65">
            Respuestas a las consultas más habituales sobre nuestros turnos presenciales y nuestra academia online.
          </p>
        </div>
        <div className="md:col-span-8">
          <div className="surface divide-y divide-[#EBE1D4] overflow-hidden">
            {FAQS.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink marker:hidden">
                  {f.q}
                  <span className="font-mono text-gold-dark transition-transform group-open:rotate-45 font-bold">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- 6. CLOSING CTA */

function ClosingCTA({ authed }: { authed: boolean }) {
  return (
    <section className="border-t border-ink/10 bg-cream-100/60 py-24">
      <div className="shell">
        <div className="surface-elevated grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-12 items-center">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark font-bold">
              GC Studio · Recoleta
            </span>
            <h2 className="mt-2 font-display text-[clamp(2rem,4.2vw,3.2rem)] leading-tight text-ink">
              Realzá tu belleza o{" "}
              <span className="font-script text-gold-dark">profesionalizá tu técnica</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/70 max-w-lg">
              Reservá tu cita en nuestro salón de Recoleta o inscribite en nuestra academia digital con acceso ilimitado.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Pedir turno en Recoleta
            </a>
            <Link
              href={authed ? "/dashboard" : "/cursos"}
              className="btn-ghost flex items-center justify-center text-center"
            >
              {authed ? "Ir a mi campus" : "Ver cursos de la academia"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
