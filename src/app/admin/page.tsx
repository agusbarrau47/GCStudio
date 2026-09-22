import type { Metadata } from "next";
import Link from "next/link";
import { getAdminOverview } from "@/lib/data/admin";
import { COURSES } from "@/content/courses";

export const metadata: Metadata = { title: "Admin · Resumen" };
export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const overview = await getAdminOverview();

  const stats = [
    { k: "Alumnos", v: overview.students },
    { k: "Enrollments activos", v: overview.activeEnrollments },
    { k: "Compras pagadas", v: overview.paidPurchases },
    { k: "Cursos publicados", v: overview.publishedCourses },
  ];

  return (
    <>
      <h1 className="font-display text-3xl text-ink">Resumen</h1>
      <p className="mt-2 text-ink/60">Estado general de la plataforma.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.k} className="surface p-6">
            <p className="font-display text-4xl text-gold-dark">{s.v}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
              {s.k}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Link href="/admin/cursos" className="surface p-6 transition-transform hover:-translate-y-1">
          <h2 className="font-display text-xl text-ink">Cursos</h2>
          <p className="mt-2 text-sm text-ink/60">
            Publicar/despublicar, cargar video y timestamps por clase.
          </p>
          <p className="mt-3 font-mono text-xs text-gold-dark/70">{COURSES.length} cursos →</p>
        </Link>
        <Link href="/admin/alumnos" className="surface p-6 transition-transform hover:-translate-y-1">
          <h2 className="font-display text-xl text-ink">Alumnos</h2>
          <p className="mt-2 text-sm text-ink/60">
            Ver alumnos y administrar sus enrollments por curso.
          </p>
          <p className="mt-3 font-mono text-xs text-gold-dark/70">Gestionar accesos →</p>
        </Link>
      </div>
    </>
  );
}
