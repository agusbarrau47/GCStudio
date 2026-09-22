// Tipos de dominio de GCStudio. Compartidos por el modo mock y el modo Supabase.

export type Role = "student" | "admin";

/** Pregunta de la evaluación de un módulo (multiple choice, opción única). */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  /** Índice de la opción correcta. Solo server-side: nunca se envía al cliente sin responder. */
  correctIndex: number;
  /** Explicación que se muestra al responder (correcto o incorrecto). */
  explanation: string;
  /** slug de la clase a repasar si la respuesta es incorrecta. */
  revisitLessonSlug: string;
}

/** Versión de una pregunta segura para el cliente (sin la respuesta correcta). */
export interface PublicQuizQuestion {
  id: string;
  question: string;
  options: string[];
}

/** Resultado de corregir una pregunta. */
export interface QuizQuestionResult {
  questionId: string;
  correct: boolean;
  explanation: string;
  revisitLessonSlug: string;
}

/** Resultado de corregir una evaluación de módulo. */
export interface QuizGrade {
  passed: boolean;
  total: number;
  correctCount: number;
  results: QuizQuestionResult[];
}

/** Estado de aprobación de la evaluación de un módulo por un alumno. */
export interface ModuleQuizProgress {
  moduleId: string;
  passed: boolean;
  passedAt: string | null;
}

export type CourseStatus = "draft" | "published";

export type EnrollmentStatus = "active" | "revoked" | "none";

export type PurchaseStatus =
  | "pending"
  | "paid"
  | "rejected"
  | "cancelled"
  | "refunded";

export type ResourceType = "pdf" | "checklist" | "guide" | "table" | "link";

export interface LessonResource {
  id: string;
  title: string;
  type: ResourceType;
  /** URL relativa (assets) o externa. Puede ser null si el recurso es contenido embebido. */
  url: string | null;
  /** Contenido web derivado del material (listas, pasos, tablas) para renderizar en la clase. */
  body?: ContentBlock[];
}

/** Bloques de contenido web derivados del PDF (no solo descarga). */
export type ContentBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; title?: string; items: string[] }
  | { kind: "steps"; title?: string; items: string[] }
  | { kind: "table"; title?: string; headers: string[]; rows: string[][] }
  | { kind: "callout"; tone: "info" | "warning" | "gold"; title?: string; text: string };

export interface Lesson {
  id: string;
  slug: string;
  moduleId: string;
  order: number;
  title: string;
  summary: string;
  /** "Qué vas a aprender" — objetivos concretos. */
  objectives: string[];
  /** "En esta clase" — bullets de contenido. */
  highlights: string[];
  /** Conceptos clave / contenido web derivado del material real. */
  content: ContentBlock[];
  /** Origen del contenido (trazabilidad pedagógica). */
  source: "video" | "pdf" | "both";
  resources: LessonResource[];
  /** Timestamps por clase dentro del video del curso. NO CONFIRMADO: se cargan desde Admin. */
  videoStartSeconds: number | null;
  videoEndSeconds: number | null;
}

export interface CourseModule {
  id: string;
  courseId: string;
  order: number;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  status: CourseStatus;
  /** Duración real del video del curso, en segundos (medida con ffprobe). */
  videoDurationSeconds: number;
  /** Identificador del asset de video en el proveedor (Cloudflare Stream, etc.). */
  videoAssetId: string | null;
  coverImage: string;
  heroImage: string;
  /** Precio en la moneda de site.config. null = FALTANTE (no inventado). */
  priceArs: number | null;
  outcomes: string[];
  audience: string[];
  modules: CourseModule[];
}

export interface Profile {
  id: string;
  email: string;
  fullName: string | null;
  role: Role;
  createdAt: string;
}

export interface Enrollment {
  courseId: string;
  status: EnrollmentStatus;
  createdAt: string;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt: string | null;
}

export interface CourseProgress {
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  percent: number;
  /** slug de la próxima clase a ver (continuar). */
  nextLessonSlug: string | null;
  lastAccessedLessonSlug: string | null;
}

export interface Purchase {
  id: string;
  userId: string;
  status: PurchaseStatus;
  amountArs: number | null;
  provider: string;
  providerRef: string | null;
  createdAt: string;
  items: PurchaseItem[];
}

export interface PurchaseItem {
  /** courseId o "bundle-full" */
  productId: string;
  title: string;
  amountArs: number | null;
}
