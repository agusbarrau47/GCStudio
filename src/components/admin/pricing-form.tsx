"use client";

import { useState, useTransition } from "react";
import { updatePricing } from "@/app/admin/actions";
import { PRICING_FIELDS, type Pricing, type PricingField } from "@/lib/commerce/pricing";
import { formatPrice } from "@/config/site.config";

export function PricingForm({ initial }: { initial: Pricing }) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(
      PRICING_FIELDS.map((f) => [f.field, initial[f.field] == null ? "" : String(initial[f.field])])
    )
  );
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setField(field: string, v: string) {
    setValues((prev) => ({ ...prev, [field]: v.replace(/[^0-9]/g, "") }));
    setSaved(false);
  }

  function save() {
    setSaved(false);
    setError(null);
    const payload: Partial<Record<PricingField, number | null>> = {};
    for (const f of PRICING_FIELDS) {
      const raw = values[f.field];
      payload[f.field] = raw === "" ? null : Number(raw);
    }
    start(async () => {
      try {
        await updatePricing(payload);
        setSaved(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudieron guardar los precios");
      }
    });
  }

  const groups: { title: string; hint: string; modality: "online" | "presencial" }[] = [
    { title: "Cursos Online", hint: "Se cobran por MercadoPago y dan acceso al campus.", modality: "online" },
    { title: "Cursos Presenciales (Recoleta)", hint: "Se muestran en el sitio; la reserva es por WhatsApp.", modality: "presencial" },
  ];

  return (
    <div className="mt-8 space-y-8">
      {groups.map((g) => (
        <div key={g.modality} className="surface p-6">
          <h2 className="font-display text-xl text-ink">{g.title}</h2>
          <p className="mt-1 text-sm text-ink/55">{g.hint}</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {PRICING_FIELDS.filter((f) => f.modality === g.modality).map((f) => {
              const raw = values[f.field];
              const num = raw === "" ? null : Number(raw);
              return (
                <label key={f.field} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">
                    {f.label}
                  </span>
                  <div className="flex items-center gap-2 rounded-xl border border-ink/15 bg-ink/[0.03] px-3 py-2.5 focus-within:border-gold/60">
                    <span className="text-ink/40">$</span>
                    <input
                      inputMode="numeric"
                      value={raw}
                      onChange={(e) => setField(f.field, e.target.value)}
                      placeholder="A confirmar"
                      className="w-full bg-transparent text-sm text-ink outline-none"
                    />
                  </div>
                  <span className="text-[11px] text-ink/40">{formatPrice(num)}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={save} disabled={pending} className="btn-primary">
          {pending ? "Guardando…" : saved ? "Guardado ✓" : "Guardar precios"}
        </button>
        {error && (
          <p role="alert" className="text-sm text-blush">
            {error}
          </p>
        )}
        <p className="text-xs text-ink/45">
          Dejá un campo vacío para mostrar “Precio a confirmar”.
        </p>
      </div>
    </div>
  );
}
