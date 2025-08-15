import { supabase } from "../lib/supabase";
import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";

export async function getSessionUser() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session?.user || null;
}

export function mapSupabaseItem(item: any): CartItem {
  return {
    id: item.id,
    product: {
      id: item.product_id.id,
      name: item.product_id.name,
      description: item.product_id.description,
      price: item.product_id.price,
      category: item.product_id.category,
      image_url: item.product_id.image_url,
    },
    qty: item.quantity,
  };
}

export function getLocalCart(): CartItem[] {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

export function saveLocalCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export async function fetchSupabaseCart(userId: string) {
  const { data, error } = await supabase
    .from("cart_items")
    .select(`id, quantity, product_id:products(*)`)
    .eq("user_id", userId);

  if (error) throw error;
  return data.map(mapSupabaseItem);
}

export async function syncLocalToSupabase(userId: string) {
  const localCart = getLocalCart();
  const supabaseCart = await fetchSupabaseCart(userId);

  for (const localItem of localCart) {
    const existingItem = supabaseCart.find(i => i.product.id === localItem.product.id);
    if (existingItem) {
      await supabase
        .from("cart_items")
        .update({ quantity: existingItem.qty + localItem.qty })
        .eq("id", existingItem.id);
    } else {
      await supabase
        .from("cart_items")
        .insert({
          user_id: userId,
          product_id: localItem.product.id,
          quantity: localItem.qty,
        });
    }
  }
  saveLocalCart([]);
  return fetchSupabaseCart(userId);
}

export async function addItem(userId: string | null, product: Product) {
  if (userId) {
    const existing = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", product.id)
      .single();

    if (existing.data) {
      await supabase
        .from("cart_items")
        .update({ quantity: existing.data.quantity + 1 })
        .eq("id", existing.data.id);
    } else {
      await supabase
        .from("cart_items")
        .insert({ user_id: userId, product_id: product.id, quantity: 1 });
    }
    return fetchSupabaseCart(userId);
  } else {
    const localCart = getLocalCart();
    const existingItem = localCart.find(i => i.product.id === product.id);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      localCart.push({ id: Date.now(), product, qty: 1 });
    }
    saveLocalCart(localCart);
    return localCart;
  }
}

export async function removeItem(userId: string | null, itemId: number) {
  if (userId) {
    await supabase.from("cart_items").delete().eq("id", itemId);
    return fetchSupabaseCart(userId);
  } else {
    const localCart = getLocalCart().filter(i => i.id !== itemId);
    saveLocalCart(localCart);
    return localCart;
  }
}

export async function updateItemQty(userId: string | null, itemId: number, qty: number) {
  if (userId) {
    await supabase.from("cart_items").update({ quantity: qty }).eq("id", itemId);
    return fetchSupabaseCart(userId);
  } else {
    const localCart = getLocalCart().map(i => i.id === itemId ? { ...i, qty } : i);
    saveLocalCart(localCart);
    return localCart;
  }
}