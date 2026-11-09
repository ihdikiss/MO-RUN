import React from 'react';
import { Wind, Waves, ShieldCheck, MapPin, MessageCircle, Zap } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER } from '../types';

export const DakhlaStorySection: React.FC = () => {
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    'Salam Dakhla Fit! I am preparing for training in Morocco and would like equipment recommendations for my discipline. 🇲🇦'
  )}`;

  return (
    <section id="dakhla-story" className="w-full py-16 md:py-24 border-t border-white/10 bg-[#0d0d10] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00FF66]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Brand Story & Values */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00FF66]/10 border border-[#00FF66]/20 rounded-lg text-xs font-mono text-[#00FF66]">
              <MapPin className="w-3.5 h-3.5" />
              <span>DAKHLA PENINSULA · MOROCCO 23.7°N</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              BORN IN THE <span className="text-[#00FF66]">WIND & SWELL</span> OF DAKHLA
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Between the Atlantic Ocean’s heavy surf and the calm turquoise lagoon of Dakhla lies one of the planet’s most grueling athletic proving grounds. We don't just sell equipment; every piece of swimming, running, and gym gear in our collection is selected to conquer relentless sun, salt water, 30-knot trade winds, and desert dunes.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <Waves className="w-5 h-5 text-[#00FF66]" />
                <h4 className="text-sm font-bold text-white">Salt & Lagoon Proof</h4>
                <p className="text-xs text-zinc-400 font-mono">Anti-corrosion materials tested in Atlantic waters.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <Wind className="w-5 h-5 text-[#00FF66]" />
                <h4 className="text-sm font-bold text-white">Aerodynamic Rigor</h4>
                <p className="text-xs text-zinc-400 font-mono">Zero flutter vests & low-drag eyewear for heavy wind.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <ShieldCheck className="w-5 h-5 text-[#00FF66]" />
                <h4 className="text-sm font-bold text-white">100% Genuine Spec</h4>
                <p className="text-xs text-zinc-400 font-mono">Direct athlete hotline & cash on delivery across Morocco.</p>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00FF66] hover:bg-[#00e65c] text-black font-extrabold text-sm rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.5)]"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Ask Coach via WhatsApp</span>
              </a>

              <span className="text-xs font-mono text-zinc-400 flex items-center justify-center sm:justify-start gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#00FF66]" />
                <span>Average reply under 5 minutes</span>
              </span>
            </div>
          </div>

          {/* Right: Atmospheric Lifestyle Image with Tech Overlay */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
            <img
              src="/src/assets/images/hero_athletic_dakhla_1794059496446.jpg"
              alt="Athlete running across Dakhla lagoon at twilight"
              referrerPolicy="no-referrer"
              className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Overlay Stamp */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/75 border border-white/10 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#00FF66] block">
                  PROVEN IN EXTREME ELEMENTS
                </span>
                <span className="text-sm font-bold text-white">
                  Dakhla Coastal Lagoon & Dune Testing Ground
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                23°43'N 15°56'W
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
