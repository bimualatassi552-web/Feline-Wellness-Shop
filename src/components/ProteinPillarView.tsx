/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Award, Beaker, Check, Shield, Star, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Product, ViewType } from "../types";
import { products } from "../data";

interface ProteinPillarViewProps {
  setView: (view: ViewType) => void;
  setSelectedProduct: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

export const ProteinPillarView: React.FC<ProteinPillarViewProps> = ({
  setView,
  setSelectedProduct,
  onAddToCart,
}) => {
  // Related protein products: Salmon and Turkey recipes
  const relatedProducts = products.filter(
    (p) =>
      p.ingredients.toLowerCase().includes("salmon") ||
      p.ingredients.toLowerCase().includes("turkey") ||
      p.ingredients.toLowerCase().includes("chicken")
  ).slice(0, 3);

  const aminoAcids = [
    { name: "Taurine", role: "Myocardial health, optical cellular structure, nervous system integrity", value: "100% Retained" },
    { name: "L-Carnitine", role: "Mitochondrial conversion, active lipid burning, lean mass retention", value: "98.5% Active" },
    { name: "Arginine", role: "Critical nitrogenous byproduct synthesis, renal filter assistance", value: "100% Bio-available" },
    { name: "Lysine", role: "Anti-viral antibody fortification, structural collagen synthesis", value: "97.9% Bio-available" },
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
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => setView("home")}
            className="group flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-stone-200/60 bg-white hover:bg-stone-50 text-stone-700 font-medium text-xs transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Philosophy
          </button>
          <span className="text-xs font-mono text-stone-400">RESEARCH PILLAR 01/03</span>
        </div>

        {/* Editorial Visual Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-wine/5 border border-wine/10 text-wine text-[10px] font-mono tracking-widest uppercase">
              <Award size={12} /> HUMAN-GRADE PROTEIN STANDARD
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-wine tracking-tight leading-none">
              Pure Amino Structure. <br />
              <span className="text-gold">Zero Extrusion Ash.</span>
            </h1>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Felines are strict carnivores. Their evolutionary biological path requires intact native peptide loops rather than highly oxidized hydrolyzed powder or feather residue. At our labs, we formulate using certified organic pasture-raised turkey and wild coldwater salmon.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/60">
              <div>
                <span className="block text-2xl font-mono font-extrabold text-[#3E5E4E]">100%</span>
                <span className="text-[10px] text-stone-500 font-mono uppercase tracking-widest block mt-1">Real Sourced meat</span>
              </div>
              <div>
                <span className="block text-2xl font-mono font-extrabold text-[#3E5E4E]">0%</span>
                <span className="text-[10px] text-stone-500 font-mono uppercase tracking-widest block mt-1">Gluten &amp; Fillers</span>
              </div>
              <div>
                <span className="block text-2xl font-mono font-extrabold text-[#3E5E4E]">8.4x</span>
                <span className="text-[10px] text-stone-500 font-mono uppercase tracking-widest block mt-1">Superior Bio-Index</span>
              </div>
            </div>
          </div>

          {/* Right Aesthetic Block */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gold/10 rounded-[40px] rotate-2 scale-102 blur-lg opacity-40"></div>
            <div className="relative bg-white border border-stone-200/50 rounded-[40px] p-6 sm:p-8 shadow-xl text-left space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3E5E4E]/5 flex items-center justify-center text-[#3E5E4E]">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm text-stone-900">Dr. Helena Vance, DVM</h4>
                  <p className="text-[10px] font-mono text-stone-400">PhD, Veterinary Endocrinology</p>
                </div>
              </div>

              <blockquote className="text-stone-600 text-xs italic leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border-l-[3px] border-gold">
                "When cats ingest industrial 'feather meal' or heat-shredded animal by-product, their livers are forced to process excessive inorganic nitrogenous residues. Intact real protein prevents early renal stress and sustains ideal metabolic lean indexes."
              </blockquote>

              <div className="space-y-3">
                <span className="text-[9px] font-mono tracking-widest text-[#3E5E4E] uppercase block font-extrabold">CLINICAL STABILITY AUDIT</span>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-moss h-full w-[98.8%]"></div>
                </div>
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>Traceability Index</span>
                  <span>98.8% Perfect Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Molecular Quality Comparison Section */}
        <div className="bg-stone-900 text-[#FAF8F5] rounded-[36px] p-8 sm:p-12 mb-16 text-left">
          <div className="max-w-3xl mb-10 space-y-3">
            <span className="text-xs font-mono text-gold tracking-widest uppercase font-extrabold">THE BIOLOGICAL METRIC</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
              Molecular Differences: Intact peptide vs Extruded Powders
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm">
              Standard commercial pet foods use extreme physical heat pressure to turn biological scraps into dry dry powder. This process compromises critical molecular bonds, requiring the injection of synthesized chemical additives to make up for nutritional deficits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
              <span className="text-2xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Standard Feline Wellness Formula
              </span>
              <h4 className="font-display font-bold text-lg text-white">Intact Whole Cell Protein</h4>
              <p className="text-stone-400 text-xs leading-relaxed">
                Retains its complex hydrophobic lipid and taurine structure complete in raw amino form, encouraging natural biological enzymatic breakdown in the feline gastrointestinal canal.
              </p>
              <div className="space-y-1 pt-4 border-t border-white/10">
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>Enzyme Digestion Rate</span>
                  <span>100% Optimal</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 opacity-75">
              <span className="text-2xs font-mono text-amber-500 uppercase tracking-widest flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                Other Commercial kibbles / Powders
              </span>
              <h4 className="font-display font-bold text-lg text-white">Aggressed Hydrolyzed Residues</h4>
              <p className="text-stone-400 text-xs leading-relaxed">
                Subjected to 210&deg;C autoclave treatment. Structural cellular lipids are oxidized, rendering standard amino peptides inactive and forcing liver filtering overloads.
              </p>
              <div className="space-y-1 pt-4 border-t border-white/10">
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>Enzyme Digestion Rate</span>
                  <span>Only ~34% Absorbed</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[34%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amino Acid Profiler */}
        <div className="mb-20">
          <div className="text-center space-y-2 mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-wine">Essential Feline Amino Acid Matrix</h2>
            <p className="text-stone-500 text-xs max-w-xl mx-auto">
              Our human-grade cuts assure that the biological tissue delivers maximum bio-availability indices without synthetic supplementation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aminoAcids.map((aa, i) => (
              <div key={i} className="bg-white border border-stone-100 p-6 rounded-3xl text-left space-y-4 shadow-sm hover:scale-102 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-extrabold text-[#3E5E4E] bg-[#3E5E4E]/5 px-2 py-0.5 rounded">
                    {aa.value}
                  </span>
                  <Beaker size={14} className="text-stone-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-black text-stone-900 text-md">{aa.name}</h4>
                  <p className="text-stone-500 text-2xs leading-relaxed">{aa.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulations Rich in Human-Grade Proteins */}
        <div className="py-12 border-t border-stone-200/60">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 text-left">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#3E5E4E] uppercase font-black block">CURATED RECOMMENDED DIETS</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-wine mt-1">
                Formulations matching this Standard
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
