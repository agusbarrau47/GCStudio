import "server-only";
import { isMockMode } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PRODUCTS } from "@/content/products";
import type { Product, ProductCategory } from "@/lib/types/product";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Kits Profesionales",
  "Aftercare & Hogar",
  "Insumos & Descartables",
  "Skincare & Mirada",
];

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  price_ars: number | null;
  image: string | null;
  badge: string | null;
  short_desc: string | null;
  description: string | null;
  benefits: unknown;
  how_to_use: string | null;
  anmat_approved: boolean | null;
  stock: boolean | null;
  active: boolean | null;
  position: number | null;
}

function rowToProduct(r: ProductRow): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    category: (r.category as ProductCategory) ?? "Kits Profesionales",
    priceArs: r.price_ars ?? 0,
    image: r.image ?? "",
    badge: r.badge ?? undefined,
    shortDesc: r.short_desc ?? "",
    description: r.description ?? "",
    benefits: Array.isArray(r.benefits) ? (r.benefits as string[]) : [],
    howToUse: r.how_to_use ?? "",
    anmatApproved: !!r.anmat_approved,
    stock: !!r.stock,
  };
}

/** Catálogo público (solo activos). Fallback al catálogo estático si no hay DB/filas. */
export async function getProducts(): Promise<Product[]> {
  if (isMockMode) return PRODUCTS;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return PRODUCTS;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("position", { ascending: true });
  if (error || !data || data.length === 0) return PRODUCTS;
  return (data as ProductRow[]).map(rowToProduct);
}

export interface AdminProduct extends Product {
  active: boolean;
  position: number;
}

export async function adminListProducts(): Promise<AdminProduct[]> {
  if (isMockMode) {
    return PRODUCTS.map((p, i) => ({ ...p, active: true, position: i + 1 }));
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase.from("products").select("*").order("position", { ascending: true });
  return ((data as ProductRow[]) ?? []).map((r) => ({
    ...rowToProduct(r),
    active: !!r.active,
    position: r.position ?? 0,
  }));
}

export interface ProductInput {
  id?: string;
  slug: string;
  name: string;
  category: string;
  priceArs: number | null;
  image: string | null;
  badge: string | null;
  shortDesc: string | null;
  description: string | null;
  benefits: string[];
  howToUse: string | null;
  anmatApproved: boolean;
  stock: boolean;
  active: boolean;
  position: number;
}

export async function adminUpsertProduct(input: ProductInput): Promise<void> {
  if (isMockMode) return;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  const id = input.id && input.id.trim() ? input.id.trim() : `prod-${input.slug}`;
  const row = {
    id,
    slug: input.slug,
    name: input.name,
    category: input.category,
    price_ars: input.priceArs,
    image: input.image || null,
    badge: input.badge || null,
    short_desc: input.shortDesc || null,
    description: input.description || null,
    benefits: input.benefits ?? [],
    how_to_use: input.howToUse || null,
    anmat_approved: input.anmatApproved,
    stock: input.stock,
    active: input.active,
    position: input.position ?? 0,
  };
  const { error } = await supabase.from("products").upsert(row, { onConflict: "id" });
  if (error) throw new Error("No se pudo guardar el producto: " + error.message);
}

export async function adminDeleteProduct(id: string): Promise<void> {
  if (isMockMode) return;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error("No se pudo eliminar el producto: " + error.message);
}
