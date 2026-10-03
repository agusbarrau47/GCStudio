/**
 * Modelo de precios compartido (client-safe, sin IO).
 * Online + Presencial para Laminado, Lifting y Bundle.
 */

export interface Pricing {
  laminadoOnline: number | null;
  liftingOnline: number | null;
  bundleOnline: number | null;
  laminadoPresencial: number | null;
  liftingPresencial: number | null;
  bundlePresencial: number | null;
}

export type PricingField = keyof Pricing;

export interface PricingFieldMeta {
  field: PricingField;
  dbKey: string;
  courseKey: "laminado" | "lifting" | "bundle";
  modality: "online" | "presencial";
  label: string;
}

export const PRICING_FIELDS: PricingFieldMeta[] = [
  { field: "laminadoOnline", dbKey: "laminado_online", courseKey: "laminado", modality: "online", label: "Laminado de Cejas" },
  { field: "liftingOnline", dbKey: "lifting_online", courseKey: "lifting", modality: "online", label: "Lifting de Pestañas" },
  { field: "bundleOnline", dbKey: "bundle_online", courseKey: "bundle", modality: "online", label: "Bundle (Laminado + Lifting)" },
  { field: "laminadoPresencial", dbKey: "laminado_presencial", courseKey: "laminado", modality: "presencial", label: "Laminado de Cejas" },
  { field: "liftingPresencial", dbKey: "lifting_presencial", courseKey: "lifting", modality: "presencial", label: "Lifting de Pestañas" },
  { field: "bundlePresencial", dbKey: "bundle_presencial", courseKey: "bundle", modality: "presencial", label: "Bundle (Laminado + Lifting)" },
];

/** Precio online para un courseId o "bundle-full". */
export function onlinePriceFor(id: string, p: Pricing): number | null {
  if (id === "course-laminado") return p.laminadoOnline;
  if (id === "course-lifting") return p.liftingOnline;
  if (id === "bundle-full") return p.bundleOnline;
  return null;
}

/** Precio presencial para un courseId o "bundle-full". */
export function presencialPriceFor(id: string, p: Pricing): number | null {
  if (id === "course-laminado") return p.laminadoPresencial;
  if (id === "course-lifting") return p.liftingPresencial;
  if (id === "bundle-full") return p.bundlePresencial;
  return null;
}
