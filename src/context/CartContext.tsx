import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { CatalogProduct } from '@/config/commerce';
import type { CartItem, CustomerDetails } from '@/services/products';
import { useNotification } from '@/context/NotificationContext';

interface CartContextType {
  items: CartItem[];
  addItem: (product: CatalogProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // Totals & Delivery Logic
  totalItems: number;
  orderCount: number;
  totalQuantity: number;
  subtotal: number;
  freeShippingThreshold: number;
  isFreeShipping: boolean;
  amountToFreeShipping: number;
  deliveryFee: number;
  total: number;

  // Drawer & Modal Controls
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  quickViewProduct: CatalogProduct | null;
  openQuickView: (product: CatalogProduct) => void;
  closeQuickView: () => void;

  // WhatsApp Order helper
  generateWhatsAppOrderUrl: (
    customer?: Partial<CustomerDetails>,
    orderId?: string,
    customItems?: CartItem[],
    customTotal?: number
  ) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'vivaldi_cart';
const FREE_SHIPPING_THRESHOLD = 0;
const SALES_WHATSAPP_PHONE = '233256114661';

/**
 * Filter and validate cart items from localStorage to prevent runtime crashes
 */
function sanitizeCartItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is CartItem => (
    Boolean(item) &&
    typeof item === 'object' &&
    Boolean(item.product) &&
    typeof item.product.id === 'number' &&
    typeof item.product.price === 'number' &&
    !isNaN(item.product.price) &&
    typeof item.quantity === 'number' &&
    !isNaN(item.quantity) &&
    item.quantity > 0
  ));
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notifyOrder } = useNotification();
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? sanitizeCartItems(JSON.parse(saved)) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<CatalogProduct | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [items]);

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          const updated = e.newValue ? JSON.parse(e.newValue) : [];
          setItems(sanitizeCartItems(updated));
        } catch {
          // ignore corrupted data from other tabs
        }
      }
    };
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('open-cart-drawer', handleOpenCart);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('open-cart-drawer', handleOpenCart);
    };
  }, []);

  const addItem = (product: CatalogProduct, quantity = 1) => {
    const validQty = Math.max(1, Math.floor(Number(quantity) || 1));
    const existing = items.find((item) => item.product.id === product.id);
    const newQty = existing ? existing.quantity + validQty : validQty;

    // Trigger notification outside of state setter for pure React updates
    if (existing) {
      notifyOrder({
        product,
        quantity: newQty,
        action: 'increment',
        customTitle: 'Order Quantity Increased',
        customMessage: `${product.name} quantity updated to ${newQty}`,
      });
    } else {
      notifyOrder({
        product,
        quantity: validQty,
        action: 'added',
        customTitle: 'Added to Cart',
        customMessage: `${product.name} (${product.size}) added to your cart`,
      });
    }

    setItems((prev) => {
      const hasItem = prev.some((item) => item.product.id === product.id);
      if (hasItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + validQty }
            : item
        );
      }
      return [...prev, { product, quantity: validQty }];
    });
  };

  const removeItem = (productId: number) => {
    const existing = items.find((item) => item.product.id === productId);
    if (existing) {
      notifyOrder({
        product: existing.product,
        quantity: 0,
        action: 'removed',
        customTitle: 'Item Removed',
        customMessage: `${existing.product.name} was removed from cart`,
      });
    }
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const validQty = Math.floor(Number(quantity));
    if (isNaN(validQty) || validQty <= 0) {
      removeItem(productId);
      return;
    }

    const existing = items.find((item) => item.product.id === productId);
    if (existing) {
      const action = validQty > existing.quantity ? 'increment' : 'decrement';
      const title = validQty > existing.quantity ? 'Order Quantity Increased' : 'Order Quantity Reduced';
      notifyOrder({
        product: existing.product,
        quantity: validQty,
        action,
        customTitle: title,
        customMessage: `${existing.product.name} quantity updated to ${validQty}`,
      });
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: validQty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Distinct product order count (badge does NOT increase on quantity + clicks)
  const totalItems = items.length;
  const orderCount = items.length;

  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.product?.price) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + price * qty;
    }, 0);
  }, [items]);

  const isFreeShipping = false;
  const amountToFreeShipping = 0;
  const deliveryFee = items.length === 0 ? 0 : 25;
  const total = items.length === 0 ? 0 : subtotal + deliveryFee;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openQuickView = (product: CatalogProduct) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const generateWhatsAppOrderUrl = (
    customer?: Partial<CustomerDetails>,
    orderId?: string,
    customItems?: CartItem[],
    customTotal?: number
  ) => {
    const orderItems = customItems && customItems.length > 0 ? customItems : items;
    const itemsSubtotal = orderItems.reduce((sum, item) => {
      const price = Number(item.product?.price) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + price * qty;
    }, 0);
    const calcDelivery = orderItems.length === 0 ? 0 : 25;
    const calcTotal = customTotal !== undefined ? customTotal : itemsSubtotal + calcDelivery;

    const lines: string[] = [];
    lines.push('Hello Vivaldi Foods! 🍯');
    if (orderId) {
      lines.push(`I have placed order: *#${orderId}*`);
    } else {
      lines.push('I would like to place an order:');
    }
    lines.push('');

    orderItems.forEach((item, index) => {
      const itemTotal = (item.product.price * item.quantity).toFixed(2);
      lines.push(`${index + 1}. *${item.product.name}* (${item.product.size})`);
      lines.push(`   Qty: ${item.quantity} x GH₵ ${item.product.price.toFixed(2)} = *GH₵ ${itemTotal}*`);
    });

    lines.push('');
    lines.push(`*Subtotal:* GH₵ ${itemsSubtotal.toFixed(2)}`);
    lines.push(`*Delivery:* GH₵ ${calcDelivery.toFixed(2)} (Standard Accra delivery)`);
    lines.push(`*Total Amount:* GH₵ ${calcTotal.toFixed(2)}`);

    if (customer?.fullName) {
      lines.push('');
      lines.push('*Customer Details:*');
      lines.push(`• Name: ${customer.fullName}`);
      if (customer.phone) lines.push(`• Phone: ${customer.phone}`);
      if (customer.city) lines.push(`• City/Town: ${customer.city}`);
      if (customer.deliveryAddress) lines.push(`• Address: ${customer.deliveryAddress}`);
      if (customer.paymentMethod) lines.push(`• Payment: ${customer.paymentMethod}`);
      if (customer.notes) lines.push(`• Notes: ${customer.notes}`);
    }

    lines.push('');
    lines.push('Please confirm availability and delivery time for me. Thank you!');

    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${SALES_WHATSAPP_PHONE}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        orderCount,
        totalQuantity,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isFreeShipping,
        amountToFreeShipping,
        deliveryFee,
        total,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
