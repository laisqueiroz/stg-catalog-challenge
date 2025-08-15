import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ProductCard } from "../components/ProductCard";
import { ProductDetailModal } from "../components/ProductDetailModal";
import { Header } from "../components/Header";
import { Filter } from "../components/CategoryFilter";
import type { Product } from "../types/Product";
import { useCart } from "../contexts/CartContext";

type SortOption = "recent" | "price-asc" | "price-desc";

export default function EcommerceCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("recent");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const {
    cartItems,
    cartItemCount,
    cartTotal,
    loading: cartLoading,
    addToCart,
    error: cartError
  } = useCart();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.error("Erro ao buscar produtos:", error);
    else setProducts(data || []);
  }

  const getFilteredProducts = () => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter(p => p.category === categoryFilter);
    }

    return sortProducts(result, sortOption);
  };

  const sortProducts = (products: Product[], option: SortOption): Product[] => {
    const sorted = [...products];
    
    switch (option) {
      case "recent":
        return sorted.sort((a, b) => b.id - a.id);
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const filteredProducts = getFilteredProducts();

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      navigate('/');
    }
  };

  const handleAddToCart = async (product: Product) => {
    await addToCart(product);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <title>Loja Online | Catálogo de Produtos</title>
      
      <Header
        user={user}
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        isMobileMenuOpen={isMobileMenuOpen}
        onLogout={handleLogout}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategoryFilter}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <Filter
          categoryFilter={categoryFilter}
          filteredProductsCount={filteredProducts.length}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          onClearFilters={handleClearFilters}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-500 text-sm sm:text-lg">Nenhum produto encontrado.</p>
            <button 
              onClick={handleClearFilters}
              className="mt-3 sm:mt-4 px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs sm:text-sm"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => handleProductSelect(product)}
                onAdd={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAdd={() => handleAddToCart(selectedProduct)}
        />
      )}
    </div>
  );
}