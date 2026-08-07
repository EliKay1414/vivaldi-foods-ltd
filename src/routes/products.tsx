/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { Star, MessageSquare, Layers, ChevronRight } from 'lucide-react';
import { productCatalog } from '@/config/commerce';
import Seo from '@/components/ui/Seo';

export const Route = createFileRoute('/products')({
  component: ProductsPage,
});

function ProductsPage() {
  // DYNAMIC PORTFOLIO AXIS: Extracts unique category layers automatically for any future food brand expansions
  const availableCategories = ['All', ...Array.from(new Set(productCatalog.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? productCatalog
    : productCatalog.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      {/* TYPE-SAFE CLIENT INJECTION: Hydrates unique metadata context safely inside browser window scopes */}
      <Seo
        title="Official Products Catalog | Vivaldi Foods Ltd"
        description="Explore the full food and agricultural brand selection from Vivaldi Foods Ltd. Shop our 100% pure Volta Premium Honey alongside our expanding premium product collections available across Ghana."
      />

      <PageBanner
        title="Our Products"
        subtitle="Explore our pure, natural flavor selections and premium consumer food brands tailored for your family."
      />

      {/* 📱 HORIZONTAL FILTER SLIDER DECK: Touch-friendly horizontal swipe rail on phones, centered links on laptop screens */}
      <div className="max-w-6xl mx-auto px-6 pt-10 relative">
        <div className="relative max-w-2xl mx-auto">
          <div className="w-full overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-1.5 p-1.5 bg-white border border-gray-100 rounded-xl shadow-xs snap-x snap-mandatory">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer select-none snap-center ${
                  activeCategory === cat
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat === 'All' ? 'All Brands' : cat}
              </button>
            ))}
          </div>
          {/* Mobile slider swipe hint icon */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none sm:hidden opacity-30 animate-pulse">
            <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {/* 📱 GRIDS ENVIRONMENT DECK */}
      <section className="py-8 md:py-12 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-sm sm:max-w-none mx-auto items-stretch">
          {filteredProducts.map((p) => {
            return (
              <div
                key={p.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between w-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
              >
                {/* IMAGE BOUNDS LAYER - Locked to strict square aspect ratio box elements */}
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
                    /* LIGHTWEIGHT FALLBACK VECTOR CARD: Displays for future product lines with unreleased photography */
                    <div className="flex flex-col items-center justify-center text-center p-6 space-y-2 select-none">
                      <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                        <Layers size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-1">
                        Image Coming Soon
                      </span>
                    </div>
                  )}
                </div>

                {/* DETAILS WRAPPER PACK TEXT */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-[9px] font-bold uppercase text-green-700 rounded-md border border-green-100/30">
                        <Layers size={10} />
                        {p.category} • {p.size}
                      </span>

                      <div className="flex text-amber-500">
                        {[...Array(p.rating || 5)].map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" className="stroke-none" />
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

                  <div className="pt-1">
                    <Link
                      to="/contact"
                      search={{ subject: `Enquiry: ${p.name} (${p.size})` }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm cursor-pointer"
                    >
                      <MessageSquare size={13} />
                      Make an Enquiry
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
