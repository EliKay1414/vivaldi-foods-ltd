import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartBadgeProps {
  className?: string;
  showSubtotal?: boolean;
}

export const CartBadge: React.FC<CartBadgeProps> = ({ className = '', showSubtotal = false }) => {
  const { totalItems, subtotal, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className={`relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-700 hover:bg-green-800 text-white transition-all active:scale-95 cursor-pointer shadow-xs ${className}`}
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <div className="relative flex items-center justify-center">
        <ShoppingCart size={18} className="text-white" />
        {totalItems > 0 && (
          <span className="absolute -top-2.5 -right-3 bg-amber-400 text-gray-950 text-[10px] font-black rounded-full min-w-4.5 h-4.5 px-1 flex items-center justify-center shadow-xs animate-scale-in">
            {totalItems}
          </span>
        )}
      </div>

      {showSubtotal && totalItems > 0 && (
        <span className="hidden md:inline-block text-xs font-extrabold text-white">
          GH₵ {subtotal.toFixed(2)}
        </span>
      )}

      <span className="sr-only">Cart</span>
    </button>
  );
};

export default CartBadge;
