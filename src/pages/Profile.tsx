import React from 'react';
import { User, Package, Award, LogOut } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Profile: React.FC = () => {
  const { state } = useShop();
  
  if (!state.user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <User size={48} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Please sign in to view your profile
        </h2>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="bg-indigo-100 p-3 rounded-full">
              <User size={32} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {state.user.name}
              </h1>
              <p className="text-gray-600">{state.user.email}</p>
            </div>
            <button className="ml-auto text-gray-600 hover:text-red-600">
              <LogOut size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="text-amber-600" size={24} />
                <div>
                  <p className="text-sm text-amber-800">Reward Points</p>
                  <p className="text-2xl font-bold text-amber-900">
                    {state.user.rewardPoints}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <Package className="text-gray-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {state.user.purchaseHistory.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Purchase History
          </h2>
          <div className="space-y-6">
            {state.user.purchaseHistory.map((purchase, index) => (
              <div
                key={index}
                className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
              >
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">
                    {new Date(purchase.date).toLocaleDateString()}
                  </span>
                  <span className="font-medium text-gray-800">
                    ${purchase.total.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {purchase.products.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.product.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};