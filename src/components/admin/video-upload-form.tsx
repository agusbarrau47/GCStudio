"use client";

import { useRef, useState } from "react";
import { updateCourseVideoAsset } from "@/app/admin/actions";

declare global {
  interface Window {
    tus?: any;
  }
}

const TUS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/tus-js-client/4.1.0/tus.min.js";

function loadTus(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("no window"));
    if (window.tus) return resolve(window.tus);
    const s = document.createElement("script");
    s.src = TUS_CDN;
    s.async = true;
    s.onload = () => (window.tus ? resolve(window.tus) : reject(new Error("No se pudo cargar el cargador de video")));
    s.onerror = () => reject(new Error("No se pudo cargar el cargador de video (CDN)"));
    document.head.appendChild(s);
  });
}

export function VideoUploadForm({ courseId }: { courseId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedUid, setSavedUid] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onFile(file: File) {
    setError(null);
    setSavedUid(null);
    setBusy(true);
    setStatus("Preparando subida…");
    setProgress(0);
    try {
      const res = await fetch("/api/admin/stream-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uploadLength: file.size, name: file.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo iniciar la subida");

      const tus = await loadTus();
      let mediaId: string | null = data.uid || null;

      const upload = new tus.Upload(file, {
        uploadUrl: data.location,
        chunkSize: 50 * 1024 * 1024, // 52428800 = múltiplo de 256KiB (requisito de CF)
        retryDelays: [0, 3000, 6000, 12000, 24000],
        metadata: { name: file.name, filetype: file.type },
        onError: (err: any) => {
          setError(err?.message || "Error durante la subida");
          setProgress(null);
          setStatus(null);
          setBusy(false);
        },
        onProgress: (sent: number, total: number) => {
          setProgress(Math.round((sent / total) * 100));
          setStatus("Subiendo…");
        },
        onAfterResponse: (_req: any, resp: any) => {
          try {
            const m = resp?.getHeader?.("stream-media-id");
            if (m) mediaId = m;
          } catch {
            /* noop */
          }
        },
        onSuccess: async () => {
          setProgress(100);
          setStatus("Procesando en Cloudflare…");
          if (!mediaId && typeof upload.url === "string") {
            const tail = upload.url.split("/").pop() || "";
            mediaId = tail.split("?")[0] || null;
          }
          if (mediaId) {
            try {
              await updateCourseVideoAsset({ courseId, assetId: mediaId });
              setSavedUid(mediaId);
              setStatus("Video subido y asignado al curso ✓");
            } catch {
              setStatus(`Subido (UID ${mediaId}), pero no se pudo asignar. Pegalo manualmente abajo.`);
            }
          } else {
            setStatus("Subido, pero no se obtuvo el UID. Revisalo en Cloudflare Stream.");
          }
          setBusy(false);
        },
      });
      setStatus("Subiendo…");
      upload.start();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al subir el video");
      setProgress(null);
      setStatus(null);
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-dashed border-gold/40 bg-gold/[0.04] p-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold-dark font-semibold">
        Subir video directo
      </p>
      <p className="mt-1 text-xs text-ink/60">
        Elegí el archivo del curso. Se sube a Cloudflare Stream (soporta archivos grandes, reanudable) y se asigna solo.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
          className="block w-full text-sm text-ink/80 file:mr-3 file:rounded-full file:border file:border-[#DEC498] file:bg-gradient-to-r file:from-[#FAF2E1] file:to-[#EBD6B0] file:px-4 file:py-2 file:font-mono file:text-[10px] file:uppercase file:tracking-[0.16em] file:text-[#2C2114] file:font-bold disabled:opacity-50"
        />
      </div>

      {progress !== null && (
        <div className="mt-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
            <div className="h-full rounded-full bg-gold-dark transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 font-mono text-[11px] text-ink/60">{progress}%</p>
        </div>
      )}
      {status && <p className="mt-2 text-xs text-ink/70">{status}</p>}
      {savedUid && <p className="mt-1 font-mono text-[11px] text-gold-dark">UID: {savedUid}</p>}
      {error && <p role="alert" className="mt-2 text-xs text-blush">{error}</p>}
    </div>
  );
}
