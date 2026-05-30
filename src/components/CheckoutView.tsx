/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Lock, CreditCard, ShieldCheck, CheckCircle2, ArrowRight, HeartPulse, RefreshCw, Sparkles, X } from 'lucide-react';
import { CartItem, Order, ViewType } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  appliedDiscount: number;
  setView: (view: ViewType) => void;
  onClearCart: () => void;
  onPlaceOrder: (newOrder: Order) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  appliedDiscount,
  setView,
  onClearCart,
  onPlaceOrder,
}) => {
  // Shipping info states
  const [firstName, setFirstName] = useState('Eleanor');
  const [lastName, setLastName] = useState('Vance');
  const [address, setAddress] = useState('214 Magnolia Lane');
  const [city, setCity] = useState('Savannah');
  const [zipCode, setZipCode] = useState('31401');

  // Shipping strategy states
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');

  // Interactive purchase inputs
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [expiry, setExpiry] = useState('09/29');
  const [cvv, setCvv] = useState('382');

  // Submit flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Calculations
  const subtotal = cart.reduce((sum, item) => {
    const rawPrice = item.product.price;
    const finalPrice = item.purchaseType === 'subscription' ? rawPrice * 0.85 : rawPrice;
    return sum + (finalPrice * item.quantity);
  }, 0);

  const discountAmount = subtotal * appliedDiscount;
  const taxableAmount = subtotal - discountAmount;
  const shippingCost = shippingMethod === 'express' ? 12.00 : 0.00;
  const taxRate = 0.0825; // 8.25%
  const estimatedTax = taxableAmount * taxRate;
  const orderTotal = taxableAmount + estimatedTax + shippingCost;

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !address || !city || !zipCode) {
      alert('Please fill out all shipping fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database secure writing
    setTimeout(() => {
      const generatedId = `FLN-${Math.floor(1000 + Math.random() * 9000)}-X`;
      const curDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      const orderItems = cart.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.purchaseType === 'subscription' ? item.product.price * 0.85 : item.product.price,
        quantity: item.quantity,
        image: item.product.image
      }));

      const newOrder: Order = {
        id: generatedId,
        date: curDate,
        amount: orderTotal,
        items: orderItems,
        status: shippingMethod === 'express' ? 'Shipped' : 'Delivered', // Express shipped instantly!
        shippingInfo: { firstName, lastName, address, city, zipCode }
      };

      onPlaceOrder(newOrder);
      setOrderId(generatedId);
      setIsSubmitting(false);
      setIsSuccess(true);
      onClearCart(); // Empty active shopping basket
    }, 1500);
  };

  return (
    <div id="checkout-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {isSuccess ? (
        /* SUCCESS PORTAL SCREEN */
        <div id="checkout-success-portal" className="max-w-xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-stone-100/90 text-center space-y-6 animate-fade-in shadow-xl">
          <div className="w-20 h-20 bg-moss/10 text-moss rounded-full flex items-center justify-center mx-auto shadow-sm animate-bounce">
            <CheckCircle2 size={40} />
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#2C5E3B] font-extrabold uppercase block">TRANSACTION AUTHORIZED SUCCESSFUL</span>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-wine tracking-tight">
              Order Placed, Member Eleanor!
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed font-sans">
              Your gourmet nutrition order is locked and being potted at our Georgia facility. An insulation packing code has been transmitted.
            </p>
          </div>

          <div className="bg-[#FAF8F5] border border-stone-200/50 p-5 rounded-2xl text-left font-mono text-xs space-y-2.5 max-w-sm mx-auto">
            <div className="flex justify-between">
              <span className="text-stone-400">ORDER NO:</span>
              <span className="font-bold text-stone-800">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">EST ARRIVAL:</span>
              <span className="font-bold text-moss">In 2-3 Business Days</span>
            </div>
            <div className="flex justify-between border-t border-stone-200/60 pt-2 text-[#1E1A17] font-sans font-bold text-xs">
              <span>INVESTMENT AMOUNT:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="pt-2 space-y-3 max-w-sm mx-auto">
            <button
              id="view-orders-success-btn"
              onClick={() => setView('profile')}
              className="w-full bg-wine hover:bg-wine-dark text-white font-extrabold uppercase text-xs tracking-wider py-4 rounded-xl transition-all shadow-md select-none flex items-center justify-center gap-1.5"
            >
              Track inside Pet Parent Hub &rarr;
            </button>
            <button
              onClick={() => setView('catalogue')}
              className="w-full bg-white hover:bg-[#FAF8F5] text-stone-600 border border-stone-300 font-bold uppercase text-xs tracking-wider py-4 rounded-xl transition-all"
            >
              Continue Browsing Recipes
            </button>
          </div>

          {/* Impact message */}
          <p className="text-[10px] text-stone-400 leading-normal italic flex items-center justify-center gap-1">
            <HeartPulse size={12} className="text-wine shrink-0 fill-wine" /> Every purchase provides 1 meal to a feline in need through our Rescue Ribbon program.
          </p>
        </div>
      ) : (
        /* ACTIVE CHECKOUT SCREEN */
        <div className="space-y-8">
          
          <div className="text-left py-2 border-b border-stone-200">
            <h1 className="font-display font-semibold text-2xl sm:text-3xl text-wine flex items-center gap-2">
              <Lock size={22} className="text-gold" /> Secure Checkout
            </h1>
          </div>

          <form onSubmit={handlePlaceOrderSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: FIELDS AND PAYMENTS */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Shipping Section */}
              <div id="checkout-shipping-block" className="space-y-5 bg-white p-6 rounded-3xl border border-stone-100">
                <h3 className="font-display font-bold text-base text-wine flex items-center gap-1.5 border-b border-stone-100 pb-2">
                  1. Shipping Information
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-stone-400">First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl py-3 px-4 focus:outline-hidden focus:border-wine"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-stone-400">Last Name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl py-3 px-4 focus:outline-hidden focus:border-wine"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold uppercase text-stone-400">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl py-3 px-4 focus:outline-hidden focus:border-wine"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-stone-400">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl py-3 px-4 focus:outline-hidden focus:border-wine"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold uppercase text-stone-400">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl py-3 px-4 focus:outline-hidden focus:border-wine font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Methods Module */}
              <div id="checkout-strategy-block" className="space-y-5 bg-white p-6 rounded-3xl border border-stone-100">
                <h3 className="font-display font-bold text-base text-wine flex items-center gap-1.5 border-b border-stone-100 pb-2">
                  2. Delivery Methods
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setShippingMethod('standard')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between select-none ${
                      shippingMethod === 'standard'
                        ? 'border-wine bg-[#FAF8F5]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1 text-left">
                      <h4 className="font-bold text-xs uppercase text-[#1E1A17] tracking-wider">Standard Delivery</h4>
                      <p className="text-[11px] text-stone-500">Arrives in 3-5 business days.</p>
                    </div>
                    <span className="text-moss font-mono text-xs font-bold bg-moss/15 px-2 py-0.5 rounded leading-none">FREE</span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('express')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between select-none ${
                      shippingMethod === 'express'
                        ? 'border-wine bg-[#FAF8F5]'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1 text-left">
                      <h4 className="font-bold text-xs uppercase text-[#1E1A17] tracking-wider">Express Delivery (2-Day)</h4>
                      <p className="text-[11px] text-stone-500">Arrives in 2 business days.</p>
                    </div>
                    <span className="text-[#1E1A17] font-mono text-xs font-bold">$12.00</span>
                  </div>
                </div>
              </div>

              {/* Payments Tab inputs */}
              <div id="checkout-payment-block" className="space-y-5 bg-white p-6 rounded-3xl border border-stone-100">
                <h3 className="font-display font-bold text-base text-wine flex items-center gap-1.5 border-b border-stone-100 pb-2">
                  3. Sustainable Payment Method
                </h3>

                <div className="flex bg-[#FAF8F5] border border-stone-200 p-1.5 rounded-xl gap-2 select-none justify-between">
                  {([
                    { value: 'card', name: 'Credit Card' },
                    { value: 'paypal', name: 'PayPal Gateway' },
                    { value: 'apple', name: 'Apple Pay' },
                  ] as { value: 'card' | 'paypal' | 'apple', name: string }[]).map(pm => (
                    <button
                      key={pm.value}
                      type="button"
                      onClick={() => setPaymentMethod(pm.value)}
                      className={`flex-1 text-[11px] font-bold uppercase tracking-wider py-2 rounded-lg transition-all ${
                        paymentMethod === pm.value
                          ? 'bg-wine text-white shadow-xs'
                          : 'text-stone-500 hover:text-stone-700'
                      }`}
                    >
                      {pm.name}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' ? (
                  <div className="space-y-4 animate-fade-in text-left">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase text-stone-400">Cardholder Number</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3.5 text-stone-400"><CreditCard size={14} /></span>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4111 2222 3333 4444"
                          className="w-full text-xs font-mono bg-[#FAF8F5] border border-stone-200 rounded-xl py-3 pl-10 pr-4 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold uppercase text-stone-400">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full text-xs font-mono bg-[#FAF8F5] border border-stone-200 rounded-xl py-3 px-4 focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold uppercase text-stone-400">Security CVV</label>
                        <input
                          type="password"
                          required
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full text-xs font-mono bg-[#FAF8F5] border border-stone-200 rounded-xl py-3 px-4 focus:outline-hidden"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FAF8F5] border border-stone-200 text-stone-600 rounded-xl p-5 text-center text-xs space-y-2 animate-fade-in select-none">
                    <p>Securer gateway routing enabled for active third-party connection.</p>
                    <span className="bg-moss/10 text-moss text-[9px] font-mono rounded px-2.5 py-1 font-bold inline-block">SECURED BY SSL</span>
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT COLUMN: DETAILED SUMMARY IN RICH DEEP BURGUNDY / WINE CONTAINER */}
            <div id="wine-summary-card" className="lg:col-span-5 bg-wine border border-wine-dark text-[#FAF8F5] rounded-[32px] p-6 sm:p-8 space-y-6 shadow-2xl relative sticky top-32 overflow-hidden text-left flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono tracking-widest text-gold uppercase block">CERTIFIED GASTRO DIET MATRIX</span>
                  <h3 className="font-display font-bold text-xl text-cream tracking-tight mt-0.5">Your Order</h3>
                </div>

                {/* Inline checklist of items scrolling */}
                <div id="check-items-scroll" className="max-h-72 overflow-y-auto space-y-4.5 pr-1 no-scrollbar border-b border-white/10 pb-6">
                  {cart.map((item, idx) => {
                    const hasSub = item.purchaseType === 'subscription';
                    const unitP = hasSub ? item.product.price * 0.85 : item.product.price;
                    const itemTot = unitP * item.quantity;
                    return (
                      <div key={idx} className="flex gap-3 justify-between items-center text-xs">
                        <div className="flex gap-3 items-center">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-11 h-11 rounded-lg bg-white/5 object-contain"
                          />
                          <div>
                            <h4 className="font-sans font-bold text-cream select-none leading-snug line-clamp-1">{item.product.name}</h4>
                            <p className="text-[10px] text-stone-300 font-mono">
                              Qty {item.quantity} {hasSub && <span className="text-gold font-bold">🌱 AUTO</span>}
                            </p>
                          </div>
                        </div>
                        <span className="font-mono text-cream font-bold shrink-0">${itemTot.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 text-xs font-sans text-stone-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-gold font-bold">
                      <span className="flex items-center gap-1">FEAST20 Code Coupon (-20%)</span>
                      <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs items-center">
                    <span>Shipping</span>
                    {shippingMethod === 'express' ? (
                      <span className="font-mono text-white">$12.00</span>
                    ) : (
                      <span className="font-mono text-gold font-bold uppercase text-[10px]">FREE</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (8.25%)</span>
                    <span className="font-mono text-white">${estimatedTax.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-5 pt-6 border-t border-white/10">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-xs py-1 text-gold uppercase tracking-wider font-mono">TOTAL INVESTMENT</span>
                  <span className="font-mono text-2xl font-black text-cream">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>

                <button
                  id="place-order-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-white text-wine font-extrabold uppercase text-xs tracking-wider py-4.5 rounded-2xl transition-all shadow-md hover:scale-102 flex items-center justify-center gap-2 select-none"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" /> AUTHORIZING TRANSACTION...
                    </>
                  ) : (
                    <>
                      PLACE COMPANION ORDER <ArrowRight size={13} strokeWidth={2.5} />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-stone-400 font-sans leading-relaxed pt-2">
                  ✓ Protected under 256-bit transactional security. <br />
                  ❤ Every purchase provides 1 raw therapeutic bowl directly to our feline rescue alliance shelter networks.
                </p>
              </div>

            </div>

          </form>
        </div>
      )}

    </div>
  );
};
