import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
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
