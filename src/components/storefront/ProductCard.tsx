import React, { useState } from 'react';
import { Star, ShoppingCart, Check, Zap, Truck } from 'lucide-react';
import type { CatalogProduct } from '@/config/commerce';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: CatalogProduct;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addItem, openCart, openQuickView } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    openCart();
  };

  return (
    <div
      onClick={() => openQuickView(product)}
      className={`group bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 transition-all duration-300 flex flex-col justify-between overflow-hidden relative cursor-pointer h-full ${className}`}
    >
      {/* Product Image Stage (Aspect Square) */}
      <div className="relative aspect-square w-full bg-gray-50/80 overflow-hidden border-b border-gray-100">

        {/* Top Badges */}
        {product.badge && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
            <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-md bg-green-800 text-white shadow-2xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Product Photography */}
        <picture className="absolute inset-0 w-full h-full">
          <source srcSet={product.imageWebp} type="image/webp" />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 select-none"
          />
        </picture>
      </div>

      {/* Product Details */}
      <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
        <div className="space-y-1 sm:space-y-1.5">
          {/* Rating & Size */}
          <div className="flex items-center justify-between gap-1 flex-wrap text-xs">
            <div className="flex items-center gap-1 bg-amber-50/80 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md text-amber-700 font-semibold text-[10px] sm:text-[11px]">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span>{product.rating}.0</span>
              <span className="text-gray-400">({product.reviewCount})</span>
            </div>

            <Badge variant="outline" className="text-[9px] sm:text-[10px] text-gray-600 font-semibold bg-gray-50 border-gray-200 px-1.5 py-0.2">
              {product.size}
            </Badge>
          </div>

          {/* Product Title (Consistent 2-line lock for perfect grid alignment like Oraimo) */}
          <h3 className="font-bold text-xs sm:text-sm md:text-base text-gray-900 group-hover:text-green-700 transition-colors leading-snug line-clamp-2 min-h-8 sm:min-h-[2.5rem] flex items-center pt-0.5">
            {product.name}
          </h3>

          {/* Simple Description (hidden on mobile to keep 2-column grid compact & tidy like Oraimo) */}
          <p className="hidden sm:line-clamp-2 text-xs text-gray-500 leading-relaxed pt-0.5">
            {product.description}
          </p>
        </div>

        {/* Price & Delivery Row */}
        <div className="pt-2 border-t border-gray-100 space-y-1.5 sm:space-y-2">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-sm sm:text-lg font-black text-gray-900">
              GH₵ {product.price.toFixed(2)}
            </span>

            <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              In Stock
            </span>
          </div>

          {/* Transparent Delivery Note */}
          <div className="flex items-center gap-1 text-[9px] sm:text-[11px] text-gray-500 font-medium">
            <Truck size={11} className="text-green-700 shrink-0" />
            <span className="truncate">GH₵ 25 delivery • Free over GH₵ 350</span>
          </div>

          {/* Action Buttons (Responsive Oraimo Style for 2-column mobile & 3-column desktop) */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-0.5">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full h-8 sm:h-9 px-1 sm:px-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs active:scale-95 ${
                isAdded
                  ? 'bg-green-700 text-white'
                  : 'bg-green-50 hover:bg-green-100 text-green-800 border border-green-200/60'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={13} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={13} />
                  <span className="sm:hidden">Add</span>
                  <span className="hidden sm:inline">Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full h-8 sm:h-9 px-1 sm:px-2 bg-green-700 hover:bg-green-800 text-white rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer shadow-2xs transition-all active:scale-95"
            >
              <Zap size={12} className="fill-current" />
              <span className="sm:hidden">Buy</span>
              <span className="hidden sm:inline">Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
