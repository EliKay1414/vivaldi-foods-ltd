import { Link } from '@tanstack/react-router';
import { Star, MessageSquare } from 'lucide-react';
import { productCatalog } from '@/config/commerce';

export default function ProductsSection() {
  return (
    <section className="py-6 md:py-10 bg-brand-cream border-t border-brand-brown/12">
      <div className="container-custom">
        <div className="sec-title centered mb-8 md:mb-12">
          <span className="sub-title">Our Products</span>
          <h2 className="text-brand-brown">
            Volta Premium Honey, Straight from the Region
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productCatalog.map((p) => (
            <div
              key={p.id}
              className="group bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col justify-between rounded-sm"
              style={{ minHeight: '400px' }}
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-brand-cream mb-4 rounded-sm">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-label">Net Weight: {p.size}</span>
                  <div className="flex text-amber-500">
                    {[...Array(p.rating)].map((_, idx) => (
                      <Star key={idx} size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <h3 className="text-brand-brown mb-3 leading-tight">{p.name}</h3>

                <p className="text-body-sm text-slate-500 mb-4 leading-relaxed line-clamp-3">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-auto">
                <Link
                  to="/contact"
                  search={{ subject: `Price Enquiry - ${p.name} (${p.size})` }}
                  className="w-full py-3 bg-brand-brown text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-brand-green transition-colors duration-300 rounded-none shadow-sm"
                >
                  <MessageSquare size={13} />
                  <span>Make an Enquiry</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
