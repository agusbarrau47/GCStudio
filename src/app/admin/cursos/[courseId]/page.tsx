import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseById, countLessons } from "@/content/courses";
import { getCourseStatus, getCourseVideoAssetId } from "@/lib/data/admin";
import { CourseStatusToggle } from "@/components/admin/course-status-toggle";
import { VideoAssetForm } from "@/components/admin/video-asset-form";
import { LessonTimestampForm } from "@/components/admin/lesson-timestamp-form";
import { formatDuration } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Curso" };
export const dynamic = "force-dynamic";

export default async function AdminCourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourseById(courseId);
  if (!course) notFound();

  const [status, assetId] = await Promise.all([
    getCourseStatus(course.id),
    getCourseVideoAssetId(course.id),
  ]);

  return (
    <>
      <Link href="/admin/cursos" className="link-nav">
        ← Cursos
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink">{course.title}</h1>
          <p className="mt-1 font-mono text-xs text-ink/50">
            {course.modules.length} módulos · {countLessons(course)} clases · video {formatDuration(course.videoDurationSeconds)}
          </p>
        </div>
        <CourseStatusToggle courseId={course.id} initialStatus={status} />
      </div>

      {/* Video del curso */}
      <section className="mt-8 surface p-6">
        <h2 className="font-display text-xl text-ink">Video del curso</h2>
        <p className="mt-1 text-sm text-ink/60">
          Pegá el UID del video ya subido a Cloudflare Stream. Se usa para todas las clases del curso.
        </p>
        <div className="mt-4">
          <VideoAssetForm courseId={course.id} initialAssetId={assetId} />
        </div>
      </section>

      {/* Módulos y clases con timestamps */}
      <section className="mt-8">
        <h2 className="font-display text-xl text-ink">Módulos y clases</h2>
        <p className="mt-1 text-sm text-ink/60">
          Cargá los segundos de inicio/fin de cada clase dentro del video del curso
          (opcional; el material no trae cortes, se completa viendo el video).
        </p>
        <div className="mt-5 space-y-4">
          {course.modules.map((m) => (
            <div key={m.id} className="surface overflow-hidden">
              <div className="border-b border-ink/10 px-5 py-3">
                <span className="font-mono text-xs text-gold-dark/70">
                  Módulo {String(m.order).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg text-ink">{m.title}</h3>
              </div>
              <ul className="divide-y divide-white/[0.06]">
                {m.lessons.map((l) => (
                  <li key={l.id} className="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                    <span className="text-sm text-ink/85">
                      <span className="mr-2 font-mono text-xs text-ink/40">
                        {String(l.order).padStart(2, "0")}
                      </span>
                      {l.title}
                    </span>
                    <LessonTimestampForm
                      lessonId={l.id}
                      courseId={course.id}
                      initialStart={l.videoStartSeconds}
                      initialEnd={l.videoEndSeconds}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
