import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { ModuleQuiz } from "@/components/module-quiz";
import { requireAuthProfile } from "@/lib/auth/guards";
import { getCourseBySlug, allLessons } from "@/content/courses";
import { userHasCourseAccess, getPassedModuleIds } from "@/lib/data/access";
import { isModuleUnlocked, publicQuestions } from "@/lib/domain/quiz";
import { moduleHasQuiz } from "@/content/quizzes";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; moduleId: string }>;
}): Promise<Metadata> {
  const { courseSlug, moduleId } = await params;
  const course = getCourseBySlug(courseSlug);
  const mod = course?.modules.find((m) => m.id === moduleId);
  return { title: mod ? `Evaluación · ${mod.title}` : "Evaluación" };
}

export default async function ModuleQuizPage({
  params,
}: {
  params: Promise<{ courseSlug: string; moduleId: string }>;
}) {
  const { courseSlug, moduleId } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) notFound();

  const targetModule = course.modules.find((m) => m.id === moduleId);
  if (!targetModule || !moduleHasQuiz(moduleId)) notFound();

  const profile = await requireAuthProfile(`/campus/${courseSlug}/evaluacion/${moduleId}`);

  const hasAccess = await userHasCourseAccess(profile.id, course.id);
  if (!hasAccess) redirect(`/cursos/${course.slug}`);

  // El módulo debe estar desbloqueado para rendir su evaluación.
  const passedModuleIds = await getPassedModuleIds(profile.id, course.id);
  if (!isModuleUnlocked(course, moduleId, passedModuleIds)) {
    redirect(`/campus/${course.slug}?bloqueado=1`);
  }

  const questions = publicQuestions(moduleId);
  const alreadyPassed = passedModuleIds.has(moduleId);

  // Mapa slug → título para los enlaces de repaso.
  const lessonTitles: Record<string, string> = {};
  allLessons(course).forEach((l) => {
    lessonTitles[l.slug] = l.title;
  });

  return (
    <>
      <AppHeader profile={profile} />
      <main className="shell max-w-3xl py-10">
        <nav aria-label="Ruta" className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">
          <Link href="/dashboard" className="hover:text-gold-dark">Campus</Link>
          <span>/</span>
          <Link href={`/campus/${course.slug}`} className="hover:text-gold-dark">{course.title}</Link>
          <span>/</span>
          <span className="text-ink/60">Evaluación</span>
        </nav>

        <div className="mt-4">
          <span className="rounded-full border border-gold/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark/80">
            Módulo {String(targetModule.order).padStart(2, "0")}
          </span>
        </div>
        <h1 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight text-ink">
          Evaluación · {targetModule.title}
        </h1>
        <p className="mt-3 text-ink/70">
          Respondé para confirmar lo que viste en el módulo. Necesitás acertar todas para
          desbloquear el módulo siguiente. Si te equivocás, te sugerimos qué clase repasar.
        </p>

        {alreadyPassed && (
          <p className="mt-4 rounded-xl border border-gold/40 bg-gold/[0.06] px-4 py-3 text-sm text-ink/80">
            Ya aprobaste esta evaluación. Podés volver a rendirla para repasar; el módulo
            siguiente ya está desbloqueado.
          </p>
        )}

        <div className="mt-8">
          <ModuleQuiz
            courseSlug={course.slug}
            moduleId={moduleId}
            moduleTitle={targetModule.title}
            questions={questions}
            lessonTitles={lessonTitles}
          />
        </div>
      </main>
    </>
  );
}
