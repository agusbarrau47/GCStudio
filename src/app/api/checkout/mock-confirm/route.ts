import { NextResponse } from "next/server";
import { mockAccessAllowed } from "@/lib/env";
import { getCurrentProfile } from "@/lib/auth/session";
import { getPurchaseById, mockGrantAccess } from "@/lib/data/purchases";

/**
 * Confirmación de pago SIMULADO (solo desarrollo/mock).
 * Concede acceso y redirige a /checkout/success. 404 en producción.
 */
export async function GET(request: Request) {
  if (!mockAccessAllowed()) {
    return new NextResponse("No disponible", { status: 404 });
  }
  const url = new URL(request.url);
  const purchaseId = url.searchParams.get("purchase");
  const profile = await getCurrentProfile();
  if (!profile || !purchaseId) {
    return NextResponse.redirect(new URL("/dashboard", url.origin));
  }

  const purchase = await getPurchaseById(purchaseId, profile.id);
  const productId = purchase?.items[0]?.productId;
  if (productId) {
    await mockGrantAccess(profile.id, productId, purchaseId);
  }

  return NextResponse.redirect(
    new URL(`/checkout/success?purchase=${purchaseId}`, url.origin)
  );
}
