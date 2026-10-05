import type { Metadata } from "next";
import { adminListProducts } from "@/lib/data/products";
import { getStoreSettings } from "@/lib/data/orders";
import { StoreSettingsForm } from "@/components/admin/store-settings-form";
import { ProductsAdmin } from "@/components/admin/products-admin";

export const metadata: Metadata = { title: "Admin · Tienda" };
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [products, settings] = await Promise.all([adminListProducts(), getStoreSettings()]);
  return (
    <>
      <h1 className="font-display text-3xl text-ink">Tienda</h1>
      <p className="mt-2 text-ink/60">
        Agregá, editá, ocultá o eliminá los productos de la tienda. Los cambios impactan en el sitio al instante.
      </p>
      <div className="mt-6"><StoreSettingsForm initial={settings} /></div>
      <ProductsAdmin initial={products} />
    </>
  );
}
