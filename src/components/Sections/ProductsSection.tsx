import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Star, MessageSquare, Layers, ChevronRight } from 'lucide-react';
import { productCatalog } from '@/config/commerce';

export default function ProductsSection() {
  // FUTURE-PROOF GROUPING: Dynamically extracts unique categories automatically
  const availableCategories = ['All', ...Array.from(new Set(productCatalog.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? productCatalog
    : productCatalog.filter((p) => p.category === activeCategory);

  return (
    <section className="py-12 md:py-16 bg-amber-50/20 border-t border-gray-100 text-gray-800 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* CENTERED COMPACT HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-2 flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
            Our Products
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight pt-1 px-2">
            Premium Sourced Food products
          </h2>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-md mx-auto pt-0.5 px-4">
            Discover our premium processed consumer food products across Ghana.
          </p>
        </div>

        {/* 📱 RESPONSIVE FILTER MATRIX: Snap-scroll navigation on phones, centered deck layout on desktop */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="w-full overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-1.5 p-1.5 bg-gray-100/70 border border-gray-200/40 rounded-xl snap-x snap-mandatory">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer select-none snap-center ${
                  activeCategory === cat
                    ? 'bg-white text-green-700 shadow-xs border border-gray-200/50'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-white/30'
                }`}
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            ))}
          </div>
          {/* Mobile indicator for multi-category scroll hint */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none sm:hidden opacity-40 animate-pulse">
            <ChevronRight size={14} />
          </div>
        </div>

        {/* 📱 FLUID SYMMETRICAL CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-sm sm:max-w-none mx-auto items-stretch">
          {filteredProducts.map((p) => {
            return (
              <div
                key={p.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between w-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
              >
                {/* IMAGE CONTAINER LAYER WITH FIXED ASPECT SQUARE COMPLIANCE */}
                <div className="relative overflow-hidden aspect-square w-full bg-gray-50 border-b border-gray-100 flex items-center justify-center">
                  {p.imageWebp && p.image ? (
                    <picture className="w-full h-full">
                      <source srcSet={p.imageWebp} type="image/webp" />
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 select-none"
                      />
                    </picture>
                  ) : (
                    /* LIGHTWEIGHT FALLBACK VECTOR CARD: Displays for brand categories with unreleased images */
                    <div className="flex flex-col items-center justify-center text-center p-6 space-y-2 select-none">
                      <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                        <Layers size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1">Image Coming Soon</span>
                    </div>
                  )}
                </div>

                {/* DETAILS CONTENT PACK BOX */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-[9px] font-bold uppercase text-green-700 rounded-md border border-green-100/30">
                        <Layers size={10} />
                        {p.category} • {p.size}
                      </span>

                      <div className="flex text-amber-500">
                        {[...Array(p.rating || 5)].map((_, idx) => (
                          <Star key={idx} size={11} fill="currentColor" className="stroke-none" />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors tracking-tight leading-snug">
                      {p.name}
                    </h3>

                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/contact"
                      search={{ subject: `Price Enquiry - ${p.name} (${p.size})` }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm cursor-pointer"
                    >
                      <MessageSquare size={13} />
                      <span>Make an Enquiry</span>
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
