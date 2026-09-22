import type { Enrollment } from "@/lib/types";

/**
 * Reglas PURAS de acceso. Sin IO. Testeable.
 * Un usuario accede a un curso si tiene un enrollment ACTIVO para ese curso.
 * El acceso NUNCA se deriva de un flag booleano en el usuario.
 */
export function canAccessCourse(
  enrollments: Enrollment[],
  courseId: string
): boolean {
  return enrollments.some((e) => e.courseId === courseId && e.status === "active");
}

/** Cursos a los que el usuario tiene acceso activo. */
export function accessibleCourseIds(enrollments: Enrollment[]): string[] {
  return enrollments.filter((e) => e.status === "active").map((e) => e.courseId);
}

/**
 * Expande un producto comprado a los cursos que habilita.
 * El bundle habilita ambos cursos; un curso se habilita a sí mismo.
 */
export function coursesForProduct(productId: string): string[] {
  if (productId === "bundle-full") return ["course-laminado", "course-lifting"];
  return [productId];
}
