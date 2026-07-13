import { Link } from '@tanstack/react-router';
import { Star, MessageSquare } from 'lucide-react';
import { productCatalog } from '@/config/commerce';

export default function ProductsSection() {
  return (
    <section className="py-10 md:py-14 bg-amber-50/20 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* CENTERED HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-2 flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
            Our Products
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight pt-1">
            Volta Premium Honey, sourced straight from the Region
          </h2>
        </div>

        {/* SYMMETRICAL FLEXIBLE CARD CONTAINER */}
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {productCatalog.map((p) => {
            return (
              <div
                key={p.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
              >
                {/* IMAGE HOUSING REFACTOR: Picture elements load lightweight webp automatically */}
                <div className="relative overflow-hidden aspect-square bg-gray-50 border-b border-gray-100">
                  <picture className="w-full h-full">
                    {/* FIXED OPTIMIZATION: Swapped out string replacement for direct catalog object property */}
                    <source srcSet={p.imageWebp} type="image/webp" />
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 select-none"
                    />
                  </picture>
                </div>

                {/* DETAILS WRAPPER */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-full inline-block">
                        Net Weight: {p.size}
                      </span>

                      <div className="flex text-amber-500">
                        {[...Array(p.rating || 5)].map((_, idx) => (
                          <Star key={idx} size={11} fill="currentColor" className="stroke-none" />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors tracking-tight leading-snug">
                      {p.name}
                    </h3>

                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  <div className="pt-1">
                    <Link
                      to="/contact"
                      search={{ subject: `Price Enquiry - ${p.name} (${p.size})` }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm"
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
