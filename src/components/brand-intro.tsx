"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "./brand-mark";

/**
 * Secuencia de marca a pantalla completa (estructura-web.md §4).
 * - Una vez por sesión (sessionStorage).
 * - Omitible por clic, rueda o tecla.
 * - Failsafe temporal.
 * - Desactivada con prefers-reduced-motion.
 * - aria-hidden: decorativa, no retiene foco.
 */
export function BrandIntro() {
  const [stage, setStage] = useState<"hidden" | "visible" | "exit">("hidden");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("gc_intro_seen") === "1";
    } catch {
      seen = false;
    }
    if (reduced || seen) return;

    setStage("visible");
    const markSeen = () => {
      try {
        sessionStorage.setItem("gc_intro_seen", "1");
      } catch {
        /* sessionStorage puede no estar disponible */
      }
    };

    const toExit = window.setTimeout(() => setStage("exit"), 900);
    const done = window.setTimeout(() => {
      setStage("hidden");
      markSeen();
    }, 1500);
    const failsafe = window.setTimeout(() => {
      setStage("hidden");
      markSeen();
    }, 1900);

    const skip = () => {
      setStage("hidden");
      markSeen();
    };
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("keydown", skip);

    return () => {
      window.clearTimeout(toExit);
      window.clearTimeout(done);
      window.clearTimeout(failsafe);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (stage === "hidden") return null;

  return (
    <div
      aria-hidden="true"
      onClick={() => setStage("hidden")}
      className={`fixed inset-0 z-[100] grid place-items-center bg-cream transition-opacity duration-500 ${
        stage === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`transition-all duration-500 ${
          stage === "exit" ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <BrandMark size="lg" />
      </div>
    </div>
  );
}
