import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { requireAdminProfile } from "@/lib/auth/guards";
import { isMockMode } from "@/lib/env";

export const dynamic = "force-dynamic";

const SUBNAV = [
  { label: "Resumen", href: "/admin" },
  { label: "Cursos", href: "/admin/cursos" },
  { label: "Alumnos", href: "/admin/alumnos" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdminProfile("/admin");

  return (
    <>
      <AppHeader profile={profile} />
      <div className="border-b border-ink/10 bg-ink/[0.015]">
        <div className="shell flex items-center gap-6 py-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold-dark/70">
            Admin
          </span>
          <nav className="flex gap-5" aria-label="Administración">
            {SUBNAV.map((n) => (
              <Link key={n.href} href={n.href} className="link-nav">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {isMockMode && (
        <div className="border-b border-blush/20 bg-blush/[0.06]">
          <div className="shell py-2.5 text-xs text-ink/70">
            Modo desarrollo: los cambios se aplican en memoria. Con Supabase configurado, se
            persisten en la base (ver SETUP.md).
          </div>
        </div>
      )}
      <main className="shell py-10">{children}</main>
    </>
  );
}
