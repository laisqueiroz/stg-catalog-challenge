import type { CartItem } from "../types/CartItem";

export function calculateCartCount(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

export function calculateCartTotal(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
