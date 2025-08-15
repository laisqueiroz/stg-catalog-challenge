// src/contexts/CartContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";
import { mapSupabaseItem } from "../services/cartService";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartItemCount: number;
  cartTotal: number;
  loading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar carrinho inicial
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data } = await supabase
            .from("cart_items")
            .select("id, quantity, product_id(*)")
            .eq("user_id", session.user.id);

          if (data) {
            setCartItems(data.map(mapSupabaseItem));
          }
        } else {
          const localCart = localStorage.getItem("cart");
          setCartItems(localCart ? JSON.parse(localCart) : []);
        }
      } catch (err) {
        setError("Falha ao carregar o carrinho");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Sincronizar carrinho local quando o estado muda (para usuários não autenticados)
  useEffect(() => {
  if (!loading) {
    const syncCartToLocalStorage = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
    };
    syncCartToLocalStorage();
  }
}, [cartItems, loading]);

  // Adicionar item ao carrinho
  const addToCart = async (product: Product) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setLoading(true);

      // Verifica se o produto já está no carrinho
      const existingItem = cartItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Atualiza quantidade se já existir
        await updateQuantity(existingItem.id, existingItem.qty + 1);
        return;
      }

      if (session?.user) {
        // Adiciona no Supabase para usuário logado
        const { data, error } = await supabase
          .from("cart_items")
          .insert([{
            user_id: session.user.id,
            product_id: product.id,
            quantity: 1
          }])
          .select("id, quantity, product_id(*)")
          .single();

        if (error) throw error;
        if (data) {
          setCartItems(prev => [...prev, mapSupabaseItem(data)]);
        }
      } else {
        // Adiciona localmente para usuário não logado
        const newItem: CartItem = {
          id: Date.now(), // ID temporário
          qty: 1,
          product
        };
        setCartItems(prev => [...prev, newItem]);
      }
    } catch (err) {
      setError("Falha ao adicionar item ao carrinho");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Remover item do carrinho
  const removeFromCart = async (itemId: number) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setLoading(true);

      if (session?.user) {
        // Remove do Supabase
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("id", itemId);

        if (error) throw error;
      }

      // Atualiza estado local
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (err) {
      setError("Falha ao remover item do carrinho");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Atualizar quantidade de um item
  const updateQuantity = async (itemId: number, qty: number) => {
    if (qty < 1) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      setLoading(true);

      if (session?.user) {
        // Atualiza no Supabase
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: qty })
          .eq("id", itemId);

        if (error) throw error;
      }

      // Atualiza estado local
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, qty } : item
        )
      );
    } catch (err) {
      setError("Falha ao atualizar quantidade");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Limpar carrinho (local + Supabase)
  const clearCart = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Apaga no banco
        await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", session.user.id);
      } else {
        // Apaga localStorage
        localStorage.removeItem("cart");
      }
      // Atualiza estado local
      setCartItems([]);
    } catch (err) {
      setError("Erro ao limpar o carrinho");
      console.error(err);
    }
  };

  // Calcular totais
  const cartItemCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartItemCount,
        cartTotal,
        loading,
        error
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa ser usado dentro de CartProvider");
  return ctx;
}