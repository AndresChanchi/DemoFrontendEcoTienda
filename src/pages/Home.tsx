import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Filters } from '../components/Filters';
import { Product } from '../types';

// Mock data - In a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket in excellent condition',
    price: 45.99,
    size: 'M',
    category: 'outerwear',
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800',
    rewardPoints: 46,
    condition: 'Excellent',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Floral Summer Dress',
    description: 'Beautiful floral print dress perfect for summer',
    price: 29.99,
    size: 'S',
    category: 'dresses',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
    rewardPoints: 30,
    condition: 'Like New',
    createdAt: '2024-03-14',
  },
  // Add more mock products here
];

export const Home: React.FC = () => {
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    priceRange: '',
    sortBy: 'newest',
  });

  const filteredProducts = mockProducts
    .filter((product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.size && product.size !== filters.size) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max && (product.price < min || product.price > max)) return false;
        if (!max && product.price < min) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'points':
          return b.rewardPoints - a.rewardPoints;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Descubre EcoModa más ambiental con Betty la Fea e Irma :D
      </h1>
      <Filters filters={filters} onFilterChange={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
