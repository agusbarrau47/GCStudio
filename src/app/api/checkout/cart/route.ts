import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentProfile } from "@/lib/auth/session";
import { assertMockNotInProduction, isMockMode, env } from "@/lib/env";
import { createProductPurchase } from "@/lib/data/orders";
import { setPurchaseProviderRef } from "@/lib/data/purchases";
import { getPaymentProvider } from "@/lib/payments";

const schema = z.object({
  items: z
    .array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(99) }))
    .min(1)
    .max(50),
  shipping: z.object({
    method: z.enum(["retiro", "envio"]),
    name: z.string().trim().min(1).max(120),
    phone: z.string().trim().min(5).max(40),
    address: z.string().trim().max(200).optional(),
    city: z.string().trim().max(80).optional(),
    province: z.string().trim().max(80).optional(),
    zip: z.string().trim().max(20).optional(),
    notes: z.string().trim().max(300).optional(),
  }),
});

export async function POST(request: Request) {
  assertMockNotInProduction();

  const profile = await getCurrentProfile();
  if (!profile) {
    return NextResponse.json({ error: "Necesitás iniciar sesión para comprar." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Pedido inválido" }, { status: 400 });
  }
  if (parsed.data.shipping.method === "envio" && !parsed.data.shipping.address) {
    return NextResponse.json({ error: "Ingresá la dirección de envío." }, { status: 400 });
  }

  const order = await createProductPurchase(profile.id, parsed.data.items, parsed.data.shipping);
  if (!order) {
    return NextResponse.json({ error: "No hay productos válidos en el carrito." }, { status: 404 });
  }
  if (!isMockMode && (order.amountArs == null || order.amountArs <= 0)) {
    return NextResponse.json({ error: "El total del pedido no es válido." }, { status: 409 });
  }

  const base = env.appUrl;
  const provider = getPaymentProvider();
  const result = await provider.createCheckout({
    purchaseId: order.purchaseId,
    userId: profile.id,
    userEmail: profile.email,
    items: order.items,
    successUrl: `${base}/checkout/success?purchase=${order.purchaseId}`,
    failureUrl: `${base}/checkout/failure?purchase=${order.purchaseId}`,
    pendingUrl: `${base}/checkout/pending?purchase=${order.purchaseId}`,
    notificationUrl: `${base}/api/webhooks/mercadopago`,
  });

  await setPurchaseProviderRef(order.purchaseId, result.providerRef);
  return NextResponse.json({ redirectUrl: result.redirectUrl });
}
