/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, History, Shield, HeartPulse, RefreshCw, Check, Star, ChevronRight, PawPrint, ShoppingCart, Locate, CheckCircle2 } from 'lucide-react';
import { Order, CartItem, ViewType } from '../types';

interface ProfileViewProps {
  orders: Order[];
  onReorder: (order: Order) => void;
  setView: (view: ViewType) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  orders,
  onReorder,
  setView,
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'pets' | 'security'>('history');
  
  // Reorder sync mock loader
  const [reorderingId, setReorderingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleReorderClick = (order: Order) => {
    setReorderingId(order.id);
    setTimeout(() => {
      onReorder(order);
      setReorderingId(null);
      setSuccessId(order.id);
      setTimeout(() => setSuccessId(null), 3000);
    }, 1200);
  };

  // Math totals for bento
  const totalMealsDonated = orders.length * 4; // Mock formula matching mockups!

  return (
    <div id="profile-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-10 text-left">
      
      {/* Overview Head */}
      <div className="space-y-1">
        <span className="text-xs font-mono font-bold tracking-widest text-[#2C5E3B] uppercase">PET PARENT PRIVATE HUB</span>
        <h1 className="font-display font-bold text-3xl text-wine tracking-tight">Parent Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: ELEANOR USER CARD & NAVIGATION SUMMARY */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Eleanor Vance user card */}
          <div id="eleanor-user-card" className="bg-white rounded-[28px] p-6 border border-stone-100/90 text-center space-y-4 shadow-sm relative overflow-hidden">
            {/* Soft decorative background crown */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gold"></div>

            <div className="relative inline-block mt-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACUiTz6yFlkjbbZ-SmBQoarOQlmPCIHGHFI4T6bgtePUJ0Xq9ly1UicwLauZjUy4Ej72aLiiDDlazVd-2hUV1YD6ZFA382p5iBe9QeF4A7vNl87OmvaAUiXZ54WqCFgITTzQMfjYCYHRzwMNNjKvIH3iaYeJf9CSi8mC0wOPf_R1-DWOGz7CmTGzBzxO0H--DyezCuGs82UhOB-We9FvuQWkfsEIt9TaIyOHmaGRPcBKsW-OBby1HIJGEIq5htPRy0aGxM3TOStHE"
                alt="Eleanor Vance"
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#FAF8F5] shadow-md mx-auto"
              />
              <span className="absolute bottom-1 right-1 bg-gold text-wine p-1 rounded-full shadow-xs border border-white">
                <PawPrint size={12} fill="currentColor" />
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-bold text-xl text-stone-800">Eleanor Vance</h3>
              <p className="text-stone-400 text-xs flex items-center justify-center gap-1 font-sans">
                Savannah, Georgia
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2 justify-center">
                <span className="bg-[#FAF8F5] text-stone-600 border border-stone-200 text-[9px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                  Pro Parent since 2011
                </span>
                <span className="bg-moss/10 text-moss text-[9px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                  ELITE MEMBER
                </span>
              </div>
            </div>
          </div>

          {/* Hub navigation lists */}
          <div className="bg-white rounded-[24px] border border-stone-100 overflow-hidden shadow-xs divide-y divide-stone-100 text-sm">
            <button
              id="profile-nav-history"
              onClick={() => setActiveTab('history')}
              className={`w-full py-4 px-6 flex items-center justify-between font-bold tracking-wide select-none ${
                activeTab === 'history' ? 'bg-cream text-wine' : 'text-stone-500 hover:text-stone-800 hover:bg-[#FAF8F5]/40'
              }`}
            >
              <span className="flex items-center gap-2"><History size={16} /> Order History & Auto Ship</span>
              <ChevronRight size={14} className={activeTab === 'history' ? 'text-wine' : 'text-stone-300'} />
            </button>
            <button
              id="profile-nav-pets"
              onClick={() => setActiveTab('pets')}
              className={`w-full py-4 px-6 flex items-center justify-between font-bold tracking-wide select-none ${
                activeTab === 'pets' ? 'bg-cream text-wine' : 'text-stone-500 hover:text-stone-800 hover:bg-[#FAF8F5]/40'
              }`}
            >
              <span className="flex items-center gap-2"><PawPrint size={16} /> Saved Feline Companions (1)</span>
              <ChevronRight size={14} className={activeTab === 'pets' ? 'text-wine' : 'text-stone-300'} />
            </button>
            <button
              id="profile-nav-security"
              onClick={() => setActiveTab('security')}
              className={`w-full py-4 px-6 flex items-center justify-between font-bold tracking-wide select-none ${
                activeTab === 'security' ? 'bg-cream text-wine' : 'text-stone-500 hover:text-stone-800 hover:bg-[#FAF8F5]/40'
              }`}
            >
              <span className="flex items-center gap-2"><Shield size={16} /> Security & Payment Settings</span>
              <ChevronRight size={14} className={activeTab === 'security' ? 'text-wine' : 'text-stone-300'} />
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: DETAIL BENTO GRIDS & DYNAMIC TAB CONTENT */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* BENTO STATISTICS GRIDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Bento 1: Loyalty Progress with custom gold track */}
            <div className="bg-white rounded-3xl p-6 border border-stone-100/95 space-y-4">
              <span className="text-[10px] font-mono tracking-wider font-bold text-gold uppercase block">LOYALTY MILESTONES</span>
              <h4 className="font-display font-medium text-lg text-stone-800">You're 2 orders away from a Free Treat Box!</h4>
              
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between font-mono text-[10px] text-stone-500">
                  <span>Elite Progress Bar</span>
                  <span className="font-bold text-stone-800">80% Met</span>
                </div>
                <div className="w-full bg-[#FAF8F5] rounded-full h-3.5 border border-stone-200 overflow-hidden p-0.5">
                  <div className="bg-gold h-full rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                </div>
              </div>

              <p className="text-[10.5px] italic text-stone-400">Pledge level increases with auto ship subscriptions.</p>
            </div>

            {/* Bento 2: Community rescue ribbon impact meals */}
            <div className="bg-[#FAF8F5] border border-stone-200/50 rounded-3xl p-6 flex items-center gap-4">
              <div className="w-14 h-14 bg-wine/10 text-wine rounded-2xl flex items-center justify-center shrink-0">
                <HeartPulse size={28} />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider font-bold text-[#2C5E3B] uppercase block">RESCUE RIBBON IMPACT</span>
                <span className="font-display font-black text-2xl text-wine block leading-none py-1">
                  {totalMealsDonated} MEALS
                </span>
                <p className="text-stone-500 text-[11px] leading-relaxed">
                  Proudly donated to your regional shelters through our nutritional matches.
                </p>
              </div>
            </div>

          </div>

          {/* DYNAMIC HUB CONTENT VIEWPORTS */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-100/90 shadow-xs">
            
            {/* TAB CONTENT: ORDER HISTORY AND AUTO SHIP */}
            {activeTab === 'history' && (
              <div id="tab-profile-history" className="space-y-6 animate-fade-in">
                <div className="border-b border-stone-100 pb-3 flex justify-between items-center">
                  <h3 className="font-display font-bold text-lg text-wine">Active Deliveries & Historical Orders</h3>
                  <button onClick={() => setView('catalogue')} className="text-xs text-wine font-semibold hover:text-gold">+ New Order</button>
                </div>

                <div className="space-y-5">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      id={`order-record-${order.id}`}
                      className="border border-stone-100 rounded-2xl p-5 hover:border-stone-200 transition-all space-y-4 text-left"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-50 pb-3 text-xs sm:text-sm font-sans">
                        <div className="space-y-1">
                          <p className="text-stone-400 font-medium">Ordered On {order.date}</p>
                          <p className="text-[#1E1A17] font-semibold flex items-center gap-1.5">
                            ID # <span className="font-mono text-xs">{order.id}</span>
                          </p>
                        </div>
                        
                        <div className="flex sm:flex-col items-baseline sm:items-end gap-1.5 leading-none">
                          <span className="text-[10px] text-stone-400 font-mono">Investment Sum</span>
                          <span className="font-mono text-sm sm:text-base font-extrabold text-[#1E1A17]">${order.amount.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Display thumbnail row of items in order */}
                      <div className="space-y-2.5">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-3">
                              <img
                                src={it.image}
                                alt={it.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-lg bg-[#FAF8F5] object-contain border border-stone-100"
                              />
                              <div>
                                <h4 className="font-semibold text-stone-800 leading-snug line-clamp-1">{it.name}</h4>
                                <p className="text-[10px] text-stone-400 font-mono">Qty {it.quantity}</p>
                              </div>
                            </div>
                            <span className="text-stone-500 font-mono">${(it.price * it.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions: Reorders, trackers */}
                      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-3 border-t border-stone-50">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-moss border border-moss-dark animate-pulse"></span>
                          <span className="text-xs font-semibold text-moss">Carrier Route Locked: {order.status}</span>
                        </div>

                        <div className="flex gap-2">
                          {successId === order.id ? (
                            <button className="bg-moss/10 text-moss px-5 py-2 rounded-xl text-xs font-semibold uppercase flex items-center gap-1">
                              <Check size={12} strokeWidth={2.5} /> Added to Basket!
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReorderClick(order)}
                              disabled={reorderingId === order.id}
                              className="bg-wine hover:bg-wine-dark text-white px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide select-none transition-all hover:scale-102 flex items-center justify-center gap-1"
                            >
                              {reorderingId === order.id ? (
                                <>
                                  <RefreshCw size={11} className="animate-spin" /> Synchronizing...
                                </>
                              ) : (
                                <>
                                  Reorder Recipes
                                </>
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => alert(`Tracking updates for Order ${order.id}: Package in transit inside logistics networks.`)}
                            className="bg-transparent hover:bg-[#FAF8F5] text-stone-500 border border-stone-200 px-4 py-2 rounded-xl text-xs font-semibold uppercase transition-all"
                          >
                            Track Package
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: SAVED CATS */}
            {activeTab === 'pets' && (
              <div id="tab-profile-pets" className="space-y-6 animate-fade-in text-left">
                <div className="border-b border-stone-100 pb-3 flex justify-between items-center">
                  <h3 className="font-display font-medium text-lg text-wine">Saved Feline Companions</h3>
                  <button onClick={() => alert('New companion module: Add profile details for personalized health score tracking!')} className="text-xs text-wine font-semibold hover:text-gold">+ Add Companion</button>
                </div>

                <div className="border border-stone-100 rounded-2xl p-5 bg-white flex flex-col sm:flex-row items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-[#FAF8F5] flex items-center justify-center text-gold border border-gold/15 shrink-0 relative overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj_pg1ss-YjHIVthXJGp4DHsTnNw749QQERVNkkIMuK5kcQy4Xge81yeonXnqJBQtXgoiMgp5i6kW78AOAMj4QMPRz3pDyH1Fnq7FxatK-DgqwLBsYLDCRvSUlJ_9K82gGAUSPiwzNWhAE1O1zkr0dMD6oBXEcol4Qtsz2DdQN92heg-XMMkcBHyQemX2SII9cKyvxobqsbBBSg-gYkeoYF4eFIYp6ETb57xnZk5Z9RsGQdOSZhCAk6drOMg0RLKMvrgTV1GN40Yg"
                      alt="Clarissa cat"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center sm:text-left space-y-1.5 flex-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h4 className="font-display font-bold text-[#1E1A17] text-base">Clarissa</h4>
                      <span className="bg-[#FAF8F5] border border-stone-200 text-[9px] font-mono tracking-wide px-2 py-0.2 rounded font-semibold uppercase text-stone-500">Persian Breed</span>
                    </div>
                    <p className="text-xs text-stone-500">Age Rank: 4 Years Adult • Metabolic Weight: 9.4 lbs</p>
                    <p className="text-xs text-moss font-semibold">★ Advised Diet Profile: Prebiotic-Rich Wet Jars (Salmon & Pumpkin Recipe)</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: SECURITY SETTINGS */}
            {activeTab === 'security' && (
              <div id="tab-profile-security" className="space-y-6 animate-fade-in text-left">
                <h3 className="font-display font-medium text-lg text-wine border-b border-stone-110 pb-3">Security & Auto Ship Credentials</h3>
                <div className="space-y-4 max-w-md text-xs">
                  <div className="p-4 bg-cream border border-stone-200 rounded-xl space-y-2">
                    <h4 className="font-bold text-stone-800">Transactional Lock Info</h4>
                    <p className="text-stone-500">MasterCard ending in 4444 holds secondary auto-payment permissions securely with SSL certificate authorizations.</p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
