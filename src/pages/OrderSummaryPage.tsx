// src/pages/OrderSummaryPage.tsx
import { useCart } from "../contexts/CartContext";
import { formatBRL } from "../utils/cartUtils";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSummaryPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setNome(user.user_metadata?.full_name || "Cliente não informado");
        setEmail(user.email || "Email não informado");
      }
    }
    fetchUser();
  }, []);

  function gerarMensagem() {
    const produtosTexto = cartItems
      .map(
        (item) =>
          `- ${item.product.name} - Qtd: ${item.qty} - ${formatBRL(item.product.price)}`
      )
      .join("\n");

    return `*NOVO PEDIDO - STG CATALOG*\n\n` +
      `*Cliente:* ${nome}\n` +
      `*Email:* ${email}\n\n` +
      `*PRODUTOS:*\n${produtosTexto}\n\n` +
      `*TOTAL: ${formatBRL(cartTotal)}*\n\n` +
      `---\n` +
      `Pedido realizado via STG Catalog Link wa.me automático`;
  }

  function handleConfirm() {
    const mensagem = encodeURIComponent(gerarMensagem());
    const numeroWhatsApp = "5599999999999"; // seu número com DDI + DDD
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, "_blank");
    clearCart();
    navigate("/");
  }

  if (cartItems.length === 0) {
    return <p className="text-center mt-8">Seu carrinho está vazio.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resumo do Pedido</h1>
      <div className="mb-4 p-4 border rounded">
        <p><strong>Cliente:</strong> {nome}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
      <div className="space-y-2 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-2">
            <span>{item.product.name} (Qtd: {item.qty})</span>
            <span>{formatBRL(item.product.price * item.qty)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between font-bold text-lg">
        <span>Total:</span>
        <span>{formatBRL(cartTotal)}</span>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/cart")}
          className="flex-1 bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
        >
          Voltar
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Confirmar e Enviar
        </button>
      </div>
    </div>
  );
}
