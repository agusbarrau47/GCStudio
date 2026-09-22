import { describe, it, expect } from "vitest";
import { computeCourseProgress, findNextLesson } from "./progress";
import { getCourseById, allLessons, countLessons } from "@/content/courses";

const laminado = getCourseById("course-laminado")!;

describe("cálculo de progreso", () => {
  it("0% sin clases completadas", () => {
    const p = computeCourseProgress(laminado, new Set());
    expect(p.percent).toBe(0);
    expect(p.completedLessons).toBe(0);
    expect(p.totalLessons).toBe(countLessons(laminado));
  });

  it("100% con todas las clases completadas", () => {
    const ids = new Set(allLessons(laminado).map((l) => l.id));
    const p = computeCourseProgress(laminado, ids);
    expect(p.percent).toBe(100);
    expect(p.nextLessonSlug).toBeNull();
  });

  it("porcentaje redondeado según clases reales", () => {
    const lessons = allLessons(laminado);
    const half = new Set(lessons.slice(0, Math.floor(lessons.length / 2)).map((l) => l.id));
    const p = computeCourseProgress(laminado, half);
    const expected = Math.round((half.size / lessons.length) * 100);
    expect(p.percent).toBe(expected);
  });

  it("la próxima clase es la primera no completada en orden", () => {
    const lessons = allLessons(laminado);
    const done = new Set([lessons[0].id, lessons[1].id]);
    const next = findNextLesson(lessons, done);
    expect(next?.id).toBe(lessons[2].id);
  });

  it("continuar apunta a la próxima clase pendiente", () => {
    const lessons = allLessons(laminado);
    const done = new Set(lessons.slice(0, 3).map((l) => l.id));
    const p = computeCourseProgress(laminado, done);
    expect(p.nextLessonSlug).toBe(lessons[3].slug);
  });
});

describe("integridad de la estructura de cursos", () => {
  it("laminado tiene 5 módulos y 12 clases", () => {
    expect(laminado.modules.length).toBe(5);
    expect(countLessons(laminado)).toBe(12);
  });

  it("lifting tiene 4 módulos y 12 clases", () => {
    const lifting = getCourseById("course-lifting")!;
    expect(lifting.modules.length).toBe(4);
    expect(countLessons(lifting)).toBe(12);
  });

  it("todos los slugs de clase son únicos por curso", () => {
    for (const course of [laminado, getCourseById("course-lifting")!]) {
      const slugs = allLessons(course).map((l) => l.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });
});
