import { useState, useRef } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ShoppingCart, ChevronRight, Droplets } from 'lucide-react';
import Seo from '@/components/ui/Seo';
import StorefrontHero from '@/components/storefront/StorefrontHero';
import ProductCard from '@/components/storefront/ProductCard';
import { useProductsQuery } from '@/services/products';
import { useCart } from '@/context/CartContext';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export const Route = createFileRoute('/products')({
  component: ProductsPage,
});

// eslint-disable-next-line react-refresh/only-export-components
function ProductsPage() {
  const { data: products = [] } = useProductsQuery();
  const { totalItems, subtotal, openCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const productsSectionRef = useRef<HTMLDivElement>(null);

  const availableCategories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleScrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800 pb-20 sm:pb-16">
      {/* SEO */}
      <Seo
        title="Buy Volta Premium Honey Online | Vivaldi Foods Ltd Store"
        description="Buy 100% pure real honey in Ghana. No added sugar or fake syrup. Order small bottles, family jars, or wholesale bulk packs with fast delivery in Accra and nationwide."
      />

      {/* Storefront Hero Section - Positioned flush directly below Header */}
      <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-33.75">
        <StorefrontHero onScrollToProducts={handleScrollToProducts} />
      </div>

      {/* Main Store Catalog Anchor */}
      <div ref={productsSectionRef} className="scroll-mt-32 max-w-6xl mx-auto px-4 sm:px-6 pt-10">

        {/* 🧭 Shadcn UI Breadcrumb Navigation (Oraimo Collection Style) */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="hover:text-green-700 transition-colors">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Products</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[11px] font-bold uppercase tracking-wider">
            <Droplets size={13} className="text-green-700 shrink-0" />
            <span>Our Pure Honey Collection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 tracking-tight">
            Choose Your Favorite Honey Bottle
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            All bottles contain 100% pure, unheated raw honey with zero added sugar. Fresh, sweet, and safe for everyone.
          </p>
        </div>

        {/* 📱 Sticky Category Filter Rail (Oraimo Mobile Swipe Style) */}
        <div className="sticky top-18 z-20 py-2 mb-8 bg-amber-50/90 backdrop-blur-md">
          <div className="relative max-w-2xl mx-auto">
            <div className="w-full overflow-x-auto scrollbar-none flex items-center justify-start sm:justify-center gap-2 p-1.5 bg-white border border-gray-100 rounded-2xl shadow-xs snap-x snap-mandatory">
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

            {/* Mobile swipe indicator hint */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none sm:hidden opacity-30 animate-pulse">
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        {/* E-Commerce Product Grid (Oraimo Style) - Strict 2-column grid on mobile/tablet, 3-column centered on desktop */}
        <div className="grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-2.5 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full lg:w-[calc(33.333%-16px)] lg:max-w-85 flex"
            >
              <ProductCard product={product} className="w-full" />
            </div>
          ))}
        </div>

        {/* If no products match filter */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 space-y-3">
            <p className="text-base font-bold text-gray-800">No items found in this section</p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="px-4 py-2 bg-green-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Show All Bottles
            </button>
          </div>
        )}

      </div>

      {/* 📱 Mobile Floating Cart Bar (Oraimo Style bottom sticky bar when items exist) */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden animate-slide-up">
          <div className="bg-gray-900 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-green-700 flex items-center justify-center font-black text-xs">
                {totalItems}
              </div>
              <div>
                <p className="text-[11px] text-gray-300">Cart Subtotal</p>
                <p className="text-sm font-black text-white">GH₵ {subtotal.toFixed(2)}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={openCart}
              className="bg-green-700 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingCart size={14} />
              <span>View Cart</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
