"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { QuizGrade } from "@/lib/types";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  userHasCourseAccess,
  setLessonCompleted,
  getPassedModuleIds,
  setModuleQuizPassed,
} from "@/lib/data/access";
import { getCourseBySlug } from "@/content/courses";
import { gradeQuiz, isModuleUnlocked, nextModuleFirstLessonSlug } from "@/lib/domain/quiz";
import { assertMockNotInProduction } from "@/lib/env";

const schema = z.object({
  courseSlug: z.string().min(1),
  lessonId: z.string().min(1),
  lessonSlug: z.string().min(1),
  completed: z.boolean(),
});

/** Marca/desmarca una clase como completada. Valida sesión y acceso server-side. */
export async function toggleLessonComplete(input: z.infer<typeof schema>) {
  assertMockNotInProduction();
  const data = schema.parse(input);

  const profile = await getCurrentProfile();
  if (!profile) return { ok: false, error: "No autenticado" };

  const course = getCourseBySlug(data.courseSlug);
  if (!course) return { ok: false, error: "Curso inexistente" };

  const hasAccess = await userHasCourseAccess(profile.id, course.id);
  if (!hasAccess) return { ok: false, error: "Sin acceso al curso" };

  // Validamos que la clase pertenezca al curso (evita manipular ids ajenos).
  const belongs = course.modules.some((m) =>
    m.lessons.some((l) => l.id === data.lessonId)
  );
  if (!belongs) return { ok: false, error: "Clase inválida" };

  await setLessonCompleted(profile.id, course.id, data.lessonId, data.completed);
  revalidatePath(`/campus/${data.courseSlug}`);
  revalidatePath(`/campus/${data.courseSlug}/${data.lessonSlug}`);
  return { ok: true };
}

const quizSchema = z.object({
  courseSlug: z.string().min(1),
  moduleId: z.string().min(1),
  // questionId → índice elegido
  answers: z.record(z.string(), z.number().int().nonnegative()),
});

export type SubmitQuizResult =
  | { ok: false; error: string }
  | { ok: true; grade: QuizGrade; nextLessonSlug: string | null };

/**
 * Corrige la evaluación de un módulo. La corrección ocurre SERVER-SIDE (las respuestas
 * correctas nunca viajan al cliente). Si aprueba, persiste el desbloqueo del módulo siguiente.
 */
export async function submitModuleQuiz(
  input: z.infer<typeof quizSchema>
): Promise<SubmitQuizResult> {
  assertMockNotInProduction();
  const data = quizSchema.parse(input);

  const profile = await getCurrentProfile();
  if (!profile) return { ok: false, error: "No autenticado" };

  const course = getCourseBySlug(data.courseSlug);
  if (!course) return { ok: false, error: "Curso inexistente" };

  const hasAccess = await userHasCourseAccess(profile.id, course.id);
  if (!hasAccess) return { ok: false, error: "Sin acceso al curso" };

  const targetModule = course.modules.find((m) => m.id === data.moduleId);
  if (!targetModule) return { ok: false, error: "Módulo inválido" };

  // El módulo debe estar desbloqueado para poder rendir su evaluación.
  const passed = await getPassedModuleIds(profile.id, course.id);
  if (!isModuleUnlocked(course, data.moduleId, passed)) {
    return { ok: false, error: "Módulo bloqueado" };
  }

  const grade = gradeQuiz(data.moduleId, data.answers);

  if (grade.passed) {
    await setModuleQuizPassed(profile.id, course.id, data.moduleId);
    revalidatePath(`/campus/${data.courseSlug}`);
    revalidatePath(`/campus/${data.courseSlug}/evaluacion/${data.moduleId}`);
  }

  return {
    ok: true,
    grade,
    nextLessonSlug: grade.passed
      ? nextModuleFirstLessonSlug(course, data.moduleId)
      : null,
  };
}
