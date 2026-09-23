import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { CheckCircle2, TrendingUp, MinusCircle, Trash2, ShoppingBag } from 'lucide-react';
import type { CatalogProduct } from '@/config/commerce';

export type OrderNotificationAction = 'added' | 'increment' | 'decrement' | 'removed';

export interface OrderNotificationItem {
  id: string;
  product: CatalogProduct;
  quantity: number;
  action: OrderNotificationAction;
  title: string;
  message: string;
  timestamp: number;
}

interface NotificationContextType {
  activeNotification: OrderNotificationItem | null;
  notifications: OrderNotificationItem[];
  unreadCount: number;
  notifyOrder: (params: {
    product: CatalogProduct;
    quantity: number;
    action: OrderNotificationAction;
    customTitle?: string;
    customMessage?: string;
  }) => void;
  dismissNotification: (id?: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState<OrderNotificationItem | null>(null);
  const [notifications, setNotifications] = useState<OrderNotificationItem[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissNotification = useCallback((id?: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setActiveNotification((current) => {
      if (!id || current?.id === id) {
        return null;
      }
      return current;
    });
  }, []);

  const notifyOrder = useCallback(
    ({
      product,
      quantity,
      action,
      customTitle,
      customMessage,
    }: {
      product: CatalogProduct;
      quantity: number;
      action: OrderNotificationAction;
      customTitle?: string;
      customMessage?: string;
    }) => {
      let defaultTitle = 'Order Updated';
      let defaultMessage = `${product.name} quantity in cart: ${quantity}`;

      if (action === 'added') {
        defaultTitle = 'Added to Cart';
        defaultMessage = `${product.name} (${product.size}) added to your cart`;
      } else if (action === 'increment') {
        defaultTitle = 'Order Quantity Increased';
        defaultMessage = `${product.name} quantity updated to ${quantity}`;
      } else if (action === 'decrement') {
        defaultTitle = 'Order Quantity Reduced';
        defaultMessage = `${product.name} quantity updated to ${quantity}`;
      } else if (action === 'removed') {
        defaultTitle = 'Item Removed';
        defaultMessage = `${product.name} was removed from cart`;
      }

      const finalTitle = customTitle || defaultTitle;
      const finalMessage = customMessage || defaultMessage;
      const itemTotal = (product.price * Math.max(1, quantity)).toFixed(2);

      const newItem: OrderNotificationItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        product,
        quantity,
        action,
        title: finalTitle,
        message: finalMessage,
        timestamp: Date.now(),
      };

      setActiveNotification(newItem);
      setNotifications((prev) => [newItem, ...prev.slice(0, 19)]); // Keep last 20

      // Trigger Middle Top-Center React-Toastify
      toast(
        ({ closeToast }) => (
          <div className="flex items-center gap-3 w-full text-left py-0.5">
            {/* Product Image Thumbnail */}
            {product.image && (
              <div className="relative size-11 sm:size-12 rounded-xl bg-amber-50/70 p-0.5 border border-amber-200/60 shrink-0 overflow-hidden shadow-2xs">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                {quantity > 0 && action !== 'removed' && (
                  <span className="absolute bottom-0 right-0 bg-green-700 text-white text-[9px] font-black px-1 rounded-tl-md">
                    x{quantity}
                  </span>
                )}
              </div>
            )}

            {/* Notification Text Body */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-[13px] text-gray-900">
                {action === 'increment' ? (
                  <TrendingUp size={14} className="text-green-700 shrink-0" />
                ) : action === 'decrement' ? (
                  <MinusCircle size={14} className="text-amber-600 shrink-0" />
                ) : action === 'removed' ? (
                  <Trash2 size={14} className="text-red-600 shrink-0" />
                ) : (
                  <CheckCircle2 size={14} className="text-green-700 shrink-0" />
                )}
                <span className="truncate">{finalTitle}</span>
              </div>

              <p className="text-[11px] text-gray-600 truncate mt-0.5 font-medium">
                {product.name} ({product.size}) •{' '}
                <strong className="text-gray-900 font-bold">GH₵ {itemTotal}</strong>
              </p>

              {action !== 'removed' && (
                <div className="mt-1 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeToast();
                      window.dispatchEvent(new CustomEvent('open-cart-drawer'));
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 hover:text-green-800 transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={12} />
                    <span>View Cart</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ),
        {
          toastId: `cart-${product.id}`,
          position: 'top-center',
          autoClose: 3200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    },
    []
  );

  const clearAll = useCallback(() => {
    setActiveNotification(null);
    setNotifications([]);
  }, []);

  const unreadCount = notifications.length;

  return (
    <NotificationContext.Provider
      value={{
        activeNotification,
        notifications,
        unreadCount,
        notifyOrder,
        dismissNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
