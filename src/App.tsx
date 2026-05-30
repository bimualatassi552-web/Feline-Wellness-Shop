/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ViewType, Product, CartItem, Order, PurchaseType } from './types';
import { products, initialOrders } from './data';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { CatalogueView } from './components/CatalogueView';
import { DetailView } from './components/DetailView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { ProfileView } from './components/ProfileView';
import { BlendCursor } from './components/BlendCursor';
import { ProteinPillarView } from './components/ProteinPillarView';
import { SimmerPillarView } from './components/SimmerPillarView';
import { PrebioticsPillarView } from './components/PrebioticsPillarView';

export default function App() {
  // Page routing
  const [currentView, setView] = useState<ViewType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  
  // Cart state with standard localStorage sync
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('feline_wellness_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Client-side Order states persistent sync
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('feline_wellness_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Search input crossing views
  const [searchQuery, setSearchQuery] = useState('');

  // Promo code discounts
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Sync state changes to storage
  useEffect(() => {
    localStorage.setItem('feline_wellness_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('feline_wellness_orders', JSON.stringify(orders));
  }, [orders]);

  // View scroll resetter
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentView, selectedProduct]);

  // 1. ADD TO CART ROUTINE
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    purchaseType: PurchaseType = 'subscription'
  ) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.purchaseType === purchaseType
      );
      if (idx > -1) {
        const updated = [...prevCart];
        updated[idx].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, purchaseType }];
      }
    });
  };

  // Simplistic Card quick-add trigger (defaults to Auto-Ship Subscription because it has high values)
  const handleQuickAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    handleAddToCart(product, 1, 'subscription');
    
    // Smooth user feedback: animate standard button or flash alert (represented cleanly in index)
    const alertBox = document.createElement('div');
    alertBox.className = 'fixed bottom-6 left-6 bg-[#3E5E4E] text-[#FAF8F5] border border-[#2B4537] px-6 py-4.5 rounded-2xl shadow-xl font-sans text-xs font-semibold z-50 animate-fade-in flex items-center gap-2 select-none pointer-events-none';
    alertBox.innerHTML = `🛒 Subscribed and added 1 jar/bag of <strong>${product.name}</strong> to your basket!`;
    document.body.appendChild(alertBox);
    setTimeout(() => {
      alertBox.style.opacity = '0';
      alertBox.style.transform = 'translateY(10px)';
      alertBox.style.transition = 'all 0.4s ease';
      setTimeout(() => alertBox.remove(), 400);
    }, 3500);
  };

  // 2. MODIFY CART QUANTITIES
  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    purchaseType: PurchaseType
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.purchaseType === purchaseType
          ? { ...item, quantity }
          : item
      )
    );
  };

  // 3. REMOVE CUSTOM ITEMS FROM BASKET
  const handleRemoveItem = (productId: string, purchaseType: PurchaseType) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.purchaseType === purchaseType)
      )
    );
  };

  // 4. PERSIST CHECKOUT ORDERS
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  // 5. AUTO-REORDER HISTORICAL PACKS BACK INTO THE CART
  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      const productObj = products.find((p) => p.id === item.id);
      if (productObj) {
        // Assume default One-Time reorder loop
        handleAddToCart(productObj, item.quantity, 'one-time');
      }
    });
    setView('cart'); // Immediately transition to basket so they can finalize
  };

  const handleClearCart = () => {
    setCart([]);
    setPromoCode('');
    setAppliedDiscount(0);
  };

  return (
    <div id="app-root-container" className="min-h-screen flex flex-col justify-between bg-cream selection:bg-gold/30 selection:text-wine font-sans">
      
      {/* 1. Sticky Navigation Header */}
      <Header
        currentView={currentView}
        setView={setView}
        cart={cart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. Main Page Layout Wrapper */}
      <main id="main-view-viewport" className="flex-grow">
        {currentView === 'home' && (
          <HomeView
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleQuickAddToCart}
          />
        )}
        {currentView === 'catalogue' && (
          <CatalogueView
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleQuickAddToCart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {currentView === 'detail' && (
          <DetailView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            setView={setView}
          />
        )}
        {currentView === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            setView={setView}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            appliedDiscount={appliedDiscount}
            setAppliedDiscount={setAppliedDiscount}
          />
        )}
        {currentView === 'checkout' && (
          <CheckoutView
            cart={cart}
            appliedDiscount={appliedDiscount}
            setView={setView}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
        {currentView === 'profile' && (
          <ProfileView
            orders={orders}
            onReorder={handleReorder}
            setView={setView}
          />
        )}
        {currentView === 'proteins-info' && (
          <ProteinPillarView
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleQuickAddToCart}
          />
        )}
        {currentView === 'simmer-info' && (
          <SimmerPillarView
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleQuickAddToCart}
          />
        )}
        {currentView === 'prebiotics-info' && (
          <PrebioticsPillarView
            setView={setView}
            setSelectedProduct={setSelectedProduct}
            onAddToCart={handleQuickAddToCart}
          />
        )}
      </main>

      {/* 3. Global Decorative Footer */}
      <Footer />
      
      {/* 4. Custom mouse blending cursor toggler */}
      <BlendCursor />
      
    </div>
  );
}
