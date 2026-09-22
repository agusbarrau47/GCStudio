import type { Enrollment, LessonProgress, Purchase, Profile } from "@/lib/types";
import { COURSES, allLessons } from "@/content/courses";

/**
 * Almacén en memoria para MODO DESARROLLO/MOCK únicamente.
 * Permite visualizar dashboard, campus, player, progreso y admin sin base de datos.
 * En producción con Supabase configurado, esta capa no se usa (ver lib/data/*).
 *
 * El estado vive en el proceso del server de desarrollo; se reinicia al reiniciar.
 */

export const MOCK_USER_ID = "mock-student-0001";

export const MOCK_PROFILE_STUDENT: Profile = {
  id: MOCK_USER_ID,
  email: "alumna@demo.gcstudio",
  fullName: "Alumna Demo",
  role: "student",
  createdAt: "2026-01-10T12:00:00.000Z",
};

export const MOCK_PROFILE_ADMIN: Profile = {
  id: "mock-admin-0001",
  email: "geraldine@demo.gcstudio",
  fullName: "Geraldine Colman",
  role: "admin",
  createdAt: "2026-01-01T12:00:00.000Z",
};

// El estado mock se ancla a globalThis para compartirse entre bundles/módulos
// (Next duplica módulos entre RSC y route handlers; sin esto el estado no se ve).
type MockState = {
  enrollments: Map<string, Enrollment[]>;
  progress: Map<string, Map<string, LessonProgress>>;
  purchases: Map<string, Purchase[]>;
  /** userId → set de moduleIds con evaluación aprobada. */
  moduleQuiz: Map<string, Set<string>>;
};

const g = globalThis as unknown as { __gcMockState?: MockState };

function seed(): MockState {
  // Enrollment demo: Laminado ACTIVO, Lifting SIN ACCESO (demuestra el gating).
  const enrollments = new Map<string, Enrollment[]>();
  enrollments.set(MOCK_USER_ID, [
    { courseId: "course-laminado", status: "active", createdAt: "2026-01-11T10:00:00.000Z" },
  ]);

  // Progreso demo del Laminado: 8 de 12 clases completas → 67%.
  const progress = new Map<string, Map<string, LessonProgress>>();
  const laminado = COURSES.find((c) => c.id === "course-laminado")!;
  const userMap = new Map<string, LessonProgress>();
  allLessons(laminado)
    .slice(0, 8)
    .forEach((l) => {
      userMap.set(l.id, {
        lessonId: l.id,
        completed: true,
        completedAt: "2026-02-01T10:00:00.000Z",
      });
    });
  progress.set(MOCK_USER_ID, userMap);

  const purchases = new Map<string, Purchase[]>();
  purchases.set(MOCK_USER_ID, [
    {
      id: "mock-purchase-0001",
      userId: MOCK_USER_ID,
      status: "paid",
      amountArs: null,
      provider: "mock",
      providerRef: "demo",
      createdAt: "2026-01-11T09:59:00.000Z",
      items: [{ productId: "course-laminado", title: "Laminado de Cejas", amountArs: null }],
    },
  ]);

  // Evaluaciones demo: las 3 primeras módulos del Laminado aprobados (coherente con 8/12 clases).
  // Deja el Módulo 04 desbloqueado y sin aprobar, y el Módulo 05 bloqueado (muestra el gate).
  const moduleQuiz = new Map<string, Set<string>>();
  moduleQuiz.set(MOCK_USER_ID, new Set(["mod-lam-01", "mod-lam-02", "mod-lam-03"]));

  return { enrollments, progress, purchases, moduleQuiz };
}

function getValidState(): MockState {
  if (!g.__gcMockState) {
    g.__gcMockState = seed();
  }
  const s = g.__gcMockState;
  if (!s.enrollments) s.enrollments = new Map();
  if (!s.progress) s.progress = new Map();
  if (!s.purchases) s.purchases = new Map();
  if (!s.moduleQuiz) {
    s.moduleQuiz = new Map();
    s.moduleQuiz.set(MOCK_USER_ID, new Set(["mod-lam-01", "mod-lam-02", "mod-lam-03"]));
  }
  return s;
}

export const mockStore = {
  getEnrollments(userId: string): Enrollment[] {
    const s = getValidState();
    return s.enrollments.get(userId) ?? [];
  },
  setEnrollment(userId: string, courseId: string, status: Enrollment["status"]) {
    const s = getValidState();
    const list = s.enrollments.get(userId) ?? [];
    const existing = list.find((e) => e.courseId === courseId);
    if (existing) {
      existing.status = status;
    } else {
      list.push({ courseId, status, createdAt: new Date().toISOString() });
    }
    s.enrollments.set(userId, list);
  },
  getProgressMap(userId: string): Map<string, LessonProgress> {
    const s = getValidState();
    if (!s.progress.has(userId)) s.progress.set(userId, new Map());
    return s.progress.get(userId)!;
  },
  setLessonProgress(userId: string, lessonId: string, completed: boolean) {
    const map = this.getProgressMap(userId);
    map.set(lessonId, {
      lessonId,
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    });
  },
  getPurchases(userId: string): Purchase[] {
    const s = getValidState();
    return s.purchases.get(userId) ?? [];
  },
  addPurchase(p: Purchase) {
    const s = getValidState();
    const list = s.purchases.get(p.userId) ?? [];
    list.unshift(p);
    s.purchases.set(p.userId, list);
  },
  getPassedModules(userId: string): Set<string> {
    const s = getValidState();
    if (!s.moduleQuiz.has(userId)) s.moduleQuiz.set(userId, new Set());
    return s.moduleQuiz.get(userId)!;
  },
  setModulePassed(userId: string, moduleId: string) {
    this.getPassedModules(userId).add(moduleId);
  },
};
