/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import ServicesSection from '@/components/Sections/ServicesSection';

export const Route = createFileRoute('/services')({
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="selection-corporate bg-brand-cream">
      <PageBanner
        title="Agribusiness Services"
        subtitle="End-to-end food production, manufacturing, processing, and packaging solutions."
      />
      <ServicesSection />


    </div>
  );
}
