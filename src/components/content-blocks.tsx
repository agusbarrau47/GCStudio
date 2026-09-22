import type { ContentBlock } from "@/lib/types";

/** Renderiza el contenido web derivado del material (no solo PDF descargable). */
export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case "paragraph":
      return <p className="text-[15px] leading-relaxed text-ink/80">{block.text}</p>;

    case "list":
      return (
        <div>
          {block.title && <BlockTitle>{block.title}</BlockTitle>}
          <ul className="space-y-2">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "steps":
      return (
        <div>
          {block.title && <BlockTitle>{block.title}</BlockTitle>}
          <ol className="space-y-3">
            {block.items.map((it, i) => (
              <li key={i} className="flex gap-4 text-[15px] leading-relaxed text-ink/80">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/40 font-mono text-xs text-gold-dark">
                  {i + 1}
                </span>
                <span className="pt-0.5">{it}</span>
              </li>
            ))}
          </ol>
        </div>
      );

    case "table":
      return (
        <div>
          {block.title && <BlockTitle>{block.title}</BlockTitle>}
          <div className="overflow-hidden rounded-2xl border border-ink/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-ink/[0.03]">
                  {block.headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-gold-dark/70"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-white/[0.06]">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 align-top text-ink/80">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "callout": {
      const tone =
        block.tone === "warning"
          ? "border-wine/50 bg-wine/10"
          : block.tone === "gold"
            ? "border-gold/40 bg-gold/[0.06]"
            : "border-ink/15 bg-ink/[0.03]";
      return (
        <div className={`rounded-2xl border p-5 ${tone}`}>
          {block.title && (
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-gold-dark/80">
              {block.title}
            </p>
          )}
          <p className="text-[15px] leading-relaxed text-ink/85">{block.text}</p>
        </div>
      );
    }
  }
}

function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-3 font-display text-lg text-ink">{children}</h4>
  );
}
