/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Sprout, TrendingDown, RefreshCw, BarChart2, CheckCircle2, ShieldCheck } from "lucide-react";
import { Product, ViewType } from "../types";
import { products } from "../data";

interface SatietyFiberViewProps {
  setView: (view: ViewType) => void;
  setSelectedProduct: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

export const SatietyFiberView: React.FC<SatietyFiberViewProps> = ({
  setView,
  setSelectedProduct,
  onAddToCart,
}) => {
  // Pumpkin or fiber rich products (Turkey pumpkin feast, Gourmet salmon, etc.)
  const relatedProducts = products.filter(
    (p) =>
      p.ingredients.toLowerCase().includes("pumpkin") ||
      p.ingredients.toLowerCase().includes("root") ||
      p.ingredients.toLowerCase().includes("carrot")
  ).slice(0, 3);

  // Glycemic Simulator Ingredient state variable
  const [selectedIngredient, setSelectedIngredient] = useState<string>("pumpkin");

  const ingredientSpecs = {
    pumpkin: {
      name: "Wholesome Pumpkin Puree",
      glycemicIndex: 12, // extremely low metabolic response
      satietyDuration: "8.5 hours",
      floraSupport: "HIGH (prebiotic pectin network)",
      description: "Rich in soluble and insoluble fibers that slow glucose ingestion and lubricate fecal passage.",
      status: "OPTIMAL VET STANDARD",
      colorClass: "bg-emerald-500",
      graphHeights: [20, 25, 28, 26, 24, 22, 21, 20], // stable smooth curve
    },
    chicory: {
      name: "Chicory Root Fiber (Inulin)",
      glycemicIndex: 8,
      satietyDuration: "9.5 hours",
      floraSupport: "SUPERIOR (90%+ pure inulin bifido-growth)",
      description: "Direct food source for beneficial Bifidobacteria in the large intestine. Zero measurable impact on blood sugars.",
      status: "OPTIMAL VET STANDARD",
      colorClass: "bg-emerald-500",
      graphHeights: [15, 18, 20, 19, 18, 17, 16, 15], // ultra flat line
    },
    cornStarch: {
      name: "Heavy Maize Starch",
      glycemicIndex: 85,
      satietyDuration: "2.5 hours",
      floraSupport: "CRITICAL COLLAPSE (feeds harmful yeasts & Clostridia)",
      description: "Inexpensive commercial filler. Converts instantly to simple blood glucose causing severe insulin spikes.",
      status: "CRITICAL STARCH RISK",
      colorClass: "bg-red-500",
      graphHeights: [45, 95, 75, 40, 15, 12, 11, 10], // massive spike and crash
    },
    dextrose: {
      name: "Pure Dextrose Syrups",
      glycemicIndex: 100,
      satietyDuration: "1.0 hour",
      floraSupport: "MALIGNANT (encourages microbial dysbiosis)",
      description: "Used to synthesize fake gravy textures. Shocks hepatic pancreas and leads to chronic weight resistance.",
      status: "CRITICAL STARCH RISK",
      colorClass: "bg-red-500",
      graphHeights: [55, 100, 60, 20, 8, 7, 5, 5], // extreme spike and severe crash
    },
  };

  const activeSpec = ingredientSpecs[selectedIngredient as keyof typeof ingredientSpecs] || ingredientSpecs.pumpkin;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="bg-[#FAF8F5] min-h-screen text-stone-900 pb-24 pt-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => setView("home")}
            className="group flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-stone-200/60 bg-white hover:bg-stone-50 text-stone-700 font-medium text-xs transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Philosophy
          </button>
          <span className="text-xs font-mono text-stone-400">CLINICAL SUITE &bull; PREBIOTIC FIBER</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 text-left">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C49A45]/5 border border-[#C49A45]/15 text-[#C49A45] rounded-full text-[10px] font-mono tracking-widest uppercase font-bold">
              <Sprout size={12} /> METABOLIC ALIGNMENT SHEETS
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-wine tracking-tight leading-none">
              Gut Prebiotics. <br />
              <span className="text-[#3E5E4E]">Glycemic Safety Rails.</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Feline longevity peaks when we shield the pancreas from sugar spikes. High-glycemic maize starches tear down tissue and breed inflammation. Our recipes prioritize veterinarian-approved soluble prebiotic chains (such as chicory root inulin) to nourish deep gut bacteria and hold blood sugar fully steady.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200/60 font-mono">
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">0%</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Gluten &amp; Grains Used</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">12 hrs</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Satiety Flatline Index</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">92%</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Bifido Colony Rise</span>
              </div>
            </div>
          </div>

          {/* Right Col Sourcing */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-[#C49A45]/10 rounded-[40px] rotate-2 scale-102 blur-lg opacity-40"></div>
            <div className="relative bg-white border border-stone-200/50 rounded-[40px] p-6 sm:p-8 shadow-xl text-left space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#3E5E4E]" />
                  <span className="text-[11px] font-mono font-bold text-stone-500">INTESTINAL INTEGRITY INDEX</span>
                </div>
                <span className="text-xs font-mono text-[#3E5E4E] font-bold">100% SECURE</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3E5E4E] shrink-0 mt-0.5" />
                  <p className="text-xs text-stone-600 leading-normal">
                    Pectin from organic pumpkin binds stomach bile acids, preventing hazardous glycemic blood spikes.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3E5E4E] shrink-0 mt-0.5" />
                  <p className="text-xs text-stone-600 leading-normal">
                    Chicory Root Inulin serves as direct fuel for Bifidobacterium, keeping pH levels perfectly acidic to kill unwanted gut pathogens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Glycemic Stability Sandbox */}
        <div className="bg-stone-900 text-[#FAF8F5] rounded-[36px] p-8 sm:p-12 mb-20 text-left relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#C49A45]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left side: descriptions & Selectors */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-gold tracking-widest uppercase font-extrabold flex items-center gap-1">
                  <TrendingDown size={14} /> GLYCEMIC SIMULATOR WIDGET
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  Simulate insulin Curves
                </h2>
                <p className="text-stone-350 text-xs sm:text-sm leading-relaxed">
                  Select a carbohydrate sources below to observe how different ingredients impact feline insulin tracks over a 12-hour period.
                </p>
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-2 gap-3.5 pt-4">
                {Object.entries(ingredientSpecs).map(([key, spec]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedIngredient(key)}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      selectedIngredient === key
                        ? "bg-white/10 border-gold text-white shadow-md"
                        : "bg-white/5 border-white/5 text-stone-400 hover:border-white/15"
                    }`}
                  >
                    <span className="block text-[9px] font-mono tracking-wider text-gold uppercase">
                      {spec.status}
                    </span>
                    <span className="font-display font-extrabold text-xs block mt-1">
                      {spec.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right side: Graph output */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {activeSpec.name} Track
                    </h3>
                    <p className="text-xs text-stone-300 max-w-sm mt-1 leading-relaxed">
                      {activeSpec.description}
                    </p>
                  </div>
                  <div className={`p-1.5 px-3 rounded text-[10px] font-mono uppercase font-black text-white ${activeSpec.colorClass}`}>
                    {activeSpec.glycemicIndex > 50 ? "Pancreas Stress High" : "Pancreas Calm"}
                  </div>
                </div>

                {/* Animated Column Chart */}
                <div className="h-44 flex items-end gap-2.5 sm:gap-4.5 border-b border-white/10 pb-2 relative font-mono">
                  {/* Grid lines */}
                  <div className="absolute inset-x-0 top-0 border-t border-white/5 text-[8px] text-stone-500 pt-0.5 pointer-events-none">Spike peak</div>
                  <div className="absolute inset-x-0 top-[50%] border-t border-white/5 text-[8px] text-stone-500 pt-0.5 pointer-events-none">Balanced base</div>

                  {activeSpec.graphHeights.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ type: "spring", stiffness: 120, damping: 15 }}
                        className={`w-full rounded-t-md ${
                          activeSpec.glycemicIndex > 50
                            ? i === 1 || i === 2
                              ? "bg-red-400 shadow-lg shadow-red-500/20"
                              : "bg-red-500/40"
                            : "bg-[#3E5E4E]"
                        }`}
                      ></motion.div>
                      <span className="text-[8px] text-stone-400">Hr {i * 1.5}</span>
                    </div>
                  ))}
                </div>

                {/* Info bullets on the selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="border-t border-white/5 pt-2 text-left">
                    <span className="text-stone-400 block uppercase font-mono text-[9px]">DIETARY SATIETY RANGE</span>
                    <span className="font-bold text-[#FAF8F5]">{activeSpec.satietyDuration}</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 text-left">
                    <span className="text-stone-400 block uppercase font-mono text-[9px]">GUT MICROBIOME EFFICIENCY</span>
                    <span className="font-bold text-[#FAF8F5] leading-none block mt-0.5">{activeSpec.floraSupport}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Formulations based on prebiotic Fiber */}
        <div className="py-12 border-t border-stone-200/60">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 text-left">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#C49A45] uppercase font-black block">HIGH-PREBIOTICS FORMULATIONS</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-wine mt-1">
                Veterinary Pumpkin Stews
              </h2>
            </div>
            <button
              onClick={() => setView("catalogue")}
              className="text-xs font-mono text-[#C49A45] hover:text-gold uppercase tracking-widest font-black flex items-center gap-1"
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
                  <span className="text-[10px] font-mono text-wine font-semibold">{product.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
