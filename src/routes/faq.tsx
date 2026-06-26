/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import FaqSection from '@/components/Sections/FaqSection';

export const Route = createFileRoute('/faq')({
  component: FAQPage,
});

function FAQPage() {
  return (
    <div className="animate-fade-in bg-brand-cream">
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our honey, our process, and our commitment to food safety."
      />
      <div className="py-12 bg-brand-cream">
        <FaqSection />
      </div>
    </div>
  );
}
