import type { Product } from "./Product";

export interface SupabaseCartItem {
  id: number;
  quantity: number;
  product_id: Product;
}

export interface SupabaseProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  created_at: string;
}