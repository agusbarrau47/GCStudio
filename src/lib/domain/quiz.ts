import type {
  Course,
  CourseModule,
  PublicQuizQuestion,
  QuizGrade,
} from "@/lib/types";
import { getModuleQuiz, moduleHasQuiz } from "@/content/quizzes";

/**
 * Lógica PURA de evaluaciones y desbloqueo de módulos. Sin IO. Testeable.
 */

/** Preguntas seguras para el cliente (sin respuesta correcta ni explicación). */
export function publicQuestions(moduleId: string): PublicQuizQuestion[] {
  return getModuleQuiz(moduleId).map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
  }));
}

/**
 * Corrige la evaluación de un módulo. `answers` mapea questionId → índice elegido.
 * Aprueba solo si TODAS son correctas. Devuelve, por pregunta incorrecta, la
 * explicación y la clase a repasar.
 */
export function gradeQuiz(
  moduleId: string,
  answers: Record<string, number>
): QuizGrade {
  const questions = getModuleQuiz(moduleId);
  const results = questions.map((q) => {
    const chosen = answers[q.id];
    const correct = chosen === q.correctIndex;
    return {
      questionId: q.id,
      correct,
      explanation: q.explanation,
      revisitLessonSlug: q.revisitLessonSlug,
    };
  });
  const correctCount = results.filter((r) => r.correct).length;
  const total = questions.length;
  return {
    passed: total > 0 && correctCount === total,
    total,
    correctCount,
    results,
  };
}

/**
 * ¿Está desbloqueado el módulo? El primer módulo (con quiz) siempre lo está.
 * Un módulo se desbloquea cuando el módulo anterior tiene su evaluación aprobada.
 * Los módulos sin evaluación no bloquean (se consideran "abiertos").
 */
export function isModuleUnlocked(
  course: Course,
  moduleId: string,
  passedModuleIds: Set<string>
): boolean {
  const ordered = [...course.modules].sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((m) => m.id === moduleId);
  if (index <= 0) return true; // primer módulo o no encontrado → abierto
  // Buscar el módulo anterior que tenga evaluación; si ninguno la tiene, abierto.
  for (let i = index - 1; i >= 0; i--) {
    const prev = ordered[i];
    if (moduleHasQuiz(prev.id)) {
      return passedModuleIds.has(prev.id);
    }
  }
  return true;
}

export interface ModuleGateState {
  module: CourseModule;
  hasQuiz: boolean;
  unlocked: boolean;
  passed: boolean;
  /** Módulo que hay que aprobar para desbloquear este (si está bloqueado). */
  blockedByModuleId: string | null;
}

/** Estado de gate de todos los módulos del curso, en orden. */
export function moduleGateStates(
  course: Course,
  passedModuleIds: Set<string>
): ModuleGateState[] {
  const ordered = [...course.modules].sort((a, b) => a.order - b.order);
  return ordered.map((module, index) => {
    const unlocked = isModuleUnlocked(course, module.id, passedModuleIds);
    let blockedByModuleId: string | null = null;
    if (!unlocked) {
      for (let i = index - 1; i >= 0; i--) {
        if (moduleHasQuiz(ordered[i].id)) {
          blockedByModuleId = ordered[i].id;
          break;
        }
      }
    }
    return {
      module,
      hasQuiz: moduleHasQuiz(module.id),
      unlocked,
      passed: passedModuleIds.has(module.id),
      blockedByModuleId,
    };
  });
}

/** ¿Es la última clase del módulo? (para redirigir a la evaluación en vez de a la próxima clase) */
export function isLastLessonOfModule(module: CourseModule, lessonId: string): boolean {
  const ordered = [...module.lessons].sort((a, b) => a.order - b.order);
  return ordered.length > 0 && ordered[ordered.length - 1].id === lessonId;
}

/** Primer clase (slug) del módulo siguiente, o null si es el último módulo. */
export function nextModuleFirstLessonSlug(
  course: Course,
  moduleId: string
): string | null {
  const ordered = [...course.modules].sort((a, b) => a.order - b.order);
  const index = ordered.findIndex((m) => m.id === moduleId);
  const next = index >= 0 ? ordered[index + 1] : undefined;
  if (!next) return null;
  const firstLesson = [...next.lessons].sort((a, b) => a.order - b.order)[0];
  return firstLesson?.slug ?? null;
}
