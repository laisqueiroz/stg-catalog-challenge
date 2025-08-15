// src/pages/CartPage.tsx
import { useCart } from "../contexts/CartContext";
import { formatBRL } from "../utils/cartUtils";
import CartItemCard from "../components/CartItemCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function CartPage() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, loading } = useCart();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);
    
  if (loading) return <p className="text-center mt-8">Carregando carrinho...</p>;

  if (cartItems.length === 0) {
    return <p className="text-center mt-8">Seu carrinho está vazio.</p>;
  }

  const handleFinalizeOrder = async () => {
      if (!user) {
        navigate('/login');
        return;
      }
      navigate('/order-summary');
      return;
    };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <title>STG Catalog | Carrinho</title>
      <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onRemove={removeFromCart}
            onUpdateQty={updateQuantity}
          />
        ))}
      </div>
      <div className="mt-6 border-t pt-4 flex justify-between items-center">
        <span className="text-lg font-bold">Total:</span>
        <span className="text-xl font-bold">{formatBRL(cartTotal)}</span>
      </div>
      <button
        onClick={() => handleFinalizeOrder()}
        className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
