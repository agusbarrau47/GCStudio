import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { ProgressBar } from "@/components/progress-bar";
import { requireAuthProfile } from "@/lib/auth/guards";
import { COURSES, countLessons } from "@/content/courses";
import { getEnrollments, getCourseProgress } from "@/lib/data/access";
import { canAccessCourse } from "@/lib/domain/access";

export const metadata: Metadata = { title: "Mis cursos" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const profile = await requireAuthProfile("/dashboard");
  const enrollments = await getEnrollments(profile.id);

  const cards = await Promise.all(
    COURSES.map(async (course) => {
      const hasAccess = canAccessCourse(enrollments, course.id);
      const progress = hasAccess
        ? await getCourseProgress(profile.id, course.id)
        : null;
      return { course, hasAccess, progress };
    })
  );

  const firstName = (profile.fullName ?? "").split(" ")[0] || "de nuevo";

  return (
    <>
      <AppHeader profile={profile} />
      <main className="shell py-12">
        <p className="eyebrow">Campus GC Studio</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] text-ink">
          Hola, {firstName}
        </h1>
        <p className="mt-2 text-ink/60">Retomá donde quedaste o empezá un curso nuevo.</p>

        <section className="mt-10 grid gap-6 lg:grid-cols-2" aria-label="Mis cursos">
          {cards.map(({ course, hasAccess, progress }) => (
            <article key={course.id} className="surface flex flex-col overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden bg-cream-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
                {!hasAccess && (
                  <span className="absolute right-4 top-4 rounded-full bg-cream/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/60 backdrop-blur">
                    Sin acceso
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-2xl text-ink">{course.title}</h2>
                <p className="mt-1 text-sm text-ink/50">
                  {course.modules.length} módulos · {countLessons(course)} clases
                </p>

                <div className="mt-5 flex-1">
                  {hasAccess && progress ? (
                    <>
                      <ProgressBar
                        percent={progress.percent}
                        label={`${progress.completedLessons} de ${progress.totalLessons} clases · ${progress.percent}%`}
                      />
                    </>
                  ) : (
                    <p className="text-sm text-ink/50">
                      Todavía no tenés acceso a este curso.
                    </p>
                  )}
                </div>

                <div className="mt-6">
                  {hasAccess ? (
                    <Link href={`/campus/${course.slug}`} className="btn-primary w-full">
                      {progress && progress.percent > 0 ? "Continuar" : "Comenzar"}
                    </Link>
                  ) : (
                    <Link href={`/cursos/${course.slug}`} className="btn-ghost w-full">
                      Ver curso
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
