import React from 'react';
import { Filter } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
  filters: {
    category: string;
    size: string;
    priceRange: string;
    sortBy: string;
  };
}

export const Filters: React.FC<FiltersProps> = ({ onFilterChange, filters }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter size={20} className="text-indigo-600" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={filters.category}
          onChange={(e) =>
            onFilterChange({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="dresses">Dresses</option>
          <option value="outerwear">Outerwear</option>
          <option value="accessories">Accessories</option>
        </select>

        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={filters.size}
          onChange={(e) => onFilterChange({ ...filters, size: e.target.value })}
        >
          <option value="">All Sizes</option>
          <option value="xs">XS</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
          <option value="xl">XL</option>
        </select>

        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={filters.priceRange}
          onChange={(e) =>
            onFilterChange({ ...filters, priceRange: e.target.value })
          }
        >
          <option value="">All Prices</option>
          <option value="0-25">$0 - $25</option>
          <option value="25-50">$25 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100+">$100+</option>
        </select>

        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="points">Most Points</option>
        </select>
      </div>
    </div>
  );
};