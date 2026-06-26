/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, GraduationCap, ShieldCheck, HandCoins,
  ClipboardCheck, Leaf, ChevronRight,
} from 'lucide-react';

// Import images
import Hive1 from '@/assets/Com-Impact/Hive-1.png';
import Hive2 from '@/assets/Com-Impact/Hive-2.png';
import Hive3 from '@/assets/Com-Impact/Hive-3.png';
import Hive4 from '@/assets/Com-Impact/Hive-4.png';

export const Route = createFileRoute('/community-impact')({
  component: CommunityImpactPage,
});

const ImageSlider = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg shadow-md bg-slate-100">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

const initiativeGroups = [
  {
    title: "Strategic Event Pillars",
    images: [Hive1, Hive2, Hive3],
    items: [
      { icon: Users, title: 'VOBCU Formation', description: 'Formal introduction of the union to unite local beekeepers.' },
      { icon: GraduationCap, title: 'Technical Training', description: 'Best beekeeping practices and hive health education led by Dr. Ernest.' },
      { icon: ShieldCheck, title: 'Quality & Standards', description: 'Certification guidance in collaboration with the FDA.' },
    ]
  },
  {
    title: "Business & Inclusion",
    images: [Hive2, Hive3, Hive4],
    items: [
      { icon: HandCoins, title: 'Financial Inclusion', description: 'Integrating insurance and mobile money solutions for growth.' },
      { icon: ClipboardCheck, title: 'Registration', description: 'Formal onboarding requiring Ghana Card and photos.' },
      { icon: Leaf, title: 'Commercial Mindset', description: 'Transitioning to professional, commercial-scale honey production.' },
    ]
  }
];

function CommunityImpactPage() {
  return (
    <div className="bg-brand-cream min-h-screen">
      <PageBanner
        title="Community Impact"
        subtitle="Vivaldi Foods Ltd is proud to support the Volta and Oti Beekeepers Cooperative Union (VOBCU)."
      />

      <section className="py-16 md:py-20 container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-brand-brown mb-6 text-3xl md:text-4xl font-bold">Empowering Local Beekeepers</h2>
          <p className="text-brand-brown/70 leading-relaxed">
            Our framework for the upcoming event on Friday, 26th June 2026, aims to provide comprehensive training and financial support for beekeepers in Akatsi Abor and surrounding districts.
          </p>
        </div>

        {initiativeGroups.map((group, idx) => (
          <div key={idx} className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-20 md:mb-24 items-center">
            <div className={idx % 2 !== 0 ? "lg:order-2" : ""}>
              <ImageSlider images={group.images} />
            </div>
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-2xl font-bold text-brand-brown">{group.title}</h3>
              {group.items.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-brown mb-1">{item.title}</h4>
                    <p className="text-sm text-brand-brown/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="py-16 md:py-20 container-custom border-t border-brand-brown/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-brand-brown mb-4">Join Our Mission</h2>
            <p className="text-brand-brown/70">
              We are inviting community leaders, women, and youth groups to participate in this Vivaldi Foods Ltd initiative. Connect with us to learn about sponsorship and partnership opportunities.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-brand-green text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-brand-brown hover:text-white transition-colors shrink-0 rounded-none shadow-sm"
          >
            Contact Us <ChevronRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
