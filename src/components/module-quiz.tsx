"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PublicQuizQuestion, QuizGrade } from "@/lib/types";
import { submitModuleQuiz } from "@/app/campus/actions";

export function ModuleQuiz({
  courseSlug,
  moduleId,
  moduleTitle,
  questions,
  lessonTitles,
}: {
  courseSlug: string;
  moduleId: string;
  moduleTitle: string;
  questions: PublicQuizQuestion[];
  /** slug de clase → título, para los enlaces de repaso. */
  lessonTitles: Record<string, string>;
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [grade, setGrade] = useState<QuizGrade | null>(null);
  const [nextLessonSlug, setNextLessonSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const resultById = useMemo(() => {
    const map = new Map<string, QuizGrade["results"][number]>();
    grade?.results.forEach((r) => map.set(r.questionId, r));
    return map;
  }, [grade]);

  function choose(qid: string, index: number) {
    if (grade?.passed) return;
    setAnswers((prev) => ({ ...prev, [qid]: index }));
  }

  function submit() {
    setError(null);
    start(async () => {
      const res = await submitModuleQuiz({ courseSlug, moduleId, answers });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setGrade(res.grade);
      setNextLessonSlug(res.nextLessonSlug);
    });
  }

  function retry() {
    // Mantiene las respuestas para que la alumna corrija solo las incorrectas.
    setGrade(null);
    setError(null);
  }

  // Estado APROBADO
  if (grade?.passed) {
    return (
      <div className="surface-elevated p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-2xl text-gold-dark">
          ✓
        </div>
        <h2 className="mt-5 font-display text-3xl text-ink">¡Evaluación aprobada!</h2>
        <p className="mt-2 text-ink/70">
          Desbloqueaste el módulo siguiente. Buen trabajo.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          {nextLessonSlug ? (
            <Link href={`/campus/${courseSlug}/${nextLessonSlug}`} className="btn-primary">
              Continuar al módulo siguiente →
            </Link>
          ) : (
            <Link href={`/campus/${courseSlug}`} className="btn-primary">
              Finalizaste el curso — volver al inicio
            </Link>
          )}
          <Link href={`/campus/${courseSlug}`} className="link-nav normal-case">
            Volver al curso
          </Link>
        </div>
      </div>
    );
  }

  const failedSome = grade && !grade.passed;

  return (
    <div>
      {failedSome && (
        <div className="mb-6 rounded-2xl border border-wine/50 bg-wine/10 p-5">
          <p className="font-display text-lg text-ink">
            Te faltan algunas respuestas para aprobar
          </p>
          <p className="mt-1 text-sm text-ink/70">
            Acertaste {grade.correctCount} de {grade.total}. Repasá las clases sugeridas
            en las preguntas marcadas y volvé a intentarlo.
          </p>
        </div>
      )}

      <ol className="space-y-6">
        {questions.map((q, qi) => {
          const result = resultById.get(q.id);
          const wrong = result && !result.correct;
          const ok = result && result.correct;
          return (
            <li
              key={q.id}
              className={`surface p-6 ${
                wrong ? "border-wine/50" : ok ? "border-gold/40" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/40 font-mono text-xs text-gold-dark">
                  {qi + 1}
                </span>
                <div className="flex-1">
                  <p className="font-display text-lg text-ink">{q.question}</p>
                  {ok && (
                    <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark">
                      ✓ Correcta
                    </span>
                  )}
                  {wrong && (
                    <span className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-blush">
                      ✕ Revisá esta respuesta
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {q.options.map((opt, oi) => {
                  const selected = answers[q.id] === oi;
                  return (
                    <label
                      key={oi}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                        selected
                          ? "border-gold/60 bg-gold/[0.08] text-ink"
                          : "border-ink/15 text-ink/75 hover:border-ink/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={selected}
                        onChange={() => choose(q.id, oi)}
                        className="sr-only"
                      />
                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                          selected ? "border-gold bg-gold" : "border-ink/30"
                        }`}
                        aria-hidden="true"
                      >
                        {selected && <span className="h-2 w-2 rounded-full bg-ink-900" />}
                      </span>
                      {opt}
                    </label>
                  );
                })}
              </div>

              {wrong && result && (
                <div className="mt-4 rounded-xl border border-ink/10 bg-white/[0.03] p-4">
                  <p className="text-sm text-ink/80">{result.explanation}</p>
                  {lessonTitles[result.revisitLessonSlug] && (
                    <Link
                      href={`/campus/${courseSlug}/${result.revisitLessonSlug}`}
                      className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-gold-dark hover:underline"
                    >
                      ↻ Repasar: {lessonTitles[result.revisitLessonSlug]}
                    </Link>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {error && (
        <p role="alert" className="mt-6 rounded-xl border border-wine/50 bg-wine/10 px-4 py-3 text-sm text-blush">
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col items-center gap-3">
        {failedSome ? (
          <button type="button" onClick={retry} className="btn-primary" disabled={pending}>
            Reintentar la evaluación
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!allAnswered || pending}
            className="btn-primary"
          >
            {pending ? "Corrigiendo…" : "Enviar respuestas"}
          </button>
        )}
        {!allAnswered && !grade && (
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/40">
            Respondé todas las preguntas para enviar
          </p>
        )}
        <Link href={`/campus/${courseSlug}`} className="link-nav normal-case">
          Volver al curso
        </Link>
      </div>
    </div>
  );
}
