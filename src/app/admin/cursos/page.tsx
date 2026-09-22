import type { Metadata } from "next";
import Link from "next/link";
import { COURSES, countLessons } from "@/content/courses";
import { getCourseStatus } from "@/lib/data/admin";
import { CourseStatusToggle } from "@/components/admin/course-status-toggle";
import { formatPrice } from "@/config/site.config";

export const metadata: Metadata = { title: "Admin · Cursos" };
export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const rows = await Promise.all(
    COURSES.map(async (c) => ({ course: c, status: await getCourseStatus(c.id) }))
  );

  return (
    <>
      <h1 className="font-display text-3xl text-ink">Cursos</h1>
      <p className="mt-2 text-ink/60">Administrá el estado y el contenido de cada curso.</p>

      <div className="mt-8 space-y-4">
        {rows.map(({ course, status }) => (
          <div key={course.id} className="surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-cream-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.coverImage} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <h2 className="font-display text-xl text-ink">{course.title}</h2>
                <p className="font-mono text-xs text-ink/50">
                  {course.modules.length} módulos · {countLessons(course)} clases · {formatPrice(course.priceArs)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CourseStatusToggle courseId={course.id} initialStatus={status} />
              <Link href={`/admin/cursos/${course.id}`} className="btn-ghost btn-sm">
                Administrar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
