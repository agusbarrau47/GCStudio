import type { Course, CourseProgress, Lesson } from "@/lib/types";
import { allLessons } from "@/content/courses";

/**
 * Cálculo PURO del progreso de un curso. Sin IO. Testeable.
 * El porcentaje se basa en clases reales completadas.
 */
export function computeCourseProgress(
  course: Course,
  completedLessonIds: Set<string>,
  lastAccessedLessonId?: string | null
): CourseProgress {
  const lessons = allLessons(course);
  const total = lessons.length;
  const completed = lessons.filter((l) => completedLessonIds.has(l.id)).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const nextLesson = findNextLesson(lessons, completedLessonIds);
  const lastAccessed = lastAccessedLessonId
    ? lessons.find((l) => l.id === lastAccessedLessonId) ?? null
    : null;

  return {
    courseId: course.id,
    totalLessons: total,
    completedLessons: completed,
    percent,
    nextLessonSlug: nextLesson?.slug ?? null,
    lastAccessedLessonSlug: lastAccessed?.slug ?? null,
  };
}

/**
 * La próxima clase para "Continuar": la primera no completada en orden.
 * Si todas están completas, devuelve null.
 */
export function findNextLesson(
  lessons: Lesson[],
  completedLessonIds: Set<string>
): Lesson | null {
  for (const lesson of lessons) {
    if (!completedLessonIds.has(lesson.id)) return lesson;
  }
  return null;
}
