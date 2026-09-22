import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Truck,
  Package,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/hooks/useOrders';

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
    deliveryFee,
    total,
  } = useCart();

  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<'cart' | 'orders'>('cart');

  // Prevent background scroll and listen for Escape key when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeCart();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen, closeCart]);

  // When cart opens, default to cart tab unless items are empty and orders exist
  useEffect(() => {
    if (isCartOpen) {
      if (items.length === 0 && orders.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTab('orders');
      } else {
        setActiveTab('cart');
      }
    }
    // Only run when drawer opens
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            aria-label="Shopping Cart & Orders"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-brand-cream/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                  {activeTab === 'cart' ? <ShoppingCart size={18} /> : <Package size={18} />}
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 tracking-tight leading-tight">
                    {activeTab === 'cart' ? 'Shopping Cart' : 'My Orders'}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {activeTab === 'cart'
                      ? items.length === 0
                        ? 'No items yet'
                        : `${items.length} ${items.length === 1 ? 'bottle order' : 'bottle orders'} in cart`
                      : `${orders.length} ${orders.length === 1 ? 'order placed' : 'orders placed'}`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs (Cart vs My Orders) */}
            {orders.length > 0 && (
              <div className="flex border-b border-gray-100 bg-gray-50/60 p-1.5 gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab('cart')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'cart'
                      ? 'bg-white text-green-800 shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <ShoppingCart size={13} />
                  <span>Cart ({items.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-white text-green-800 shadow-2xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  <Package size={13} />
                  <span>My Orders ({orders.length})</span>
                </button>
              </div>
            )}

            {/* Tab 1: Shopping Cart */}
            {activeTab === 'cart' && (
              <>
                {/* Cart Items Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center">
                        <ShoppingCart size={30} />
                      </div>
                      <h3 className="text-base font-bold text-gray-900">Your shopping cart is empty</h3>
                      <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                        Choose your favorite bottle size and enjoy pure Volta honey delivered to your doorstep.
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
                        className="flex gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-2xs hover:border-gray-200 transition-colors"
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
                                className="text-gray-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
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
                        <span className="font-bold text-gray-900">GH₵ {deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-black text-gray-900">
                        <span>Total to Pay</span>
                        <span className="text-base text-green-800">
                          GH₵ {total.toFixed(2)}
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
              </>
            )}

            {/* Tab 2: Stored Orders History */}
            {activeTab === 'orders' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {orders.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
                      <Package size={30} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">No orders placed yet</h3>
                    <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                      Orders you place on the site will appear here with delivery details and status updates.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('cart')}
                      className="mt-2 px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      View Cart
                    </button>
                  </div>
                ) : (
                  orders.map((order) => {
                    const statusColors = {
                      Pending: 'bg-amber-50 text-amber-800 border-amber-200',
                      Confirmed: 'bg-blue-50 text-blue-800 border-blue-200',
                      Dispatched: 'bg-purple-50 text-purple-800 border-purple-200',
                      Delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    }[order.status] || 'bg-gray-50 text-gray-800 border-gray-200';

                    let formattedDate = 'Recently';
                    try {
                      const d = new Date(order.createdAt);
                      if (!isNaN(d.getTime())) {
                        formattedDate = d.toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        });
                      }
                    } catch {
                      // fallback to 'Recently'
                    }

                    const whatsappCheckUrl = `https://wa.me/233256114661?text=${encodeURIComponent(
                      `Hello Vivaldi Foods! I would like to check on my order: #${order.orderId}`
                    )}`;

                    return (
                      <div
                        key={order.orderId}
                        className="p-4 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-3"
                      >
                        {/* Order Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                          <div>
                            <span className="font-mono text-xs font-bold text-gray-900">
                              #{order.orderId}
                            </span>
                            <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                              <Clock size={11} />
                              <span>{formattedDate}</span>
                            </div>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusColors}`}
                          >
                            {order.status}
                          </span>
                        </div>

                        {/* Items list */}
                        <div className="space-y-1.5 text-xs text-gray-600">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span>
                                {item.quantity}x {item.product.name} ({item.product.size})
                              </span>
                              <span className="font-semibold text-gray-900">
                                GH₵ {(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Delivery & Total */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                          <div>
                            <p className="text-[11px] text-gray-400">Delivering to:</p>
                            <p className="font-semibold text-gray-800 line-clamp-1">
                              {order.customer.city} • {order.customer.deliveryAddress}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[11px] text-gray-400">Total:</p>
                            <p className="text-sm font-black text-green-800">
                              GH₵ {order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* WhatsApp Check Status Button */}
                        <a
                          href={whatsappCheckUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
                        >
                          <MessageCircle size={13} className="text-emerald-700" />
                          <span>Check Status on WhatsApp</span>
                        </a>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
