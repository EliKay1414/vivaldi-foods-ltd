import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight, Truck, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    openCheckout,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    isFreeShipping,
    amountToFreeShipping,
  } = useCart();

  // Prevent background scroll when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-brand-cream/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 tracking-tight leading-tight">
                    Shopping Cart
                  </h2>
                  <p className="text-xs text-gray-500">
                    {items.length === 0
                      ? 'No items yet'
                      : `${items.reduce((s, i) => s + i.quantity, 0)} ${items.reduce((s, i) => s + i.quantity, 0) === 1 ? 'item' : 'items'} in cart`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center">
                    <ShoppingCart size={30} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Your shopping cart is empty</h3>
                  <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                    Choose your favorite bottle size and enjoy pure, fresh honey delivered to your home.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="mt-2 px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-xs hover:border-gray-200 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-18 h-18 rounded-lg bg-gray-50 p-1 shrink-0 overflow-hidden border border-gray-100">
                      <picture className="w-full h-full">
                        <source srcSet={item.product.imageWebp} type="image/webp" />
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </picture>
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[11px] text-green-700 font-bold uppercase tracking-wider mt-0.5">
                          {item.product.size}
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/80">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                            aria-label="Reduce quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-gray-900 select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-black text-gray-900">
                            GH₵ {(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-[10px] text-gray-400">
                              GH₵ {item.product.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Actions */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/60 space-y-3">
                {/* Free Delivery Status Banner */}
                {isFreeShipping ? (
                  <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/70 flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                    <Check size={14} className="text-green-700 shrink-0" />
                    <span>You unlocked <strong>FREE Delivery</strong> in Accra!</span>
                  </div>
                ) : (
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200/70 text-xs text-amber-900 font-medium">
                    Add <strong className="text-amber-950">GH₵ {amountToFreeShipping.toFixed(2)}</strong> more to get <strong>FREE delivery</strong> in Accra!
                  </div>
                )}

                {/* Cost Breakdown */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-gray-900">GH₵ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 items-center">
                    <span className="flex items-center gap-1">
                      <Truck size={13} className="text-green-700 shrink-0" />
                      <span>Delivery Fee (Accra)</span>
                    </span>
                    {isFreeShipping ? (
                      <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                        FREE
                      </span>
                    ) : (
                      <span className="font-bold text-gray-900">GH₵ 25.00</span>
                    )}
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-black text-gray-900">
                    <span>Total to Pay</span>
                    <span className="text-base text-green-800">
                      GH₵ {(subtotal + (isFreeShipping ? 0 : 25)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Primary Action Button: Checkout */}
                <button
                  type="button"
                  onClick={openCheckout}
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>

                {/* Clear Cart link */}
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] font-medium text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
