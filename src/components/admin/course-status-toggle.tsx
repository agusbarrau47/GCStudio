"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateCourseStatus } from "@/app/admin/actions";

export function CourseStatusToggle({
  courseId,
  initialStatus,
}: {
  courseId: string;
  initialStatus: "draft" | "published";
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [pending, start] = useTransition();

  function toggle() {
    const next = status === "published" ? "draft" : "published";
    setStatus(next);
    start(async () => {
      const res = await updateCourseStatus({ courseId, status: next });
      if (!res.ok) setStatus(status);
      else router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className={
        status === "published"
          ? "btn btn-sm bg-gold/20 text-gold-dark"
          : "btn-ghost btn-sm"
      }
      aria-pressed={status === "published"}
    >
      {status === "published" ? "● Publicado" : "○ Borrador"}
    </button>
  );
}
