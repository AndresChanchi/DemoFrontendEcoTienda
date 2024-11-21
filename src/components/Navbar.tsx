import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const { state } = useShop();
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            EcoModAmbiental
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/favorites"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Heart size={24} />
            </Link>
            <Link
              to="/cart"
              className="text-gray-600 hover:text-indigo-600 transition-colors relative"
            >
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link
              to={state.isAuthenticated ? "/profile" : "/login"}
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <User size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
