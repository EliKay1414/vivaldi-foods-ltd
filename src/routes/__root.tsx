import { createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ScrollToTop } from '@/hooks/useScrollToTop';
import { CartProvider } from '@/context/CartContext';
import { NotificationProvider } from '@/context/NotificationContext';
import CartDrawer from '@/components/cart/CartDrawer';
import OrderModal from '@/components/cart/OrderModal';
import QuickViewModal from '@/components/storefront/QuickViewModal';
import OrderNotification from '@/components/notification/OrderNotification';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen selection:bg-amber-100 selection:text-amber-900">
            <ScrollToTop />
            <Header />
            <main className="grow">
              <Outlet />
            </main>
            <Footer />

            {/* E-Commerce Global Drawers & Modals */}
            <CartDrawer />
            <OrderModal />
            <QuickViewModal />
            <OrderNotification />

            {import.meta.env.MODE === 'development' && null}
          </div>
        </CartProvider>
      </NotificationProvider>
    </QueryClientProvider>
  ),
});
