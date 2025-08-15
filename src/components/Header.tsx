import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface HeaderProps {
  user: any;
  searchTerm: string;
  categoryFilter: string;
  isMobileMenuOpen: boolean;
  onLogout: () => void;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onMobileMenuToggle: () => void;
}

export function Header({
  user,
  searchTerm,
  categoryFilter,
  isMobileMenuOpen,
  onLogout,
  onSearchChange,
  onCategoryChange,
  onMobileMenuToggle,
}: HeaderProps) {
  const navigate = useNavigate();
  const { cartItemCount, loading: loadingCart } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-2 sm:px-4">
        {/* Top bar - versão mobile */}
        <div className="flex items-center justify-between py-2 sm:py-3">
          <div className="flex items-center ml-3">
            <h1 
              className="text-xl sm:text-sm lg:text-4xl font-bold text-blue-600 cursor-pointer" 
              onClick={() => navigate("/")}
            >
              STG Catalog
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline text-sm">{user.email}</span>
                <button 
                  onClick={onLogout}
                  className="text-sm text-gray-700 hover:text-blue-600"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">Entrar</span>
              </button>
            )}
            
            <button 
              onClick={() => navigate("/cart")}
              className="relative p-2 text-gray-700 hover:text-blue-600"
              disabled={loadingCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Carrinho</span>
            </button>
          </div>
        </div>

        {/* Barra de busca - mobile */}
        <div className="flex flex-row justify-between pb-2 px-2 md:hidden">
          <div className="relative w-full mr-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
            onClick={onMobileMenuToggle}
            className="p-2 mr-2 text-gray-700 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Barra de busca - desktop */}
        <div className="hidden md:flex items-center justify-between py-2 border-t">
          <div className="relative flex-1 max-w-xl mr-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Categorias - desktop */}
          <nav className="hidden md:flex space-x-2 lg:space-x-4">
            <button 
              onClick={() => onCategoryChange("all")}
              className={`px-2 py-1 text-xs lg:text-sm font-medium rounded-md ${categoryFilter === "all" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => onCategoryChange("Eletrodomésticos")}
              className={`px-2 py-1 text-xs lg:text-sm font-medium rounded-md ${categoryFilter === "Eletrodomésticos" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Eletro
            </button>
            <button 
              onClick={() => onCategoryChange("Roupas")}
              className={`px-2 py-1 text-xs lg:text-sm font-medium rounded-md ${categoryFilter === "Roupas" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Roupas
            </button>
            <button 
              onClick={() => onCategoryChange("Calçados")}
              className={`px-2 py-1 text-xs lg:text-sm font-medium rounded-md ${categoryFilter === "Calçados" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Calçados
            </button>
            <button 
              onClick={() => onCategoryChange("Casa")}
              className={`px-2 py-1 text-xs lg:text-sm font-medium rounded-md ${categoryFilter === "Casa" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Casa
            </button>
          </nav>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => {
                onCategoryChange("all");
                onMobileMenuToggle();
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${categoryFilter === "all" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => {
                onCategoryChange("Eletrodomésticos");
                onMobileMenuToggle();
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${categoryFilter === "Eletrodomésticos" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Eletrodomésticos
            </button>
            <button 
              onClick={() => {
                onCategoryChange("Roupas");
                onMobileMenuToggle();
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${categoryFilter === "Roupas" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Roupas
            </button>
            <button 
              onClick={() => {
                onCategoryChange("Calçados");
                onMobileMenuToggle();
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${categoryFilter === "Calçados" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Calçados
            </button>
            <button 
              onClick={() => {
                onCategoryChange("Casa");
                onMobileMenuToggle();
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${categoryFilter === "Casa" ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Casa
            </button>
          </div>
        </div>
      )}
    </header>
  );
}