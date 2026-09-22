import { describe, it, expect } from "vitest";
import { canAccessCourse, accessibleCourseIds, coursesForProduct } from "./access";
import type { Enrollment } from "@/lib/types";

const enrollments: Enrollment[] = [
  { courseId: "course-laminado", status: "active", createdAt: "2026-01-01" },
  { courseId: "course-lifting", status: "revoked", createdAt: "2026-01-01" },
];

describe("access rules", () => {
  it("concede acceso solo con enrollment activo", () => {
    expect(canAccessCourse(enrollments, "course-laminado")).toBe(true);
  });

  it("niega acceso a curso con enrollment revocado", () => {
    expect(canAccessCourse(enrollments, "course-lifting")).toBe(false);
  });

  it("niega acceso a curso sin enrollment", () => {
    expect(canAccessCourse(enrollments, "course-inexistente")).toBe(false);
  });

  it("niega acceso con lista vacía (nunca por flag)", () => {
    expect(canAccessCourse([], "course-laminado")).toBe(false);
  });

  it("lista solo los cursos activos", () => {
    expect(accessibleCourseIds(enrollments)).toEqual(["course-laminado"]);
  });

  it("el bundle habilita ambos cursos", () => {
    expect(coursesForProduct("bundle-full")).toEqual([
      "course-laminado",
      "course-lifting",
    ]);
  });

  it("un curso se habilita a sí mismo", () => {
    expect(coursesForProduct("course-lifting")).toEqual(["course-lifting"]);
  });
});
