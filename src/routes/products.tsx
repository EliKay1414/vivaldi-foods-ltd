import { createFileRoute, Link } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { Star, MessageSquare } from 'lucide-react';
import { productCatalog } from '@/config/commerce';

export const Route = createFileRoute('/products')({
  component: ProductsPage,
});

// eslint-disable-next-line react-refresh/only-export-components
function ProductsPage() {
  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      <PageBanner
        title="Our Products"
        subtitle="Taste the pure, natural flavor of Volta Premium Honey. Perfect for your morning tea at home or at the office."
      />

      {/* COMPACT SECTION: Reduced vertical padding from py-12/py-16 down to a clean py-8/md:py-12 */}
      <section className="py-8 md:py-12 max-w-6xl mx-auto px-6">

        {/* Symmetrical Flexible Card Container */}
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {productCatalog.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden"
            >
              {/* IMAGE HOUSING: Sized down vertical length using a shorter aspect-3/4 portrait frame */}
              <div className="relative overflow-hidden aspect-3/4 bg-gray-50 border-b border-gray-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* DETAILS WRAPPER: Squeezed padding down to p-4 to shrink overall length */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
                    {p.category} • {p.size}
                  </span>

                  <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors tracking-tight leading-snug">
                    {p.name}
                  </h3>

                  {/* Rating Stars */}
                  <div className="flex text-amber-500 py-0.5">
                    {[...Array(p.rating || 5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" className="stroke-none" />
                    ))}
                  </div>

                  {/* Description limits content length to 3 safe text lines */}
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                </div>

                {/* Call to Action Button */}
                <div className="pt-1">
                  <Link
                    to="/contact"
                    search={{ subject: `Enquiry: ${p.name} (${p.size})` }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm"
                  >
                    <MessageSquare size={13} />
                    Make an Enquiry
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
