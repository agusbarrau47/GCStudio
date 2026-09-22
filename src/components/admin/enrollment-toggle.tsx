"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateEnrollment } from "@/app/admin/actions";

export function EnrollmentToggle({
  userId,
  courseId,
  courseTitle,
  initialActive,
}: {
  userId: string;
  courseId: string;
  courseTitle: string;
  initialActive: boolean;
}) {
  const router = useRouter();
  const [active, setActive] = useState(initialActive);
  const [pending, start] = useTransition();

  function toggle() {
    const next = !active;
    setActive(next);
    start(async () => {
      const res = await updateEnrollment({
        userId,
        courseId,
        status: next ? "active" : "revoked",
      });
      if (!res.ok) setActive(active);
      else router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={active}
      className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-sm transition-colors ${
        active
          ? "border-gold/40 bg-gold/10 text-gold-dark"
          : "border-ink/15 text-ink/60 hover:border-white/30"
      }`}
    >
      <span>{courseTitle}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
        {active ? "Activo" : "Sin acceso"}
      </span>
    </button>
  );
}
