"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { isAdmin } from "@/lib/auth/session";
import {
  adminSetEnrollment,
  adminSetCourseStatus,
  adminSetCourseVideoAsset,
  adminSetLessonTimestamps,
} from "@/lib/data/admin";

async function ensureAdmin() {
  if (!(await isAdmin())) throw new Error("No autorizado");
}

const enrollmentSchema = z.object({
  userId: z.string().min(1),
  courseId: z.string().min(1),
  status: z.enum(["active", "revoked"]),
});

export async function updateEnrollment(input: z.infer<typeof enrollmentSchema>) {
  await ensureAdmin();
  const data = enrollmentSchema.parse(input);
  await adminSetEnrollment(data.userId, data.courseId, data.status);
  revalidatePath("/admin/alumnos");
  return { ok: true };
}

const statusSchema = z.object({
  courseId: z.string().min(1),
  status: z.enum(["draft", "published"]),
});

export async function updateCourseStatus(input: z.infer<typeof statusSchema>) {
  await ensureAdmin();
  const data = statusSchema.parse(input);
  await adminSetCourseStatus(data.courseId, data.status);
  revalidatePath("/admin/cursos");
  return { ok: true };
}

const assetSchema = z.object({
  courseId: z.string().min(1),
  assetId: z.string().trim().max(200),
});

export async function updateCourseVideoAsset(input: z.infer<typeof assetSchema>) {
  await ensureAdmin();
  const data = assetSchema.parse(input);
  await adminSetCourseVideoAsset(data.courseId, data.assetId || null);
  revalidatePath(`/admin/cursos/${data.courseId}`);
  return { ok: true };
}

const timestampSchema = z.object({
  lessonId: z.string().min(1),
  courseId: z.string().min(1),
  start: z.number().int().nonnegative().nullable(),
  end: z.number().int().nonnegative().nullable(),
});

export async function updateLessonTimestamps(input: z.infer<typeof timestampSchema>) {
  await ensureAdmin();
  const data = timestampSchema.parse(input);
  await adminSetLessonTimestamps(data.lessonId, data.start, data.end);
  revalidatePath(`/admin/cursos/${data.courseId}`);
  return { ok: true };
}
