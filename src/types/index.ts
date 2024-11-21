export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  size: string;
  category: string;
  image: string;
  rewardPoints: number;
  condition: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  rewardPoints: number;
  purchaseHistory: {
    date: string;
    products: CartItem[];
    total: number;
  }[];
}