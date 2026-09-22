export function ProgressBar({
  percent,
  label,
}: {
  percent: number;
  label?: string;
}) {
  const value = Math.max(0, Math.min(100, percent));
  return (
    <div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progreso del curso"}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-[width] duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      {label && (
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50">
          {label}
        </p>
      )}
    </div>
  );
}
