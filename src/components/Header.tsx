/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Leaf, HelpCircle, Menu, X } from 'lucide-react';
import { ViewType, CartItem } from '../types';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  cart: CartItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setView,
  cart,
  searchQuery,
  setSearchQuery,
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const announcements = [
    '✨ FREE Shipping on subscription orders & premium kits',
    '🐱 Rescue Ribbon initiative: Every purchase provides 1 shelter meal',
    '🔥 Limited time: Save 20% on wet jars using promo code: FEAST20',
  ];

  useEffect(() => {
    const handler = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(handler);
  }, [announcements.length]);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setView('catalogue');
  };

  return (
    <header id="app-header" className="w-full bg-cream border-b border-cream-dense sticky top-0 z-50 shadow-xs">
      {/* Ticker bar */}
      <div id="announcement-bar" className="bg-wine text-[#FAF8F5] text-xs py-1.5 px-4 text-center font-medium font-sans flex justify-center items-center gap-2 overflow-hidden select-none transition-all duration-300">
        <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
        <span className="animate-fade-in inline-block">{announcements[tickerIndex]}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Brand/Logo */}
          <div 
            id="brand-logo" 
            className="flex items-center gap-2 cursor-pointer select-none group"
            onClick={() => { setView('home'); setMobileMenuOpen(false); }}
          >
            <div className="w-10 h-10 rounded-full bg-wine text-cream flex items-center justify-center font-bold tracking-tighter shadow-sm group-hover:bg-wine-dark transition-colors">
              <span className="text-gold font-display text-lg">f</span>
              <span className="text-white font-display text-base">w</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-lg tracking-tight text-wine flex items-center gap-1">
                Feline Wellness <span className="text-xs font-sans font-normal tracking-normal border border-moss text-moss px-1.5 py-0.2 rounded-full hidden sm:-inline bg-white">PRO</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-moss mt-[-2px]">PREMIUM CARE & DIET</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            <button
              id="nav-btn-home"
              onClick={() => setView('home')}
              className={`font-semibold text-sm tracking-wide transition-colors hover:text-wine select-none ${
                currentView === 'home' ? 'text-wine decoration-gold underline underline-offset-8 decoration-2' : 'text-stone-600'
              }`}
            >
              Overview
            </button>
            <button
              id="nav-btn-shop"
              onClick={() => setView('catalogue')}
              className={`font-semibold text-sm tracking-wide transition-colors hover:text-wine select-none ${
                currentView === 'catalogue' ? 'text-wine decoration-gold underline underline-offset-8 decoration-2' : 'text-stone-600'
              }`}
            >
              Shop Cat Food
            </button>
            <button
              id="nav-btn-profile"
              onClick={() => setView('profile')}
              className={`font-semibold text-sm tracking-wide transition-colors hover:text-wine select-none ${
                currentView === 'profile' ? 'text-wine decoration-gold underline underline-offset-8 decoration-2' : 'text-stone-600'
              }`}
            >
              Pet Parent Hub
            </button>
          </nav>

          {/* Search container */}
          <div className="hidden lg:block w-72 max-w-xs relative">
            <form onSubmit={handleSearchSubmit}>
              <input
                id="search-input-header"
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search recipe & flavor..."
                className="w-full text-xs bg-cream-dense border border-stone-200/80 rounded-full py-2 pl-4 pr-10 focus:outline-hidden focus:border-wine hover:border-stone-300 transition-colors placeholder:text-stone-400 font-sans"
              />
              <button type="submit" className="absolute right-3.5 top-2.5 text-stone-400 hover:text-wine select-none">
                <Search size={14} />
              </button>
            </form>
          </div>

          {/* Actions: Wishlist, Cart, Profile */}
          <div id="header-actions" className="flex items-center gap-4">
            <div className="lg:hidden">
              <button 
                onClick={() => setView('catalogue')} 
                className="p-2 text-stone-600 hover:text-wine hover:bg-cream-dense rounded-full transition-colors"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setView('cart')}
              className="p-2 text-stone-600 hover:text-wine hover:bg-cream-dense rounded-full transition-colors relative flex items-center gap-1 group"
            >
              <ShoppingCart size={21} className="group-hover:scale-105 transition-transform" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-wine font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs border border-cream animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Profile Button showing Eleanor Vance */}
            <button
              id="header-profile-btn"
              onClick={() => setView('profile')}
              className="flex items-center gap-2 p-1.5 pl-1.5 pr-2.5 rounded-full hover:bg-cream-dense hover:text-wine border border-cream-dense transition-all select-none"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACUiTz6yFlkjbbZ-SmBQoarOQlmPCIHGHFI4T6bgtePUJ0Xq9ly1UicwLauZjUy4Ej72aLiiDDlazVd-2hUV1YD6ZFA382p5iBe9QeF4A7vNl87OmvaAUiXZ54WqCFgITTzQMfjYCYHRzwMNNjKvIH3iaYeJf9CSi8mC0wOPf_R1-DWOGz7CmTGzBzxO0H--DyezCuGs82UhOB-We9FvuQWkfsEIt9TaIyOHmaGRPcBKsW-OBby1HIJGEIq5htPRy0aGxM3TOStHE"
                alt="Eleanor Vance"
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-moss shadow-xs"
              />
              <div className="hidden sm:flex flex-col items-start leading-none text-left">
                <span className="text-[11px] font-semibold text-stone-800">Eleanor V.</span>
                <span className="text-[9px] font-mono text-moss uppercase tracking-wider">MEMBER</span>
              </div>
            </button>

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-wine rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden border-t border-cream-dense bg-cream py-4 px-6 space-y-3 animate-fade-in shadow-inner">
          <button
            onClick={() => { setView('home'); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 font-semibold text-sm ${currentView === 'home' ? 'text-wine font-bold' : 'text-stone-600'}`}
          >
            Overview
          </button>
          <button
            onClick={() => { setView('catalogue'); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 font-semibold text-sm ${currentView === 'catalogue' ? 'text-wine font-bold' : 'text-stone-600'}`}
          >
            Shop Cat Food
          </button>
          <button
            onClick={() => { setView('profile'); setMobileMenuOpen(false); }}
            className={`block w-full text-left py-2 font-semibold text-sm ${currentView === 'profile' ? 'text-wine font-bold' : 'text-stone-600'}`}
          >
            Pet Parent Hub
          </button>
          
          <div className="pt-4 border-t border-cream-dense">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                id="search-input-mobile"
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search recipe & flavor..."
                className="w-full text-xs bg-cream-dense border border-stone-200 rounded-full py-2.5 px-4 pr-10 focus:outline-hidden text-stone-700"
              />
              <button type="submit" className="absolute right-3.5 top-3 text-stone-400">
                <Search size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
