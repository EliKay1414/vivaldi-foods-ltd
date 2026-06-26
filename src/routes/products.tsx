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
    <div className="selection-corporate bg-brand-cream min-h-screen">
      <PageBanner
        title="Our Products"
        subtitle="Experience the pure, authentic taste of nature. Harvested from the heart of Ghana’s Volta Region, our honey is carefully processed to preserve its natural aroma, rich flavor, and full nutritional value."
      />

      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCatalog.map((p) => (
              <div
                key={p.id}
                className="group border border-brand-brown/10 p-6 bg-white flex flex-col hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-square bg-brand-cream/50 overflow-hidden mb-6">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <span className="text-label-sm">
                    {p.category} • {p.size}
                  </span>
                  <h3 className="text-brand-brown mb-3">
                    {p.name}
                  </h3>
                  <div className="flex text-brand-green mb-4">
                    {[...Array(p.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-body-sm text-brand-brown/70 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                {/* Call to Action */}
                <Link
                  to="/contact"
                  search={{ subject: `Enquiry: ${p.name} (${p.size})` }}
                  className="btn-corporate w-full flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} />
                  Make an Enquiry
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
