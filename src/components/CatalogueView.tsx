/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RefreshCw, X, ChevronDown, CheckCircle, Tag } from 'lucide-react';
import { Product, ViewType } from '../types';
import { products } from '../data';
import { ProductCard } from './ProductCard';

interface CatalogueViewProps {
  setView: (view: ViewType) => void;
  setSelectedProduct: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

type CategoryFilter = 'all' | 'wet' | 'dry' | 'treats' | 'supplements';
type SortOption = 'bestselling' | 'low-high' | 'high-low' | 'rating';

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  setView,
  setSelectedProduct,
  onAddToCart,
  searchQuery,
  setSearchQuery,
}) => {
  // Sidebar states
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedLifeStages, setSelectedLifeStages] = useState<string[]>([]);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('bestselling');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Life stage filter toggler
  const toggleLifeStage = (stage: string) => {
    setSelectedLifeStages(prev =>
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
  };

  // Health benefit filter toggler
  const toggleBenefit = (benefit: string) => {
    setSelectedBenefits(prev =>
      prev.includes(benefit) ? prev.filter(b => b !== benefit) : [...prev, benefit]
    );
  };

  // Clear all filters
  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedLifeStages([]);
    setSelectedBenefits([]);
    setSortBy('bestselling');
    setSearchQuery('');
  };

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Real-time search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Life Stage tags filter
    if (selectedLifeStages.length > 0) {
      result = result.filter(p =>
        p.tags.some(tag => selectedLifeStages.includes(tag))
      );
    }

    // Benefit tags filter
    if (selectedBenefits.length > 0) {
      result = result.filter(p =>
        p.tags.some(tag => selectedBenefits.includes(tag))
      );
    }

    // Sort options
    if (sortBy === 'bestselling') {
      result.sort((a, b) => {
        if (a.isBestseller && !b.isBestseller) return -1;
        if (!a.isBestseller && b.isBestseller) return 1;
        return b.reviewsCount - a.reviewsCount;
      });
    } else if (sortBy === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLifeStages, selectedBenefits, sortBy]);

  const categoriesList: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All Recipes' },
    { value: 'wet', label: 'Digestive Wet Jars' },
    { value: 'dry', label: 'Balanced Kibbles' },
    { value: 'treats', label: 'Freeze-Dried Treats' },
  ];

  const handleProductCardClick = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
  };

  return (
    <div id="catalogue-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="space-y-2 text-left mb-10">
        <span className="text-xs font-mono font-bold tracking-widest text-[#2C5E3B] uppercase">VET-DIAGNOSED DIETARY MATRIX</span>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-wine tracking-tight">
          Shop Biological Nutrition <span className="font-sans text-sm font-normal text-stone-500">({filteredProducts.length} items found)</span>
        </h1>
        {searchQuery && (
          <p className="text-xs text-stone-500 flex items-center gap-1">
            Active search query: <span className="font-mono bg-cream-dense px-2 py-0.5 rounded text-stone-700 font-bold">"{searchQuery}"</span>
            <button onClick={() => setSearchQuery('')} className="text-stone-400 hover:text-wine hover:scale-105"><X size={12} /></button>
          </p>
        )}
      </div>

      {/* Categories slider tab layout */}
      <div className="flex border-b border-stone-200/60 pb-px mb-8 overflow-x-auto gap-1 sm:gap-4 no-scrollbar">
        {categoriesList.map(cat => (
          <button
            key={cat.value}
            id={`cat-tab-${cat.value}`}
            onClick={() => setSelectedCategory(cat.value)}
            className={`py-3 px-4 font-semibold text-sm tracking-wide border-b-2 whitespace-nowrap transition-colors select-none ${
              selectedCategory === cat.value
                ? 'border-wine text-wine font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SIDEBAR FILTERS - DESKTOP */}
        <aside id="desktop-filters" className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-stone-100/80 space-y-8 sticky top-32">
          
          <div className="flex justify-between items-center pb-4 border-b border-stone-100">
            <h3 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <SlidersHorizontal size={14} /> Adjust Filters
            </h3>
            {(selectedLifeStages.length > 0 || selectedBenefits.length > 0 || searchQuery) && (
              <button
                onClick={resetAllFilters}
                className="text-[10px] uppercase font-bold text-wine hover:text-gold flex items-center gap-1 select-none"
              >
                Clear all <X size={10} />
              </button>
            )}
          </div>

          {/* Life stages */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-stone-400 tracking-wider">Life Stage</h4>
            <div className="space-y-2">
              {['Kitten', 'Adult', 'Senior'].map(stage => {
                const isActive = selectedLifeStages.includes(stage);
                return (
                  <label key={stage} className="flex items-center gap-2.5 text-xs text-stone-600 font-medium cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => toggleLifeStage(stage)}
                      className="rounded border-stone-300 text-wine focus:ring-wine/20 w-4 h-4"
                    />
                    <span className="group-hover:text-wine transition-colors">{stage}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Health Benefits */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase text-stone-400 tracking-wider">Health Benefit</h4>
            <div className="space-y-2">
              {[
                { label: 'Sensitive Stomach', value: 'Sensitive Stomach' },
                { label: 'Weight Control', value: 'Weight Control' },
                { label: 'Hairball Care', value: 'Hairball' },
              ].map(benefit => {
                const isActive = selectedBenefits.includes(benefit.value);
                return (
                  <label key={benefit.value} className="flex items-center gap-2.5 text-xs text-stone-600 font-medium cursor-pointer group select-none">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => toggleBenefit(benefit.value)}
                      className="rounded border-stone-300 text-wine focus:ring-wine/20 w-4 h-4"
                    />
                    <span className="group-hover:text-wine transition-colors">{benefit.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Subscription promo card in sidebar */}
          <div className="bg-[#FAF8F5] border border-stone-200/40 p-5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-[-10px] right-[-10px] bg-gold/15 text-gold text-[8px] font-mono px-3 py-1.5 rounded-bl-xl font-bold uppercase tracking-widest leading-none">
              EASY SHIP
            </div>
            <p className="text-[10px] font-mono font-bold text-moss mb-1 flex items-center gap-1 uppercase"><Tag size={10} /> Recurrent Shipping</p>
            <h4 className="font-display font-extrabold text-[#1E1A17] text-xs pb-1.5">Save 15% with Easy Auto Ship</h4>
            <p className="text-stone-500 text-[11px] leading-relaxed">
              Automate weekly or monthly arrivals during checkout. Skip or swap recipes immediately inside the parent portal!
            </p>
          </div>

        </aside>

        {/* MAIN PRODUCT CLUSTER / GRID */}
        <main id="catalogue-cluster" className="lg:col-span-9 space-y-6">
          
          {/* Controls: sort */}
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-stone-100 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {/* Mobile filter button */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1 px-4 py-2 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs font-semibold hover:border-wine hover:text-wine"
              >
                <SlidersHorizontal size={12} /> Filters
              </button>
              <span className="text-xs text-stone-400 font-mono hidden sm:inline">Showing {filteredProducts.length} of {products.length} recipes</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 font-mono">Sort by:</span>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs bg-[#FAF8F5] border border-stone-200 rounded-xl py-2 px-3 focus:outline-hidden focus:border-wine select-none font-semibold text-stone-700 font-sans cursor-pointer"
              >
                <option value="bestselling">Most-Loved Recipes</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Core grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-100 p-16 text-center space-y-4 max-w-xl mx-auto">
              <div className="w-16 h-16 bg-[#FAF8F5] text-stone-300 rounded-full flex items-center justify-center mx-auto">
                <SlidersHorizontal size={28} />
              </div>
              <h3 className="font-display font-bold text-lg text-stone-800">No Recipes Matched Filters</h3>
              <p className="text-stone-500 text-xs max-w-sm mx-auto">
                Try widening your health benefit checklists or clearing the search keyword filter to retrieve gourmet cat formulas.
              </p>
              <button
                onClick={resetAllFilters}
                className="bg-wine text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-wine-dark transition-all select-none"
              >
                Reset Filter Fields
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleProductCardClick}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}

        </main>
      </div>

      {/* MOBILE FILTER SIDEBAR DRAWER */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in lg:hidden">
          <div className="w-80 bg-cream h-full p-6 space-y-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-stone-200">
                <h3 className="font-bold text-sm text-stone-800 flex items-center gap-2">
                  <SlidersHorizontal size={14} /> Adjust Options
                </h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Life stages */}
              <div className="space-y-3 py-6 border-b border-stone-200">
                <h4 className="text-xs font-mono font-bold uppercase text-stone-400 tracking-wider">Life Stage</h4>
                <div className="space-y-2">
                  {['Kitten', 'Adult', 'Senior'].map(stage => {
                    const isActive = selectedLifeStages.includes(stage);
                    return (
                      <label key={stage} className="flex items-center gap-2.5 text-xs text-stone-600 font-medium cursor-pointer group select-none">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => toggleLifeStage(stage)}
                          className="rounded border-stone-300 text-wine focus:ring-wine/20 w-4.5 h-4.5"
                        />
                        <span>{stage}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3 py-6">
                <h4 className="text-xs font-mono font-bold uppercase text-stone-400 tracking-wider">Health Benefit</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Sensitive Stomach', value: 'Sensitive Stomach' },
                    { label: 'Weight Control', value: 'Weight Control' },
                    { label: 'Hairball Care', value: 'Hairball' },
                  ].map(benefit => {
                    const isActive = selectedBenefits.includes(benefit.value);
                    return (
                      <label key={benefit.value} className="flex items-center gap-2.5 text-xs text-stone-600 font-medium cursor-pointer group select-none">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => toggleBenefit(benefit.value)}
                          className="rounded border-stone-300 text-wine focus:ring-wine/20 w-4.5 h-4.5"
                        />
                        <span>{benefit.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-stone-200">
              <button
                onClick={resetAllFilters}
                className="w-full bg-[#FAF8F5] border border-stone-300 text-stone-600 py-3.5 rounded-2xl text-xs font-bold uppercase"
              >
                Reset All Filters
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-wine text-white py-3.5 rounded-2xl text-xs font-bold uppercase"
              >
                Apply Selections
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
