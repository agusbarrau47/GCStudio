/** Tipos de la tienda compartidos (client-safe, sin IO). */

export interface StoreSettings {
  shippingFlatArs: number;
  freeShippingThresholdArs: number | null;
}

export interface ShippingInput {
  method: "retiro" | "envio";
  name: string;
  phone: string;
  address?: string;
  city?: string;
  province?: string;
  zip?: string;
  notes?: string;
}

export interface CartLineInput {
  productId: string;
  quantity: number;
}
