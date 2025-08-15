import { ShoppingBag, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../types/Product";
import { formatBRL } from "../utils/formatCoin";

interface Props {
  product: Product;
  onSelect: () => void;
  onAdd: () => void;
}

export function ProductCard({ product, onSelect, onAdd }: Props) {
  return (
    <motion.article
      layout
      whileHover={{ y: -5 }}
      onClick={onSelect}
      className="group bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:opacity-90 transition-opacity"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Implementar favoritos depois
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-red-100 hover:text-red-500 transition-colors"
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.category}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900">{formatBRL(product.price)}</p>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}