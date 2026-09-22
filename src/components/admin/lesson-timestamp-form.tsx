"use client";

import { useState, useTransition } from "react";
import { updateLessonTimestamps } from "@/app/admin/actions";

export function LessonTimestampForm({
  lessonId,
  courseId,
  initialStart,
  initialEnd,
}: {
  lessonId: string;
  courseId: string;
  initialStart: number | null;
  initialEnd: number | null;
}) {
  const [start, setStart] = useState(initialStart?.toString() ?? "");
  const [end, setEnd] = useState(initialEnd?.toString() ?? "");
  const [pending, run] = useTransition();
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(false);
    run(async () => {
      await updateLessonTimestamps({
        lessonId,
        courseId,
        start: start === "" ? null : Number(start),
        end: end === "" ? null : Number(end),
      });
      setSaved(true);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={0}
        value={start}
        onChange={(e) => setStart(e.target.value)}
        placeholder="inicio (s)"
        className="w-24 rounded-lg border border-ink/15 bg-ink/[0.03] px-2 py-1.5 text-xs text-ink outline-none focus:border-gold/60"
        aria-label="Segundo de inicio"
      />
      <span className="text-ink/30">→</span>
      <input
        type="number"
        min={0}
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        placeholder="fin (s)"
        className="w-24 rounded-lg border border-ink/15 bg-ink/[0.03] px-2 py-1.5 text-xs text-ink outline-none focus:border-gold/60"
        aria-label="Segundo de fin"
      />
      <button type="button" onClick={save} disabled={pending} className="btn-ghost btn-sm">
        {pending ? "…" : saved ? "✓" : "Guardar"}
      </button>
    </div>
  );
}
