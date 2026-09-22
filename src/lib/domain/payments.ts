import type { PurchaseStatus } from "@/lib/types";

/**
 * Mapeo PURO del estado de Mercado Pago a nuestro estado de compra. Testeable.
 * Referencia de estados de MP: approved, pending, in_process, rejected, cancelled, refunded, charged_back.
 */
export function mapMercadoPagoStatus(mpStatus: string): PurchaseStatus {
  switch (mpStatus) {
    case "approved":
      return "paid";
    case "pending":
    case "in_process":
    case "authorized":
      return "pending";
    case "rejected":
      return "rejected";
    case "cancelled":
      return "cancelled";
    case "refunded":
    case "charged_back":
      return "refunded";
    default:
      return "pending";
  }
}

/**
 * ¿Un estado concede acceso? Solo "paid".
 * El acceso NUNCA se concede por el retorno del usuario a /success, solo por webhook validado.
 */
export function statusGrantsAccess(status: PurchaseStatus): boolean {
  return status === "paid";
}

/**
 * Idempotencia PURA: dado un set de event ids ya procesados, ¿debemos procesar este?
 */
export function shouldProcessEvent(
  processedEventIds: Set<string>,
  eventId: string
): boolean {
  if (!eventId) return false;
  return !processedEventIds.has(eventId);
}
