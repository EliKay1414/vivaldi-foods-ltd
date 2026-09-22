/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { useState, useMemo, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Star,
  ShoppingCart,
  Zap,
  Check,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Minus,
  Plus,
} from 'lucide-react';
import { productCatalog } from '@/config/commerce';
import { useCart } from '@/context/CartContext';
import Seo from '@/components/ui/Seo';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ProductReviews from '@/components/storefront/ProductReviews';

export const Route = createFileRoute('/product/$productId')({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const { addItem, openCart } = useCart();

  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Reset quantity stepper when moving between products
  useEffect(() => {
    setQty(1);
    setIsAdded(false);
  }, [productId]);

  // Find product by id (or match sku / numeric id)
  const product = useMemo(() => {
    const numId = parseInt(productId, 10);
    if (!isNaN(numId)) {
      const found = productCatalog.find((p) => p.id === numId);
      if (found) return found;
    }
    return productCatalog.find(
      (p) => p.sku.toLowerCase() === productId.toLowerCase()
    ) || productCatalog[0];
  }, [productId]);

  const lineTotal = product.price * qty;

  const handleAddToCart = () => {
    addItem(product, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    openCart();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-20 selection:bg-amber-100 selection:text-amber-900">
      <Seo
        title={`${product.name} (${product.size}) | Vivaldi Foods Ltd`}
        description={product.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🧭 Shadcn UI Breadcrumb Navigation */}
        <div className="mb-6 pt-2">
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
                <BreadcrumbLink asChild>
                  <Link to="/products" className="hover:text-green-700 transition-colors">
                    Products
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-gray-900 line-clamp-1 max-w-50 sm:max-w-none">
                  {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* 🌟 Main Product Showcase Stage (Oraimo Symmetrical 2-Column Grid) */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-8 lg:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* LEFT COLUMN: Dedicated Product Showcase */}
            <div className="space-y-4">
              {/* Primary Stage */}
              <div className="relative aspect-square w-full rounded-2xl bg-linear-to-b from-amber-50/40 via-white to-amber-50/20 border border-gray-100 overflow-hidden flex items-center justify-center group shadow-2xs">
                <picture className="w-full h-full">
                  <source srcSet={product.imageWebp} type="image/webp" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 select-none"
                  />
                </picture>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-800 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-green-200/60 shadow-2xs">
                    {product.category}
                  </span>
                </div>

                {/* In Stock Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock
                  </span>
                </div>
              </div>

              {/* Symmetrical Quality Trust Points */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/60 flex flex-col items-center justify-center space-y-1">
                  <Droplets size={18} className="text-green-700" />
                  <span className="text-[11px] font-bold text-gray-900">100% Pure</span>
                  <span className="text-[9px] text-gray-500">Zero Added Sugar</span>
                </div>
                <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/60 flex flex-col items-center justify-center space-y-1">
                  <ShieldCheck size={18} className="text-green-700" />
                  <span className="text-[11px] font-bold text-gray-900">FDA Approved</span>
                  <span className="text-[9px] text-gray-500">FDA/Sg 26-1006</span>
                </div>
                <div className="p-3 bg-amber-50/40 rounded-xl border border-amber-100/60 flex flex-col items-center justify-center space-y-1">
                  <Truck size={18} className="text-green-700" />
                  <span className="text-[11px] font-bold text-gray-900">Doorstep Delivery</span>
                  <span className="text-[9px] text-gray-500">Accra & Nationwide</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Specifications & Purchase Engine */}
            <div className="space-y-6">
              {/* Product Header */}
              <div className="space-y-2 border-b border-gray-100 pb-5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs font-bold px-2.5 py-0.5">
                    {product.size}
                  </Badge>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500 font-medium">SKU: {product.sku}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-gray-900 tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Rating & Verified Buyer Count (Clickable to scroll to reviews) */}
                <a
                  href="#customer-reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('customer-reviews')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-3 pt-1 group cursor-pointer"
                >
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-amber-700 font-bold text-xs group-hover:bg-amber-100 transition-colors">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    <span>{product.rating}.0</span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium group-hover:text-green-700 group-hover:underline transition-colors">
                    Based on verified customer reviews
                  </span>
                </a>
              </div>

              {/* Price & Delivery Card (Oraimo Style) */}
              <div className="p-4 sm:p-5 bg-gray-50/90 rounded-2xl border border-gray-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                      GH₵ {product.price.toFixed(2)}
                    </span>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      Standard unit price • Cash on Delivery or MoMo accepted
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                    Direct from Factory
                  </span>
                </div>

                {/* Delivery Information Banner */}
                <div className="flex items-center gap-2.5 bg-emerald-50/80 border border-emerald-200/70 p-3 rounded-xl text-xs text-emerald-950">
                  <Truck size={16} className="text-green-700 shrink-0" />
                  <div className="leading-snug">
                    <strong>Doorstep Delivery:</strong> GH₵ 25 across Accra • Fast dispatch to your home or office
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Stepper & Line Total */}
              <div className="space-y-2 border-t border-gray-100 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700">Quantity:</span>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-2xs">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-gray-900 select-none">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty((q) => q + 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-gray-500">
                      Total: <strong className="text-gray-900 text-base font-black">GH₵ {lineTotal.toFixed(2)}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Dual Action Buttons (Oraimo Symmetry) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 ${
                    isAdded
                      ? 'bg-green-700 text-white'
                      : 'bg-green-50 hover:bg-green-100 text-green-800 border border-green-200'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={16} />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-4 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-green-900/10 transition-all active:scale-95"
                >
                  <Zap size={16} className="fill-current" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Why Customers Love It:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.highlights.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-amber-50/40 px-3 py-2 rounded-xl border border-amber-100/60 text-xs text-gray-800"
                    >
                      <CheckCircle2 size={13} className="text-green-700 shrink-0" />
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 📊 Symmetrical Product Specifications & Real Label Details Table */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 mb-8 space-y-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2">
              <ShieldCheck size={13} className="text-green-700" />
              <span>Real Product Details from Bottle Label</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-gray-900 tracking-tight">
              Product Details & Food Safety Standards
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Every bottle is harvested in the Volta Region and packaged in accordance with the highest food safety standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Ingredients</span>
              <p className="text-sm font-bold text-gray-900">{product.ingredients || 'Honey (100% Pure Honey)'}</p>
              <p className="text-[11px] text-gray-500">Single pure ingredient • Zero added sugar • Zero artificial syrup</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Country of Origin</span>
              <p className="text-sm font-bold text-gray-900">{product.origin || 'Volta Region, Ghana'}</p>
              <p className="text-[11px] text-gray-500">Sourced directly from beekeepers in the Volta region of Ghana</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Processed & Packaged By</span>
              <p className="text-sm font-bold text-gray-900">{product.packagedBy || 'Vivaldi Foods Ltd'}</p>
              <p className="text-[11px] text-gray-500">{product.factoryAddress || 'Community 18/ Sakumono 381 (053-361-8042)'}</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">FDA Accreditation (Ghana)</span>
              <p className="text-sm font-bold text-gray-900">FDA/Sg 26-1006</p>
              <p className="text-[11px] text-gray-500">Packaged in accordance with the highest food safety standards</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Storage Instructions</span>
              <p className="text-sm font-bold text-gray-900">{product.storage || 'Store in a cool, dry place.'}</p>
              <p className="text-[11px] text-gray-500">Keep bottle closed tightly away from direct hot sunlight</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Batch & Expiry Dates</span>
              <p className="text-sm font-bold text-gray-900">Printed On The Lid</p>
              <p className="text-[11px] text-gray-500">Batch No., Man. Date, and Best Before date stamped on bottle lid</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Product Barcode (EAN)</span>
              <p className="text-sm font-bold text-gray-900 font-mono">{product.barcode || '6 036000 227011'}</p>
              <p className="text-[11px] text-gray-500">Official retail barcode for shops, marts, and supermarkets</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Direct Customer Service</span>
              <p className="text-sm font-bold text-gray-900">0243264003 / 053-361-8042</p>
              <p className="text-[11px] text-gray-500">WhatsApp Support: 0268114601 • Fast Accra delivery dispatch</p>
            </div>
          </div>

          {/* 🍯 Label Quality & Safety Notice Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
              <Droplets size={16} className="text-amber-700 shrink-0" />
              <span>Important Honey Notes from the Bottle Label:</span>
            </div>
            <ul className="text-xs text-amber-950/80 space-y-1.5 pl-6 list-disc">
              <li>
                <strong>Natural Crystallization:</strong> Crystallization is completely natural for pure raw honey. If it occurs, simply place the bottle in warm water to reliquefy.
              </li>
              <li>
                <strong>Infant Safety:</strong> Not recommended for children under 12 months (standard natural honey safety recommendation).
              </li>
            </ul>
          </div>
        </div>

        {/* 💬 Symmetrical Customer Reviews & Add Review Modal Section */}
        <ProductReviews
          productId={product.id}
          productName={product.name}
          productSize={product.size}
        />

      </div>
    </div>
  );
}

export default ProductDetailPage;
