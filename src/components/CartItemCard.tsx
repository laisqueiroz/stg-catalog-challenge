import { X, Plus, Minus } from "lucide-react";
import type { CartItem } from "../types/CartItem";
import { formatBRL } from "../utils/cartUtils";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, qty: number) => void;
}

export default function CartItemCard({ item, onRemove, onUpdateQty }: CartItemCardProps) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
      <img
        src={item.product.image_url}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium">{item.product.name}</h3>
        <p className="text-sm text-gray-500">{item.product.description}</p>
        <p className="mt-1 font-semibold">{formatBRL(item.product.price)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQty(item.id, item.qty - 1)}
            className="p-1 border rounded"
            disabled={item.qty <= 1}
          >
            <Minus size={14} />
          </button>
          <span>{item.qty}</span>
          <button
            onClick={() => onUpdateQty(item.id, item.qty + 1)}
            className="p-1 border rounded"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-red-500 hover:bg-red-100 rounded-full"
      >
        <X size={20} />
      </button>
    </div>
  );
}
