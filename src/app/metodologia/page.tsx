import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCurrentProfile } from "@/lib/auth/session";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: "Metodología & Estándares de Trabajo — GC Studio",
  description:
    "Conocé los pilares de GC Studio: visagismo armónico, química capilar responsable, bioseguridad ANMAT y pedagogía estructurada para profesionales de la estética.",
};

const PILLARS = [
  {
    num: "01",
    title: "Visagismo y Morfología Facial",
    subtitle: "Diseño a medida, no moldes genéricos",
    desc: "Cada rostro tiene proporciones, distancias y estructuras únicas. Trabajamos con mediciones reales con hilo para respetar la simetría y armonizar cejas y mirada con la anatomía de cada clienta.",
    points: [
      "Mapeo con hilo para puntos cardinales: inicio, arco alto y cola de la ceja",
      "Compensación visual de asimetrías naturales sin perder naturalidad",
      "Selección de grosor y densidad según la estructura ósea",
    ],
  },
  {
    num: "02",
    title: "Química del Pelo y Tiempos de Acción",
    subtitle: "Seguridad biológica de la fibra capilar",
    desc: "El laminado y el lifting modifican los puentes disulfuro del vello. Entender la porosidad, el grosor y el estado previo es indispensable para lograr resultados duraderos sin quemar ni debilitar el pelo.",
    points: [
      "Diagnóstico capilar previo: pelo fino, medio o resistente",
      "Control estricto de tiempos de paso 1 (ondulación) y paso 2 (fijación)",
      "Baños de nutrición y sellado con keratina pura para regenerar la cutícula",
    ],
  },
  {
    num: "03",
    title: "Bioseguridad y Normativa ANMAT",
    subtitle: "Trabajo profesional y responsable",
    desc: "En nuestro estudio y en nuestros cursos enseñamos a verificar siempre que cada producto cuente con número de legajo y aprobación oficial de ANMAT. La salud ocular y cutánea es nuestra prioridad absoluta.",
    points: [
      "Desinfección y esterilización de instrumental con protocolos hospitalarios",
      "Descartables individuales por servicio (microbrush, cepillos, parches)",
      "Prueba de alergia (patch test) previa en pieles reactivas o sensibles",
    ],
  },
  {
    num: "04",
    title: "Pedagogía Paso a Paso en Campus",
    subtitle: "Del saber empírico al método transmisible",
    desc: "Nuestra academia digital no es una recopilación de videos desordenados. Estructuramos cada contenido en módulos lógicos con resúmenes teóricos, demostraciones en primer plano y evaluaciones de asimilación.",
    points: [
      "Tomas macro en alta definición que muestran la aplicación milimétrica",
      "Checklists y consentimientos listos para usar en tu propio gabinete",
      "Evaluaciones modulares para que avances con total seguridad técnica",
    ],
  },
];

export default async function MetodologiaPage() {
  const profile = await getCurrentProfile();
  const authed = !!profile;

  return (
    <>
      <SiteHeader authed={authed} />
      <main className="pt-24 pb-20">
        {/* HERO METODOLOGÍA */}
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
            <p className="eyebrow">Filosofía GC Studio · Criterio & Seguridad</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-tight text-ink">
              Conocimiento real, transformado en{" "}
              <span className="font-script text-gold-dark">método</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ink/70">
              Creemos en la belleza consciente: técnicas no invasivas que respetan la fisiología de la piel y el pelo.
              Tanto en nuestras clientas de Recoleta como en las alumnas de nuestra academia, la excelencia técnica es nuestra firma.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/servicios" className="btn-primary">
                Conocer nuestros servicios
              </Link>
              <Link href="/cursos" className="btn-ghost">
                Ver oferta académica
              </Link>
            </div>
          </div>
        </section>

        {/* 4 PILARES */}
        <section className="py-16">
          <div className="shell space-y-12">
            {PILLARS.map((p, i) => (
              <div
                key={p.num}
                className={`surface p-8 md:p-12 grid gap-8 md:grid-cols-12 items-center ${
                  i % 2 === 1 ? "bg-white/85" : "bg-white/70"
                }`}
              >
                <div className="md:col-span-5">
                  <span className="font-mono text-xs text-gold-dark font-bold">
                    Pilar /{p.num}
                  </span>
                  <h2 className="mt-2 font-display text-2xl md:text-3xl text-ink">
                    {p.title}
                  </h2>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-wine font-semibold">
                    {p.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink/70">{p.desc}</p>
                </div>

                <div className="md:col-span-7 rounded-2xl bg-cream-100/70 p-6 md:p-8 border border-ink/5 space-y-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-dark font-bold">
                    Estándares aplicados
                  </p>
                  <ul className="space-y-3 pt-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-xs text-ink/80 leading-relaxed">
                        <span className="text-gold-dark font-bold text-sm">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN SOBRE GERALDINE */}
        <section className="border-t border-ink/10 bg-cream-100/50 py-20">
          <div className="shell grid gap-12 md:grid-cols-2 items-center">
            <div>
              <p className="eyebrow">Dirección & Experiencia</p>
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                Sobre {siteConfig.brand.founder}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                Especialista en estética de la mirada con base en Recoleta, Buenos Aires.
                A lo largo de los años ha atendido a cientos de clientas y capacitado a profesionales
                que hoy lideran sus propios estudios en todo el país.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                Su enfoque une el perfeccionismo estético con la calidez rioplatense,
                desmitificando técnicas complejas para hacerlas accesibles y seguras.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Seguir en Instagram {siteConfig.contact.instagram}
                </a>
                <Link href="/cursos" className="btn-primary">
                  Aprender con Geraldine
                </Link>
              </div>
            </div>

            <div className="surface-elevated p-8 space-y-6 text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-tr from-gold to-gold-light p-1 shadow-md">
                <div className="h-full w-full rounded-full bg-cream grid place-items-center">
                  <span className="font-script text-4xl text-gold-dark">Gc</span>
                </div>
              </div>
              <div>
                <p className="font-display text-2xl text-ink font-bold">{siteConfig.brand.founder}</p>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold-dark">
                  Fundadora & Directora Técnica
                </p>
              </div>
              <p className="text-xs text-ink/65 italic max-w-sm mx-auto">
                &ldquo;{siteConfig.brand.tagline}. No buscamos transformar quién sos, sino potenciar tus propios rasgos con sutileza y armonía.&rdquo;
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
