import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { VideoPlayer } from "@/components/video-player";
import { CompleteButton } from "@/components/complete-button";
import { ContentBlocks } from "@/components/content-blocks";
import { LessonNav, type LessonNavModule } from "@/components/lesson-nav";
import { requireAuthProfile } from "@/lib/auth/guards";
import { getCourseBySlug } from "@/content/courses";
import {
  userHasCourseAccess,
  getCompletedLessonIds,
  getCourseProgress,
  getPassedModuleIds,
} from "@/lib/data/access";
import {
  isModuleUnlocked,
  isLastLessonOfModule,
  moduleGateStates,
} from "@/lib/domain/quiz";
import { moduleHasQuiz } from "@/content/quizzes";
import { getVideoProvider } from "@/lib/video";
import { getCourseVideoAssetId } from "@/lib/data/admin";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  const lesson = course?.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.slug === lessonSlug);
  return { title: lesson ? lesson.title : "Clase" };
}

export default async function LessonPlayerPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) notFound();

  const profile = await requireAuthProfile(`/campus/${courseSlug}/${lessonSlug}`);

  // AUTORIZACIÓN server-side: sin enrollment activo, no hay acceso ni video.
  const hasAccess = await userHasCourseAccess(profile.id, course.id);
  if (!hasAccess) redirect(`/cursos/${course.slug}`);

  // Flatten con contexto de módulo para prev/next.
  const flat = course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ lesson: l, module: m }))
  );
  const index = flat.findIndex((f) => f.lesson.slug === lessonSlug);
  if (index === -1) notFound();

  const { lesson, module: currentModule } = flat[index];
  const prev = index > 0 ? flat[index - 1] : null;
  const next = index < flat.length - 1 ? flat[index + 1] : null;

  const [completedIds, progress, passedModuleIds] = await Promise.all([
    getCompletedLessonIds(profile.id, course.id),
    getCourseProgress(profile.id, course.id),
    getPassedModuleIds(profile.id, course.id),
  ]);

  // GATE: si el módulo de esta clase está bloqueado (evaluación previa no aprobada),
  // no se puede ver. Redirige al curso, que muestra qué evaluación falta.
  if (!isModuleUnlocked(course, currentModule.id, passedModuleIds)) {
    redirect(`/campus/${course.slug}?bloqueado=1`);
  }

  const gate = moduleGateStates(course, passedModuleIds);
  const lockedModuleIds = new Set(gate.filter((g) => !g.unlocked).map((g) => g.module.id));

  const navModules: LessonNavModule[] = course.modules.map((m) => ({
    id: m.id,
    order: m.order,
    title: m.title,
    locked: lockedModuleIds.has(m.id),
    passed: passedModuleIds.has(m.id),
    lessons: m.lessons.map((l) => ({
      id: l.id,
      slug: l.slug,
      title: l.title,
      order: l.order,
      completed: completedIds.has(l.id),
      current: l.id === lesson.id,
    })),
  }));

  // ¿Esta es la última clase del módulo y el módulo tiene evaluación?
  // Entonces "Siguiente" lleva a la evaluación en vez de saltar al módulo siguiente.
  const lastOfModule =
    isLastLessonOfModule(currentModule, lesson.id) && moduleHasQuiz(currentModule.id);
  const quizHref = `/campus/${course.slug}/evaluacion/${currentModule.id}`;

  // Fuente de video autorizada (el provider recibe el asset del curso, editable en Admin).
  const videoProvider = getVideoProvider();
  const assetId = (await getCourseVideoAssetId(course.id)) ?? course.videoAssetId;
  const source = await videoProvider.getPlaybackSource(assetId, course.coverImage);

  const isCompleted = completedIds.has(lesson.id);
  const sourceLabel =
    lesson.source === "both" ? "Video + PDF" : lesson.source === "pdf" ? "PDF" : "Video";

  return (
    <>
      <AppHeader profile={profile} />
      <main className="shell grid gap-8 py-8 lg:grid-cols-[320px_1fr]">
        {/* Sidebar / drawer */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <LessonNav
            courseSlug={course.slug}
            courseTitle={course.title}
            modules={navModules}
            percent={progress.percent}
          />
        </div>

        {/* Contenido principal */}
        <div className="min-w-0">
          <nav aria-label="Ruta" className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">
            <Link href="/dashboard" className="hover:text-gold-dark">Campus</Link>
            <span>/</span>
            <Link href={`/campus/${course.slug}`} className="hover:text-gold-dark">{course.title}</Link>
            <span>/</span>
            <span className="text-ink/60">Módulo {String(currentModule.order).padStart(2, "0")}</span>
          </nav>

          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full border border-gold/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark/80">
              {sourceLabel}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40">
              Clase {String(lesson.order).padStart(2, "0")}
            </span>
          </div>

          <h1 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-ink">
            {lesson.title}
          </h1>
          <p className="mt-3 max-w-2xl text-ink/70">{lesson.summary}</p>

          <div className="mt-6">
            <VideoPlayer source={source} title={lesson.title} />
          </div>

          {/* Qué vas a aprender */}
          {lesson.objectives.length > 0 && (
            <section className="mt-8 surface p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-dark/70">
                Qué vas a aprender
              </h2>
              <ul className="mt-4 space-y-2">
                {lesson.objectives.map((o, i) => (
                  <li key={i} className="flex gap-3 text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* En esta clase */}
          {lesson.highlights.length > 0 && (
            <section className="mt-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold-dark/70">
                En esta clase
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {lesson.highlights.map((h, i) => (
                  <span key={i} className="rounded-full border border-ink/10 bg-white/[0.03] px-3 py-1.5 text-sm text-ink/75">
                    {h}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Conceptos clave (contenido web derivado del material) */}
          <section className="mt-8">
            <h2 className="font-display text-2xl text-ink">Conceptos clave</h2>
            <div className="mt-5">
              <ContentBlocks blocks={lesson.content} />
            </div>
          </section>

          {/* Recursos */}
          {lesson.resources.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-2xl text-ink">Recursos</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {lesson.resources.map((r) => (
                  <div key={r.id} className="surface p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark/70">
                        {r.type}
                      </span>
                      {r.url && (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-ghost btn-sm"
                        >
                          Descargar
                        </a>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-lg text-ink">{r.title}</h3>
                    {r.body && (
                      <div className="mt-4">
                        <ContentBlocks blocks={r.body} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Completar + navegación */}
          <section className="mt-10 flex flex-col gap-6 border-t border-ink/10 pt-8">
            <div className="flex justify-center">
              <CompleteButton
                courseSlug={course.slug}
                lessonId={lesson.id}
                lessonSlug={lesson.slug}
                initialCompleted={isCompleted}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              {prev ? (
                <Link href={`/campus/${course.slug}/${prev.lesson.slug}`} className="btn-ghost btn-sm">
                  ← Anterior
                </Link>
              ) : (
                <span />
              )}
              {lastOfModule ? (
                <Link href={quizHref} className="btn-primary btn-sm">
                  Rendir evaluación del módulo →
                </Link>
              ) : next ? (
                <Link href={`/campus/${course.slug}/${next.lesson.slug}`} className="btn-primary btn-sm">
                  Siguiente →
                </Link>
              ) : (
                <Link href={`/campus/${course.slug}`} className="btn-primary btn-sm">
                  Volver al curso
                </Link>
              )}
            </div>
            {lastOfModule && (
              <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">
                Terminaste el módulo · rendí la evaluación para desbloquear el siguiente
              </p>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
