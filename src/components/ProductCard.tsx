/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ShoppingBag, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onViewDetails(product)}
      className="bg-white rounded-3xl border border-stone-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1.5 flex flex-col justify-between group"
    >
      <div className="relative overflow-hidden aspect-square bg-[#FAF8F5] p-3 flex items-center justify-center">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestseller && (
            <span className="bg-wine text-[#FAF8F5] text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-xs">
              BESTSELLER
            </span>
          )}
          {product.isNew && (
            <span className="bg-moss text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full shadow-xs">
              NEW RECIPE
            </span>
          )}
        </div>

        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick Add overlay button */}
        <button
          id={`quick-add-${product.id}`}
          onClick={(e) => onAddToCart(product, e)}
          className="absolute bottom-4 right-4 bg-gold hover:bg-wine text-wine hover:text-[#FAF8F5] p-3.5 rounded-full shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:rotate-90"
          title="Quick add to basket"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
            {product.subcategory}
          </span>
          <h3 className="font-display font-bold text-base text-stone-800 tracking-tight group-hover:text-wine transition-colors line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 mt-1.5 mb-3.5">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'transparent'}
                  strokeWidth={2}
                  className="inline-block"
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-stone-600 font-mono">
              {product.rating}
            </span>
            <span className="text-[10px] text-stone-400">
              ({product.reviewsCount} reviews)
            </span>
          </div>

          <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-semibold tracking-wide text-moss bg-moss/5 border border-moss/10 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Pricing & CTA */}
          <div className="flex justify-between items-center pt-3 border-t border-stone-100">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-base font-bold text-stone-800">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[10px] text-stone-400">{product.size ? `/ ${product.size}` : ''}</span>
              </div>
              <span className="text-[10px] text-moss font-semibold tracking-tight block">
                Subscribe & Save 15%
              </span>
            </div>
            <button
              id={`card-cta-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product);
              }}
              className="text-xs font-semibold uppercase tracking-wider text-wine hover:text-gold transition-colors flex items-center gap-1"
            >
              Verify Detail &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
