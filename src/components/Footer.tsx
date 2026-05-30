/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Check, CreditCard, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 8000);
    }
  };

  return (
    <footer id="app-footer" className="bg-chocolate text-[#FAF8F5] pt-16 pb-8 border-t-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top visual newsletter box */}
        <div className="bg-wine rounded-3xl p-8 md:p-12 shadow-xl mb-16 flex flex-col lg:flex-row justify-between items-center gap-8 border border-white/5">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold block mb-2">INTELLIGENT INTEGRATIVE DIETS</span>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-cream tracking-tight leading-none mb-3">
              Join the Feline Wellness Circle
            </h3>
            <p className="text-stone-300 text-xs md:text-sm">
              Receive vet-formulated nutritional reports, early-access recipes, and 15% discount bounds on your next order.
            </p>
          </div>
          <div className="w-full max-w-md">
            {subscribed ? (
              <div className="bg-moss/20 border border-moss rounded-2xl p-4 flex items-center gap-3 text-cream animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-moss flex items-center justify-center text-white shrink-0">
                  <Check size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-sans">Verification Code Sent!</h4>
                  <p className="text-[10px] text-stone-300">Welcome. You are now subscribed to custom digestive health logs.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-3 text-white/30">
                    <Mail size={14} />
                  </span>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full text-xs bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-cream focus:outline-hidden focus:border-gold placeholder:text-stone-400"
                  />
                </div>
                <button
                  id="newsletter-submit"
                  type="submit"
                  className="bg-gold hover:bg-white text-wine font-extrabold uppercase text-[10px] tracking-wider px-6 rounded-xl transition-all font-sans shrink-0 hover:scale-102"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Structural lists */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-white/5 pb-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-wine text-cream flex items-center justify-center font-bold tracking-tighter">
                <span className="text-gold font-display text-base">f</span>
                <span className="text-cream font-display text-xs">w</span>
              </div>
              <span className="font-display font-semibold text-base text-cream">Feline Wellness</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              We design premium trace diets specifically tailored to support digestive tract cellular matrix security, weight preservation, and kitten growth dynamics.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-4">The Collection</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#" className="hover:text-cream transition-colors">Digestive Wet Food Jars</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Complete & Balanced Kibbles</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Freeze-Dried Scent Treats</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Immunity & Joint Powders</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-4">Our Standard</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#" className="hover:text-cream transition-colors">Veterinary Advisory Council</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Rescue Ribbon Program</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Ingredient Transparency Index</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Eco-Conscious Glass Returnal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-gold uppercase mb-4">Support & Trust</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#" className="hover:text-cream transition-colors">100% Satisfaction Guarantee</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Shipping & Refund Policies</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Pet Parent Assistance Portal</a></li>
              <li><a href="#" className="hover:text-cream transition-colors">Secure Checkout Protocols</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright, impact signature, secure trust blocks */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-stone-500">
          <div className="text-center md:text-left space-y-1">
            <p>&copy; {new Date().getFullYear()} Feline Wellness Inc. All rights reserved.</p>
            <p className="flex items-center justify-center md:justify-start gap-1">
              Made with <Heart size={10} className="fill-wine stroke-wine text-wine animate-pulse" /> for healthy cats worldwide. No artificial fillers ever.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 border border-white/5 bg-white/2 bg-opacity-10 px-2 py-1 rounded text-[10px] text-stone-400 font-mono">
              <ShieldCheck size={12} className="text-gold" /> SECURE 256-BIT SSL CONTRACT
            </span>
            <div className="flex gap-2">
              <span className="bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-white font-mono px-2 py-0.5 rounded text-[8px] transform uppercase font-bold text-center">Apple Pay</span>
              <span className="bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-white font-mono px-2 py-0.5 rounded text-[8px] transform uppercase font-bold text-center">VISA</span>
              <span className="bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-white font-mono px-2 py-0.5 rounded text-[8px] transform uppercase font-bold text-center">PayPal</span>
              <span className="bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-white font-mono px-2 py-0.5 rounded text-[8px] transform uppercase font-bold text-center">Stripe</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
