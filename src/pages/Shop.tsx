import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, ChevronDown, SlidersHorizontal } from "lucide-react";
import { PRODUCTS } from "@/src/types";
import { ProductCard } from "@/src/components/ProductCard";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

const CATEGORIES = ["All", "Outerwear", "Tops", "Bottoms", "Footwear", "Accessories", "Dresses"];
const SORT_OPTIONS = [
  { label: "Recommended", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest Arrivals", value: "new" },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
  const [activeSort, setActiveSort] = useState(searchParams.get("sort") || "default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    
    if (activeCategory !== "All") {
      result = result.filter(p => p.category === activeCategory);
    }
    
    if (activeSort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (activeSort === "new") {
      result = result.filter(p => p.tag === "Limited Edition" || p.tag === "Restock");
    }
    
    return result;
  }, [activeCategory, activeSort]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-off-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">The Collection</p>
            <h1 className="font-serif text-5xl md:text-6xl tracking-tight">Archives</h1>
          </div>
          <p className="text-xs uppercase tracking-widest opacity-40">
            Showing {filteredProducts.length} Results
          </p>
        </div>

        {/* Filters Panel (Mobile Trigger + Desktop Horizontal) */}
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-16 border-y border-black/5 py-6">
          <div className="flex flex-wrap gap-4 md:gap-8 items-center">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium"
            >
              <Filter size={14} /> Filter
            </button>
            <div className="h-4 w-[1px] bg-black/10 hidden md:block" />
            <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap",
                    activeCategory === cat ? "opacity-100 border-b border-black" : "opacity-30 hover:opacity-60"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative group">
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="appearance-none bg-transparent text-[11px] uppercase tracking-[0.2em] pr-8 focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-x-12 md:gap-y-20">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center space-y-4 opacity-40">
            <p className="font-serif text-2xl italic">No archives found in this selection.</p>
            <button
              onClick={() => { setActiveCategory("All"); setActiveSort("default"); }}
              className="text-[10px] uppercase tracking-widest border-b border-black pb-1"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
