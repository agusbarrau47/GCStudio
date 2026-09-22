"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleLessonComplete } from "@/app/campus/actions";

export function CompleteButton({
  courseSlug,
  lessonId,
  lessonSlug,
  initialCompleted,
}: {
  courseSlug: string;
  lessonId: string;
  lessonSlug: string;
  initialCompleted: boolean;
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initialCompleted);
  const [pending, startTransition] = useTransition();

  function onClick() {
    const next = !completed;
    setCompleted(next);
    startTransition(async () => {
      const res = await toggleLessonComplete({
        courseSlug,
        lessonId,
        lessonSlug,
        completed: next,
      });
      if (!res.ok) {
        setCompleted(!next); // rollback
      } else {
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-pressed={completed}
      className={
        completed
          ? "btn bg-gold/20 text-gold-dark hover:bg-gold/30"
          : "btn-primary"
      }
    >
      {completed ? "✓ Completada" : "Marcar como completada"}
    </button>
  );
}
