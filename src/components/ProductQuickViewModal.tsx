import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Star, ShieldCheck, Truck, CheckCircle, Copy, Check, Zap } from 'lucide-react';
import { Product, generateWhatsAppOrderUrl, WHATSAPP_PHONE_NUMBER } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [deliveryCity, setDeliveryCity] = useState('');
  const [copied, setCopied] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setCopied(false);
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const totalDiscounted = product.discountedPrice * quantity;
  const totalOriginal = product.originalPrice * quantity;
  const totalSavings = totalOriginal - totalDiscounted;

  const whatsAppUrl = generateWhatsAppOrderUrl(product, quantity, deliveryCity);

  const handleCopyMessage = () => {
    const rawLines = [
      `*⚡ DAKHLA FIT — ORDER REQUEST*`,
      `Item: ${product.name}`,
      `Category: ${product.category.toUpperCase()}`,
      `Quantity: ${quantity}`,
      `Price: ${product.discountedPrice} MAD (Saved ${totalSavings} MAD)`,
      `Total: ${totalDiscounted} MAD`,
      `Delivery City: ${deliveryCity || 'Morocco'}`,
      `Please confirm order delivery.`
    ];
    navigator.clipboard.writeText(rawLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#121215] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-zinc-400 hover:text-white border border-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Showcase */}
          <div className="relative bg-[#18181c] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            {/* Discount Badge */}
            <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
              <span className="px-3 py-1 bg-[#00FF66] text-black text-xs font-black rounded-lg shadow-lg flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-black" />
                <span>SAVE {product.discountPercent}%</span>
              </span>
              <span className="px-2.5 py-0.5 bg-black/80 text-zinc-300 text-xs font-mono uppercase rounded border border-white/10">
                {product.category}
              </span>
            </div>

            {/* Product Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 mt-8 mb-6 border border-white/5">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#00FF66]" />
                <span>Express Delivery 24-48h</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00FF66]" />
                <span>Cash on Delivery (COD)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Comprehensive Product Details & Order Form */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                <span className="text-[#00FF66] font-semibold uppercase tracking-wider">
                  {product.category} Equipment
                </span>
                <span className="flex items-center gap-1 text-zinc-300">
                  <Star className="w-3.5 h-3.5 text-[#00FF66] fill-[#00FF66]" />
                  <span className="font-bold tabular-nums">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount} athlete reviews)</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl font-black text-white tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                {product.tagline}
              </p>

              {/* Pricing Box */}
              <div className="mt-5 p-4 rounded-2xl bg-black/40 border border-white/10 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-mono text-zinc-500 line-through tabular-nums block">
                    {product.originalPrice} MAD Regular Price
                  </span>
                  <div className="text-3xl font-black text-[#00FF66] tabular-nums tracking-tight flex items-baseline gap-1.5">
                    <span>{product.discountedPrice}</span>
                    <span className="text-sm font-bold text-white font-mono">MAD</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/30 block mb-1">
                    -{product.discountPercent}% OFF
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Instant Savings: +{product.originalPrice - product.discountedPrice} MAD
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs md:text-sm text-zinc-300 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="mt-5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-zinc-500 block text-[10px] uppercase">{spec.label}</span>
                      <span className="text-zinc-200 font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="mt-5 space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Performance Highlights
                </h4>
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Interactive Order Controller */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              {/* Quantity & Delivery City Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Quantity Stepper */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 uppercase">
                    Quantity
                  </label>
                  <div className="flex items-center border border-white/15 rounded-xl overflow-hidden bg-black/40">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3.5 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-mono font-bold text-sm text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3.5 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* City of Delivery Input */}
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1.5 uppercase">
                    Delivery City (Morocco)
                  </label>
                  <input
                    type="text"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    placeholder="e.g. Casablanca, Dakhla, Rabat..."
                    className="w-full px-3 py-2 text-xs bg-black/40 border border-white/15 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#00FF66]"
                  />
                </div>
              </div>

              {/* Total Calculation Strip */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                <span>Subtotal ({quantity} {quantity === 1 ? 'item' : 'items'}):</span>
                <span className="text-base font-black text-[#00FF66] tabular-nums">
                  {totalDiscounted} MAD
                </span>
              </div>

              {/* WhatsApp Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:col-span-3 w-full py-3.5 px-4 bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:shadow-[0_0_30px_rgba(0,255,102,0.6)]"
                >
                  <MessageCircle className="w-5 h-5 fill-black" />
                  <span>Order via WhatsApp Now</span>
                </a>

                <button
                  onClick={handleCopyMessage}
                  className="sm:col-span-1 py-3.5 px-3 rounded-xl border border-white/20 hover:border-white/40 text-zinc-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 bg-white/5"
                  title="Copy pre-filled text message"
                >
                  {copied ? <Check className="w-4 h-4 text-[#00FF66]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-[11px] text-zinc-500 text-center font-mono">
                Clicking opens WhatsApp directly with product specs & price pre-filled. No payment needed upfront.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
