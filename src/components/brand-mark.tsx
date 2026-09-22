/**
 * Logotipo oficial GC Studio: marca tipográfica sólida
 * Monograma script dorado "GC" + "STUDIO" en versalitas tracking.
 * Sin contenedor circular redundante según especificación oficial.
 */
export function BrandMark({
  size = "md",
  withWordmark = true,
}: {
  size?: "sm" | "md" | "lg";
  withWordmark?: boolean;
}) {
  const script =
    size === "lg" ? "text-4xl" : size === "sm" ? "text-[26px]" : "text-3xl";
  const studio =
    size === "lg"
      ? "text-[12px] tracking-[0.42em]"
      : size === "sm"
      ? "text-[9px] tracking-[0.38em]"
      : "text-[10px] tracking-[0.4em]";

  return (
    <span className="inline-flex flex-col justify-center leading-none select-none group py-0.5">
      <span
        className={`font-script ${script} text-gold-dark leading-[0.9] tracking-tight transition-transform duration-300 group-hover:scale-[1.02]`}
      >
        GC
      </span>
      <span
        className={`font-mono ${studio} uppercase text-ink/85 font-semibold mt-1`}
      >
        STUDIO
      </span>
    </span>
  );
}

