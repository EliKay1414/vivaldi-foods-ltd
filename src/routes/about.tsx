/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { PageBanner } from '@/components/ui/PageBanner';
import AboutSection from '@/components/Sections/AboutSection';
import MissionSection from '@/components/Sections/MissionSection';
import TeamSection from '@/components/Sections/TeamSection';
import StatsSection from '@/components/Sections/StatsSection';
import ImpactTracker from '@/components/Sections/ImpactTracker';

// SEO COMPONENT IMPORT: Resolves compilation errors while managing unique meta headers natively
import Seo from '@/components/ui/Seo';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.replace('#', '');
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    handleHashScroll();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-amber-50/20 min-h-screen"
    >
      {/* TYPE-SAFE CLIENT INJECTION: Dynamically sets unique meta parameters upon component initialization */}
      <Seo
        title="Our Story & Core Values | Vivaldi Foods Ltd"
        description="Discover the story behind Vivaldi Foods Ltd. Learn about our strict quality standards, sustainable beekeeping partnerships, and premium Volta Honey processing factory in Adaklu, Ghana."
      />

      <div id="story" className="scroll-mt-24">
        <PageBanner
          title="About Vivaldi Foods"
          subtitle="Committed to delivering high-quality, safe, and responsibly packaged food products."
        />
      </div>

      <AboutSection />

      <div id="vision" className="bg-transparent border-t border-gray-100 scroll-mt-24">
        <MissionSection />
      </div>

      <TeamSection />
      <ImpactTracker />
      <StatsSection />
    </motion.div>
  );
}
