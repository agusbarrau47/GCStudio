import type {
  CreateCheckoutInput,
  CreateCheckoutResult,
  PaymentProvider,
} from "./provider";

/**
 * Proveedor MOCK (solo desarrollo). Simula un checkout que redirige a una
 * pantalla local de éxito simulado. NO concede acceso en producción.
 */
export class MockPaymentProvider implements PaymentProvider {
  readonly name = "mock";

  async createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult> {
    const params = new URLSearchParams({
      purchase: input.purchaseId,
      demo: "1",
    });
    return {
      redirectUrl: `/checkout/mock?${params.toString()}`,
      providerRef: `mock-${input.purchaseId}`,
    };
  }
}
