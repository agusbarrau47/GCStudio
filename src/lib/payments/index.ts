import type { PaymentProvider } from "./provider";
import { MercadoPagoProvider } from "./mercadopago";
import { MockPaymentProvider } from "./mock";
import { env } from "@/lib/env";

/** Selecciona el proveedor de pagos según PAYMENT_PROVIDER. Extensible a Stripe. */
export function getPaymentProvider(): PaymentProvider {
  switch (env.paymentProvider) {
    case "mercadopago":
      return new MercadoPagoProvider();
    // case "stripe": return new StripeProvider(); // arquitectura preparada
    default:
      return new MockPaymentProvider();
  }
}

export type { PaymentProvider, CheckoutItem, CreateCheckoutInput } from "./provider";
