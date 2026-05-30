/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Plus, ShieldCheck, ShoppingBag, Eye, Sparkles } from "lucide-react";
import { Product } from "../types";
import { products } from "../data";

interface RotatingProductWheelProps {
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

interface WheelCardProps {
  product: Product;
  diff: number;
  isCenter: boolean;
  absDiff: number;
  windowWidth: number;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
  onCardClick: () => void;
  onViewDetails: (product: Product) => void;
}

const WheelCard: React.FC<WheelCardProps> = ({
  product,
  diff,
  isCenter,
  absDiff,
  windowWidth,
  onAddToCart,
  onCardClick,
  onViewDetails,
}) => {
  // 3D Pointer-based Hover Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isCenter || !cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top; // y position within element

    // Normalize coordinates to [-0.5, 0.5]
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;

    // Calculate elegant tilt angles within ±15 degrees limit
    // Y-axis tilt responds to horizontal movement, X-axis tilt responds to vertical movement
    const tiltY = normalizedX * 30; // max 15deg either side
    const tiltX = -normalizedY * 30; // max 15deg either side

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Visibility logic: only center card and flanking side cards are visible (diff = -1, 0, 1)
  const isVisible = absDiff <= 1;

  // Calculate pixel translation symmetrically to avoid overlap and sustain perfect geometrical alignment
  const xOffset = diff * (windowWidth < 640 ? 160 : 380);

  // Apply rigid 1.05 center focus scaling vs 0.85 side scaling, and Z-axis indices
  const scale = isCenter ? 1.05 : 0.85;
  const zTranslation = isCenter ? 50 : -100;
  const opacity = isCenter ? 1.0 : 0.40;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onCardClick}
      animate={{
        x: xOffset,
        z: zTranslation,
        scale: scale,
        rotateX: isCenter ? tilt.x : 0,
        rotateY: isCenter ? tilt.y : diff * -8, // slight outward perspective angle for side cards
        opacity: isVisible ? opacity : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 900,
        damping: 50,
        mass: 0.3,
      }}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
        zIndex: isCenter ? 50 : 30,
        visibility: isVisible ? "visible" : "hidden",
        pointerEvents: isVisible ? "auto" : "none",
      }}
      className={`absolute w-[280px] h-[400px] sm:w-[380px] sm:h-[520px] bg-white rounded-[32px] border ${
        isCenter
          ? "border-gold/60 shadow-2xl shadow-stone-300/80"
          : "border-stone-100/80 shadow-md hover:border-stone-200"
      } overflow-hidden cursor-pointer flex flex-col p-5 group select-none`}
    >
      {/* 3D layers inside card */}
      <div className="relative flex-1 flex flex-col h-full" style={{ transformStyle: "preserve-3d" }}>
        {/* Image Display area with scale support */}
        <div 
          className="relative aspect-[4/3] rounded-2xl bg-[#FAF8F5] p-3 flex items-center justify-center overflow-hidden"
          style={{ transform: "translateZ(10px)" }}
        >
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 pointer-events-none">
            {product.isBestseller && (
              <span className="bg-wine text-[#FAF8F5] text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full">
                BESTSELLER
              </span>
            )}
            {product.isNew && (
              <span className="bg-moss text-white text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full">
                NEW WET
              </span>
            )}
          </div>

          {/* High Quality Product Illustration Render */}
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-[85%] h-[85%] object-contain transition-transform duration-500 group-hover:scale-106"
          />

          {/* Minimal instant-add badge */}
          {isCenter && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product, e);
              }}
              className="absolute bottom-3 right-3 bg-gold hover:bg-wine text-wine hover:text-[#FAF8F5] p-2.5 rounded-full shadow-md z-10 transition-all duration-300 hover:rotate-90"
              title="Quick Add to Basket"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          )}
        </div>

        {/* Content details block within strict heights */}
        <div className="pt-5 flex-1 flex flex-col justify-between text-left" style={{ transform: "translateZ(20px)" }}>
          <div className="space-y-1.5">
            <span className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest leading-none">
              {product.subcategory}
            </span>
            <h3 className="font-display font-black text-base sm:text-lg text-stone-850 line-clamp-1 group-hover:text-wine transition-colors leading-tight">
              {product.name}
            </h3>
            <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed pt-0.5">
              {product.description}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-stone-100">
            {/* Rating score details */}
            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
              <div className="flex items-center gap-1 text-gold">
                <Star size={11} fill="currentColor" stroke="none" />
                <span className="font-extrabold text-wine">{product.rating}</span>
                <span>({product.reviewsCount})</span>
              </div>
              <span className="text-[#3E5E4E] font-extrabold bg-[#3E5E4E]/5 px-2 py-0.5 rounded">
                100% Traceable
              </span>
            </div>

            {/* Price section */}
            <div className="flex justify-between items-center">
              <span className="font-mono text-base sm:text-lg font-black text-stone-900 leading-none">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex gap-2">
                <span className="text-[10px] text-stone-400 border border-stone-200/50 px-2 py-1 rounded-md font-mono">
                  {product.size}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const RotatingProductWheel: React.FC<RotatingProductWheelProps> = ({
  onViewDetails,
  onAddToCart,
}) => {
  // Use a selection of 5 top formulations for a perfect cylindrical ring balance
  const wheelProducts = products.slice(0, 6);
  const total = wheelProducts.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastWheelTime = useRef<number>(0);

  // Dynamic Window resize tracker for proportional 3D spacing
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Rotate to index wrapping safely
  const setIndexWrapped = (nextIdx: number, dir: number) => {
    setDirection(dir);
    setActiveIndex((nextIdx + total) % total);
  };

  const handleNext = () => {
    setIndexWrapped(activeIndex + 1, 1);
  };

  const handlePrev = () => {
    setIndexWrapped(activeIndex - 1, -1);
  };

  // 1. Natural Mouse Scroll Wheel Interceptor ("滚轮旋转")
  useEffect(() => {
    const handleWheelEvent = (e: WheelEvent) => {
      // Prevent standard page scroll when interacting directly over the wheel showcase
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (!isInside) return;

      // Stop default page scroll
      e.preventDefault();

      const now = Date.now();
      // Throttle rotation speed to prevent rapid scrolling skipping everything
      if (now - lastWheelTime.current < 280) return;

      if (e.deltaY > 0 || e.deltaX > 0) {
        handleNext();
        lastWheelTime.current = now;
      } else if (e.deltaY < 0 || e.deltaX < 0) {
        handlePrev();
        lastWheelTime.current = now;
      }
    };

    window.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheelEvent);
    };
  }, [activeIndex, total]);

  // Handle keyboard arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isVisibleOnScreen = (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      );
      if (!isVisibleOnScreen) return;

      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, total]);

  const activeProduct = wheelProducts[activeIndex];

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 select-none overflow-hidden"
    >
      {/* Scrollwheel Instruction Badge */}
      <div className="flex justify-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-wine text-[10px] font-mono font-extrabold tracking-widest uppercase">
          <Sparkles size={11} className="text-[#c49a45] animate-spin" /> 
          HOVER & USE MOUSE WHEEL TO SPIN THE DIETARY RING 
          <Sparkles size={11} className="text-[#c49a45] animate-spin" />
        </span>
      </div>

      {/* 3D Wheel Cylinder Area (Height expanded to support high physical layouts elegantly without overlap) */}
      <div className="relative h-[440px] sm:h-[560px] w-full flex items-center justify-center overflow-visible">
        {/* Soft backlighting */}
        <div className="absolute w-[45%] h-[45%] bg-gold/5 rounded-full blur-3xl pointer-events-none z-0"></div>

        <div className="relative w-full max-w-4xl h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {wheelProducts.map((product, idx) => {
            // Calculate absolute distance in continuous wrapping Space
            let diff = idx - activeIndex;
            
            // Shortest circular distance wrapping logic
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const absDiff = Math.abs(diff);

            return (
              <WheelCard
                key={product.id}
                product={product}
                diff={diff}
                isCenter={isCenter}
                absDiff={absDiff}
                windowWidth={windowWidth}
                onAddToCart={onAddToCart}
                onCardClick={() => {
                  if (!isCenter) {
                    setIndexWrapped(idx, diff > 0 ? 1 : -1);
                  }
                }}
                onViewDetails={onViewDetails}
              />
            );
          })}
        </div>
      </div>

      {/* Manual Cylindrical Wheel Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          className="p-3 bg-white hover:bg-gold text-stone-700 hover:text-wine rounded-full border border-stone-200/50 shadow-sm transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Previous Formulation"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>

        {/* Carousel Ring Position Dots Indicator */}
        <div className="flex gap-2.5">
          {wheelProducts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const diff = idx - activeIndex;
                setIndexWrapped(idx, diff > 0 ? 1 : -1);
              }}
              className={`h-2.5 rounded-full transition-all duration-350 cursor-pointer ${
                activeIndex === idx 
                  ? "w-8 bg-wine" 
                  : "w-2.5 bg-stone-300/70 hover:bg-stone-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 bg-white hover:bg-gold text-stone-700 hover:text-wine rounded-full border border-stone-200/50 shadow-sm transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Next Formulation"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Interactive Selected Product Specifications (Appears live under the cylinder) */}
      <div className="mt-14 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-[#FAF8F5]/80 backdrop-blur-md rounded-[32px] border border-stone-200/30 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center text-left"
          >
            {/* Spec details info column */}
            <div className="flex-1 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[10px] font-mono text-moss bg-moss/5 border border-moss/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Active Formula
                </span>
                
                {/* Rating score badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gold/10 rounded-full text-gold">
                  <Star size={12} fill="currentColor" stroke="none" />
                  <span className="text-xs font-mono font-extrabold text-wine">
                    {activeProduct.rating}
                  </span>
                  <span className="text-[10px] text-stone-500">
                    ({activeProduct.reviewsCount} verified)
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-900 tracking-tight leading-tight">
                  {activeProduct.name}
                </h3>
                <p className="text-stone-400 text-xs font-mono tracking-widest uppercase">
                  {activeProduct.subcategory} &bull; Sourced Bio-availability
                </p>
              </div>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {activeProduct.description}
              </p>

              {/* Biological ingredients benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-200/60">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest block">
                    KEY INGREDIENTS
                  </span>
                  <p className="text-stone-700 text-xs leading-relaxed line-clamp-3">
                    {activeProduct.ingredients}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#3E5E4E] uppercase tracking-widest block">
                    VETERINARY BENEFITS
                  </span>
                  <ul className="text-stone-600 text-[11px] space-y-1 list-none leading-relaxed">
                    {activeProduct.benefits.slice(0, 2).map((b, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-gold font-bold">&bull;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Price section & CTAs column */}
            <div className="min-w-[200px] w-full md:w-auto bg-stone-900 text-[#FAF8F5] rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-5">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block">
                  PRIOR PACK PRICE
                </span>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="font-mono text-3xl font-black text-gold">
                    ${activeProduct.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-400">/ {activeProduct.size}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wide block">
                  &bull; Save 15% on Subscription
                </span>
              </div>

              <div className="flex flex-col gap-2.5 w-full">
                <button
                  onClick={(e) => onAddToCart(activeProduct, e)}
                  className="w-full bg-gold hover:bg-[#F4E8C1] text-stone-950 font-extrabold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus size={16} strokeWidth={2.5} />
                  Add to Basket
                </button>

                <button
                  onClick={() => onViewDetails(activeProduct)}
                  className="w-full bg-transparent hover:bg-white/5 border border-white/20 text-[#FAF8F5] font-semibold py-3 px-5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye size={14} />
                  Verify Full Details
                </button>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-stone-400 justify-center">
                <ShieldCheck size={12} className="text-gold" />
                <span>100% Traceable Recipe</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
