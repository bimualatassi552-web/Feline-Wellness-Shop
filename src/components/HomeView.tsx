/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowRight, ShieldCheck, Heart, Sparkles, Star, Award, Leaf } from "lucide-react";
import { ViewType, Product } from "../types";
import { products } from "../data";
import { ProductCard } from "./ProductCard";
import SoftAurora from "./SoftAurora";
import { CatPawPrints } from "./CatPawPrints";
import { ParticleCanvas } from "./ParticleCanvas";
import { MagneticContainer } from "./MagneticContainer";
import { HackerText } from "./HackerText";
import { GlowCard } from "./GlowCard";
import { TrailCanvas } from "./TrailCanvas";
import { RotatingProductWheel } from "./RotatingProductWheel";

interface HomeViewProps {
  setView: (view: ViewType) => void;
  setSelectedProduct?: (product: Product) => void;
  onAddToCart?: (product: Product, event: React.MouseEvent) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setView,
  setSelectedProduct,
  onAddToCart,
}) => {
  // Select bestsellers from data.ts
  const bestsellerProducts = products.filter((p) => p.isBestseller).slice(0, 3);

  const handleProductClick = (product: Product) => {
    if (setSelectedProduct) {
      setSelectedProduct(product);
      setView("detail");
    }
  };

  const handleQuickAdd = (product: Product, event: React.MouseEvent) => {
    if (onAddToCart) {
      onAddToCart(product, event);
    }
  };

  return (
    <div id="home-view" className="space-y-20 py-8 relative">
      {/* Walk of feline paws step-by-step through whitespace */}
      <CatPawPrints />

      {/* 1. HeroSection */}
      <section id="hero-section" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="bg-stone-950 rounded-[36px] overflow-hidden text-[#FAF8F5] relative border border-white/10 shadow-2xl min-h-[460px] lg:min-h-[420px] flex items-center">
          {/* Immersive SoftAurora Glow Backdrop */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none rounded-[36px]">
            <SoftAurora
              speed={0.4}
              scale={1.3}
              brightness={0.8}
              color1="#c49a45"
              color2="#1c1917"
              noiseFrequency={2.2}
              noiseAmplitude={0.9}
              bandHeight={0.4}
              bandSpread={1.3}
              enableMouseInteraction={true}
              mouseInfluence={0.2}
            />
            {/* Soft dark overlay for maximum textual clarity */}
            <div className="absolute inset-0 bg-stone-950/25 z-0"></div>
            {/* 100-Particle attraction grid with proximity lines */}
            <ParticleCanvas className="absolute inset-0 z-0 opacity-80" particleCount={100} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 md:p-16 relative z-10 w-full animate-fade-in">
            {/* Left Content column */}
            <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 order-2 lg:order-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5]/10 text-[#F4E8C1] border border-[#FAF8F5]/10 text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles size={12} className="text-gold" /> VET-FORMULATED BIOLOGICAL DIETS
              </span>
              
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-[#FAF8F5]">
                Pristine Nutrition <br />
                <span className="text-gold italic font-normal">Crafted For True Longevity.</span>
              </h1>
              
              <p className="text-stone-300 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
                Elite slow-simmered wet recipes and optimized kibbles designed to support kidney profiles, pristine skin health, and smooth digestion. Sourced with cellular-level bio-availability.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <MagneticContainer>
                  <button
                    id="hero-cta-primary"
                    onClick={() => setView("catalogue")}
                    className="bg-gold hover:bg-[#F4E8C1] text-stone-950 font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-sans flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Shop the Recipes
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </MagneticContainer>
                
                <MagneticContainer>
                  <button
                    id="hero-cta-secondary"
                    onClick={() => {
                      const el = document.getElementById("clinical-grid");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-transparent hover:bg-white/5 border border-white/20 text-[#FAF8F5] font-semibold px-6 py-4 rounded-full transition-all text-sm font-sans flex items-center justify-center cursor-pointer"
                  >
                    Our Formulation Standards
                  </button>
                </MagneticContainer>
              </div>
            </div>

            {/* Visual block showing high resolution cats / food can (Ordered to top on mobile via order-1) */}
            <div className="order-1 lg:order-2 lg:col-span-6 flex justify-center lg:justify-end relative h-80 lg:h-[480px] w-full">
              <div className="w-full h-full max-w-md relative hover:scale-[1.03] transition-transform duration-500">
                <video
                  src="https://ik.imagekit.io/ihi7o5b1q/5%E6%9C%8827%E6%97%A5(1).mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  className="w-full h-full object-cover rounded-3xl relative z-10 shadow-xl border border-white/10 animate-fade-in"
                />
                
                {/* Floating highlight review bubble */}
                <div className="absolute -bottom-4 -left-4 bg-stone-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/10 z-20 flex items-center gap-3 animate-fade-in max-w-[210px] select-none pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Star fill="currentColor" size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white leading-tight">⭐ 4.9/5 Rating</p>
                    <p className="text-[10px] text-stone-400">Recommended by 120+ Veterinary Immunologists</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Differentiators Bento Section */}
      <section id="clinical-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-mono font-extrabold tracking-widest text-[#3E5E4E] uppercase">DIETARY IMMUNE SHIELD</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-wine tracking-tight">
            The Botanical & Molecular Standard
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
            Every wet recipe and clinical formulation uses natural human-grade lipids and slow stewing to mimic an optimal ancestral metabolic profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Item 1 */}
          <div 
            onClick={() => setView('proteins-info')}
            className="group bg-white rounded-3xl border border-stone-100 p-8 shadow-sm flex flex-col justify-between items-start space-y-6 hover:shadow-md hover:border-wine/25 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-wine/5 rounded-2xl flex items-center justify-center text-wine group-hover:bg-wine group-hover:text-white transition-colors duration-300">
              <Award size={22} />
            </div>
            <div className="space-y-2 text-left">
              <h3 className="font-display font-bold text-lg text-stone-800">Human-Grade Proteins</h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                Zero feather meals, hydrolyzed powders, or heavy starches. Real whole Atlantic salmon filets and pasture-raised turkey breast.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-wine tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300">100% Bio-Available &rarr;</span>
          </div>

          {/* Item 2 */}
          <div 
            onClick={() => setView('simmer-info')}
            className="group bg-white rounded-3xl border border-stone-100 p-8 shadow-sm flex flex-col justify-between items-start space-y-6 hover:shadow-md hover:border-moss/25 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-moss/5 rounded-2xl flex items-center justify-center text-moss group-hover:bg-[#3E5E4E] group-hover:text-white transition-colors duration-300">
              <Leaf size={22} />
            </div>
            <div className="space-y-2 text-left">
              <h3 className="font-display font-bold text-lg text-[#3E5E4E]">Gentle Slow-Simmer</h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                Cooked slowly at customized low temperatures to ensure vital cellular enzymes, complex oils, and taurine compounds remain fully intact.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-moss tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300">Enzyme Integrity Sealed &rarr;</span>
          </div>

          {/* Item 3 */}
          <div 
            onClick={() => setView('prebiotics-info')}
            className="group bg-white rounded-3xl border border-stone-100 p-8 shadow-sm flex flex-col justify-between items-start space-y-6 hover:shadow-md hover:border-gold/30 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 cursor-pointer"
          >
            <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-wine group-hover:bg-gold group-hover:text-wine transition-colors duration-300">
              <ShieldCheck size={22} className="text-gold group-hover:text-wine" />
            </div>
            <div className="space-y-2 text-left">
              <h3 className="font-display font-bold text-lg text-stone-800">Veterinary Prebiotics</h3>
              <p className="text-stone-500 text-xs leading-relaxed">
                Wholesome pumpkin purees, chicory root fibers, and dandelion greens help regulate glycemic indexes and nourish intestinal flora.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-wine tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-300">Gut-Microbiome Protected &rarr;</span>
          </div>
        </div>
      </section>

      {/* 3. Bestselling Products Carousel Row */}
      <section id="featured-carousel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#3E5E4E] uppercase">VET-DIAGNOSED bestseller RECIPES</span>
            <h2 className="font-display font-bold text-3xl text-wine tracking-tight">Active Dietary Formulations</h2>
          </div>
          <button 
            onClick={() => setView('catalogue')}
            className="text-xs font-bold uppercase tracking-wider text-wine hover:text-gold flex items-center gap-1.5 transition-colors font-sans hover:translate-x-1 duration-200 cursor-pointer"
          >
            See All Formulation Packs &rarr;
          </button>
        </div>

        <RotatingProductWheel
          onViewDetails={handleProductClick}
          onAddToCart={handleQuickAdd}
        />
      </section>

      {/* 2.5 Dynamic Interactive Mouse Effects Laboratory */}
      <section id="interactivity-lab" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-stone-200/50 rounded-[36px] p-8 sm:p-12 relative overflow-hidden shadow-sm">
          <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="text-center space-y-4 mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-stone-900 tracking-tight">
              Hover, Draw & Shift Your Cursor
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto text-xs leading-relaxed">
              Explore custom physical reactions baked directly into our wellness canvas. Hover over the title to trigger Matrix decodes, move over the cards to track light, draw stardust, or enable the custom brown circular cursor.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Col: Coordinates Radial Glow Cards + Magnet Buttons (Lg: Col-7) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Glow Card A */}
                <GlowCard 
                  onClick={() => setView('immune-booster-info')}
                  className="bg-stone-950 text-[#FAF8F5] border-white/5 cursor-pointer hover:scale-[1.02] transition-transform duration-300" 
                  glowColor="rgba(196, 154, 69, 0.22)"
                >
                  <div className="space-y-4 text-left">
                    <span className="text-[9px] font-mono tracking-wider bg-gold/10 text-gold px-2 py-0.5 rounded-md uppercase">
                      DIETARY INTELLIGENCE
                    </span>
                    <h4 className="font-display font-bold text-lg text-white">
                      <HackerText text="Cellular Absorption" />
                    </h4>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      This element is wrapped inside a <code>GlowCard</code>. Move your mouse inside to trace active radial light emission gradient.
                    </p>
                    <div className="pt-2 flex items-center gap-1.5 text-xs text-gold font-mono uppercase">
                      <span>Live Coordinate Mapping &rarr;</span>
                    </div>
                  </div>
                </GlowCard>

                {/* Glow Card B */}
                <GlowCard 
                  onClick={() => setView('premium-salmon-info')}
                  className="bg-[#FAF8F5] text-stone-800 cursor-pointer hover:scale-[1.02] transition-transform duration-300" 
                  glowColor="rgba(62, 94, 78, 0.18)"
                >
                  <div className="space-y-4 text-left">
                    <span className="text-[9px] font-mono tracking-wider bg-[#3E5E4E]/10 text-[#3E5E4E] px-2 py-0.5 rounded-md uppercase">
                      MAGNETIC BUTTON INTERCEPT
                    </span>
                    <h4 className="font-display font-bold text-lg text-stone-800">
                      <HackerText text="Frictionless Attraction" />
                    </h4>
                    <p className="text-stone-500 text-xs leading-relaxed">
                      Move your cursor slowly towards the magnetic action items below to observe fluid physical suction.
                    </p>
                    <div className="pt-2 flex items-center gap-1.5 text-xs text-[#3E5E4E] font-mono uppercase">
                      <span>Proximity Range: 90px &deg;</span>
                    </div>
                  </div>
                </GlowCard>

              </div>

              {/* Magnet Button Arena Box */}
              <div className="bg-[#FAF8F5] border border-stone-200/40 p-6 rounded-3xl flex flex-col justify-center items-start space-y-4 text-left">
                <p className="text-[10px] font-mono text-stone-500 uppercase tracking-wide">
                  🧲 PHYSICAL PROXIMITY MAGNET RANGE (HOVER TO ATTRACT)
                </p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <MagneticContainer>
                    <button 
                      onClick={() => setView('immune-booster-info')}
                      className="bg-[#3E5E4E] hover:bg-stone-900 text-[#FAF8F5] font-bold px-5 py-3 rounded-full text-xs shadow-md transition-all cursor-pointer"
                    >
                      🟢 Immune Booster
                    </button>
                  </MagneticContainer>

                  <MagneticContainer>
                    <button 
                      onClick={() => setView('premium-salmon-info')}
                      className="bg-gold text-wine hover:bg-[#FAF8F5] hover:text-wine font-extrabold px-5 py-3 rounded-full text-xs shadow-md transition-all cursor-pointer"
                    >
                      🌟 Premium Salmon
                    </button>
                  </MagneticContainer>

                  <MagneticContainer>
                    <button 
                      onClick={() => setView('satiety-fiber-info')}
                      className="bg-transparent hover:bg-stone-100 border border-stone-300 text-stone-800 font-semibold px-5 py-3 rounded-full text-xs transition-all cursor-pointer"
                    >
                      💡 Satiety Fiber
                    </button>
                  </MagneticContainer>
                </div>
              </div>
            </div>

            {/* Right Col: Trail Canvas (Lg: Col-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <TrailCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Callout Banner */}
      <section id="sub-promo-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#4A0D1F] text-[#FAF8F5] rounded-[36px] p-8 sm:p-12 md:p-16 relative overflow-hidden border border-[#FAF8F5]/10 shadow-xl text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute right-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="inline-block bg-[#F4E8C1] text-wine font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-mono">
              SUBSCRIBE & SAVE 15% EVERY MONTH
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-[1.12]">
              Set up your kitten's or cat's diet schedule with zero hassle.
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-lg">
              Unlock automatic routine deliveries, pristine batch priority packing, free expert dietary consultations, and standard shipping. Cancel or adjust intervals at any time.
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
            <button
              onClick={() => setView('catalogue')}
              className="bg-gold hover:bg-[#F4E8C1] hover:-translate-y-0.5 text-stone-950 font-bold px-8 py-4 rounded-full text-sm font-sans flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              Configure Subscription Food
              <ArrowRight size={14} />
            </button>
            <p className="text-[10px] text-stone-300 text-center font-mono uppercase tracking-wide">
              🔒 Safe Checkout Guaranteed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
