import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const STORAGE_KEY_WISHLIST = 'vivaldi_customer_wishlist';
const WISHLIST_SYNC_EVENT = 'vivaldi-wishlist-sync';

/**
 * Custom hook for managing the customer WishList selection and localStorage persistence.
 * Synchronizes in real-time across the application via custom events and storage events.
 */
export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    if (typeof window === 'undefined') return [1, 2];
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  // Synchronize across tabs and components
  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_WISHLIST);
        if (saved) {
          setWishlistIds(JSON.parse(saved));
        }
      } catch {
        // fallback
      }
    };

    window.addEventListener(WISHLIST_SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(WISHLIST_SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  /**
   * Toggle a product ID in or out of the customer's WishList
   */
  const toggleWishlist = useCallback((productId: number, silent = false) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      try {
        localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent(WISHLIST_SYNC_EVENT));
      } catch {
        // fallback
      }
      if (!silent) {
        if (exists) {
          toast.info('Item removed from WishList');
        } else {
          toast.success('Item added to WishList');
        }
      }
      return updated;
    });
  }, []);

  /**
   * Check if a product is in the customer's WishList
   */
  const isWishlisted = useCallback(
    (productId: number) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  return {
    wishlistIds,
    toggleWishlist,
    isWishlisted,
  };
}

export default useWishlist;
