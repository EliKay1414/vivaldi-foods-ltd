import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartBadgeProps {
  className?: string;
  showSubtotal?: boolean;
}

export const CartBadge: React.FC<CartBadgeProps> = ({ className = '' }) => {
  const { totalItems, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className={`relative inline-flex items-center justify-center p-2 sm:px-2.5 sm:py-2 rounded-xl bg-green-700 hover:bg-green-800 text-white transition-all active:scale-95 cursor-pointer shadow-xs ${className}`}
      aria-label={`Shopping cart with ${totalItems} ${totalItems === 1 ? 'order' : 'orders'}`}
    >
      <div className="relative flex items-center justify-center">
        <ShoppingCart size={18} className="text-white" />
        {totalItems > 0 && (
          <span className="absolute -top-2.5 -right-3 bg-amber-400 text-gray-950 text-[10px] font-black rounded-full min-w-4.5 h-4.5 px-1 flex items-center justify-center shadow-xs animate-scale-in">
            {totalItems}
          </span>
        )}
      </div>

      <span className="sr-only">Cart</span>
    </button>
  );
};

export default CartBadge;
