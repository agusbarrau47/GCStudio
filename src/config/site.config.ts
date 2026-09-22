/**
 * CONFIGURACIÓN CENTRAL DE GCStudio.
 *
 * Todo dato comercial que FALTA se marca explícitamente aquí y se documenta en SETUP.md.
 * NO se inventan precios, políticas ni datos fiscales. Completá los campos marcados FALTANTE.
 */

export type PricingConfig = {
  /** Precio en ARS. null = FALTANTE (se muestra "Precio a confirmar"). */
  laminadoArs: number | null;
  liftingArs: number | null;
  bundleArs: number | null;
  currency: "ARS";
};

export const siteConfig = {
  brand: {
    name: "GC Studio",
    legalName: "FALTANTE: razón social / nombre legal",
    tagline: "Realzamos tu belleza natural",
    shortDescription:
      "Academia digital de formación profesional en cejas y pestañas, dictada por Geraldine Colman.",
    founder: "Geraldine Colman",
    city: "Recoleta, CABA",
    address: "Arenales 1999, Recoleta, CABA",
  },

  // Datos de contacto REALES detectados en el material (PDFs + identidad visual).
  contact: {
    whatsapp: "+54 9 11 6485-7085",
    whatsappUrl: "https://wa.me/5491164857085",
    // Google Maps oficial verificado
    googleMapsUrl: "https://share.google/KuI3n21SoMYJpit4o",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJaz1vCPRLwpIRNwrWEKzcbzM",
    googleRating: "4.7",
    googleReviewsCount: 18,
    // Emails detectados en los PDFs del curso.
    email: "gcstudioba@gmail.com",
    emailAlt: "geraldinecolman2@gmail.com",
    instagram: "@gc.studioba",
    instagramUrl: "https://www.instagram.com/gc.studioba/",
    // Teléfono que figura en el material del curso.
    phone: "+54 9 11 6485-7085",
  },

  // URL pública de la app. Se sobreescribe con NEXT_PUBLIC_APP_URL en producción.
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Precios: FALTANTE. Cargalos acá cuando Geraldine los defina (ver SETUP.md §Precios).
  pricing: {
    laminadoArs: null,
    liftingArs: null,
    bundleArs: null,
    currency: "ARS",
  } as PricingConfig,

  policies: {
    // FALTANTE: política de reembolso / condiciones de inscripción. No inventar.
    refund: "FALTANTE: política de devolución / reembolso del curso.",
    terms: "FALTANTE: términos y condiciones de la inscripción.",
  },

  seo: {
    title: "GC Studio — Formación profesional en cejas y pestañas",
    description:
      "Campus online de GC Studio. Cursos profesionales de Laminado de Cejas y Lifting de Pestañas dictados por Geraldine Colman. Acceso de por vida, módulos, clases en video y recursos descargables.",
    ogImage: "/og.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Helper: formatea ARS o devuelve "Precio a confirmar" cuando es null (FALTANTE). */
export function formatPrice(value: number | null): string {
  if (value == null) return "Precio a confirmar";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}
