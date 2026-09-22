"use client";

import { useState } from "react";
import Link from "next/link";

export type LessonNavItem = {
  id: string;
  slug: string;
  title: string;
  order: number;
  completed: boolean;
  current: boolean;
};

export type LessonNavModule = {
  id: string;
  order: number;
  title: string;
  locked?: boolean;
  passed?: boolean;
  lessons: LessonNavItem[];
};

export function LessonNav({
  courseSlug,
  courseTitle,
  modules,
  percent,
}: {
  courseSlug: string;
  courseTitle: string;
  modules: LessonNavModule[];
  percent: number;
}) {
  const [open, setOpen] = useState(false);
  const currentTitle =
    modules.flatMap((m) => m.lessons).find((l) => l.current)?.title ?? "";

  return (
    <>
      {/* Barra mobile: abre el drawer */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-white/[0.03] px-5 py-4 text-left"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <span>
            <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark/70">
              {courseTitle} · {percent}%
            </span>
            <span className="mt-1 block text-sm text-ink/80">{currentTitle}</span>
          </span>
          <span className="font-mono text-xs text-ink/60">Índice ▾</span>
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-label="Índice del curso">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Cerrar índice"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-sm overflow-y-auto border-r border-ink/10 bg-ink-800 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-lg text-ink">{courseTitle}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>
            <NavTree courseSlug={courseSlug} modules={modules} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Sidebar desktop */}
      <div className="hidden lg:block">
        <div className="surface p-5">
          <NavTree courseSlug={courseSlug} modules={modules} />
        </div>
      </div>
    </>
  );
}

function NavTree({
  courseSlug,
  modules,
  onNavigate,
}: {
  courseSlug: string;
  modules: LessonNavModule[];
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Clases del curso" className="space-y-6">
      {modules.map((m) => (
        <div key={m.id}>
          <p className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-dark/60">
            <span>Módulo {String(m.order).padStart(2, "0")} · {m.title}</span>
            {m.passed && <span className="text-gold-dark" title="Evaluación aprobada">✓</span>}
            {m.locked && <span className="text-ink/40" title="Bloqueado">🔒</span>}
          </p>
          {m.locked ? (
            <p className="rounded-xl border border-ink/10 bg-ink/[0.03] px-3 py-2 text-xs text-ink/40">
              Aprobá la evaluación del módulo anterior para desbloquear estas clases.
            </p>
          ) : (
            <ul className="space-y-1">
              {m.lessons.map((l) => (
                <li key={l.id}>
                  <Link
                    href={`/campus/${courseSlug}/${l.slug}`}
                    onClick={onNavigate}
                    aria-current={l.current ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                      l.current
                        ? "bg-gold/15 text-gold-dark"
                        : "text-ink/70 hover:bg-ink/[0.05]"
                    }`}
                  >
                    <StatusDot completed={l.completed} current={l.current} />
                    <span className="line-clamp-2">{l.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}

function StatusDot({ completed, current }: { completed: boolean; current: boolean }) {
  if (completed) {
    return (
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold text-[9px] text-ink-900" aria-hidden="true">
        ✓
      </span>
    );
  }
  return (
    <span
      className={`h-4 w-4 shrink-0 rounded-full border ${current ? "border-gold-light" : "border-white/25"}`}
      aria-hidden="true"
    />
  );
}
