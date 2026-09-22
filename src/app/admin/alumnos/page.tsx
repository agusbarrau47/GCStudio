import type { Metadata } from "next";
import { listStudents } from "@/lib/data/admin";
import { COURSES } from "@/content/courses";
import { EnrollmentToggle } from "@/components/admin/enrollment-toggle";

export const metadata: Metadata = { title: "Admin · Alumnos" };
export const dynamic = "force-dynamic";

export default async function AdminStudentsPage() {
  const students = await listStudents();

  return (
    <>
      <h1 className="font-display text-3xl text-ink">Alumnos</h1>
      <p className="mt-2 text-ink/60">
        {students.length} {students.length === 1 ? "alumno" : "alumnos"}. Gestioná el acceso por curso.
      </p>

      {students.length === 0 ? (
        <div className="mt-8 surface p-8 text-center text-ink/60">
          Todavía no hay alumnos registrados.
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {students.map((s) => (
            <div key={s.id} className="surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/20 font-mono text-sm text-gold-dark">
                    {(s.fullName ?? s.email).slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-ink">{s.fullName ?? "—"}</p>
                    <p className="font-mono text-xs text-ink/50">{s.email}</p>
                  </div>
                </div>
                {s.role === "admin" && (
                  <span className="rounded-full bg-blush/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-blush">
                    Admin
                  </span>
                )}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {COURSES.map((c) => (
                  <EnrollmentToggle
                    key={c.id}
                    userId={s.id}
                    courseId={c.id}
                    courseTitle={c.title}
                    initialActive={s.activeCourseIds.includes(c.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
