import React from 'react';
import { Link } from '@tanstack/react-router';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import type { CatalogProduct } from '@/config/commerce';

interface WishlistTabProps {
  products: CatalogProduct[];
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (product: CatalogProduct) => void;
}

export const WishlistTab: React.FC<WishlistTabProps> = ({
  products,
  onToggleWishlist,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            WishList ({products.length})
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Products saved to your account.
          </p>
        </div>

        <Link
          to="/products"
          className="px-4 py-2 bg-green-50 hover:bg-green-100 text-green-800 rounded-xl text-xs font-bold transition-all border border-green-200/80"
        >
          View All Products
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-14 space-y-3">
          <Heart size={36} className="text-gray-300 mx-auto" />
          <h4 className="text-sm font-bold text-gray-700">Your wishlist is empty</h4>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Save items to your wishlist while shopping to find them here easily.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="border border-gray-100 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow group relative bg-brand-cream/60"
            >
              <button
                type="button"
                onClick={() => onToggleWishlist(p.id)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white text-red-500 hover:bg-red-50 transition-colors shadow-2xs cursor-pointer"
                title="Remove from Wishlist"
              >
                <Trash2 size={13} />
              </button>

              <div className="space-y-3">
                <div className="w-full h-36 rounded-xl overflow-hidden bg-white flex items-center justify-center p-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                    {p.size}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{p.name}</h4>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-sm font-black text-green-800">
                      GH₵ {p.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(p)}
                className="mt-4 w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
              >
                <ShoppingBag size={13} />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistTab;
