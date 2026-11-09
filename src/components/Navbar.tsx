import React, { useState } from 'react';
import { MessageCircle, Menu, X, ShieldCheck, Zap } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER } from '../types';

interface NavbarProps {
  onSelectCategory: (category: 'all' | 'swimming' | 'running' | 'fitness') => void;
  activeCategory: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectCategory, activeCategory }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    'Salam Dakhla Fit! I would like to inquire about your athletic equipment catalog and delivery to my city in Morocco. 🇲🇦'
  )}`;

  const navLinks = [
    { id: 'all' as const, label: 'All Equipment' },
    { id: 'swimming' as const, label: 'Swimming' },
    { id: 'running' as const, label: 'Running' },
    { id: 'fitness' as const, label: 'Fitness & Gym' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
      {/* Top Bar Announcement Strip */}
      <div className="bg-[#00FF66]/10 border-b border-[#00FF66]/20 px-4 py-1 text-center">
        <p className="text-[11px] md:text-xs font-mono font-medium tracking-wide text-[#00FF66] flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5" />
          <span>SPRING SALE: UP TO -35% OFF · CASH ON DELIVERY AVAILABLE ACROSS ALL CITIES IN MOROCCO 🇲🇦</span>
        </p>
      </div>

      {/* Main 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl md:text-2xl font-black tracking-tighter text-white hover:text-[#00FF66] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
        >
          <span>DAKHLA</span>
          <span className="text-[#00FF66]">FIT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] inline-block shadow-[0_0_8px_#00FF66]" />
        </a>

        {/* Zone 2: Navigation Links (single line, clean text) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold tracking-wide text-zinc-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectCategory(link.id);
                const el = document.getElementById('catalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#00FF66] transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                activeCategory === link.id ? 'text-[#00FF66]' : 'text-zinc-300'
              }`}
            >
              {link.label}
              {activeCategory === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF66] rounded-full shadow-[0_0_8px_#00FF66]" />
              )}
            </button>
          ))}
          <a
            href="#dakhla-story"
            className="hover:text-[#00FF66] transition-colors whitespace-nowrap shrink-0 text-zinc-400 hover:text-white"
          >
            Dakhla Lab
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#00FF66] text-black text-xs md:text-sm font-bold rounded-xl hover:bg-[#00e65c] transition-all duration-200 shadow-[0_0_15px_rgba(0,255,102,0.3)] whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Order via WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0a0a0a] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectCategory(link.id);
                  setMobileMenuOpen(false);
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  activeCategory === link.id ? 'bg-[#00FF66]/10 text-[#00FF66]' : 'text-zinc-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="#dakhla-story"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-zinc-400 hover:text-white hover:bg-white/5"
            >
              Dakhla Lab & Testing
            </a>
          </div>

          <div className="pt-2 border-t border-white/10">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#00FF66] text-black text-sm font-bold rounded-xl hover:bg-[#00e65c] transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Order via WhatsApp (+212 600-112233)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
