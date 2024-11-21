import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useShop();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/product/${product.id}`}
          className="text-lg font-semibold text-gray-800 hover:text-indigo-600"
        >
          {product.title}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            ${product.price}
          </span>
          <div className="flex items-center space-x-1 text-amber-500">
            <Star size={16} className="fill-current" />
            <span className="text-sm">{product.rewardPoints} points</span>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <span>{product.size}</span>
          <span>{product.condition}</span>
        </div>
        <button
          onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};