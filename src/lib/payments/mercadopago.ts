import type {
  CreateCheckoutInput,
  CreateCheckoutResult,
  PaymentProvider,
} from "./provider";
import { env } from "@/lib/env";

/**
 * Proveedor Mercado Pago (Checkout Pro).
 * Crea una preference vía API. Requiere MERCADOPAGO_ACCESS_TOKEN.
 * Implementado end-to-end: solo falta pegar el token (ver SETUP.md).
 */
export class MercadoPagoProvider implements PaymentProvider {
  readonly name = "mercadopago";

  async createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult> {
    if (!env.mercadopagoAccessToken) {
      throw new Error(
        "MERCADOPAGO_ACCESS_TOKEN no configurado. Ver SETUP.md §Mercado Pago."
      );
    }

    const body = {
      items: input.items.map((i) => ({
        id: i.productId,
        title: i.title,
        quantity: i.quantity,
        unit_price: i.unitPriceArs,
        currency_id: "ARS",
      })),
      payer: { email: input.userEmail },
      external_reference: input.purchaseId,
      back_urls: {
        success: input.successUrl,
        failure: input.failureUrl,
        pending: input.pendingUrl,
      },
      auto_return: "approved",
      notification_url: input.notificationUrl,
      metadata: { purchase_id: input.purchaseId, user_id: input.userId },
    };

    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.mercadopagoAccessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Mercado Pago error ${res.status}: ${text}`);
    }

    const data = (await res.json()) as {
      id: string;
      init_point: string;
      sandbox_init_point: string;
    };

    return {
      redirectUrl: data.init_point ?? data.sandbox_init_point,
      providerRef: data.id,
    };
  }
}

/**
 * Consulta el estado de un pago en MP (usado por el webhook).
 * Devuelve el estado crudo del pago y la external_reference (purchaseId).
 */
export async function fetchMercadoPagoPayment(paymentId: string): Promise<{
  status: string;
  externalReference: string | null;
  amount: number | null;
} | null> {
  if (!env.mercadopagoAccessToken) return null;
  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${env.mercadopagoAccessToken}` },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    status: string;
    external_reference: string | null;
    transaction_amount: number | null;
  };
  return {
    status: data.status,
    externalReference: data.external_reference,
    amount: data.transaction_amount,
  };
}
