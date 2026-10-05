import "server-only";
import { randomUUID } from "node:crypto";
import { isMockMode } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getProducts } from "@/lib/data/products";
import type { CheckoutItem } from "@/lib/payments";
import type { StoreSettings, ShippingInput, CartLineInput } from "@/lib/commerce/orders";
export type { StoreSettings, ShippingInput, CartLineInput } from "@/lib/commerce/orders";

const DEFAULT_SETTINGS: StoreSettings = { shippingFlatArs: 0, freeShippingThresholdArs: null };

export async function getStoreSettings(): Promise<StoreSettings> {
  if (isMockMode) return DEFAULT_SETTINGS;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return DEFAULT_SETTINGS;
  const { data } = await supabase
    .from("store_settings")
    .select("shipping_flat_ars, free_shipping_threshold_ars")
    .eq("id", 1)
    .single();
  if (!data) return DEFAULT_SETTINGS;
  return {
    shippingFlatArs: data.shipping_flat_ars ?? 0,
    freeShippingThresholdArs: data.free_shipping_threshold_ars ?? null,
  };
}

export async function adminSetStoreSettings(s: StoreSettings): Promise<void> {
  if (isMockMode) return;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return;
  const { error } = await supabase
    .from("store_settings")
    .upsert(
      { id: 1, shipping_flat_ars: s.shippingFlatArs, free_shipping_threshold_ars: s.freeShippingThresholdArs },
      { onConflict: "id" }
    );
  if (error) throw new Error("No se pudieron guardar los datos de envío: " + error.message);
}

export interface ProductOrder {
  purchaseId: string;
  items: CheckoutItem[];
  amountArs: number;
}

/**
 * Crea una orden de productos en estado PENDING.
 * SEGURIDAD: los precios se toman SIEMPRE del catálogo del server (DB/fallback),
 * nunca del cliente. Devuelve los items para generar la preferencia de pago.
 */
export async function createProductPurchase(
  userId: string,
  lines: CartLineInput[],
  shipping: ShippingInput
): Promise<ProductOrder | null> {
  const catalog = await getProducts();
  const byId = new Map(catalog.map((p) => [p.id, p]));

  const items: CheckoutItem[] = [];
  let subtotal = 0;
  for (const l of lines) {
    const p = byId.get(l.productId);
    const qty = Math.max(1, Math.min(99, Math.floor(l.quantity)));
    if (!p || !p.priceArs || p.priceArs <= 0) continue;
    items.push({ productId: p.id, title: p.name, quantity: qty, unitPriceArs: p.priceArs });
    subtotal += p.priceArs * qty;
  }
  if (items.length === 0) return null;

  let shipCost = 0;
  if (shipping.method === "envio") {
    const st = await getStoreSettings();
    const freeOver = st.freeShippingThresholdArs;
    shipCost = freeOver != null && subtotal >= freeOver ? 0 : st.shippingFlatArs;
    if (shipCost > 0) {
      items.push({ productId: "shipping", title: "Envío a domicilio", quantity: 1, unitPriceArs: shipCost });
    }
  }

  const amount = subtotal + shipCost;
  const purchaseId = randomUUID();

  if (isMockMode) {
    return { purchaseId, items, amountArs: amount };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const { error } = await supabase.from("purchases").insert({
    id: purchaseId,
    user_id: userId,
    status: "pending",
    amount_ars: amount,
    provider: process.env.PAYMENT_PROVIDER || "mercadopago",
    kind: "product",
    shipping,
  });
  if (error) throw new Error("No se pudo crear la orden: " + error.message);

  await supabase.from("purchase_items").insert(
    items.map((i) => ({
      purchase_id: purchaseId,
      product_id: i.productId,
      title: i.title,
      amount_ars: i.unitPriceArs * i.quantity,
    }))
  );

  return { purchaseId, items, amountArs: amount };
}


export interface AdminOrder {
  id: string;
  createdAt: string;
  status: string;
  amountArs: number | null;
  buyerEmail: string | null;
  shipping: ShippingInput | null;
  items: { title: string; amountArs: number | null }[];
}

export async function adminListProductOrders(): Promise<AdminOrder[]> {
  if (isMockMode) return [];
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("purchases")
    .select("id, status, amount_ars, created_at, shipping, profiles(email), purchase_items(title, amount_ars)")
    .eq("kind", "product")
    .order("created_at", { ascending: false });
  return ((data as any[]) ?? []).map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    status: r.status,
    amountArs: r.amount_ars,
    buyerEmail: r.profiles?.email ?? null,
    shipping: (r.shipping as ShippingInput) ?? null,
    items: (r.purchase_items ?? []).map((i: any) => ({ title: i.title, amountArs: i.amount_ars })),
  }));
}
