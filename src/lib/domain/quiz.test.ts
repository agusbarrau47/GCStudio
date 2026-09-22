import { describe, it, expect } from "vitest";
import {
  gradeQuiz,
  isModuleUnlocked,
  moduleGateStates,
  publicQuestions,
  isLastLessonOfModule,
  nextModuleFirstLessonSlug,
} from "./quiz";
import { getCourseById } from "@/content/courses";
import { getModuleQuiz } from "@/content/quizzes";

const laminado = getCourseById("course-laminado")!;

function correctAnswers(moduleId: string): Record<string, number> {
  const ans: Record<string, number> = {};
  getModuleQuiz(moduleId).forEach((q) => (ans[q.id] = q.correctIndex));
  return ans;
}

describe("preguntas públicas (seguras para el cliente)", () => {
  it("no exponen la respuesta correcta ni la explicación", () => {
    const pub = publicQuestions("mod-lam-01");
    expect(pub.length).toBeGreaterThan(0);
    pub.forEach((q) => {
      expect(q).not.toHaveProperty("correctIndex");
      expect(q).not.toHaveProperty("explanation");
      expect(Array.isArray(q.options)).toBe(true);
    });
  });
});

describe("corrección de la evaluación", () => {
  it("aprueba solo si TODAS las respuestas son correctas", () => {
    const grade = gradeQuiz("mod-lam-01", correctAnswers("mod-lam-01"));
    expect(grade.passed).toBe(true);
    expect(grade.correctCount).toBe(grade.total);
  });

  it("no aprueba con una respuesta incorrecta y devuelve la clase a repasar", () => {
    const answers = correctAnswers("mod-lam-01");
    const firstQ = getModuleQuiz("mod-lam-01")[0];
    // Forzamos una respuesta incorrecta en la primera pregunta.
    answers[firstQ.id] = (firstQ.correctIndex + 1) % firstQ.options.length;
    const grade = gradeQuiz("mod-lam-01", answers);
    expect(grade.passed).toBe(false);
    const wrong = grade.results.find((r) => r.questionId === firstQ.id)!;
    expect(wrong.correct).toBe(false);
    expect(wrong.revisitLessonSlug).toBe(firstQ.revisitLessonSlug);
    expect(wrong.explanation.length).toBeGreaterThan(0);
  });

  it("una respuesta faltante cuenta como incorrecta", () => {
    const grade = gradeQuiz("mod-lam-01", {});
    expect(grade.passed).toBe(false);
    expect(grade.correctCount).toBe(0);
  });
});

describe("desbloqueo de módulos", () => {
  it("el primer módulo siempre está desbloqueado", () => {
    expect(isModuleUnlocked(laminado, "mod-lam-01", new Set())).toBe(true);
  });

  it("el segundo módulo está bloqueado hasta aprobar el primero", () => {
    expect(isModuleUnlocked(laminado, "mod-lam-02", new Set())).toBe(false);
    expect(isModuleUnlocked(laminado, "mod-lam-02", new Set(["mod-lam-01"]))).toBe(true);
  });

  it("el gate marca bloqueado el módulo cuyo anterior no fue aprobado", () => {
    const states = moduleGateStates(laminado, new Set(["mod-lam-01"]));
    const mod2 = states.find((s) => s.module.id === "mod-lam-02")!;
    const mod3 = states.find((s) => s.module.id === "mod-lam-03")!;
    expect(mod2.unlocked).toBe(true);
    expect(mod3.unlocked).toBe(false);
    expect(mod3.blockedByModuleId).toBe("mod-lam-02");
  });
});

describe("navegación de módulos", () => {
  it("detecta la última clase de un módulo", () => {
    const mod1 = laminado.modules.find((m) => m.id === "mod-lam-01")!;
    const last = mod1.lessons[mod1.lessons.length - 1];
    const first = mod1.lessons[0];
    expect(isLastLessonOfModule(mod1, last.id)).toBe(true);
    expect(isLastLessonOfModule(mod1, first.id)).toBe(false);
  });

  it("devuelve la primera clase del módulo siguiente", () => {
    const slug = nextModuleFirstLessonSlug(laminado, "mod-lam-01");
    const mod2First = laminado.modules.find((m) => m.id === "mod-lam-02")!.lessons[0];
    expect(slug).toBe(mod2First.slug);
  });

  it("devuelve null en el último módulo", () => {
    expect(nextModuleFirstLessonSlug(laminado, "mod-lam-05")).toBeNull();
  });
});

describe("integridad del banco de preguntas", () => {
  it("cada módulo de ambos cursos tiene evaluación con respuestas válidas", () => {
    for (const course of [laminado, getCourseById("course-lifting")!]) {
      for (const m of course.modules) {
        const quiz = getModuleQuiz(m.id);
        expect(quiz.length).toBeGreaterThan(0);
        for (const q of quiz) {
          expect(q.correctIndex).toBeGreaterThanOrEqual(0);
          expect(q.correctIndex).toBeLessThan(q.options.length);
          // La clase a repasar existe dentro del curso.
          const exists = course.modules.some((mm) =>
            mm.lessons.some((l) => l.slug === q.revisitLessonSlug)
          );
          expect(exists).toBe(true);
        }
      }
    }
  });
});
