import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronRight, Droplets } from 'lucide-react';
import { useProductsQuery } from '@/services/products';
import ProductCard from '@/components/storefront/ProductCard';

export default function ProductsSection() {
  const { data: products = [] } = useProductsQuery();
  const availableCategories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section className="py-12 md:py-16 bg-amber-50/20 border-t border-gray-100 text-gray-800 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header with simple plain English */}
        <div className="max-w-3xl mx-auto text-center mb-8 space-y-2 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <Droplets size={13} className="text-green-700 shrink-0" />
            <span>Premium Honey</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-extrabold text-gray-900 tracking-tight pt-1">
            Real Honey
          </h2>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-md mx-auto">
            100% pure, natural honey with zero added sugar or fake syrup. Fresh, sweet, and safe for your family.
          </p>
        </div>

        {/* Category Filter Rail */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <div className="w-full overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-1.5 p-1.5 bg-white border border-gray-100 rounded-2xl shadow-2xs snap-x snap-mandatory">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer select-none snap-center whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-green-700 text-white shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {cat === 'All' ? 'All Bottles' : cat}
              </button>
            ))}
          </div>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none sm:hidden opacity-30 animate-pulse">
            <ChevronRight size={14} />
          </div>
        </div>

        {/* E-Commerce Product Card Grid (Oraimo Style) - Strict 2-column grid on mobile/tablet, 3-column centered on desktop */}
        <div className="grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-2.5 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="w-full lg:w-[calc(33.333%-16px)] lg:max-w-85 flex"
            >
              <ProductCard product={p} className="w-full" />
            </div>
          ))}
        </div>

        {/* Bottom Call to Store */}
        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-green-50 text-green-700 font-bold text-xs uppercase tracking-wider rounded-xl border border-green-200 transition-all shadow-2xs hover:shadow-xs"
          >
            <span>Visit Our Store</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
