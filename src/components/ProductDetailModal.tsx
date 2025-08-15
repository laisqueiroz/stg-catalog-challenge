import { X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "../types/Product";
import { formatBRL } from "../utils/formatCoin";

interface Props {
  product: Product;
  onClose: () => void;
  onAdd: () => void;
}

export function ProductDetailModal({ product, onClose, onAdd }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="relative z-10 w-full max-w-2xl mx-2 sm:mx-4 bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Botão de fechar (mobile) */}
        <button 
          onClick={onClose} 
          className="sm:hidden fixed top-20 right-2 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Imagem do produto */}
          <div className="w-full md:w-1/2 lg:w-2/5 p-4 sm:p-6">
            <img 
              src={product.image_url} 
              alt={product.name} 
              className="w-full h-auto max-h-64 sm:max-h-80 md:max-h-none object-cover rounded-lg"
            />
          </div>

          {/* Detalhes do produto */}
          <div className="w-full md:w-1/2 lg:w-3/5 p-4 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              </div>
              {/* Botão de fechar (desktop) */}
              <button 
                onClick={onClose} 
                className="hidden sm:block p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-3 sm:mt-4">
              <p className="text-sm sm:text-base text-gray-700">{product.description}</p>
            </div>

            <div className="mt-4 sm:mt-6">
              <div className="text-xl sm:text-2xl font-bold text-gray-900">
                {formatBRL(product.price)}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">Preço à vista</div>
            </div>

            <div className="mt-6 sm:mt-8 space-y-3">
              <button
                onClick={onAdd}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-3 sm:py-2 shadow hover:opacity-90 transition-opacity"
              >
                <Plus size={18} />
                <span>Adicionar ao carrinho</span>
              </button>
              
              <button 
                className="w-full px-4 py-3 sm:py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Comprar agora
              </button>
            </div>

            <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-400">
              <p>Envio estimado: 2-5 dias úteis</p>
              <p className="mt-1">Frete grátis para compras acima de R$ 200,00</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}