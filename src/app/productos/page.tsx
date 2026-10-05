import type { Metadata } from "next";
import { getProducts } from "@/lib/data/products";
import { ProductsCatalog } from "@/components/products-catalog";

export const metadata: Metadata = {
  title: "Tienda — Kits e insumos profesionales · GC Studio",
  description:
    "Kits oficiales e insumos profesionales de GC Studio: lifting, laminado y aftercare. Productos testeados ANMAT, retiro en Recoleta y envíos a todo el país.",
};

export default async function ProductosPage() {
  const products = await getProducts();
  return <ProductsCatalog products={products} />;
}
