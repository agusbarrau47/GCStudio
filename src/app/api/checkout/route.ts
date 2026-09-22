import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentProfile } from "@/lib/auth/session";
import { assertMockNotInProduction, isMockMode, env } from "@/lib/env";
import {
  createPendingPurchase,
  setPurchaseProviderRef,
} from "@/lib/data/purchases";
import { getPaymentProvider } from "@/lib/payments";
import { siteConfig } from "@/config/site.config";

const schema = z.object({
  productId: z.enum(["course-laminado", "course-lifting", "bundle-full"]),
});

export async function POST(request: Request) {
  assertMockNotInProduction();

  const profile = await getCurrentProfile();
  if (!profile) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Producto inválido" }, { status: 400 });
  }

  const purchase = await createPendingPurchase(profile.id, parsed.data.productId);
  if (!purchase) {
    return NextResponse.json({ error: "Producto inexistente" }, { status: 404 });
  }

  // En modo real, sin precio cargado no se puede cobrar (FALTANTE).
  if (!isMockMode && (purchase.amountArs == null || purchase.amountArs <= 0)) {
    return NextResponse.json(
      {
        error:
          "El precio de este producto todavía no está configurado. Cargalo en site.config.ts (ver SETUP.md).",
      },
      { status: 409 }
    );
  }

  const base = env.appUrl;
  const provider = getPaymentProvider();
  const result = await provider.createCheckout({
    purchaseId: purchase.purchaseId,
    userId: profile.id,
    userEmail: profile.email,
    items: purchase.items,
    successUrl: `${base}/checkout/success?purchase=${purchase.purchaseId}`,
    failureUrl: `${base}/checkout/failure?purchase=${purchase.purchaseId}`,
    pendingUrl: `${base}/checkout/pending?purchase=${purchase.purchaseId}`,
    notificationUrl: `${base}/api/webhooks/mercadopago`,
  });

  await setPurchaseProviderRef(purchase.purchaseId, result.providerRef);

  return NextResponse.json({
    redirectUrl: result.redirectUrl,
    provider: provider.name,
    brand: siteConfig.brand.name,
  });
}
