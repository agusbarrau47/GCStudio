/** Contrato del proveedor de pagos. No acoplar la lógica de negocio al proveedor. */

export interface CheckoutItem {
  productId: string; // course-laminado | course-lifting | bundle-full
  title: string;
  quantity: number;
  unitPriceArs: number;
}

export interface CreateCheckoutInput {
  purchaseId: string;
  userId: string;
  userEmail: string;
  items: CheckoutItem[];
  successUrl: string;
  failureUrl: string;
  pendingUrl: string;
  notificationUrl: string;
}

export interface CreateCheckoutResult {
  /** URL a la que redirigir al usuario para pagar. */
  redirectUrl: string;
  /** Referencia del proveedor (preference id, session id, etc.). */
  providerRef: string;
}

export interface PaymentProvider {
  readonly name: string;
  createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult>;
}
