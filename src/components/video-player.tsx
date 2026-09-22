import type { PlaybackSource } from "@/lib/video/provider";

/**
 * Player del curso. Renderiza según el tipo de fuente autorizada.
 * La autorización por enrollment se validó server-side antes de generar la fuente.
 */
export function VideoPlayer({
  source,
  title,
}: {
  source: PlaybackSource;
  title: string;
}) {
  if (source.kind === "iframe" && source.url) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-ink/10 bg-black">
        <iframe
          src={source.url}
          title={title}
          loading="lazy"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  if (source.kind === "mp4" && source.url) {
    return (
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src={source.url}
          poster={source.poster ?? undefined}
          controls
          controlsList="nodownload"
          className="aspect-video w-full"
        />
      </div>
    );
  }

  // Estado sin video conectado (mock/dev o asset no cargado).
  return (
    <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-cream-700 text-center">
      {source.poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={source.poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="relative z-10 max-w-md px-6">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/40">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="#E8D9B5" />
          </svg>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-dark/80">
          Video
        </p>
        <p className="mt-2 text-sm text-ink/70">
          {source.notice ?? "El video estará disponible al conectar el proveedor."}
        </p>
      </div>
    </div>
  );
}
