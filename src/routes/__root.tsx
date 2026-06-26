import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ScrollToTop } from '@/hooks/useScrollToTop';
export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen selection:bg-amber-100 selection:text-amber-900">
      {/* This component handles the scroll reset logic */}
      <ScrollToTop />

      <Header />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />

      {import.meta.env.MODE === 'development' && null}
    </div>
  ),
});
