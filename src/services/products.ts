import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productCatalog, type CatalogProduct } from '@/config/commerce';

export interface CartItem {
  product: CatalogProduct;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  region: string;
  city: string;
  deliveryAddress: string;
  paymentMethod: 'MoMo' | 'Telecel Cash' | 'Cash on Delivery';
  notes?: string;
}

export interface OrderPayload {
  orderId: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered';
}

export interface OrderResult {
  success: boolean;
  orderId: string;
  message: string;
  order: OrderPayload;
}

/**
 * Fetch all products from catalog or backend API endpoint
 */
export async function getProducts(): Promise<CatalogProduct[]> {
  // Simulates network latency while keeping immediate reactivity
  // When backend endpoint is ready, simply replace with:
  // const res = await fetch('/api/products'); return res.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productCatalog);
    }, 150);
  });
}

/**
 * Fetch a single product by ID or SKU
 */
export async function getProductById(id: number): Promise<CatalogProduct | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

/**
 * Submit an order (stores in localStorage and is ready for real backend POST)
 */
export async function submitOrder(orderData: OrderPayload): Promise<OrderResult> {
  // When backend endpoint is ready, replace with:
  // const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify(orderData) }); return res.json();
  return new Promise((resolve) => {
    setTimeout(() => {
      try {
        const existing = localStorage.getItem('vivaldi_orders');
        const parsed = existing ? JSON.parse(existing) : [];
        const orders: OrderPayload[] = Array.isArray(parsed) ? parsed : [];
        orders.unshift(orderData);
        localStorage.setItem('vivaldi_orders', JSON.stringify(orders));
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('vivaldi-orders-updated'));
        }
      } catch (err) {
        console.error('Failed to save order to localStorage', err);
      }

      resolve({
        success: true,
        orderId: orderData.orderId,
        message: 'Your order was received successfully! Our team will call or WhatsApp you to confirm delivery.',
        order: orderData,
      });
    }, 600);
  });
}

// ---------------------------------------------------------------------------
// TanStack React Query Hooks
// ---------------------------------------------------------------------------

export const QUERY_KEYS = {
  products: ['products'] as const,
  product: (id: number) => ['product', id] as const,
  orders: ['orders'] as const,
};

export function useProductsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProductQuery(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.product(id),
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
  });
}

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (order: OrderPayload) => submitOrder(order),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.orders });
    },
  });
}
