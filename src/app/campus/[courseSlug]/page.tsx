import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { ProgressBar } from "@/components/progress-bar";
import { requireAuthProfile } from "@/lib/auth/guards";
import { getCourseBySlug, countLessons } from "@/content/courses";
import {
  userHasCourseAccess,
  getCourseProgress,
  getCompletedLessonIds,
  getPassedModuleIds,
} from "@/lib/data/access";
import { moduleGateStates } from "@/lib/domain/quiz";
import { moduleHasQuiz } from "@/content/quizzes";
import { formatDuration } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  return { title: course ? course.title : "Curso" };
}

export default async function CourseHomePage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) notFound();

  const profile = await requireAuthProfile(`/campus/${courseSlug}`);
  const hasAccess = await userHasCourseAccess(profile.id, course.id);
  if (!hasAccess) redirect(`/cursos/${course.slug}`);

  const [progress, completedIds, passedModuleIds] = await Promise.all([
    getCourseProgress(profile.id, course.id),
    getCompletedLessonIds(profile.id, course.id),
    getPassedModuleIds(profile.id, course.id),
  ]);

  const continueSlug =
    progress.nextLessonSlug ?? course.modules[0]?.lessons[0]?.slug;

  const gate = moduleGateStates(course, passedModuleIds);
  const gateByModuleId = new Map(gate.map((g) => [g.module.id, g]));

  return (
    <>
      <AppHeader profile={profile} />
      <main className="pb-20">
        {/* Portada */}
        <section className="border-b border-ink/10">
          <div className="shell grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <Link href="/dashboard" className="link-nav">
                ← Mis cursos
              </Link>
              <p className="eyebrow mt-6">{course.subtitle}</p>
              <h1 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-tight text-ink">
                {course.title}
              </h1>
              <p className="mt-4 max-w-xl text-ink/70">{course.description}</p>
              <dl className="mt-6 flex flex-wrap gap-8">
                <Meta k="Módulos" v={String(course.modules.length)} />
                <Meta k="Clases" v={String(countLessons(course))} />
                <Meta k="Video" v={formatDuration(course.videoDurationSeconds)} />
              </dl>
            </div>

            <aside className="surface-elevated flex flex-col justify-center p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold-dark/70">
                Tu progreso
              </p>
              <p className="mt-2 font-display text-4xl text-ink">{progress.percent}%</p>
              <div className="mt-4">
                <ProgressBar
                  percent={progress.percent}
                  label={`${progress.completedLessons} de ${progress.totalLessons} clases`}
                />
              </div>
              {continueSlug && (
                <Link href={`/campus/${course.slug}/${continueSlug}`} className="btn-primary mt-6 w-full">
                  {progress.percent === 0
                    ? "Comenzar curso"
                    : progress.percent === 100
                      ? "Repasar curso"
                      : "Continuar curso"}
                </Link>
              )}
            </aside>
          </div>
        </section>

        {/* Programa */}
        <section className="shell py-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-2xl text-ink">Programa</h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">
              Aprobá cada evaluación para desbloquear el módulo siguiente
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {course.modules.map((m) => {
              const g = gateByModuleId.get(m.id);
              const locked = g ? !g.unlocked : false;
              const passed = g?.passed ?? false;
              const hasQuiz = moduleHasQuiz(m.id);
              const allLessonsDone = m.lessons.every((l) => completedIds.has(l.id));
              return (
                <div
                  key={m.id}
                  className={`surface overflow-hidden ${locked ? "opacity-70" : ""}`}
                >
                  <div className="flex flex-col gap-3 border-b border-ink/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="flex items-center gap-2 font-mono text-xs text-gold-dark/70">
                        Módulo {String(m.order).padStart(2, "0")}
                        {passed && (
                          <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] text-gold-dark">
                            ✓ Evaluación aprobada
                          </span>
                        )}
                        {locked && (
                          <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[10px] text-ink/50">
                            🔒 Bloqueado
                          </span>
                        )}
                      </span>
                      <h3 className="mt-1 font-display text-xl text-ink">{m.title}</h3>
                      <p className="mt-1 text-sm text-ink/50">{m.summary}</p>
                    </div>
                    {!locked && hasQuiz && (
                      <Link
                        href={`/campus/${course.slug}/evaluacion/${m.id}`}
                        className={passed ? "btn-ghost btn-sm shrink-0" : "btn-primary btn-sm shrink-0"}
                      >
                        {passed ? "Repasar evaluación" : "Rendir evaluación"}
                      </Link>
                    )}
                  </div>

                  {locked ? (
                    <p className="px-6 py-4 text-sm text-ink/50">
                      Completá y aprobá la evaluación del módulo anterior para desbloquear estas clases.
                    </p>
                  ) : (
                    <>
                      <ul className="divide-y divide-white/[0.06]">
                        {m.lessons.map((l) => {
                          const done = completedIds.has(l.id);
                          return (
                            <li key={l.id}>
                              <Link
                                href={`/campus/${course.slug}/${l.slug}`}
                                className="flex items-center gap-4 px-6 py-3 text-sm transition-colors hover:bg-white/[0.03]"
                              >
                                <span
                                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] ${
                                    done ? "bg-gold text-ink-900" : "border border-ink/20 text-ink/40"
                                  }`}
                                  aria-hidden="true"
                                >
                                  {done ? "✓" : String(l.order).padStart(2, "0")}
                                </span>
                                <span className="text-ink/85">{l.title}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      {hasQuiz && !passed && (
                        <div className="border-t border-ink/10 px-6 py-4">
                          <Link
                            href={`/campus/${course.slug}/evaluacion/${m.id}`}
                            className="btn-primary btn-sm"
                          >
                            {allLessonsDone
                              ? "Rendir evaluación del módulo →"
                              : "Ir a la evaluación del módulo →"}
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
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
