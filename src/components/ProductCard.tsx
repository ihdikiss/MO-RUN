import React, { useState } from 'react';
import { MessageCircle, Eye, Star, Zap, CheckCircle2 } from 'lucide-react';
import { Product, generateWhatsAppOrderUrl } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const whatsAppUrl = generateWhatsAppOrderUrl(product, 1);

  return (
    <div className="group relative bg-[#121214] border border-white/10 hover:border-[#00FF66]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,255,102,0.15)] flex flex-col justify-between">
      {/* Eye-Catching Discount Badge & Status Tags */}
      <div className="absolute top-3 left-3 z-20 flex flex-col items-start gap-1.5">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#00FF66] text-black text-xs font-black tracking-wider rounded-lg shadow-[0_0_12px_rgba(0,255,102,0.5)]">
          <Zap className="w-3 h-3 fill-black" />
          <span>-{product.discountPercent}% OFF</span>
        </span>
        {product.badge && (
          <span className="px-2 py-0.5 bg-black/75 text-zinc-300 text-[10px] font-mono tracking-wider uppercase rounded border border-white/10 backdrop-blur-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Top Right Quick Stock Indicator */}
      <div className="absolute top-3 right-3 z-20">
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66]" />
          <span>In Stock ({product.stockCount})</span>
        </span>
      </div>

      {/* Product Image Area with Hover Reveal */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative w-full aspect-[4/3] bg-[#161619] overflow-hidden cursor-pointer"
      >
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-[#161619] animate-pulse flex items-center justify-center">
            <span className="text-xs font-mono text-zinc-600">LOADING SPEC...</span>
          </div>
        )}

        {/* Fallback container if image fails */}
        {imageError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-[#121214] to-[#18181c] flex flex-col items-center justify-center p-6 text-center">
            <span className="text-4xl mb-2">
              {product.category === 'swimming' ? '🏊‍♂️' : product.category === 'running' ? '🏃‍♂️' : '⚡'}
            </span>
            <p className="text-xs font-bold text-zinc-300">{product.name}</p>
            <p className="text-[10px] font-mono text-[#00FF66] mt-1">{product.category.toUpperCase()} SPEC</p>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-black/80 text-white text-xs font-semibold rounded-xl border border-white/20 backdrop-blur-sm shadow-lg">
            <Eye className="w-4 h-4 text-[#00FF66]" />
            <span>Quick Specs View</span>
          </span>
        </div>
      </div>

      {/* Content & Pricing Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Rating Row (unboxed metadata with dot separator) */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
            <span className="text-[#00FF66] tracking-wider uppercase font-semibold">
              {product.category}
            </span>
            <span className="flex items-center gap-1 text-zinc-300">
              <Star className="w-3.5 h-3.5 text-[#00FF66] fill-[#00FF66]" />
              <span className="font-bold tabular-nums">{product.rating}</span>
              <span className="text-zinc-500">({product.reviewsCount})</span>
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-base font-bold text-white group-hover:text-[#00FF66] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Short tagline */}
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="pt-3 border-t border-white/10 flex items-baseline justify-between">
          <div>
            <div className="text-[11px] text-zinc-500 font-mono line-through tabular-nums">
              {product.originalPrice} MAD
            </div>
            <div className="text-xl font-black text-[#00FF66] tabular-nums tracking-tight flex items-baseline gap-1">
              <span>{product.discountedPrice}</span>
              <span className="text-xs font-bold text-white font-mono">MAD</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-zinc-400 block">YOU SAVE</span>
            <span className="text-xs font-bold text-zinc-300 font-mono">
              +{product.originalPrice - product.discountedPrice} MAD
            </span>
          </div>
        </div>

        {/* Action Buttons: Quick View & WhatsApp Order */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onQuickView(product)}
            className="px-3 py-2.5 rounded-xl border border-white/15 hover:border-white/30 text-zinc-300 hover:text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5 bg-white/[0.02] hover:bg-white/5"
          >
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span>Details</span>
          </button>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2.5 rounded-xl bg-[#00FF66] hover:bg-[#00e65c] text-black text-xs font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,255,102,0.3)] hover:shadow-[0_0_18px_rgba(0,255,102,0.5)]"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black" />
            <span>Order</span>
          </a>
        </div>
      </div>
    </div>
  );
};
