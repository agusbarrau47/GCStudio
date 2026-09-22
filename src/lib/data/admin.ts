import "server-only";
import { isMockMode } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { COURSES } from "@/content/courses";
import {
  mockStore,
  MOCK_PROFILE_STUDENT,
} from "@/lib/data/mock-store";
import type { CourseStatus } from "@/lib/types";

export interface AdminStudent {
  id: string;
  email: string;
  fullName: string | null;
  role: string;
  createdAt: string;
  activeCourseIds: string[];
}

export interface AdminOverview {
  students: number;
  activeEnrollments: number;
  paidPurchases: number;
  publishedCourses: number;
}

/* --------------------------- OVERLAY OPERACIONAL --------------------------- */
/**
 * Campos mutables por Admin que se superponen a la estructura de content/courses.ts:
 * estado (publicado), video asset id y timestamps por clase. Persisten en DB.
 */
export async function getCourseVideoAssetId(courseId: string): Promise<string | null> {
  if (isMockMode) {
    return COURSES.find((c) => c.id === courseId)?.videoAssetId ?? null;
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("courses")
    .select("video_asset_id")
    .eq("id", courseId)
    .single();
  return data?.video_asset_id ?? null;
}

export async function getCourseStatus(courseId: string): Promise<CourseStatus> {
  if (isMockMode) {
    return COURSES.find((c) => c.id === courseId)?.status ?? "draft";
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return "draft";
  const { data } = await supabase
    .from("courses")
    .select("status")
    .eq("id", courseId)
    .single();
  return (data?.status as CourseStatus) ?? "draft";
}

/* --------------------------------- READS --------------------------------- */

export async function getAdminOverview(): Promise<AdminOverview> {
  if (isMockMode) {
    const students = 1;
    const active = mockStore.getEnrollments(MOCK_PROFILE_STUDENT.id).filter((e) => e.status === "active").length;
    const paid = mockStore.getPurchases(MOCK_PROFILE_STUDENT.id).filter((p) => p.status === "paid").length;
    return {
      students,
      activeEnrollments: active,
      paidPurchases: paid,
      publishedCourses: COURSES.filter((c) => c.status === "published").length,
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { students: 0, activeEnrollments: 0, paidPurchases: 0, publishedCourses: 0 };
  }

  const [students, enrollments, purchases, courses] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("enrollments").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("purchases").select("id", { count: "exact", head: true }).eq("status", "paid"),
    supabase.from("courses").select("id", { count: "exact", head: true }).eq("status", "published"),
  ]);

  return {
    students: students.count ?? 0,
    activeEnrollments: enrollments.count ?? 0,
    paidPurchases: purchases.count ?? 0,
    publishedCourses: courses.count ?? 0,
  };
}

export async function listStudents(): Promise<AdminStudent[]> {
  if (isMockMode) {
    const active = mockStore
      .getEnrollments(MOCK_PROFILE_STUDENT.id)
      .filter((e) => e.status === "active")
      .map((e) => e.courseId);
    return [
      {
        id: MOCK_PROFILE_STUDENT.id,
        email: MOCK_PROFILE_STUDENT.email,
        fullName: MOCK_PROFILE_STUDENT.fullName,
        role: MOCK_PROFILE_STUDENT.role,
        createdAt: MOCK_PROFILE_STUDENT.createdAt,
        activeCourseIds: active,
      },
    ];
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: false });

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("user_id, course_id, status")
    .eq("status", "active");

  const byUser = new Map<string, string[]>();
  (enrollments ?? []).forEach((e) => {
    const arr = byUser.get(e.user_id) ?? [];
    arr.push(e.course_id);
    byUser.set(e.user_id, arr);
  });

  return (profiles ?? []).map((p) => ({
    id: p.id,
    email: p.email,
    fullName: p.full_name,
    role: p.role,
    createdAt: p.created_at,
    activeCourseIds: byUser.get(p.id) ?? [],
  }));
}

/* -------------------------------- WRITES --------------------------------- */

export async function adminSetEnrollment(
  userId: string,
  courseId: string,
  status: "active" | "revoked"
): Promise<void> {
  if (isMockMode) {
    mockStore.setEnrollment(userId, courseId, status);
    return;
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  await supabase.from("enrollments").upsert(
    { user_id: userId, course_id: courseId, status },
    { onConflict: "user_id,course_id" }
  );
}

export async function adminSetCourseStatus(
  courseId: string,
  status: CourseStatus
): Promise<void> {
  if (isMockMode) {
    const c = COURSES.find((x) => x.id === courseId);
    if (c) c.status = status; // en memoria (dev)
    return;
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  await supabase.from("courses").update({ status }).eq("id", courseId);
}

export async function adminSetCourseVideoAsset(
  courseId: string,
  assetId: string | null
): Promise<void> {
  if (isMockMode) {
    const c = COURSES.find((x) => x.id === courseId);
    if (c) c.videoAssetId = assetId;
    return;
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  await supabase.from("courses").update({ video_asset_id: assetId }).eq("id", courseId);
}

export async function adminSetLessonTimestamps(
  lessonId: string,
  start: number | null,
  end: number | null
): Promise<void> {
  if (isMockMode) return; // en dev no persiste; requiere Supabase
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  await supabase
    .from("lessons")
    .update({ video_start_seconds: start, video_end_seconds: end })
    .eq("id", lessonId);
}
