import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Cart: React.FC = () => {
  const { state, dispatch } = useShop();
  
  const totalAmount = state.cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const totalPoints = state.cart.reduce(
    (sum, item) => sum + item.product.rewardPoints * item.quantity,
    0
  );

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
        >
          <span>Continue Shopping</span>
          <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {state.cart.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
            >
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-grow">
                <h3 className="font-medium text-gray-800">
                  {item.product.title}
                </h3>
                <p className="text-gray-600">Size: {item.product.size}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch({
                        type: 'UPDATE_QUANTITY',
                        payload: {
                          productId: item.product.id,
                          quantity: Number(e.target.value),
                        },
                      })
                    }
                    className="rounded border-gray-300"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() =>
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: item.product.id,
                      })
                    }
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-lg text-gray-800">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-amber-600">
                  +{item.product.rewardPoints * item.quantity} points
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{totalAmount >= 50 ? 'Free' : '$4.99'}</span>
            </div>
            <div className="flex justify-between text-amber-600">
              <span>Points to earn</span>
              <span>+{totalPoints}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>
                  ${(totalAmount + (totalAmount >= 50 ? 0 : 4.99)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};