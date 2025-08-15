import type { Product } from "./Product";

export interface CartItem {
  id: number;
  product: Product;
  qty: number;
}