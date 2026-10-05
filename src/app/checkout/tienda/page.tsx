import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentProfile } from "@/lib/auth/session";
import { getStoreSettings } from "@/lib/data/orders";
import { TiendaCheckout } from "@/components/tienda-checkout";

export const metadata: Metadata = { title: "Finalizar compra · GC Studio" };
export const dynamic = "force-dynamic";

export default async function CheckoutTiendaPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/registro?next=/checkout/tienda");
  const settings = await getStoreSettings();
  return <TiendaCheckout defaultName={profile.fullName ?? ""} settings={settings} />;
}
