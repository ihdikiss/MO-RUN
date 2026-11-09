import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CategoryType } from '../types';

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'discount' | 'price-asc' | 'price-desc' | 'rating';
  onSortChange: (sort: 'discount' | 'price-asc' | 'price-desc' | 'rating') => void;
  totalFilteredCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalFilteredCount
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Top Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs (Segmented control) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#141417] border border-white/10 rounded-2xl overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as CategoryType)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-[#00FF66] text-black shadow-[0_0_15px_rgba(0,255,102,0.35)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  selectedCategory === cat.id ? 'bg-black/25 text-black font-bold' : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Right Area: Search & Sort */}
        <div className="flex items-center gap-3">
          {/* Real-time Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search gear..."
              className="w-full pl-9 pr-3.5 py-2 text-xs font-mono bg-[#141417] border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#00FF66]"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 text-xs font-mono font-medium bg-[#141417] border border-white/10 rounded-xl text-zinc-300 focus:outline-none focus:border-[#00FF66] cursor-pointer"
            >
              <option value="discount">Biggest Discount %</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated (Stars)</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results Count & Filter State Indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-1 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span>Showing <strong className="text-[#00FF66]">{totalFilteredCount}</strong> athletic items</span>
          <span>·</span>
          <span>Prices in Moroccan Dirham (MAD)</span>
        </div>

        {searchQuery && (
          <span className="text-zinc-400">
            Filtered by: "<span className="text-white">{searchQuery}</span>"
          </span>
        )}
      </div>
    </div>
  );
};
