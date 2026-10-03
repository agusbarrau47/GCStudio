import "server-only";
import { isMockMode } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site.config";
import { PRICING_FIELDS, type Pricing, type PricingField } from "@/lib/commerce/pricing";

const DB_KEY_TO_FIELD: Record<string, PricingField> = Object.fromEntries(
  PRICING_FIELDS.map((f) => [f.dbKey, f.field])
) as Record<string, PricingField>;

const FIELD_TO_META = Object.fromEntries(PRICING_FIELDS.map((f) => [f.field, f]));

/** Defaults desde site.config.ts (fallback cuando no hay DB o falta una fila). */
export function pricingDefaults(): Pricing {
  const p = siteConfig.pricing;
  return {
    laminadoOnline: p.laminadoArs,
    liftingOnline: p.liftingArs,
    bundleOnline: p.bundleArs,
    laminadoPresencial: p.laminadoPresencialArs,
    liftingPresencial: p.liftingPresencialArs,
    bundlePresencial: p.bundlePresencialArs,
  };
}

/** Lee los precios de la DB (fuente autoritativa en runtime). Fallback a defaults. */
export async function getPricing(): Promise<Pricing> {
  const defaults = pricingDefaults();
  if (isMockMode) return defaults;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return defaults;
  const { data } = await supabase.from("pricing").select("key, price_ars");
  if (!data) return defaults;
  const result: Pricing = { ...defaults };
  for (const row of data as { key: string; price_ars: number | null }[]) {
    const field = DB_KEY_TO_FIELD[row.key];
    if (field) result[field] = row.price_ars;
  }
  return result;
}

/** Escribe los precios (solo admin, vía RLS). Upsert por key. */
export async function adminSetPricing(values: Partial<Record<PricingField, number | null>>): Promise<void> {
  if (isMockMode) return; // en dev no persiste; requiere Supabase
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  const rows = (Object.keys(values) as PricingField[])
    .map((field) => {
      const meta = FIELD_TO_META[field];
      if (!meta) return null;
      return {
        key: meta.dbKey,
        label: meta.label + (meta.modality === "online" ? " - Online" : " - Presencial"),
        modality: meta.modality,
        course_key: meta.courseKey,
        price_ars: values[field] ?? null,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);
  if (rows.length === 0) return;
  const { error } = await supabase.from("pricing").upsert(rows, { onConflict: "key" });
  if (error) throw new Error("No se pudieron guardar los precios: " + error.message);
}
