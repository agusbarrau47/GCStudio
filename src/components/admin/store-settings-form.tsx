"use client";

import { useState, useTransition } from "react";
import { updateStoreSettings } from "@/app/admin/actions";
import { formatPrice } from "@/config/site.config";
import type { StoreSettings } from "@/lib/commerce/orders";

export function StoreSettingsForm({ initial }: { initial: StoreSettings }) {
  const [flat, setFlat] = useState(String(initial.shippingFlatArs || ""));
  const [free, setFree] = useState(initial.freeShippingThresholdArs == null ? "" : String(initial.freeShippingThresholdArs));
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function save() {
    setSaved(false);
    setError(null);
    start(async () => {
      try {
        await updateStoreSettings({
          shippingFlatArs: flat === "" ? 0 : Number(flat),
          freeShippingThresholdArs: free === "" ? null : Number(free),
        });
        setSaved(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo guardar");
      }
    });
  }

  return (
    <div className="surface p-6">
      <h2 className="font-display text-xl text-ink">Envío</h2>
      <p className="mt-1 text-sm text-ink/55">Costo de envío a domicilio para el checkout de la tienda. El retiro en Recoleta es siempre gratis.</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">Costo de envío (ARS)</span>
          <input className="in" inputMode="numeric" value={flat} onChange={(e) => setFlat(e.target.value.replace(/[^0-9]/g, ""))} placeholder="0 = gratis" />
          <span className="text-[11px] text-ink/40">{flat === "" || flat === "0" ? "Envío gratis" : formatPrice(Number(flat))}</span>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/55">Envío gratis desde (opcional)</span>
          <input className="in" inputMode="numeric" value={free} onChange={(e) => setFree(e.target.value.replace(/[^0-9]/g, ""))} placeholder="ej: 50000" />
          <span className="text-[11px] text-ink/40">{free === "" ? "Sin umbral" : "Gratis desde " + formatPrice(Number(free))}</span>
        </label>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button type="button" onClick={save} disabled={pending} className="btn-primary btn-sm">
          {pending ? "Guardando…" : saved ? "Guardado ✓" : "Guardar envío"}
        </button>
        {error && <p role="alert" className="text-sm text-blush">{error}</p>}
      </div>
    </div>
  );
}
