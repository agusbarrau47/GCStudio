export type ProductCategory =
  | "Kits Profesionales"
  | "Aftercare & Hogar"
  | "Insumos & Descartables"
  | "Skincare & Mirada";

export interface CrossSellInfo {
  type: "course" | "service";
  title: string;
  url: string;
  badge: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  priceArs: number;
  image: string;
  badge?: string;
  shortDesc: string;
  description: string;
  benefits: string[];
  howToUse: string;
  anmatApproved: boolean;
  stock: boolean;
  crossSell?: CrossSellInfo;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
