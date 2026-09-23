import { GOOGLE_REVIEWS, GOOGLE_REVIEWS_META } from "@/content/reviews";

interface GoogleReviewsProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  className?: string;
}

export function GoogleReviews({
  title = "Experiencias de nuestras clientas",
  subtitle = "Opiniones reales y verificadas de quienes eligen GC Studio para cuidar su mirada y formarse profesionalmente.",
  limit,
  className = "",
}: GoogleReviewsProps) {
  const reviews = limit ? GOOGLE_REVIEWS.slice(0, limit) : GOOGLE_REVIEWS;

  return (
    <section className={`py-20 ${className}`}>
      <div className="shell">
        {/* CABECERA CON CALIFICACIÓN GOOGLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-ink/10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF2E1] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark font-bold border border-gold/30">
                <span className="text-xs">📍</span> Google Maps · Recoleta
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-cream-200/80 px-2.5 py-0.5 font-mono text-[10px] text-ink/70">
                ★ {GOOGLE_REVIEWS_META.rating} / 5
              </span>
            </div>

            <h2 className="mt-4 font-display text-3xl md:text-4xl text-ink font-semibold">
              {title}
            </h2>
            <p className="mt-2 text-sm text-ink/70 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* ACCIONES GOOGLE MAPS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={GOOGLE_REVIEWS_META.writeReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary btn-sm flex items-center justify-center gap-2 w-full sm:w-auto text-center"
              title="Dejar una opinión en Google Maps"
            >
              <span>★</span>
              <span>Calificar experiencia en Maps</span>
            </a>

            <a
              href={GOOGLE_REVIEWS_META.shareUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost btn-sm flex items-center justify-center gap-1.5 w-full sm:w-auto text-center"
            >
              <span>Ver {GOOGLE_REVIEWS_META.totalReviews} opiniones</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* GRILLA DE OPINIONES */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="surface-elevated relative overflow-hidden rounded-[24px] p-7 flex flex-col justify-between border border-[#E8DDD0] bg-gradient-to-br from-white/95 via-white/90 to-[#FAF4EA]/30 transition-all duration-300 hover:border-[#DECBB5] hover:shadow-[0_16px_36px_-12px_rgba(60,40,20,0.08)] hover:-translate-y-1"
            >
              <div>
                {/* Cabecera de la tarjeta: estrellas + badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-gold-dark text-sm" aria-label={`Calificación: ${rev.rating} de 5 estrellas`}>
                    {"★".repeat(rev.rating)}
                  </div>
                  <span className="font-mono text-[10px] text-ink/40 tracking-wider">
                    {rev.date}
                  </span>
                </div>

                {/* Resalte si existe */}
                {rev.highlight && (
                  <p className="mt-3 font-display text-base text-ink font-semibold leading-snug">
                    &ldquo;{rev.highlight}&rdquo;
                  </p>
                )}

                {/* Texto de la opinión */}
                <p className="mt-2.5 text-xs text-ink/75 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Pie de la tarjeta: autora y servicio */}
              <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-ink">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[11px] text-gold-dark" title="Opinión verificada en Google Maps">
                        ✓
                      </span>
                    )}
                  </div>
                  {rev.service && (
                    <p className="text-[10px] text-ink/50 mt-0.5 line-clamp-1">
                      {rev.service}
                    </p>
                  )}
                </div>

                {rev.role && (
                  <span className="shrink-0 rounded-full bg-cream-200 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink/60 border border-[#E0D3C0]">
                    {rev.role}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* BANNER INVITACIÓN A OPINAR */}
        <div className="mt-12 rounded-[22px] border border-gold/30 bg-gradient-to-r from-[#FAF2E1]/60 via-white/80 to-[#FAF2E1]/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold/15 text-xl text-gold-dark">
              💬
            </span>
            <div>
              <h4 className="font-display text-base text-ink font-semibold">
                ¿Ya viviste la experiencia GC Studio?
              </h4>
              <p className="text-xs text-ink/70 mt-0.5">
                Tu reseña en Google Maps ayuda a otras personas a encontrar su espacio ideal en Recoleta. ¡Te lleva menos de 1 minuto!
              </p>
            </div>
          </div>
          <a
            href={GOOGLE_REVIEWS_META.writeReviewUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary btn-sm shrink-0 w-full sm:w-auto"
          >
            Dejar mi reseña en Google
          </a>
        </div>
      </div>
    </section>
  );
}
