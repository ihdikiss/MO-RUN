import React, { useState, useMemo } from 'react';
import { MessageCircle, Zap, Shield, ArrowUpRight, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ThreeHeroCanvas } from './components/ThreeHeroCanvas';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { DakhlaStorySection } from './components/DakhlaStorySection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CategoryType, WHATSAPP_PHONE_NUMBER } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'discount' | 'price-asc' | 'price-desc' | 'rating'>('discount');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'discount':
        list.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case 'price-asc':
        list.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-desc':
        list.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  // Floating WhatsApp hotline URL
  const floatingWhatsAppUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    'Salam Dakhla Fit! I am browsing your online store and need assistance with sports equipment. 🇲🇦'
  )}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col font-sans selection:bg-[#00FF66] selection:text-black">
      {/* 1. Header Navigation */}
      <Navbar
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        activeCategory={selectedCategory}
      />

      {/* 2. Hero Section: 3D Interactive Typography & Cyberpunk Particles */}
      <main className="flex-1">
        <section className="relative w-full border-b border-white/10">
          <ThreeHeroCanvas
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            activeCategory={selectedCategory}
          />
        </section>

        {/* 3. Featured Products Section */}
        <section id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00FF66] uppercase tracking-widest mb-2">
                <Zap className="w-3.5 h-3.5 fill-[#00FF66]" />
                <span>HIGH PERFORMANCE ATHLETIC CATALOG</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                FEATURED <span className="text-[#00FF66]">EQUIPMENT</span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
                Engineered for Atlantic waters, Sahara dunes, and heavy gym loading. Select any item for full technical specs or instant WhatsApp checkout in MAD.
              </p>
            </div>

            {/* Quick stats banner */}
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400 bg-[#121215] px-4 py-3 rounded-2xl border border-white/10 shrink-0">
              <div>
                <span className="text-white font-bold block tabular-nums text-sm">15 ITEMS</span>
                <span className="text-[10px] text-zinc-500">PRO GRADE</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-[#00FF66] font-bold block tabular-nums text-sm">UP TO -34%</span>
                <span className="text-[10px] text-zinc-500">SEASON DISCOUNT</span>
              </div>
            </div>
          </div>

          {/* Interactive Filters & Search */}
          <div className="mb-10">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalFilteredCount={filteredProducts.length}
            />
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setActiveModalProduct(p)}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-20 text-center p-8 bg-[#121215] border border-white/10 rounded-3xl max-w-lg mx-auto">
              <span className="text-4xl mb-4 block">🔍</span>
              <h3 className="text-lg font-bold text-white mb-2">No sports equipment found</h3>
              <p className="text-xs text-zinc-400 font-mono mb-6">
                No products match "{searchQuery}". Try searching for goggles, vests, dumbbells, or reset filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-5 py-2.5 bg-[#00FF66] text-black font-bold text-xs rounded-xl hover:bg-[#00e65c] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* 4. Brand Proving Grounds & Extreme Testing Section */}
        <DakhlaStorySection />
      </main>

      {/* 5. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. Quick View Details Modal */}
      <ProductQuickViewModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      {/* 7. Floating WhatsApp Support Button */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-3.5 sm:px-4 sm:py-3.5 bg-[#00FF66] hover:bg-[#00e65c] text-black rounded-full sm:rounded-2xl shadow-[0_0_25px_rgba(0,255,102,0.5)] transition-all duration-300 hover:scale-105 flex items-center gap-2.5 group"
        aria-label="Direct WhatsApp Assistance"
      >
        <MessageCircle className="w-5 h-5 fill-black" />
        <span className="hidden sm:inline font-black text-xs uppercase tracking-wide">
          WhatsApp Order
        </span>
      </a>
    </div>
  );
}
