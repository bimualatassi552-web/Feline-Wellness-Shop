/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Flame, HelpCircle, Info, Leaf, ShieldAlert, ShieldCheck, Thermometer, Wifi } from "lucide-react";
import { Product, ViewType } from "../types";
import { products } from "../data";

interface SimmerPillarViewProps {
  setView: (view: ViewType) => void;
  setSelectedProduct: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

export const SimmerPillarView: React.FC<SimmerPillarViewProps> = ({
  setView,
  setSelectedProduct,
  onAddToCart,
}) => {
  // Gentle slow-simmer is mostly associated with our wet stews/pate
  const relatedProducts = products.filter(p => p.category === 'wet').slice(0, 3);

  const retentionStats = [
    { name: "Complex Lipids & Oils", slow: "99.2% Retained", fast: "12% Active (highly oxidized)", desc: "Maintains optimal integrity for brain development & visual pathway support" },
    { name: "Taurine Compounds", slow: "100.0% Retained", fast: "45% Synthetic Added", desc: "Native molecules protect central optical pathways and cardiac wall tension" },
    { name: "Digestive Enzymes", slow: "94.5% Intact", fast: "0% Raw (denatured)", desc: "Light thermal cooking shields vital protein structures from structural collapse" }
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
          <span className="text-xs font-mono text-stone-400">RESEARCH PILLAR 02/03</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-moss/10 border border-moss/20 text-[#3E5E4E] text-[10px] font-mono tracking-widest uppercase">
              <Leaf size={12} /> ENZYME INTEGRITY COMPLIANCE
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#3E5E4E] tracking-tight leading-none">
              Slow Low Simmer. <br />
              <span className="text-gold">Lock in Vital Vitality.</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Unlike industrial manufacturers that apply explosive high-pressure extrusion (above 180&deg;C) to cook raw mixtures in seconds, our artisanal wet batches are simmered slowly in temperature-regulated kettles at 62&deg;C. This guarantees optimal enzymatic preservation.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/60 font-mono">
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">62&deg;C</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Thermal Peak Care</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">12 hrs</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Simmer Cycle Time</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">3.4x</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Enzyme Bio-Activity</span>
              </div>
            </div>
          </div>

          {/* Sourcing Visual Circle Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-[#3E5E4E]/5 rounded-[40px] -rotate-2 scale-102 blur-lg opacity-40"></div>
            <div className="relative bg-white border border-stone-200/40 rounded-[40px] p-6 sm:p-8 shadow-xl text-left space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/5 flex items-center justify-center text-gold">
                  <Thermometer size={20} />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-stone-900">Dr. Julian Croft</h4>
                  <p className="text-[10px] font-mono text-stone-400">Chief Molecular Biologist</p>
                </div>
              </div>

              <blockquote className="text-stone-600 text-xs italic leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border-l-[3px] border-[#3E5E4E]">
                "High heat pasteurization triggers 'Maillard reactions' that glue amino proteins to complex sugars, turning them into solid non-metabolizable blocks. Mild thermal simmering protects the individual chemical integrity of fats and minerals."
              </blockquote>

              <div className="space-y-3">
                <span className="text-[9px] font-mono tracking-widest text-[#3E5E4E] uppercase block font-extrabold">THERMAL ENZYME GRAPH RATIO</span>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-[95%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>Chemical Lipid Retained</span>
                  <span>95% vs ~14% Extruded</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Comparison list */}
        <div className="bg-white border border-stone-200/50 rounded-[36px] p-8 sm:p-12 mb-16 text-left">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono text-moss uppercase tracking-widest font-black block">THE SCIENTIFIC COMPARISON</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900 mt-2">
              Why Low-Temp Kettles Triumph Over Fast Pressure Cookers
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Industrial pet factories prioritize speed—extruded food takes under 15 seconds to cook at lethal thermal loads. Our slow, balanced brewing takes up to 12 hours, preserving fragile bioactive structures.
            </p>
          </div>

          <div className="space-y-6">
            {retentionStats.map((stat, idx) => (
              <div key={idx} className="p-6 bg-[#FAF8F5] rounded-3xl border border-stone-100 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-4 text-left">
                  <h4 className="font-display font-extrabold text-stone-850 text-md">{stat.name}</h4>
                  <p className="text-stone-400 text-2xs mt-1 leading-relaxed">{stat.desc}</p>
                </div>

                <div className="lg:col-span-4 text-center py-2 px-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-emerald-800 block">OUR GENTLE STANDARD</span>
                  <span className="font-mono text-base font-extrabold text-emerald-700">{stat.slow}</span>
                </div>

                <div className="lg:col-span-4 text-center py-2 px-4 bg-amber-50 border border-amber-100 rounded-xl opacity-75">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-amber-800 block">HIGH-HEAT MASS EXTRUSION</span>
                  <span className="font-mono text-base font-extrabold text-amber-700">{stat.fast}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curated slow cooked products */}
        <div className="py-12 border-t border-stone-200/60">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 text-left">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#3E5E4E] uppercase font-black block">SLOW-BREWED SELECTION</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#3E5E4E] mt-1">
                Kettle-Simmered Wet Formulations
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
                      <Leaf size={14} />
                    </button>
                  </div>

                  <div className="pt-4 px-1.5 space-y-1">
                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">{product.subcategory}</span>
                    <h3 className="font-display font-bold text-stone-850 group-hover:text-[#3E5E4E] transition-colors text-sm sm:text-base line-clamp-1">{product.name}</h3>
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
