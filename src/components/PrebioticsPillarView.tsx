/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Check, Compass, Eye, Heart, Leaf, Shield, Sparkles, Star } from "lucide-react";
import { Product, ViewType } from "../types";
import { products } from "../data";

interface PrebioticsPillarViewProps {
  setView: (view: ViewType) => void;
  setSelectedProduct: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

export const PrebioticsPillarView: React.FC<PrebioticsPillarViewProps> = ({
  setView,
  setSelectedProduct,
  onAddToCart,
}) => {
  // Prebiotic products: Recipes containing Pumpkin or Chicory or Dandelion
  const relatedProducts = products.filter(
    (p) =>
      p.ingredients.toLowerCase().includes("pumpkin") ||
      p.ingredients.toLowerCase().includes("chicory") ||
      p.ingredients.toLowerCase().includes("roots")
  ).slice(0, 3);

  const prebioticIngredientsList = [
    { name: "Pumpkin Puree", benefit: "Rich in soluble dietary fibers, soothing intestinal linings, stabilizing glycemic peaks", source: "Oregon organic farms" },
    { name: "Chicory Root Inulin", benefit: "Natural fructooligosaccharides nourishing beneficial Bifidobacteria strains", source: "Belgian organic roots" },
    { name: "Dandelion Greens", benefit: "Natural hepatoprotective antioxidants that assist cellular filtration and waste clearage", source: "Wild botanical herbs" },
    { name: "Miscanthus Grass", benefit: "Adds structural non-soluble fiber that safely encourages consistent hairball passage", source: "Nebraska pasture grass" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="bg-[#FAF8F5] min-h-screen text-stone-900 pb-20 pt-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => setView("home")}
            className="group flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-stone-200/60 bg-white hover:bg-stone-50 text-stone-700 font-medium text-xs transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Philosophy
          </button>
          <span className="text-xs font-mono text-stone-400">RESEARCH PILLAR 03/03</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold/10 border border-gold/20 text-wine rounded-full text-[10px] font-mono tracking-widest uppercase">
              <Shield size={12} className="text-gold" /> GUT-MICROBIOME IMMUNIZATION
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-wine tracking-tight leading-none">
              Botanical Fiber. <br />
              <span className="text-[#3E5E4E]">Active Flora Shield.</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Up to 70% of a cat&rsquo;s central defense systems reside in their digestive tract. Instead of low-cost chemical binding agents, heavy wheat gluten, or synthetic cellulose, our formulas employ organic pumpkin purees and wild chicory root to construct a robust microbial environment.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/60 font-mono">
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">70%</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Immune Core in Gut</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">0%</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Chemical Gums/Bridges</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">99.1%</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Stool Form Score</span>
              </div>
            </div>
          </div>

          {/* Sourcing Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gold/15 rounded-[40px] rotate-1 scale-102 blur-lg opacity-40"></div>
            <div className="relative bg-white border border-stone-200/45 rounded-[40px] p-6 sm:p-8 shadow-xl text-left space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/5 flex items-center justify-center text-gold">
                  <Star fill="currentColor" size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-stone-900">Dr. Melissa Reyes</h4>
                  <p className="text-[10px] font-mono text-stone-400">Veterinary Immunologist</p>
                </div>
              </div>

              <blockquote className="text-stone-600 text-xs italic leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border-l-[3px] border-gold">
                "Modern domestic cats struggle with hairballs and chronic colon irritation due to ultra-refined fiberless protein pellets. Integrating pumpkin mucilage coats the digestive walls, encouraging seamless transport without dehydrating the colon tissues."
              </blockquote>

              <div className="space-y-3">
                <span className="text-[9px] font-mono tracking-widest text-[#3E5E4E] uppercase block font-extrabold">MICROBIOME STABILITY INDEX</span>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#3E5E4E] h-full w-[97%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>Gram-Positive Flora ratio</span>
                  <span>97% Stable Colon Counts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Botanical Ingredient Breakdowns */}
        <div className="bg-stone-900 text-[#FAF8F5] rounded-[36px] p-8 sm:p-12 mb-16 text-left">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono text-gold uppercase tracking-widest font-black block">BOTANICAL SOURCEBOOK</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-2">
              The Botanical Alternatives to Chemical Binders
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Standard commercial pet foods use guar gum, carrageenan, or industrial starches to glue wet ingredients together. These cause systemic mucosal irritation. Our botanical prebiotics create clean bonds organically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prebioticIngredientsList.map((ing, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-center">
                  <h4 className="font-display font-extrabold text-lg text-white">{ing.name}</h4>
                  <span className="text-[10px] font-mono text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">{ing.source}</span>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {ing.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Prebiotic Products */}
        <div className="py-12 border-t border-stone-200/60">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 text-left">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#3E5E4E] uppercase font-black block">PREBIOTIC DIETS</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-wine mt-1">
                Prescribed Fiber &amp; Prebiotic Diets
              </h2>
            </div>
            <button
              onClick={() => setView("catalogue")}
              className="text-xs font-mono text-wine hover:text-gold uppercase tracking-widest font-black flex items-center gap-1"
            >
              See All Formulations &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setView("detail");
                }}
                className="bg-white rounded-[32px] border border-stone-200/50 p-4 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square rounded-2xl bg-[#FAF8F5] p-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-[85%] h-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product, e);
                      }}
                      className="absolute bottom-3 right-3 bg-gold hover:bg-wine text-wine hover:text-[#FAF8F5] p-2.5 rounded-full shadow-md z-10 transition-colors duration-200"
                    >
                      <Sparkles size={14} />
                    </button>
                  </div>

                  <div className="pt-4 px-1.5 space-y-1">
                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">{product.subcategory}</span>
                    <h3 className="font-display font-bold text-stone-850 group-hover:text-wine transition-colors text-sm sm:text-base line-clamp-1">{product.name}</h3>
                    <p className="text-stone-500 text-xs line-clamp-2 mt-1">{product.description}</p>
                  </div>
                </div>

                <div className="pt-4 px-1.5 border-t border-stone-100 mt-4 flex items-center justify-between">
                  <span className="font-mono text-stone-900 font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-[10px] font-mono text-[#3E5E4E] font-semibold">{product.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
