import React from 'react';
import { MessageCircle, MapPin, Phone, Mail, ShieldCheck, Truck, Zap } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER } from '../types';

interface FooterProps {
  onSelectCategory: (category: 'all' | 'swimming' | 'running' | 'fitness') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    'Salam Dakhla Fit! I would like to inquire about athletic equipment and express shipping in Morocco.'
  )}`;

  return (
    <footer className="w-full bg-[#070709] border-t border-white/10 text-zinc-400 font-mono text-xs">
      {/* 3 Value Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Express Morocco Delivery</p>
              <p className="text-zinc-500 text-xs">24 to 48 hours to all 12 Moroccan regions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Paiement à la Livraison</p>
              <p className="text-zinc-500 text-xs">Cash on delivery — inspect before paying</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Instant WhatsApp Assistance</p>
              <p className="text-zinc-500 text-xs">Direct technical gear sizing & guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-3 sm:col-span-2 md:col-span-1">
            <div className="text-xl font-black tracking-tighter text-white flex items-center gap-1.5">
              <span>DAKHLA</span>
              <span className="text-[#00FF66]">FIT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] inline-block shadow-[0_0_8px_#00FF66]" />
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Morocco’s destination for high-end athletic equipment tested against coastal wind, Atlantic ocean swell, and desert extremes.
            </p>
            <div className="pt-2 text-[11px] text-zinc-500">
              HQ: Avenue Al Oula, Dakhla Lagoon, Morocco 🇲🇦
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Equipment Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('swimming')}
                  className="hover:text-[#00FF66] transition-colors"
                >
                  Swimming Equipment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('running')}
                  className="hover:text-[#00FF66] transition-colors"
                >
                  Running & Trail Gear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('fitness')}
                  className="hover:text-[#00FF66] transition-colors"
                >
                  Fitness & Gym Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-[#00FF66] transition-colors"
                >
                  All Top Picks
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: WhatsApp Ordering Hotline */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Direct Ordering
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00FF66] hover:underline flex items-center gap-1.5 font-bold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: +212 600-112233</span>
                </a>
              </li>
              <li className="text-zinc-400">Available: 08:00 - 22:00 (GMT+1)</li>
              <li className="text-zinc-400">Response time: &lt; 5 minutes</li>
              <li className="text-zinc-500 text-[11px]">Free delivery on orders over 600 MAD</li>
            </ul>
          </div>

          {/* Col 4: Nationwide Coverage */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Delivery Network
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Fast courier dispatch to Casablanca, Rabat, Marrakech, Tangier, Agadir, Dakhla, Fes, Meknes, Oujda, Laayoune and all regions.
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-[#00FF66]">
              <Zap className="w-3.5 h-3.5" />
              <span>Standard delivery 25-35 MAD</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} DAKHLA FIT. All athletic rights reserved. Built for endurance.</p>
          <p className="text-zinc-500">
            Currency: <span className="text-[#00FF66] font-bold">MAD (Moroccan Dirham)</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
