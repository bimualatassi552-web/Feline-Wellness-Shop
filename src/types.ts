/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ViewType = 'home' | 'catalogue' | 'detail' | 'cart' | 'checkout' | 'profile' | 'proteins-info' | 'simmer-info' | 'prebiotics-info' | 'immune-booster-info' | 'premium-salmon-info' | 'satiety-fiber-info';

export type PurchaseType = 'one-time' | 'subscription';

export interface Product {
  id: string;
  name: string;
  category: 'wet' | 'dry' | 'treats' | 'supplements';
  subcategory: string;
  price: number;
  rating: number;
  reviewsCount: number;
  isBestseller: boolean;
  isNew: boolean;
  image: string;
  tags: string[];
  description: string;
  ingredients: string;
  guaranteedAnalysis: {
    protein: string;
    fat: string;
    fiber: string;
    moisture: string;
    ash: string;
    taurine: string;
    calories: string;
  };
  benefits: string[];
  galleryImages: string[];
  size?: string;
  caloriesSummary?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  purchaseType: PurchaseType;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  amount: number;
  items: OrderItem[];
  status: 'Delivered' | 'Shipped';
  shippingInfo?: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
  };
}
