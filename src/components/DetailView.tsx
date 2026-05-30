/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight, Star, Minus, Plus, ShoppingBag, Leaf, ShieldAlert, Sparkles, AlertCircle, RefreshCw, Calendar, CheckSquare, CornerDownRight } from 'lucide-react';
import { Product, PurchaseType, CartItem } from '../types';

interface DetailViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, purchaseType: PurchaseType) => void;
  setView: (view: 'home' | 'catalogue' | 'detail' | 'cart' | 'checkout' | 'profile') => void;
}

type TabType = 'ingredients' | 'analysis' | 'feeding' | 'reviews';

export const DetailView: React.FC<DetailViewProps> = ({
  product,
  onAddToCart,
  setView,
}) => {
  const [activeImage, setActiveImage] = useState(product.galleryImages[0] || product.image);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('subscription');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>('ingredients');
  const [subFreq, setSubFreq] = useState('4-weeks');
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ transform: 'scale(1)' });

  const subscriptionDiscount = 0.15;
  const unitPrice = purchaseType === 'subscription' ? product.price * (1 - subscriptionDiscount) : product.price;
  const totalPrice = unitPrice * quantity;

  // Hover zoom effect simulation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transform: 'scale(1.4)',
      transformOrigin: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center' });
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, purchaseType);
    setView('cart'); // Go to cart right away so they can view their addition!
  };

  // Mock reviewer data
  const reviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: 'May 12, 2026',
      title: 'Miraculous digestive change!',
      verified: true,
      text: "Chronic regurgitation on other wet foods is completely gone! My adult ragdoll digests this beautifully, and since it is slow-simmered, her stool odor is reduced. She absolute loves physical lunchtime when we open the pre-potted jars."
    },
    {
      id: 2,
      author: 'James D.',
      rating: 5,
      date: 'April 28, 2026',
      title: 'Prebiotically impressive',
      verified: true,
      text: "My vet recommended high-hydration pumpkin-infused meals to counter active kidney indicators. Feline Wellness is transparent with analytics. Protein indices are stellar!"
    },
    {
      id: 3,
      author: 'Anita L.',
      rating: 4.8,
      date: 'March 11, 2026',
      title: 'Beautiful packaging & design',
      verified: true,
      text: "Love returning the glass jars to receive automatic balance credits. The quality of salmon represents human gourmet level. Highly suggest starting on auto-ship."
    }
  ];

  return (
    <div id={`product-detail-${product.id}`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-12">
      
      {/* 1. Breadcrumbs */}
      <nav id="breadcrumbs" className="flex items-center gap-2 text-xs text-stone-400 select-none">
        <button onClick={() => setView('home')} className="hover:text-wine font-medium">Home</button>
        <ChevronRight size={10} />
        <button onClick={() => setView('catalogue')} className="hover:text-wine font-medium uppercase">{product.category} Feeding</button>
        <ChevronRight size={10} />
        <span className="text-stone-700 font-semibold">{product.name}</span>
      </nav>

      {/* 2. Top Overview: Grid of Media & buying configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start bg-white p-6 sm:p-10 rounded-3xl border border-stone-100">
        
        {/* Left Side: Images & Gallery Selection */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Main Display Image Container with Hover Zoom */}
          <div
            className="aspect-square bg-[#FAF8F5] rounded-2xl overflow-hidden border border-stone-100/60 flex items-center justify-center relative group cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              style={zoomStyle}
              className="w-full h-full object-contain transition-transform duration-75"
            />
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-xs py-1 px-3.5 rounded-full text-[10px] text-[#FAF8F5] select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              Hover over image to zoom
            </div>
          </div>

          {/* Gallery Thumbnails List */}
          {product.galleryImages.length > 1 && (
            <div className="flex gap-2 justify-center py-1">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden bg-[#FAF8F5] p-1 border-2 transition-all ${
                    activeImage === img ? 'border-wine scale-102 shadow-xs' : 'border-transparent hover:border-stone-200'
                  }`}
                >
                  <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Side: Header and Custom Strategy Purchases */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-moss">{product.subcategory}</span>
            <h1 className="font-display font-medium text-3xl sm:text-4xl text-wine tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 pt-1">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'transparent'}
                    strokeWidth={2}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-stone-700">{product.rating}</span>
              <span className="text-stone-300">|</span>
              <span className="text-xs text-stone-500 hover:text-wine select-none cursor-pointer">
                {product.reviewsCount} verified reviews
              </span>
            </div>
          </div>

          <p className="text-[#1E1A17] text-xs sm:text-sm leading-relaxed font-sans font-normal border-b border-stone-100 pb-4">
            {product.description}
          </p>

          {/* Pricing Selector cards */}
          <div className="space-y-3 pt-2">
            
            {/* Strategy 1: Subcribe & Save 15% (RECURRING AUTO-SHIP) */}
            <div
              onClick={() => setPurchaseType('subscription')}
              className={`rounded-2xl p-4.5 border-2 cursor-pointer transition-all select-none relative ${
                purchaseType === 'subscription'
                  ? 'border-wine bg-[#FAF8F5]/60 shadow-xs'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="absolute top-4 right-4 text-wine bg-gold border border-gold/15 text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold">
                Save 15%
              </div>
              
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="purchase-type"
                  checked={purchaseType === 'subscription'}
                  onChange={() => setPurchaseType('subscription')}
                  className="mt-1 text-wine focus:ring-wine/20"
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-xs sm:text-sm text-[#1E1A17] flex items-center gap-1.5 uppercase tracking-wide">
                    Subscribe & Save 15%
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Never worry about running out of jars. Swap flavors or skip shipments at your leisure.
                  </p>
                  
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-mono text-base font-extrabold text-[#1E1A17]">
                      ${(product.price * 0.85).toFixed(2)}
                    </span>
                    <span className="text-stone-400 font-mono text-[11px] line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-moss/90 font-medium">Auto-Ship Delivery Discount</span>
                  </div>

                  {/* Delivery Frequency Dropdown */}
                  {purchaseType === 'subscription' && (
                    <div className="pt-3 max-w-xs flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-stone-400 font-mono">Arrives:</span>
                      <select
                        id="auto-ship-frequency"
                        value={subFreq}
                        onChange={(e) => setSubFreq(e.target.value)}
                        className="text-[11px] bg-white border border-stone-200 rounded-lg py-1 px-2 select-none"
                      >
                        <option value="2-weeks">Every 2 Weeks</option>
                        <option value="4-weeks">Every 4 Weeks (Recommended)</option>
                        <option value="6-weeks">Every 6 Weeks</option>
                      </select>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Strategy 2: One-Time Purchase */}
            <div
              onClick={() => setPurchaseType('one-time')}
              className={`rounded-2xl p-4.5 border-2 cursor-pointer transition-all select-none ${
                purchaseType === 'one-time'
                  ? 'border-wine bg-[#FAF8F5]/60 shadow-xs'
                  : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="purchase-type"
                  checked={purchaseType === 'one-time'}
                  onChange={() => setPurchaseType('one-time')}
                  className="mt-1 text-wine focus:ring-wine/20"
                />
                <div className="space-y-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-[#1E1A17] uppercase tracking-wide">
                    One-Time Purchase
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Standalone shipment of your selected cat nutrition pack. Standard billing applies.
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-base font-extrabold text-[#1E1A17]">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Volume and primary purchase actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-stone-100 flex-wrap sm:flex-nowrap">
            <div className="flex items-center border border-stone-300 rounded-2xl select-none bg-white">
              <button
                id="quantity-decrease"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-4 py-3.5 text-stone-500 hover:text-wine hover:scale-105 active:scale-90 transition-all"
              >
                <Minus size={12} strokeWidth={2.5} />
              </button>
              <span className="px-3 font-mono text-sm font-bold text-stone-700 min-w-8 text-center">{quantity}</span>
              <button
                id="quantity-increase"
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-4 py-3.5 text-stone-500 hover:text-wine hover:scale-105 active:scale-90 transition-all"
              >
                <Plus size={12} strokeWidth={2.5} />
              </button>
            </div>

            <button
              id="add-to-cart-details-btn"
              onClick={handleAddToCartClick}
              className="flex-1 bg-wine hover:bg-wine-dark text-[#FAF8F5] font-extrabold uppercase text-xs tracking-wider py-4 px-6 rounded-2xl transition-all shadow-md hover:scale-102 flex items-center justify-center gap-2 select-none"
            >
              <ShoppingBag size={14} /> Add Recipe to Basket — ${totalPrice.toFixed(2)}
            </button>
          </div>

          {/* Quick fast shipping / returns indicators */}
          <div className="pt-3 flex gap-4 text-[10px] text-stone-500 font-mono">
            <span className="flex items-center gap-1"><RefreshCw size={11} className="text-moss" /> 100% Digestive Switch Guarantee</span>
            <span className="flex items-center gap-1"><Calendar size={11} className="text-gold" /> Auto-ship orders cancel anytime</span>
          </div>

        </div>
      </div>

      {/* 4. Tab Segment: INGREDIENTS | ANALYSIS | FEEDING GUIDE | REVIEWS */}
      <div className="bg-white rounded-3xl border border-stone-100/90 overflow-hidden shadow-sm">
        
        {/* Tab triggers header */}
        <div className="border-b border-stone-200/50 bg-[#FAF8F5]/40 flex overflow-x-auto no-scrollbar gap-1 pt-2 px-6">
          {(['ingredients', 'analysis', 'feeding', 'reviews'] as TabType[]).map((tab) => {
            const labels = {
              ingredients: 'Ingredients',
              analysis: 'Guaranteed Analysis',
              feeding: 'Feeding & Volume Guide',
              reviews: `Reviews (${product.reviewsCount})`,
            };
            return (
              <button
                key={tab}
                id={`detail-tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 font-bold text-xs uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors select-none ${
                  activeTab === tab
                    ? 'border-wine text-wine'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* Tab displays display */}
        <div className="p-8 sm:p-10">
          
          {/* TAB 1: INGREDIENTS */}
          {activeTab === 'ingredients' && (
            <div id="tab-ingredients-panel" className="space-y-8 animate-fade-in text-left">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Text section */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="font-display font-bold text-lg text-wine">🔬 Only the good stuff. No filler compromise.</h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                    We list every single component with total diagnostic transparency. Slow-simmered ingredients promote clean gut moisture profiles, preventing painful stomach acid buildup.
                  </p>
                  
                  {/* Ingredients block display card */}
                  <div className="bg-[#FAF8F5] border border-stone-200/40 p-5 rounded-2xl relative">
                    <h4 className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider mb-2">FULL RECIPE INGREDIENT STRING</h4>
                    <p className="font-mono text-[11px] leading-relaxed text-stone-600">{product.ingredients}</p>
                  </div>
                </div>

                {/* Badges illustration */}
                <div className="md:col-span-5 space-y-4">
                  <div className="border border-stone-100 p-4 rounded-xl flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-[#2C5E3B]/10 text-moss"><Leaf size={16} /></div>
                    <div>
                      <h4 className="font-semibold text-xs text-stone-800">100% USDA Human Grade Protein</h4>
                      <p className="text-[11px] text-stone-500">Primal flesh sources containing clean trace taurine.</p>
                    </div>
                  </div>

                  <div className="border border-stone-100 p-4 rounded-xl flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-wine/10 text-wine"><ShieldAlert size={16} /></div>
                    <div>
                      <h4 className="font-semibold text-xs text-stone-800">Zero Artificial Binders & Corns</h4>
                      <p className="text-[11px] text-stone-500">We omit starch gelatin binders which spike diabetic metrics.</p>
                    </div>
                  </div>

                  <div className="border border-stone-100 p-4 rounded-xl flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-gold/15 text-gold-light text-wine"><Sparkles size={16} /></div>
                    <div>
                      <h4 className="font-semibold text-xs text-stone-800">Active Live Prebiotics</h4>
                      <p className="text-[11px] text-stone-500">Chicory and pure pumpkin support structural floral safety.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: GUARANTEED ANALYSIS */}
          {activeTab === 'analysis' && (
            <div id="tab-analysis-panel" className="animate-fade-in space-y-6 text-left">
              <h3 className="font-display font-bold text-lg text-wine">Guaranteed Nutritional Analysis</h3>
              <p className="text-stone-600 text-xs md:text-sm max-w-xl">
                Our formulas exceed standard AFFCO guidelines for adult and kitten growth nutritional metrics. Review exact values below:
              </p>

              <div className="max-w-2xl bg-stone-900 text-stone-300 rounded-2xl p-6 font-mono text-sm shadow-inner space-y-3.5">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Nutritive Tag</span>
                  <span className="font-bold text-white">Clinical Guarantee Percentage</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Crude Protein</span>
                  <span className="text-white font-bold">{product.guaranteedAnalysis.protein}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Crude Fat</span>
                  <span className="text-white font-bold">{product.guaranteedAnalysis.fat}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Crude Fiber</span>
                  <span className="text-white font-bold">{product.guaranteedAnalysis.fiber}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Moisture Density</span>
                  <span className="text-white font-bold">{product.guaranteedAnalysis.moisture}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Crude Ash</span>
                  <span className="text-white font-bold">{product.guaranteedAnalysis.ash}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span>Active Taurine</span>
                  <span className="text-white font-bold">{product.guaranteedAnalysis.taurine}</span>
                </div>
                <div className="flex justify-between text-[#E6AF2E] pt-2">
                  <span>Caloric Output Count:</span>
                  <span className="font-extrabold">{product.guaranteedAnalysis.calories}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FEEDING GUIDE */}
          {activeTab === 'feeding' && (
            <div id="tab-feeding-panel" className="animate-fade-in text-left space-y-6">
              <h3 className="font-display font-bold text-lg text-wine flex items-center gap-1">Daily Feeding guidelines & calculations</h3>
              <p className="text-stone-600 text-xs md:text-sm max-w-2xl leading-relaxed">
                Optimal meal weight depends strictly on your cat's weight and activity profile. Monitor hydration and always provide access to fresh water.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="bg-cream border border-stone-200 p-5 rounded-2xl space-y-2">
                  <span className="text-xs font-mono font-bold text-moss uppercase tracking-wider block">SMALL COMPANIONS (4–7 lbs)</span>
                  <h4 className="font-bold text-stone-800 text-sm">{product.category === 'wet' ? '1.5 to 2 Jars per day' : '1/2 to 2/3 Cup daily'}</h4>
                  <p className="text-[11px] text-stone-500">For slender felines or senior weight-preservation targets.</p>
                </div>
                <div className="bg-cream border border-stone-200 p-5 rounded-2xl space-y-2">
                  <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider block">MED COMPANIONS (8–11 lbs)</span>
                  <h4 className="font-bold text-stone-800 text-sm">{product.category === 'wet' ? '2.5 to 3 Jars per day' : '3/4 to 1 Cup daily'}</h4>
                  <p className="text-[11px] text-stone-500">Standard metabolic calculations for average residential felines.</p>
                </div>
                <div className="bg-cream border border-stone-200 p-5 rounded-2xl space-y-2">
                  <span className="text-xs font-mono font-bold text-wine uppercase tracking-wider block">LARGE COMPANIONS (12+ lbs)</span>
                  <h4 className="font-bold text-stone-800 text-sm">{product.category === 'wet' ? '3.5 to 4.5 Jars per day' : '1.25 to 1.75 Cups daily'}</h4>
                  <p className="text-[11px] text-stone-500">Ideal targets for larger breeds like Persians, Maine Coons.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div id="tab-reviews-panel" className="animate-fade-in space-y-8 text-left">
              <div className="bg-[#FAF8F5]/60 p-6 rounded-2xl border border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <span className="text-[10px] font-mono tracking-widest text-[#2C5E3B] font-extrabold block mb-1">CUSTOMER FEEDBACK SUMMARY</span>
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    <span className="font-display font-bold text-3xl text-wine">{product.rating}</span>
                    <span className="text-stone-400">/ 5.0</span>
                  </div>
                  <div className="flex text-gold mt-1 justify-center sm:justify-start">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <h4 className="text-xs font-semibold text-stone-700">100% Guaranteed Satisfaction</h4>
                  <p className="text-[11px] text-stone-400 max-w-xs mt-0.5">If your companion does not digest or enjoy our recipe, we replace or refund instantly.</p>
                </div>
              </div>

              {/* Reviews Cards List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-5 border border-stone-100 rounded-2xl relative space-y-3.5 bg-white">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-800 text-xs sm:text-sm">{rev.author}</span>
                          {rev.verified && (
                            <span className="bg-moss/10 text-moss text-[9px] font-mono uppercase px-2 py-0.2 rounded-md font-bold">Verified Buyer</span>
                          )}
                        </div>
                        <div className="flex text-gold gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} fill={i < Math.floor(rev.rating) ? 'currentColor' : 'transparent'} />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">{rev.date}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-semibold text-stone-800 text-xs sm:text-sm">"{rev.title}"</h4>
                      <p className="text-stone-500 text-xs leading-relaxed">{rev.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
