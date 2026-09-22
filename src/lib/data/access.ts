import "server-only";
import type {
  CourseProgress,
  Enrollment,
  Purchase,
} from "@/lib/types";
import { isMockMode } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCourseById } from "@/content/courses";
import { computeCourseProgress } from "@/lib/domain/progress";
import { canAccessCourse } from "@/lib/domain/access";
import { mockStore } from "@/lib/data/mock-store";

/** Enrollments del usuario. */
export async function getEnrollments(userId: string): Promise<Enrollment[]> {
  if (isMockMode) return mockStore.getEnrollments(userId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("enrollments")
    .select("course_id, status, created_at")
    .eq("user_id", userId);

  return (data ?? []).map((e) => ({
    courseId: e.course_id,
    status: e.status,
    createdAt: e.created_at,
  }));
}

export async function userHasCourseAccess(
  userId: string,
  courseId: string
): Promise<boolean> {
  const enrollments = await getEnrollments(userId);
  return canAccessCourse(enrollments, courseId);
}

/** IDs de clases completadas por el usuario en un curso. */
export async function getCompletedLessonIds(
  userId: string,
  courseId: string
): Promise<Set<string>> {
  if (isMockMode) {
    const map = mockStore.getProgressMap(userId);
    const course = getCourseById(courseId);
    if (!course) return new Set();
    const courseLessonIds = new Set(
      course.modules.flatMap((m) => m.lessons.map((l) => l.id))
    );
    return new Set(
      [...map.values()]
        .filter((p) => p.completed && courseLessonIds.has(p.lessonId))
        .map((p) => p.lessonId)
    );
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return new Set();
  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_id, completed")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("completed", true);

  return new Set((data ?? []).map((r) => r.lesson_id));
}

export async function getCourseProgress(
  userId: string,
  courseId: string
): Promise<CourseProgress> {
  const course = getCourseById(courseId);
  if (!course) {
    return {
      courseId,
      totalLessons: 0,
      completedLessons: 0,
      percent: 0,
      nextLessonSlug: null,
      lastAccessedLessonSlug: null,
    };
  }
  const completed = await getCompletedLessonIds(userId, courseId);
  return computeCourseProgress(course, completed);
}

/** Marca/desmarca una clase como completada. Persiste progreso real. */
export async function setLessonCompleted(
  userId: string,
  courseId: string,
  lessonId: string,
  completed: boolean
): Promise<void> {
  if (isMockMode) {
    mockStore.setLessonProgress(userId, lessonId, completed);
    return;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  await supabase.from("lesson_progress").upsert(
    {
      user_id: userId,
      course_id: courseId,
      lesson_id: lessonId,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
      last_accessed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" }
  );
}

/** IDs de módulos con evaluación aprobada por el usuario en un curso. */
export async function getPassedModuleIds(
  userId: string,
  courseId: string
): Promise<Set<string>> {
  if (isMockMode) {
    const course = getCourseById(courseId);
    const courseModuleIds = new Set(course?.modules.map((m) => m.id) ?? []);
    return new Set(
      [...mockStore.getPassedModules(userId)].filter((id) => courseModuleIds.has(id))
    );
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return new Set();
  const { data } = await supabase
    .from("module_quiz_progress")
    .select("module_id, passed")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .eq("passed", true);

  return new Set((data ?? []).map((r) => r.module_id));
}

/** Marca la evaluación de un módulo como aprobada. Idempotente. */
export async function setModuleQuizPassed(
  userId: string,
  courseId: string,
  moduleId: string
): Promise<void> {
  if (isMockMode) {
    mockStore.setModulePassed(userId, moduleId);
    return;
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  await supabase.from("module_quiz_progress").upsert(
    {
      user_id: userId,
      course_id: courseId,
      module_id: moduleId,
      passed: true,
      passed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_id" }
  );
}

export async function getPurchases(userId: string): Promise<Purchase[]> {
  if (isMockMode) return mockStore.getPurchases(userId);

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("purchases")
    .select("id, user_id, status, amount_ars, provider, provider_ref, created_at, purchase_items(product_id, title, amount_ars)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  return (data ?? []).map((p) => ({
    id: p.id,
    userId: p.user_id,
    status: p.status,
    amountArs: p.amount_ars,
    provider: p.provider,
    providerRef: p.provider_ref,
    createdAt: p.created_at,
    items: (p.purchase_items ?? []).map((i: { product_id: string; title: string; amount_ars: number | null }) => ({
      productId: i.product_id,
      title: i.title,
      amountArs: i.amount_ars,
    })),
  }));
}
