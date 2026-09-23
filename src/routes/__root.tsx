import { createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ScrollToTop } from '@/hooks/useScrollToTop';
import { CartProvider } from '@/context/CartContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { AuthProvider } from '@/context/AuthContext';
import CartDrawer from '@/components/cart/CartDrawer';
import OrderModal from '@/components/cart/OrderModal';
import QuickViewModal from '@/components/storefront/QuickViewModal';

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
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen selection:bg-amber-100 selection:text-amber-900">
              <ScrollToTop />
              <Header />
              <main className="grow">
                <Outlet />
              </main>
              <Footer />

              {/* E-Commerce Global Drawers, Modals & Middle Top-Center Toastify */}
              <CartDrawer />
              <OrderModal />
              <QuickViewModal />
              <ToastContainer
                position="top-center"
                autoClose={3200}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                className="top-24! sm:top-28! z-99999!"
                toastClassName="rounded-2xl shadow-2xl border border-gray-100 bg-white/98 text-slate-body font-body"
              />

              {import.meta.env.MODE === 'development' && null}
            </div>
          </CartProvider>
        </AuthProvider>
      </NotificationProvider>
    </QueryClientProvider>
  ),
});
