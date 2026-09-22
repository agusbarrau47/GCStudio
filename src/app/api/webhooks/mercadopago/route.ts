import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchMercadoPagoPayment } from "@/lib/payments/mercadopago";
import { mapMercadoPagoStatus, statusGrantsAccess } from "@/lib/domain/payments";
import { markPurchasePaidAndEnroll } from "@/lib/data/purchases";

/**
 * Webhook de Mercado Pago.
 *
 * - NUNCA concede acceso por el retorno del usuario a /success: solo por este webhook validado.
 * - IDEMPOTENTE: registra cada evento en payment_events (unique) y no reprocesa duplicados.
 * - Consulta el pago real en la API de MP para conocer el estado verdadero.
 */
export async function POST(request: Request) {
  const url = new URL(request.url);

  // Verificación opcional por secret en query (?secret=...). Si está configurado, se exige.
  if (env.mercadopagoWebhookSecret) {
    const provided = url.searchParams.get("secret") ?? request.headers.get("x-webhook-secret");
    if (provided !== env.mercadopagoWebhookSecret) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  let payload: { type?: string; action?: string; data?: { id?: string } } = {};
  try {
    payload = await request.json();
  } catch {
    // MP también puede notificar por query (?topic=payment&id=...)
  }

  const topic = payload.type ?? url.searchParams.get("topic") ?? url.searchParams.get("type");
  const paymentId =
    payload.data?.id ?? url.searchParams.get("data.id") ?? url.searchParams.get("id");

  // Solo procesamos notificaciones de pago.
  if (topic && !String(topic).includes("payment")) {
    return NextResponse.json({ received: true, ignored: topic });
  }
  if (!paymentId) {
    return NextResponse.json({ received: true, note: "sin payment id" });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    // Sin service role no podemos escribir; respondemos 200 para no forzar reintentos infinitos
    // pero dejamos constancia. Configurar SUPABASE_SERVICE_ROLE_KEY (ver SETUP.md).
    return NextResponse.json({ received: true, note: "service role no configurado" });
  }

  const eventId = `mp:${paymentId}`;

  // IDEMPOTENCIA: intentamos registrar el evento; si ya existe (unique), no reprocesamos.
  const { error: insertError } = await admin
    .from("payment_events")
    .insert({ provider: "mercadopago", provider_event_id: eventId, raw: payload });

  if (insertError) {
    // Violación de unique => evento ya procesado.
    if (insertError.code === "23505") {
      return NextResponse.json({ received: true, duplicate: true });
    }
    // Otro error de DB: respondemos 500 para que MP reintente.
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // Consultamos el pago real en MP.
  const payment = await fetchMercadoPagoPayment(String(paymentId));
  if (!payment || !payment.externalReference) {
    return NextResponse.json({ received: true, note: "pago no encontrado" });
  }

  const status = mapMercadoPagoStatus(payment.status);

  // Reflejamos el estado en la compra.
  await admin
    .from("purchases")
    .update({ status })
    .eq("id", payment.externalReference);

  // Solo "paid" concede acceso.
  if (statusGrantsAccess(status)) {
    await markPurchasePaidAndEnroll(payment.externalReference);
  }

  return NextResponse.json({ received: true, status });
}
