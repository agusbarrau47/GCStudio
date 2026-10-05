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
import { adminSetPricing } from "@/lib/data/pricing";
import { adminUpsertProduct, adminDeleteProduct } from "@/lib/data/products";

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


const priceVal = z.number().int().nonnegative().nullable();
const pricingSchema = z
  .object({
    laminadoOnline: priceVal,
    liftingOnline: priceVal,
    bundleOnline: priceVal,
    laminadoPresencial: priceVal,
    liftingPresencial: priceVal,
    bundlePresencial: priceVal,
  })
  .partial();

export async function updatePricing(input: z.infer<typeof pricingSchema>) {
  await ensureAdmin();
  const data = pricingSchema.parse(input);
  await adminSetPricing(data);
  revalidatePath("/");
  revalidatePath("/cursos");
  revalidatePath("/admin/precios");
  revalidatePath("/admin/cursos");
  return { ok: true };
}


const productSchema = z.object({
  id: z.string().trim().optional(),
  slug: z.string().trim().min(1, "Slug requerido").regex(/^[a-z0-9-]+$/, "Slug: solo minúsculas, números y guiones"),
  name: z.string().trim().min(1),
  category: z.string().trim().min(1),
  priceArs: z.number().int().nonnegative().nullable(),
  image: z.string().trim().nullable(),
  badge: z.string().trim().nullable(),
  shortDesc: z.string().trim().nullable(),
  description: z.string().trim().nullable(),
  benefits: z.array(z.string().trim()).max(12),
  howToUse: z.string().trim().nullable(),
  anmatApproved: z.boolean(),
  stock: z.boolean(),
  active: z.boolean(),
  position: z.number().int().nonnegative(),
});

export async function upsertProduct(input: z.infer<typeof productSchema>) {
  await ensureAdmin();
  const data = productSchema.parse(input);
  await adminUpsertProduct(data);
  revalidatePath("/");
  revalidatePath("/productos");
  revalidatePath("/admin/productos");
  return { ok: true };
}

export async function deleteProduct(id: string) {
  await ensureAdmin();
  if (!id || !id.trim()) throw new Error("id requerido");
  await adminDeleteProduct(id.trim());
  revalidatePath("/");
  revalidatePath("/productos");
  revalidatePath("/admin/productos");
  return { ok: true };
}
