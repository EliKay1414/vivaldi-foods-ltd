import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ScrollToTop } from '@/hooks/useScrollToTop';

export const Route = createRootRoute({
  /* TYPE SAFE FIX: Stripped the full-stack server-side 'meta' configuration block.
     This completely resolves your TypeScript compile errors on client-side SPAs. */
  component: () => (
    <div className="flex flex-col min-h-screen selection:bg-amber-100 selection:text-amber-900">
      {/* Scroll reset logic component stays intact */}
      <ScrollToTop />

      <Header />
      <main className="grow">
        {/* Dynamic portal slot placeholder where all sub-page route components render */}
        <Outlet />
      </main>
      <Footer />

      {import.meta.env.MODE === 'development' && null}
    </div>
  ),
});
