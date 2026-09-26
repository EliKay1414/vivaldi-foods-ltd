import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart, Plus, Minus, CheckCircle2, Zap, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

type QuickViewProduct = NonNullable<ReturnType<typeof useCart>['quickViewProduct']>;

interface QuickViewModalContentProps {
  product: QuickViewProduct;
  closeQuickView: () => void;
  addItem: (product: QuickViewProduct, qty: number) => void;
}

const QuickViewModalContent: React.FC<QuickViewModalContentProps> = ({
  product,
  closeQuickView,
  addItem,
}) => {
  const [qty, setQty] = useState(1);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeQuickView();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeQuickView]);

  const handleAdd = () => {
    closeQuickView();
    addItem(product, qty);
  };

  const handleBuyNow = () => {
    closeQuickView();
    addItem(product, qty);
  };

  const lineTotal = product.price * qty;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/65 backdrop-blur-xs"
          aria-hidden="true"
        />

        {/* Modal Window - Capped at 82vh with width margin on mobile so it never takes over the full viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 14 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-[92%] sm:w-[85%] md:w-full max-w-3xl max-h-[82vh] sm:max-h-[88vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/25 border border-gray-100 overflow-hidden z-10 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
        >
          {/* Top-Right Circular Close Button */}
          <button
            type="button"
            onClick={closeQuickView}
            className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 hover:bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-200/70 shadow-xs flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-700 active:scale-95"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          {/* Scrollable Interior Container */}
          <div className="overflow-y-auto flex-1 overscroll-contain">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Column: Product Showcase Stage */}
              <div className="bg-linear-to-br from-amber-50/60 via-amber-50/20 to-white p-3.5 sm:p-6 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-100 relative">

                {/* In Stock status indicator */}
                <div className="w-full flex items-center justify-end mb-2 sm:mb-4 pr-7 sm:pr-0">
                  <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    In Stock
                  </span>
                </div>

                {/* Product Photography - Compact on mobile, expansive on desktop */}
                <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-full md:max-w-65 md:aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-white border border-gray-100/80 shadow-2xs flex items-center justify-center relative group p-1 sm:p-2">
                  <picture className="w-full h-full flex items-center justify-center">
                    <source srcSet={product.imageWebp} type="image/webp" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-105"
                    />
                  </picture>
                </div>

                {/* Verified Origin Guarantee */}
                <div className="mt-2.5 sm:mt-4 w-full pt-2 sm:pt-3 border-t border-gray-100/80 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-gray-500">
                  <ShieldCheck size={13} className="text-green-700 shrink-0" />
                  <span>100% Pure Volta Premium Honey • Quality Assured</span>
                </div>
              </div>

              {/* Right Column: Product Info & Interactive Purchase Area */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div className="space-y-2.5 sm:space-y-3.5">

                  {/* Rating & Size Row */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1 bg-amber-50/90 border border-amber-200/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-amber-800 text-[11px] sm:text-xs font-bold">
                      <div className="flex items-center text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={10}
                            fill={s <= Math.round(product.rating) ? 'currentColor' : 'none'}
                            className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span>{product.rating.toFixed(1)}</span>
                      <span className="text-gray-400 font-normal">({product.reviewCount})</span>
                    </div>

                    <Badge variant="outline" className="text-[10px] sm:text-[11px] text-gray-700 font-semibold bg-gray-50 border-gray-200 px-2 py-0.5">
                      {product.size}
                    </Badge>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-base sm:text-xl font-display font-extrabold text-gray-900 tracking-tight leading-snug">
                    {product.name}
                  </h3>

                  {/* Price Display Card */}
                  <div className="p-2.5 sm:p-3.5 bg-gray-50/80 rounded-xl sm:rounded-2xl border border-gray-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                        GH₵ {product.price.toFixed(2)}
                      </span>
                      <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium">Standard unit price • Cash or MoMo</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200/60">
                      {product.category}
                    </span>
                  </div>

                  {/* Clear Delivery Fee Banner */}
                  <div className="flex items-center gap-2 bg-emerald-50/90 border border-emerald-200/70 p-2.5 sm:p-3 rounded-xl text-xs text-emerald-900 font-medium">
                    <Truck size={15} className="text-green-700 shrink-0" />
                    <div className="flex-1 text-[11px] sm:text-xs leading-snug">
                      <span className="font-bold text-emerald-950">Doorstep Delivery:</span> GH₵ 25 across Accra • Fast dispatch to your location
                    </div>
                  </div>

                  {/* Plain English Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {product.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-1 pt-0.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Why Customers Love It:</p>
                    <ul className="grid grid-cols-1 gap-1 sm:gap-1.5 text-xs text-gray-700">
                      {product.highlights.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 sm:gap-2 bg-amber-50/40 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl border border-amber-100/50">
                          <CheckCircle2 size={12} className="text-green-700 shrink-0" />
                          <span className="font-medium text-gray-800 text-[11px] sm:text-xs">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quantity Picker & Live Action Row */}
                <div className="space-y-2.5 sm:space-y-3 pt-2.5 sm:pt-3 border-t border-gray-100">
                  {/* Stepper + Subtotal Preview */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700">Quantity:</span>

                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="flex items-center border border-gray-200 rounded-xl bg-white shadow-2xs">
                        <button
                          type="button"
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 sm:w-9 text-center text-xs font-bold text-gray-900 select-none">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty((q) => q + 1)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-gray-500">
                        Total: <strong className="text-gray-900 text-xs sm:text-sm font-black">GH₵ {lineTotal.toFixed(2)}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Dual Action Buttons (Oraimo Style) */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-0.5">
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 bg-green-50 hover:bg-green-100 text-green-800 border border-green-200/80"
                    >
                      <ShoppingCart size={14} />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleBuyNow}
                      className="py-2.5 sm:py-3 px-3 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Zap size={14} className="fill-current" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addItem } = useCart();

  if (!quickViewProduct) return null;

  return (
    <QuickViewModalContent
      key={quickViewProduct.id}
      product={quickViewProduct}
      closeQuickView={closeQuickView}
      addItem={addItem}
    />
  );
};

export default QuickViewModal;
