import { ChevronDown } from "lucide-react";

type SortOption = "recent" | "price-asc" | "price-desc";

interface FilterProps {
  categoryFilter: string;
  filteredProductsCount: number;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  onClearFilters: () => void;
}

export function Filter({
  categoryFilter,
  filteredProductsCount,
  sortOption,
  onSortChange,
  onClearFilters,
}: FilterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
        {categoryFilter === "all" ? "Todos os produtos" : categoryFilter}
        <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">
          ({filteredProductsCount} {filteredProductsCount === 1 ? 'item' : 'itens'})
        </span>
      </h2>
      
      <div className="flex items-center w-full sm:w-auto">
        <label htmlFor="sort" className="text-xs sm:text-sm font-medium text-gray-700 mr-2">
          Ordenar:
        </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => {
            const value = e.target.value as SortOption;
            onSortChange(value);
          }}
          className="border border-gray-300 rounded-md bg-white py-1 pl-2 pr-6 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="recent">Mais recentes</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
        </select>
      </div>
    </div>
  );
}