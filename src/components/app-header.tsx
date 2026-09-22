import Link from "next/link";
import { BrandMark } from "./brand-mark";
import type { Profile } from "@/lib/types";

/** Header del área logueada (campus / dashboard / admin). */
export function AppHeader({ profile }: { profile: Profile }) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-[#FAF6F0]/95 backdrop-blur-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.03)]">
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/dashboard" aria-label="Mi campus">
          <BrandMark size="sm" />
        </Link>
        <nav className="flex items-center gap-5" aria-label="Campus">
          <Link href="/dashboard" className="link-nav hidden sm:inline">
            Mis cursos
          </Link>
          {profile.role === "admin" && (
            <Link href="/admin" className="link-nav hidden sm:inline">
              Admin
            </Link>
          )}
          <span className="hidden items-center gap-2 md:flex">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gold/20 font-mono text-xs text-gold-dark">
              {(profile.fullName ?? profile.email).slice(0, 1).toUpperCase()}
            </span>
            <span className="text-sm text-ink/70">{profile.fullName ?? profile.email}</span>
          </span>
          <a href="/logout" className="btn-ghost btn-sm">
            Salir
          </a>
        </nav>
      </div>
    </header>
  );
}
