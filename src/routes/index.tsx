import { createFileRoute } from '@tanstack/react-router';
import HeroSection from '@/components/Sections/HeroSection';
import ProductsSection from '@/components/Sections/ProductsSection';
import StatsSection from '@/components/Sections/StatsSection';
import ImpactTracker from '@/components/Sections/ImpactTracker';
import BlogSection from '@/components/Sections/BlogSection';

// SEO COMPONENT IMPORT: Fixes compilation type errors natively
import Seo from '@/components/ui/Seo';

export const Route = createFileRoute('/')({
  component: () => (
    <div className="animate-fade-in">
      {/* TYPE-SAFE CLIENT INJECTION: Hydrates homepage document meta configurations safely inside the browser window lifecycle */}
      <Seo
        title=" Vivaldi Foods Ltd "
        description="Shop 100% pure, raw, and responsibly food products from Vivaldi Foods Ltd. Sourced, processed and distributed directly from our factory for retailers, wholesalers, and households consumers across Ghana."
      />

      <HeroSection />
      <ProductsSection />
      <StatsSection />
      <ImpactTracker />
      <BlogSection />
    </div>
  ),
});
