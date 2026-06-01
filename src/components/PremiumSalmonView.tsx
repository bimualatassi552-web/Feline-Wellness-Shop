/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Sparkles, Droplet, Flame, Compass, HelpCircle, HardDrive, BadgeCheck, Zap } from "lucide-react";
import { Product, ViewType } from "../types";
import { products } from "../data";

interface PremiumSalmonViewProps {
  setView: (view: ViewType) => void;
  setSelectedProduct: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

export const PremiumSalmonView: React.FC<PremiumSalmonViewProps> = ({
  setView,
  setSelectedProduct,
  onAddToCart,
}) => {
  // Salmon products in database
  const relatedProducts = products.filter(
    (p) => p.name.toLowerCase().includes("salmon")
  ).slice(0, 3);

  // Lipid extraction simulator state variables
  const [temperature, setTemperature] = useState<number>(45); // °C
  const [pressure, setPressure] = useState<number>(3.2); // bar

  // Calculate yield output and quality status continuously
  const calculateLipidYield = () => {
    // Peak quality is around temperature 38-48 °C and pressure 2.8 - 3.8 bar
    const optimalTempDist = Math.abs(temperature - 42); // optimal is 42C
    const optimalPressDist = Math.abs(pressure - 3.2); // optimal is 3.2 bar

    // Yield drops off with high heat or low pressure
    const isOverheated = temperature > 60;
    const isUnderpressured = pressure < 1.5;

    let baseYield = 98 - (optimalTempDist * 1.1) - (optimalPressDist * 5.0);
    baseYield = Math.max(15, Math.min(100, Math.round(baseYield)));

    let qualityRating = "ELITE RESERVE";
    let alertMsg = "Ideal metabolic alignment found.";
    let colorClass = "text-[#3E5E4E]";

    if (isOverheated) {
      qualityRating = "THERMALLY SEVERED";
      alertMsg = "Heat exceeds 60°C. Vital omega chains have denatured.";
      colorClass = "text-wine";
    } else if (isUnderpressured) {
      qualityRating = "SUB-OPTIMAL RECOVERY";
      alertMsg = "Pressure is too weak to separate complex lipids.";
      colorClass = "text-orange-500";
    } else if (baseYield >= 90) {
      qualityRating = "BIO-ACTIVE OPTIMAL";
      alertMsg = "Omega 3 (EPA/DHA) cellular chains perfectly preserved.";
      colorClass = "text-[#3E5E4E]";
    } else {
      qualityRating = "STANDARD GRADE";
      alertMsg = "Minor oxidative loss due to parameter deviation.";
      colorClass = "text-gold";
    }

    return { yieldPercent: baseYield, quality: qualityRating, alert: alertMsg, color: colorClass };
  };

  const { yieldPercent, quality, alert, color } = calculateLipidYield();

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
          <span className="text-xs font-mono text-stone-400">CLINICAL SUITE &bull; COLDWATER OMEGA</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 text-left">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#3E5E4E]/5 border border-[#3E5E4E]/15 text-[#3E5E4E] rounded-full text-[10px] font-mono tracking-widest uppercase">
              <Droplet size={12} /> UNTAMED RECOVERY BIO-SHEETS
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#3E5E4E] tracking-tight leading-none">
              Coldwater Lipids. <br />
              <span className="text-gold">Deep Hydration Armor.</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Feline coats are direct gauges of metabolic balance. Wild-pulled salmon oils retain sensitive, long-chain carbon matrices (EPA and DHA). These lipids act as cellular gaskets, locking in intercellular moisture to stop epidermal drying and banish dander completely.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200/60 font-mono">
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">4.8x</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Bio-Attraction Ratio</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">100%</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Single-Source Sourced</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">&lt;45&deg;C</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Low Heat Separator</span>
              </div>
            </div>
          </div>

          {/* Right Col Sourcing */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-[#3E5E4E]/10 rounded-[40px] rotate-2 scale-102 blur-lg opacity-40"></div>
            <div className="relative bg-white border border-stone-200/50 rounded-[40px] p-6 sm:p-8 shadow-xl text-left space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Compass size={18} className="text-wine" />
                  <span className="text-[11px] font-mono font-bold text-stone-500">ORIGIN: PORTLAND BAY, OR</span>
                </div>
                <span className="text-xs font-mono text-stone-400">BATCH SF-2026</span>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="flex justify-between text-xs pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Subspecies:</span>
                  <span className="font-mono font-bold text-stone-800">Oncorhynchus kisutch (Coho)</span>
                </div>
                <div className="flex justify-between text-xs pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Method:</span>
                  <span className="font-mono font-bold text-[#3E5E4E]">Hydraulic Wet Press</span>
                </div>
                <div className="flex justify-between text-xs pb-1 border-b border-stone-100">
                  <span className="text-stone-500">Oxidation Indices:</span>
                  <span className="font-mono font-bold text-[#3E5E4E]">&lt; 1.5 meq/kg active</span>
                </div>
              </div>

              <p className="text-[10px] sm:text-xs leading-relaxed text-stone-500">
                Fresh Atlantic salmon oil is extracted right on the vessel within hours of capture to protect organic molecules from light-induced oxidation.
              </p>
            </div>
          </div>
        </div>

        {/* Cold-Extraction Thermal / Pressure Simulator Widget */}
        <div className="bg-stone-900 text-[#FAF8F5] rounded-[36px] p-8 sm:p-12 mb-20 text-left relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#3E5E4E]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Control Sliders */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono text-gold tracking-widest uppercase font-extrabold flex items-center gap-1">
                <Flame size={14} /> EXTRACT OPTIMIZATION SIMULATOR
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Calibrate Cold-Press Parameters
              </h2>
              <p className="text-stone-350 text-xs sm:text-sm leading-relaxed">
                Adjust heat and mechanical pressure levels to observe molecular integrity. Finding the "Coldwater Goldilocks Zone" maximizes active, non-oxidized EPA and DHA counts.
              </p>

              {/* Sliders */}
              <div className="space-y-5 pt-4">
                {/* Temp Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#FAF8F5]/60 uppercase">Extraction Heat</span>
                    <span className="text-gold font-bold">{temperature}&deg;C</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-stone-500">
                    <span>20&deg;C (Cold Press)</span>
                    <span>90&deg;C (Standard Boiling Boil)</span>
                  </div>
                </div>

                {/* Pressure Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#FAF8F5]/60 uppercase">Chamber Suction Pressure</span>
                    <span className="text-gold font-bold">{pressure.toFixed(1)} Bar</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="6.0"
                    step="0.1"
                    value={pressure}
                    onChange={(e) => setPressure(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-stone-500">
                    <span>1.0 bar (Atmospheric)</span>
                    <span>6.0 bar (High Hydrostatic)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Live Output Metrics Dashboard */}
            <div className="lg:col-span-6">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-mono text-stone-400 block uppercase">SIMULATION CLASSIFICATION</span>
                    <span className={`text-base font-display font-extrabold leading-none ${color}`}>
                      {quality}
                    </span>
                  </div>
                  <span className="bg-[#FAF8F5]/5 border border-stone-600/50 rounded-md px-2 py-1 text-[10px] font-mono font-bold">
                    SYSTEM OK
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-350">Preserved Omega Yield</span>
                    <span className="font-mono text-white font-bold">{yieldPercent}%</span>
                  </div>
                  {/* Gauge bar */}
                  <div className="w-full bg-[#FAF8F5]/10 h-3 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${yieldPercent}%` }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className={`h-full ${yieldPercent > 85 ? "bg-[#3E5E4E]" : yieldPercent > 50 ? "bg-gold" : "bg-wine"}`}
                    ></motion.div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl flex items-start gap-3">
                  <Zap size={16} className="text-gold mt-0.5 shrink-0" />
                  <p className="text-xs text-stone-300 leading-relaxed text-left">
                    {alert}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Recommended Formulations based on coldwater Salmon */}
        <div className="py-12 border-t border-stone-200/60">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 text-left">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#3E5E4E] uppercase font-black block">LIPID HIGH FORMULATIONS</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-wine mt-1">
                Deep Sea Sourced Wet Packs
              </h2>
            </div>
            <button
              onClick={() => setView("catalogue")}
              className="text-xs font-mono text-[#3E5E4E] hover:text-gold uppercase tracking-widest font-black flex items-center gap-1"
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
