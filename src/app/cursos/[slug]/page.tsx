import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProgressBar } from "@/components/progress-bar";
import { COURSES, BUNDLE, getCourseBySlug, countLessons } from "@/content/courses";
import { getCurrentProfile } from "@/lib/auth/session";
import { getEnrollments } from "@/lib/data/access";
import { canAccessCourse } from "@/lib/domain/access";
import { formatPrice, siteConfig } from "@/config/site.config";
import { formatDuration } from "@/lib/utils";
import { CheckoutButton } from "@/components/checkout-button";

export async function generateStaticParams() {
  return [...COURSES.map((c) => ({ slug: c.slug })), { slug: BUNDLE.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (course) {
    return {
      title: course.title,
      description: course.description,
    };
  }
  if (slug === BUNDLE.slug) {
    return { title: BUNDLE.title, description: "Acceso a los dos cursos de GC Studio." };
  }
  return {};
}

export default async function CourseSalesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = await getCurrentProfile();
  const authed = !!profile;

  if (slug === BUNDLE.slug) {
    return <BundlePage authed={authed} />;
  }

  const course = getCourseBySlug(slug);
  if (!course) notFound();

  let hasAccess = false;
  if (profile) {
    const enrollments = await getEnrollments(profile.id);
    hasAccess = canAccessCourse(enrollments, course.id);
  }

  const lessons = countLessons(course);

  return (
    <>
      <SiteHeader authed={authed} />
      <main className="pt-16">
        <section className="border-b border-ink/10">
          <div className="shell grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <Link href="/#cursos" className="link-nav">
                ← Volver al catálogo
              </Link>
              <p className="eyebrow mt-6">{course.subtitle}</p>
              <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] leading-[1.03] text-ink">
                {course.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
                {course.description}
              </p>
              <dl className="mt-8 flex flex-wrap gap-8">
                <Meta k="Módulos" v={String(course.modules.length)} />
                <Meta k="Clases" v={String(lessons)} />
                <Meta k="Duración video" v={formatDuration(course.videoDurationSeconds)} />
                <Meta k="Nivel" v={course.level} />
              </dl>
            </div>

            <aside className="surface-elevated flex flex-col p-6 lg:sticky lg:top-24 lg:self-start">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-cream-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.coverImage} alt={course.title} className="h-full w-full object-cover" />
              </div>
              <p className="mt-5 font-display text-3xl text-gold-dark">
                {formatPrice(course.priceArs)}
              </p>
              {course.priceArs == null && (
                <p className="mt-1 text-xs text-ink/40">
                  Cargá el precio en site.config.ts (ver SETUP.md).
                </p>
              )}

              <div className="mt-5">
                {hasAccess ? (
                  <Link href={`/campus/${course.slug}`} className="btn-primary w-full">
                    Ir al curso
                  </Link>
                ) : authed ? (
                  <CheckoutButton productId={course.id} label="Comprar e inscribirme" />
                ) : (
                  <Link href={`/registro?next=/cursos/${course.slug}`} className="btn-primary w-full">
                    Crear cuenta para comprar
                  </Link>
                )}
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost btn-sm mt-3 w-full"
                >
                  Consultar por WhatsApp
                </a>
              </div>

              <ul className="mt-6 space-y-2 border-t border-ink/10 pt-5 text-sm text-ink/70">
                <li className="flex items-center gap-2">
                  <span className="text-gold-dark font-bold">✓</span>
                  <span>Acceso de por vida</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-dark font-bold">✓</span>
                  <span>Video + conceptos clave</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-dark font-bold">✓</span>
                  <span><strong>100% descargable:</strong> copia offline permanente</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gold-dark font-bold">✓</span>
                  <span>Campus privado con progreso</span>
                </li>
              </ul>

              {/* CARD DE SEGURIDAD Y RESPALDO DESCARGABLE */}
              <div className="mt-5 rounded-2xl border border-gold/35 bg-gold/[0.07] p-4 text-xs text-ink/80 space-y-1.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-bold flex items-center gap-1.5">
                  <span>🛡️</span> Respaldo Offline Garantizado
                </p>
                <p className="text-[11px] leading-relaxed text-ink/70">
                  Descargá el material técnico oficial, protocolos ANMAT y consentimientos para tener tu copia permanente protegida en tu disco, respaldado legalmente en nuestros{" "}
                  <Link href="/terminos" className="font-semibold underline text-ink hover:text-gold-dark">
                    términos y condiciones
                  </Link>.
                </p>
              </div>

              {/* ENLACE A CURSO PRESENCIAL */}
              <div className="mt-4 rounded-2xl border border-wine/20 bg-wine/[0.04] p-4 text-xs text-ink/80">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-wine font-bold">
                  ¿Preferís práctica 1 a 1 presencial?
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink/70">
                  También dictamos Masterclasses intensivas en nuestro estudio de Recoleta (Arenales 1999) con modelo viva y kit completo.
                </p>
                <Link
                  href="/cursos#catalogo-presencial"
                  className="mt-2.5 inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-wine font-bold underline hover:text-wine-dark"
                >
                  Ver opciones presenciales →
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* Qué vas a aprender */}
        <section className="border-b border-ink/10 py-20">
          <div className="shell grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">Al terminar vas a poder</p>
              <h2 className="mt-4 font-display text-3xl text-ink">Resultados de aprendizaje</h2>
            </div>
            <ul className="grid gap-4 md:col-span-7">
              {course.outcomes.map((o, i) => (
                <li key={i} className="surface flex items-start gap-4 p-5">
                  <span className="font-mono text-sm text-gold-dark">/{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-ink/80">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Programa */}
        <section className="py-20">
          <div className="shell">
            <p className="eyebrow">Programa completo</p>
            <h2 className="mt-4 font-display text-3xl text-ink">
              {course.modules.length} módulos · {lessons} clases
            </h2>
            <div className="mt-10 space-y-4">
              {course.modules.map((m) => (
                <div key={m.id} className="surface overflow-hidden">
                  <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-6 py-4">
                    <div>
                      <span className="font-mono text-xs text-gold-dark/70">
                        Módulo {String(m.order).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-xl text-ink">{m.title}</h3>
                    </div>
                    <span className="font-mono text-xs text-ink/40">
                      {m.lessons.length} clases
                    </span>
                  </div>
                  <ul className="divide-y divide-white/[0.06]">
                    {m.lessons.map((l) => (
                      <li key={l.id} className="flex items-center gap-4 px-6 py-3 text-sm">
                        <span className="font-mono text-xs text-ink/40">
                          {String(l.order).padStart(2, "0")}
                        </span>
                        <span className="text-ink/80">{l.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Para quién */}
        <section className="border-t border-ink/10 bg-ink/[0.015] py-20">
          <div className="shell grid gap-10 md:grid-cols-2">
            <div>
              <p className="eyebrow">Para quién es</p>
              <ul className="mt-5 space-y-3">
                {course.audience.map((a, i) => (
                  <li key={i} className="flex gap-3 text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blush" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="surface-elevated flex flex-col justify-center p-8">
              <h3 className="font-display text-2xl text-ink">Empezá hoy</h3>
              <p className="mt-2 text-ink/70">
                {hasAccess ? "Ya tenés acceso a este curso." : "Sumate al campus de GC Studio."}
              </p>
              <div className="mt-5">
                {hasAccess ? (
                  <Link href={`/campus/${course.slug}`} className="btn-primary">
                    Ir al curso
                  </Link>
                ) : authed ? (
                  <CheckoutButton productId={course.id} label="Comprar e inscribirme" />
                ) : (
                  <Link href="/registro" className="btn-primary">
                    Crear mi cuenta
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dd className="font-display text-xl text-ink">{v}</dd>
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">{k}</dt>
    </div>
  );
}

/* -------------------------------------------------------------- BUNDLE */

async function BundlePage({ authed }: { authed: boolean }) {
  const profile = await getCurrentProfile();
  let owned: string[] = [];
  if (profile) {
    const enrollments = await getEnrollments(profile.id);
    owned = enrollments.filter((e) => e.status === "active").map((e) => e.courseId);
  }
  const hasBoth = BUNDLE.courseIds.every((id) => owned.includes(id));

  return (
    <>
      <SiteHeader authed={authed} />
      <main className="pt-16">
        <section className="border-b border-ink/10">
          <div className="shell py-16">
            <Link href="/#cursos" className="link-nav">
              ← Volver al catálogo
            </Link>
            <p className="eyebrow mt-6">Bundle completo</p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] text-ink">
              {BUNDLE.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink/70">
              Acceso a los dos cursos de GC Studio: Laminado de Cejas y Lifting de Pestañas.
              9 módulos y 24 clases en total, con todos los recursos.
            </p>
            <p className="mt-6 font-display text-3xl text-gold-dark">
              {formatPrice(BUNDLE.priceArs)}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {hasBoth ? (
                <Link href="/dashboard" className="btn-primary">
                  Ir a mi campus
                </Link>
              ) : authed ? (
                <CheckoutButton productId="bundle-full" label="Comprar el bundle" />
              ) : (
                <Link href="/registro?next=/cursos/bundle-full" className="btn-primary">
                  Crear cuenta para comprar
                </Link>
              )}
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="shell grid gap-6 md:grid-cols-2">
            {COURSES.map((c) => (
              <div key={c.id} className="surface p-6">
                <h2 className="font-display text-2xl text-ink">{c.title}</h2>
                <p className="mt-2 text-sm text-ink/60">{c.description}</p>
                <p className="mt-4 font-mono text-xs text-ink/40">
                  {c.modules.length} módulos · {countLessons(c)} clases
                </p>
                <Link href={`/cursos/${c.slug}`} className="btn-ghost btn-sm mt-5">
                  Ver detalle
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
