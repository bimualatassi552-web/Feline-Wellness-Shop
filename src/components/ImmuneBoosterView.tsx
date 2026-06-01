/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Activity, Shield, Sparkles, HeartPulse, Dna, BrainCircuit, Heart, Plus } from "lucide-react";
import { Product, ViewType } from "../types";
import { products } from "../data";

interface ImmuneBoosterViewProps {
  setView: (view: ViewType) => void;
  setSelectedProduct: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

export const ImmuneBoosterView: React.FC<ImmuneBoosterViewProps> = ({
  setView,
  setSelectedProduct,
  onAddToCart,
}) => {
  // Immune related products: containing Salmon, Turkey or vitamin complexes
  const relatedProducts = products.filter(
    (p) =>
      p.ingredients.toLowerCase().includes("salmon") ||
      p.ingredients.toLowerCase().includes("turkey") ||
      p.ingredients.toLowerCase().includes("taurine")
  ).slice(0, 3);

  // Peptide lab active states
  const [activePeptides, setActivePeptides] = useState<string[]>(["Zinc Chelate", "Taurine Complex"]);
  const allAvailablePeptides = [
    { name: "Zinc Chelate", type: "Cellular Barrier", power: "+35% Stability", desc: "Solidifies mucosal linings of the intestinal tract." },
    { name: "Taurine Complex", type: "Cardiac & Sight", power: "+42% Bio-load", desc: "Nourishes photoreceptor structure & ventricle walls." },
    { name: "L-Lysine", type: "Viral Deflector", power: "+50% Synthesis", desc: "Interferes with viral duplication and builds respiratory armor." },
    { name: "Siberian Ginseng", type: "Adaptogen Catalyst", power: "+28% Stamina", desc: "Assists cortisol regulation under active mental stress." },
    { name: "Colostrum Bio-active", type: "Antibody Shield", power: "+65% Immunoglob", desc: "Rich in active IgG proteins mapping foreign agents." },
  ];

  const handlePeptideToggle = (name: string) => {
    if (activePeptides.includes(name)) {
      if (activePeptides.length > 1) { // keep at least one
        setActivePeptides(activePeptides.filter((p) => p !== name));
      }
    } else {
      if (activePeptides.length < 3) {
        setActivePeptides([...activePeptides, name]);
      }
    }
  };

  // Calculate simulated immunization quotient score
  const scoreFactor = activePeptides.reduce((acc, name) => {
    const item = allAvailablePeptides.find((p) => p.name === name);
    const parsedValue = item ? parseInt(item.power.replace(/[^\d]/g, "")) : 0;
    return acc + parsedValue;
  }, 0);

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
          <span className="text-xs font-mono text-stone-400">CLINICAL SUITE &bull; IMMUNE</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 text-left">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-wine/5 border border-wine/15 text-wine rounded-full text-[10px] font-mono tracking-widest uppercase">
              <Shield size={12} /> CLINICAL TRANSCRIPT SECTION
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-wine tracking-tight leading-none">
              Cellular Defense. <br />
              <span className="text-gold">Active Protection Loops.</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Feline vital resistance begins at the intracellular barrier level. Traditional commercial processing kills natural immunoglobulins. Our science integrates highly bioactive peptides, Zinc Chelates, and native enzyme bonds that bypass digestion acids to latch straight onto cellular reception sites.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200/60 font-mono">
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">+145%</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Intracellular T-Cell Rise</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">99.8%</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Zinc Chelation Rate</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-[#3E5E4E]">12 hrs</span>
                <span className="text-[10px] text-stone-500 uppercase tracking-widest block mt-1">Peak Circulation Cycle</span>
              </div>
            </div>
          </div>

          {/* Sourcing Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gold/15 rounded-[40px] rotate-2 scale-102 blur-lg opacity-40"></div>
            <div className="relative bg-white border border-stone-200/50 rounded-[40px] p-6 sm:p-8 shadow-xl text-left space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-[#3E5E4E] animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-stone-500">REALTIME ABS BALANCE</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>

              {/* Dynamic visual dashboard for cell absorption */}
              <div className="space-y-4">
                <div className="bg-[#FAF8F5] p-4.5 rounded-2xl border border-stone-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-stone-850">Absorption Co-efficient</span>
                    <span className="text-xs font-mono font-bold text-wine">94.8% Active</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-wine h-full w-[94.8%] transition-all duration-500"></div>
                  </div>
                </div>

                <div className="bg-[#FAF8F5] p-4.5 rounded-2xl border border-stone-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-stone-850">Free Acid Destruction Rate</span>
                    <span className="text-xs font-mono font-bold text-[#3E5E4E]">&lt; 1.2% Denatured</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#3E5E4E] h-full w-[12%] transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              <p className="text-[10px] leading-relaxed text-stone-400 italic">
                *Verified during in vitro duodenal simulation tests at independent veterinary laboratories (2025).
              </p>
            </div>
          </div>
        </div>

        {/* Peptide Lab Interactive Sandbox Widget */}
        <div className="bg-stone-900 text-[#FAF8F5] rounded-[36px] p-8 sm:p-12 mb-20 text-left relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left side: descriptions */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-mono text-gold tracking-widest uppercase font-extrabold flex items-center gap-1">
                <Dna size={14} /> METABOLIC SANDBOX WIDGET
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Synthesize Cellular Resistance
              </h2>
              <p className="text-stone-350 text-xs sm:text-sm leading-relaxed">
                Choose and toggle up to 3 essential ingredients on the right. See how combining active amino-acids and adaptogens locks defense loops to generate higher simulated immunization scores.
              </p>

              {/* Score Dashboard Card */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400 text-xs font-mono uppercase">Resistance Factor</span>
                  <span className="text-gold font-mono font-extrabold tracking-wide text-xs">STABLE</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-mono font-black text-white">{scoreFactor}%</span>
                  <span className="text-xs text-stone-400">Synthesized Immunization</span>
                </div>
                {/* Responsive progression bar */}
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
                  <motion.div 
                    animate={{ width: `${Math.min(100, scoreFactor * 0.7)}%` }} 
                    transition={{ duration: 0.3 }}
                    className="bg-gold h-full"
                  ></motion.div>
                </div>
              </div>
            </div>

            {/* Right side: toggles */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] text-stone-400 font-mono block uppercase tracking-wider">
                Select Immunization Compounds (Max 3 Active at a time)
              </span>

              <div className="space-y-3">
                {allAvailablePeptides.map((pep) => {
                  const isActive = activePeptides.includes(pep.name);
                  return (
                    <button
                      key={pep.name}
                      onClick={() => handlePeptideToggle(pep.name)}
                      className={`w-full text-left p-4 rounded-2xl transition-all border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 cursor-pointer ${
                        isActive
                          ? "bg-[#FAF8F5]/10 border-gold shadow-md text-white"
                          : "bg-white/5 border-white/5 text-stone-400 hover:border-white/15 hover:bg-white/5"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${isActive ? "bg-gold" : "bg-stone-500"}`}></span>
                          <span className="font-display font-extrabold text-sm text-stone-200">{pep.name}</span>
                          <span className="text-[9px] font-mono text-stone-400 py-0.5 px-2 rounded bg-white/5">
                            {pep.type}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 max-w-md leading-normal">{pep.desc}</p>
                      </div>

                      <div className="text-xs font-mono font-black text-gold/90 pl-4 sm:pl-0">
                        {pep.power}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Formulations Rich in Human-Grade Proteins */}
        <div className="py-12 border-t border-stone-200/60">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 text-left">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-wine uppercase font-black block">IMMUNE SUPPORT RECOMMENDATIONS</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-wine mt-1">
                Formulations Matching this Standard
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
