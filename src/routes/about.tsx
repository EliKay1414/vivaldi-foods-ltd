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

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  // Enhanced scroll handler
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

    // Run on mount
    handleHashScroll();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-brand-cream"
    >
      <div id="story" className="scroll-mt-20">
        <PageBanner
          title="About Vivaldi Foods"
          subtitle="Committed to delivering high-quality, safe, and responsibly packaged food products."
        />
      </div>

      <AboutSection />

      <div id="vision" className="bg-brand-cream border-t border-brand-brown/5 scroll-mt-20">
        <MissionSection />
      </div>

      <TeamSection />
      <ImpactTracker />
      <StatsSection />
    </motion.div>
  );
}
