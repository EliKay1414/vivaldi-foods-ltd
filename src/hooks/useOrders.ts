import { useState, useEffect, useCallback, useMemo } from 'react';
import type { OrderPayload, OrderResult } from '@/services/products';

const STORAGE_KEY_ORDERS = 'vivaldi_orders';
const ORDERS_EVENT = 'vivaldi-orders-updated';

/**
 * Load all stored orders from localStorage
 */
function loadOrdersFromStorage(): OrderPayload[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load orders from localStorage', e);
  }
  return [];
}

/**
 * Save orders to localStorage and notify all listeners
 */
function saveOrdersToStorage(orders: OrderPayload[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent(ORDERS_EVENT));
  } catch (e) {
    console.error('Failed to save orders to localStorage', e);
  }
}

/**
 * Custom hook for state management of customer orders in localStorage
 */
export function useOrders() {
  const [orders, setOrders] = useState<OrderPayload[]>(() => loadOrdersFromStorage());
  const [isLoading, setIsLoading] = useState(false);

  // Synchronize state across storage events & custom dispatch events
  useEffect(() => {
    const handleUpdate = () => {
      setOrders(loadOrdersFromStorage());
    };

    window.addEventListener(ORDERS_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(ORDERS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const totalOrders = orders.length;

  const latestOrder = useMemo(() => {
    return orders.length > 0 ? orders[0] : null;
  }, [orders]);

  const pendingCount = useMemo(() => {
    return orders.filter((o) => o.status === 'Pending').length;
  }, [orders]);

  const deliveredCount = useMemo(() => {
    return orders.filter((o) => o.status === 'Delivered').length;
  }, [orders]);

  /**
   * Save a newly placed customer order
   */
  const saveOrder = useCallback(
    async (orderData: OrderPayload): Promise<OrderResult> => {
      setIsLoading(true);

      return new Promise((resolve) => {
        setTimeout(() => {
          const current = loadOrdersFromStorage();
          // Prepend new order to top
          const updated = [orderData, ...current.filter((o) => o.orderId !== orderData.orderId)];

          saveOrdersToStorage(updated);
          setOrders(updated);
          setIsLoading(false);

          resolve({
            success: true,
            orderId: orderData.orderId,
            message: 'Your order was received successfully! Our team will contact you shortly.',
            order: orderData,
          });
        }, 300);
      });
    },
    []
  );

  /**
   * Find an order by its unique ID
   */
  const getOrderById = useCallback(
    (orderId: string): OrderPayload | undefined => {
      return orders.find((o) => o.orderId === orderId);
    },
    [orders]
  );

  /**
   * Update the status of an existing order
   */
  const updateOrderStatus = useCallback(
    (orderId: string, newStatus: OrderPayload['status']) => {
      const current = loadOrdersFromStorage();
      const updated = current.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      );

      saveOrdersToStorage(updated);
      setOrders(updated);
    },
    []
  );

  /**
   * Clear all stored orders
   */
  const clearOrders = useCallback(() => {
    saveOrdersToStorage([]);
    setOrders([]);
  }, []);

  return {
    orders,
    totalOrders,
    latestOrder,
    pendingCount,
    deliveredCount,
    isLoading,
    saveOrder,
    getOrderById,
    updateOrderStatus,
    clearOrders,
  };
}

export default useOrders;
