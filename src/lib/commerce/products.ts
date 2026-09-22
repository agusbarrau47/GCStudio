import { siteConfig } from "@/config/site.config";
import { coursesForProduct } from "@/lib/domain/access";

export type ProductId = "course-laminado" | "course-lifting" | "bundle-full";

export interface Product {
  id: ProductId;
  title: string;
  priceArs: number | null;
  /** Cursos que habilita (enrollments) al pagarse. */
  grants: string[];
}

export function getProduct(id: string): Product | null {
  switch (id) {
    case "course-laminado":
      return {
        id,
        title: "Laminado de Cejas",
        priceArs: siteConfig.pricing.laminadoArs,
        grants: coursesForProduct(id),
      };
    case "course-lifting":
      return {
        id,
        title: "Lifting de Pestañas",
        priceArs: siteConfig.pricing.liftingArs,
        grants: coursesForProduct(id),
      };
    case "bundle-full":
      return {
        id,
        title: "Bundle Full — Laminado + Lifting",
        priceArs: siteConfig.pricing.bundleArs,
        grants: coursesForProduct(id),
      };
    default:
      return null;
  }
}
