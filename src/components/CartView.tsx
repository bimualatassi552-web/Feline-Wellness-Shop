/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingCart, Trash2, Tag, Percent, ArrowRight, CornerDownRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { CartItem, ViewType } from '../types';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number, purchaseType: 'one-time' | 'subscription') => void;
  onRemoveItem: (productId: string, purchaseType: 'one-time' | 'subscription') => void;
  setView: (view: ViewType) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedDiscount: number;
  setAppliedDiscount: (discount: number) => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  setView,
  promoCode,
  setPromoCode,
  appliedDiscount,
  setAppliedDiscount,
}) => {
  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(appliedDiscount > 0);

  // Math subtotal
  const subtotal = cart.reduce((sum, item) => {
    const rawPrice = item.product.price;
    const finalPrice = item.purchaseType === 'subscription' ? rawPrice * 0.85 : rawPrice;
    return sum + (finalPrice * item.quantity);
  }, 0);

  // Apply discount coupon
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    
    if (code === 'FEAST20') {
      setPromoCode(code);
      setAppliedDiscount(0.20);
      setPromoSuccess(true);
    } else if (code === '') {
      setPromoError('Please enter a code.');
    } else {
      setPromoError('Invalid coupon code. Try FEAST20');
      setPromoSuccess(false);
      setAppliedDiscount(0);
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoInput('');
    setAppliedDiscount(0);
    setPromoSuccess(false);
  };

  const discountAmount = subtotal * appliedDiscount;
  const taxableAmount = subtotal - discountAmount;
  const taxRate = 0.0825; // 8.25%
  const estimatedTax = taxableAmount * taxRate;
  const orderTotal = taxableAmount + estimatedTax;

  return (
    <div id="cart-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-12">
      
      {/* Page header title with accent yellow border underneath */}
      <div className="space-y-4 text-left border-b-2 border-gold pb-4">
        <span className="text-xs font-mono font-bold tracking-widest text-[#2C5E3B] uppercase">YOUR BASKET & SUBSCRIPTIONS</span>
        <h1 className="font-display font-bold text-3xl text-wine tracking-tight">YOUR CART</h1>
      </div>

      {cart.length === 0 ? (
        <div id="empty-cart-state" className="bg-white rounded-3xl border border-stone-100 p-16 text-center space-y-6 max-w-xl mx-auto">
          <div className="w-20 h-20 bg-cream text-stone-300 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <ShoppingCart size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-medium text-xl text-stone-800">Your Basket is Empty</h3>
            <p className="text-stone-500 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              Explore our veterinary-grade prebiotic recipes, slow-simmered wet glass jars, and single-ingredient treats!
            </p>
          </div>
          <button
            id="browse-recipes-btn"
            onClick={() => setView('catalogue')}
            className="bg-wine hover:bg-wine-dark text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-2xl transition-all shadow-md inline-flex items-center gap-2 select-none"
          >
            Browse Diet Catalog &rarr;
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: ACTIVE CART ITEMS LIST */}
          <div id="cart-items-list" className="lg:col-span-8 space-y-4">
            {cart.map((item, idx) => {
              const rawPrice = item.product.price;
              const hasSub = item.purchaseType === 'subscription';
              const isWet = item.product.category === 'wet';
              const finalPrice = hasSub ? rawPrice * 0.85 : rawPrice;
              const itemTotal = finalPrice * item.quantity;

              return (
                <div
                  key={`${item.product.id}-${item.purchaseType}`}
                  id={`cart-item-${item.product.id}-${item.purchaseType}`}
                  className="bg-white p-5 rounded-3xl border border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all hover:border-stone-200"
                >
                  <div className="flex items-center gap-4.5 w-full sm:w-auto">
                    {/* Thumbnail Image */}
                    <div 
                      className="w-20 h-20 rounded-2xl bg-[#FAF8F5] p-1.5 flex items-center justify-center shrink-0 border border-stone-100/60 cursor-pointer"
                      onClick={() => { setView('detail'); }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="text-left space-y-1">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-stone-400">
                        {item.product.subcategory}
                      </span>
                      <h4
                        onClick={() => { setView('detail'); }}
                        className="font-display font-bold text-stone-800 text-sm sm:text-base leading-snug cursor-pointer hover:text-wine transition-colors"
                      >
                        {item.product.name}
                      </h4>
                      
                      {/* Sub vs One-Time tag indicators */}
                      <div className="flex flex-wrap gap-2 items-center">
                        {hasSub ? (
                          <span className="bg-moss/10 text-moss text-[9px] font-mono font-bold rounded px-2 py-0.5 flex items-center gap-1">
                            🌱 ACTIVE AUTO-SHIP (SAVE 15%)
                          </span>
                        ) : (
                          <span className="bg-stone-100 text-stone-500 text-[9px] font-mono rounded px-2 py-0.5">
                            ONE-TIME ORDER
                          </span>
                        )}
                        <span className="text-[10px] text-stone-400 font-mono">
                          In Stock ({item.product.size})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing adjustment modules */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-8 border-t border-stone-100 pt-3 sm:pt-0 sm:border-0">
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-stone-200 bg-[#FAF8F5] rounded-xl select-none">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1), item.purchaseType)}
                        className="px-2.5 py-1.5 text-stone-400 hover:text-wine hover:scale-105 active:scale-90"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-stone-700 min-w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1, item.purchaseType)}
                        className="px-2.5 py-1.5 text-stone-400 hover:text-wine hover:scale-105 active:scale-90"
                      >
                        +
                      </button>
                    </div>

                    {/* Price detail calculation */}
                    <div className="text-right">
                      <span className="block font-mono font-extrabold text-[#1E1A17] text-sm">
                        ${itemTotal.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        ${finalPrice.toFixed(2)} each
                      </span>
                    </div>

                    {/* Delete item */}
                    <button
                      onClick={() => onRemoveItem(item.product.id, item.purchaseType)}
                      className="p-2 text-stone-400 hover:text-wine hover:bg-cream rounded-xl transition-colors shrink-0"
                      title="Remove product"
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: ORDER DETAILS SUMMARY */}
          <div id="order-summary-sidebar" className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-stone-100 space-y-5">
              <h3 className="font-display font-bold text-lg text-wine border-b border-stone-100 pb-3">ORDER SUMMARY</h3>
              
              <div className="space-y-2.5 text-xs text-stone-600 font-sans border-b border-stone-100 pb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-stone-800 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-moss font-semibold animate-fade-in">
                    <span className="flex items-center gap-1"><Percent size={12} /> Promo FEAST20 (20% Off)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">Shipping</span>
                  <span className="text-moss font-mono font-extrabold uppercase text-[11px] bg-moss/10 px-2 py-0.5 rounded">FREE SHIPPING</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Estimated Tax (8.25%)</span>
                  <span className="font-mono text-stone-800">${estimatedTax.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo validation box */}
              <div className="space-y-2 pt-1">
                {promoSuccess ? (
                  <div className="bg-moss/5 border border-moss/20 rounded-xl p-3 flex items-center justify-between text-moss">
                    <div className="flex items-center gap-1.5 text-xs font-semibold">
                      <Tag size={13} fill="currentColor" /> Code FEAST20 Active!
                    </div>
                    <button onClick={removePromoCode} className="text-[10px] uppercase font-bold hover:scale-105 text-[#1E1A17] select-none">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      id="promo-code-input"
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="ENTER PROMO CODE (FEAST20)"
                      className="flex-1 text-[11px] font-mono uppercase bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 focus:outline-hidden focus:border-wine"
                    />
                    <button
                      type="submit"
                      className="bg-[#FAF8F5] border border-stone-300 hover:border-wine hover:text-wine text-[10px] uppercase font-extrabold tracking-wider px-4 rounded-xl transition-all"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[10.5px] font-semibold text-wine-dark mt-1 animate-fade-in flex items-center gap-1">
                    <Percent size={11} /> {promoError}
                  </p>
                )}
                {!promoSuccess && (
                  <p className="text-[10px] text-stone-400 italic">Psst: write "FEAST20" to receive 20% off wet jars instantly.</p>
                )}
              </div>

              {/* Total Adjusted cost */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-display font-medium text-[#1E1A17] text-base">ESTIMATED TOTAL</span>
                <span className="font-mono text-xl sm:text-2xl font-black text-wine">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>

              {/* Secure Checkout button */}
              <button
                id="cart-checkout-btn"
                onClick={() => setView('checkout')}
                className="w-full bg-gold hover:bg-wine text-wine hover:text-[#FAF8F5] font-extrabold uppercase text-xs tracking-wider py-4 rounded-2xl transition-all shadow-md hover:scale-101 flex items-center justify-center gap-2 select-none"
              >
                PROCEED TO SECURE CHECKOUT <ArrowRight size={13} strokeWidth={2.5} />
              </button>
            </div>

            {/* Eco conscious trust indicators under payment summary */}
            <div className="bg-[#FAF8F5] border border-stone-100 p-5 rounded-3xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-moss/10 text-moss p-2 rounded-xl shrink-0"><ShieldCheck size={18} /></div>
                <div className="text-left">
                  <h4 className="font-semibold text-stone-800 text-xs uppercase tracking-wide">Eco-Conscious Packaging</h4>
                  <p className="text-[11px] text-stone-500 leading-normal">
                    Shipped in insulated, biodegradable cellulose envelopes & reusable box liners. Fully curbside recyclable.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-stone-200/50 pt-3">
                <div className="bg-wine/10 text-wine p-2 rounded-xl shrink-0"><HeartPulse size={18} /></div>
                <div className="text-left">
                  <h4 className="font-semibold text-stone-800 text-xs uppercase tracking-wide">1 Food Bowl Donated</h4>
                  <p className="text-[11px] text-stone-500 leading-normal">
                    This order guarantees 1 highly nutritious wet food jar to our rescue alliance shelters. Thank you!
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
