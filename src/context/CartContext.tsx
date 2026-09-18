import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { CatalogProduct } from '@/config/commerce';
import type { CartItem, CustomerDetails } from '@/services/products';

interface CartContextType {
  items: CartItem[];
  addItem: (product: CatalogProduct, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // Totals & Delivery Logic
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  isFreeShipping: boolean;
  amountToFreeShipping: number;

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
  generateWhatsAppOrderUrl: (customer?: Partial<CustomerDetails>, orderId?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'vivaldi_cart';
const FREE_SHIPPING_THRESHOLD = 350.0;
const SALES_WHATSAPP_PHONE = '233256114661';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
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

  const addItem = (product: CatalogProduct, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [items]);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openQuickView = (product: CatalogProduct) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const generateWhatsAppOrderUrl = (customer?: Partial<CustomerDetails>, orderId?: string) => {
    const lines: string[] = [];
    lines.push('Hello Vivaldi Foods! 🍯');
    if (orderId) {
      lines.push(`I have placed order: *#${orderId}*`);
    } else {
      lines.push('I would like to place an order:');
    }
    lines.push('');

    items.forEach((item, index) => {
      const itemTotal = (item.product.price * item.quantity).toFixed(2);
      lines.push(`${index + 1}. *${item.product.name}* (${item.product.size})`);
      lines.push(`   Qty: ${item.quantity} x GH₵ ${item.product.price.toFixed(2)} = *GH₵ ${itemTotal}*`);
    });

    lines.push('');
    lines.push(`*Subtotal:* GH₵ ${subtotal.toFixed(2)}`);
    lines.push(
      isFreeShipping
        ? '*Delivery:* FREE (Order above GH₵ 350 in Accra)'
        : '*Delivery:* Standard delivery fee applies'
    );
    lines.push(`*Total Amount:* GH₵ ${subtotal.toFixed(2)}`);

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
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isFreeShipping,
        amountToFreeShipping,
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
