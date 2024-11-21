import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, Shield, Package, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { mockProducts } from '../data/mockData';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { dispatch } = useShop();
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-lg shadow-lg object-cover aspect-square"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-indigo-600 shadow-md">
              {product.condition}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-indigo-600">
              ${product.price}
            </span>
            <div className="flex items-center space-x-1 bg-amber-50 px-3 py-1 rounded-full">
              <Star size={16} className="text-amber-500 fill-current" />
              <span className="text-sm font-medium text-amber-700">
                Earn {product.rewardPoints} points
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-lg">{product.description}</p>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Size:</span>
            <span className="font-medium">{product.size}</span>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-3 text-gray-600">
              <Shield size={20} />
              <span>Quality-checked by our experts</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Package size={20} />
              <span>Free shipping on orders over $50</span>
            </div>
          </div>

          <button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};