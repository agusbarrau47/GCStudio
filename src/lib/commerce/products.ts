import { coursesForProduct } from "@/lib/domain/access";
import { getPricing } from "@/lib/data/pricing";

export type ProductId = "course-laminado" | "course-lifting" | "bundle-full";

export interface Product {
  id: ProductId;
  title: string;
  priceArs: number | null;
  /** Cursos que habilita (enrollments) al pagarse. */
  grants: string[];
}

/** Devuelve el producto con su precio ONLINE actual (desde DB vía getPricing). */
export async function getProduct(id: string): Promise<Product | null> {
  const pricing = await getPricing();
  switch (id) {
    case "course-laminado":
      return { id, title: "Laminado de Cejas", priceArs: pricing.laminadoOnline, grants: coursesForProduct(id) };
    case "course-lifting":
      return { id, title: "Lifting de Pestañas", priceArs: pricing.liftingOnline, grants: coursesForProduct(id) };
    case "bundle-full":
      return { id, title: "Bundle Full — Laminado + Lifting", priceArs: pricing.bundleOnline, grants: coursesForProduct(id) };
    default:
      return null;
  }
}
