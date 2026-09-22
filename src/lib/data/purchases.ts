import "server-only";
import { randomUUID } from "node:crypto";
import type { CheckoutItem } from "@/lib/payments";
import type { Purchase } from "@/lib/types";
import { isMockMode } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getProduct } from "@/lib/commerce/products";
import { mockStore } from "@/lib/data/mock-store";

export interface NewPurchase {
  purchaseId: string;
  items: CheckoutItem[];
  amountArs: number | null;
  productId: string;
}

/**
 * Crea una compra en estado PENDING y sus items. Devuelve los datos para el checkout.
 * El acceso NO se concede aquí; solo tras la validación del webhook.
 */
export async function createPendingPurchase(
  userId: string,
  productId: string
): Promise<NewPurchase | null> {
  const product = getProduct(productId);
  if (!product) return null;

  const purchaseId = randomUUID();
  const items: CheckoutItem[] = [
    {
      productId: product.id,
      title: product.title,
      quantity: 1,
      unitPriceArs: product.priceArs ?? 0,
    },
  ];

  if (isMockMode) {
    mockStore.addPurchase({
      id: purchaseId,
      userId,
      status: "pending",
      amountArs: product.priceArs,
      provider: "mock",
      providerRef: null,
      createdAt: new Date().toISOString(),
      items: [{ productId: product.id, title: product.title, amountArs: product.priceArs }],
    });
    return { purchaseId, items, amountArs: product.priceArs, productId: product.id };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { error } = await supabase.from("purchases").insert({
    id: purchaseId,
    user_id: userId,
    status: "pending",
    amount_ars: product.priceArs,
    provider: process.env.PAYMENT_PROVIDER || "mercadopago",
  });
  if (error) throw new Error(`No se pudo crear la compra: ${error.message}`);

  await supabase.from("purchase_items").insert({
    purchase_id: purchaseId,
    product_id: product.id,
    title: product.title,
    amount_ars: product.priceArs,
  });

  return { purchaseId, items, amountArs: product.priceArs, productId: product.id };
}

export async function setPurchaseProviderRef(purchaseId: string, ref: string) {
  if (isMockMode) return;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  await supabase.from("purchases").update({ provider_ref: ref }).eq("id", purchaseId);
}

/**
 * Marca la compra como pagada y crea los enrollments correspondientes. IDEMPOTENTE.
 * Usa el cliente admin (contexto webhook, sin sesión de usuario).
 * Devuelve false si la compra no existe.
 */
export async function markPurchasePaidAndEnroll(
  purchaseId: string
): Promise<boolean> {
  if (isMockMode) {
    // En mock no hay webhook real; el flujo mock concede acceso en /checkout/mock.
    return true;
  }

  const admin = createSupabaseAdminClient();
  if (!admin) throw new Error("SUPABASE_SERVICE_ROLE_KEY requerido para el webhook.");

  const { data: purchase } = await admin
    .from("purchases")
    .select("id, user_id, status, purchase_items(product_id)")
    .eq("id", purchaseId)
    .single();

  if (!purchase) return false;

  // Idempotencia: si ya está pagada, no reprocesamos.
  if (purchase.status === "paid") return true;

  await admin.from("purchases").update({ status: "paid" }).eq("id", purchaseId);

  // Expandir productos → cursos y crear enrollments (upsert = idempotente).
  const courseIds = new Set<string>();
  for (const item of purchase.purchase_items ?? []) {
    const product = getProduct(item.product_id);
    product?.grants.forEach((c) => courseIds.add(c));
  }

  for (const courseId of courseIds) {
    await admin.from("enrollments").upsert(
      {
        user_id: purchase.user_id,
        course_id: courseId,
        status: "active",
        source_purchase_id: purchaseId,
      },
      { onConflict: "user_id,course_id" }
    );
  }

  return true;
}

/** Concede acceso en modo MOCK (checkout simulado). Solo desarrollo. */
export async function mockGrantAccess(
  userId: string,
  productId: string,
  purchaseId: string
): Promise<void> {
  const product = getProduct(productId);
  if (!product) return;
  const existing = mockStore.getPurchases(userId).find((p) => p.id === purchaseId);
  if (existing) existing.status = "paid";
  for (const courseId of product.grants) {
    mockStore.setEnrollment(userId, courseId, "active");
  }
}

export async function getPurchaseById(
  purchaseId: string,
  userId: string
): Promise<Purchase | null> {
  if (isMockMode) {
    return mockStore.getPurchases(userId).find((p) => p.id === purchaseId) ?? null;
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("purchases")
    .select("id, user_id, status, amount_ars, provider, provider_ref, created_at, purchase_items(product_id, title, amount_ars)")
    .eq("id", purchaseId)
    .single();
  if (!data) return null;
  return {
    id: data.id,
    userId: data.user_id,
    status: data.status,
    amountArs: data.amount_ars,
    provider: data.provider,
    providerRef: data.provider_ref,
    createdAt: data.created_at,
    items: (data.purchase_items ?? []).map((i: { product_id: string; title: string; amount_ars: number | null }) => ({
      productId: i.product_id,
      title: i.title,
      amountArs: i.amount_ars,
    })),
  };
}
