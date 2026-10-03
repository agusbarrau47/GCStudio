import type { Metadata } from "next";
import { getPricing } from "@/lib/data/pricing";
import { PricingForm } from "@/components/admin/pricing-form";

export const metadata: Metadata = { title: "Admin · Precios" };
export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  const pricing = await getPricing();

  return (
    <>
      <h1 className="font-display text-3xl text-ink">Precios</h1>
      <p className="mt-2 text-ink/60">
        Modificá todos los valores de los cursos. Los cambios impactan en el sitio al instante.
      </p>
      <PricingForm initial={pricing} />
    </>
  );
}
