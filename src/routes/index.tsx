import { createFileRoute } from '@tanstack/react-router';
import HeroSection from '@/components/Sections/HeroSection';
import ProductsSection from '@/components/Sections/ProductsSection';
import StatsSection from '@/components/Sections/StatsSection';
import ImpactTracker from '@/components/Sections/ImpactTracker';
import BlogSection from '@/components/Sections/BlogSection';

export const Route = createFileRoute('/')({
  component: () => (
    <div className="animate-fade-in">
      <HeroSection />
      <ProductsSection />
      <StatsSection />
      <ImpactTracker />
      <BlogSection />
    </div>
  ),
});
