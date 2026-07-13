/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, GraduationCap, ShieldCheck, HandCoins,
  ClipboardCheck, Leaf, ChevronRight,
} from 'lucide-react';

// Legacy standard PNG fallback references
import Hive1 from '@/assets/Com-Impact/Hive-1.png';
import Hive2 from '@/assets/Com-Impact/Hive-2.png';
import Hive3 from '@/assets/Com-Impact/Hive-3.png';
import Hive4 from '@/assets/Com-Impact/Hive-4.png';

// PERFORMANCE OPTIMIZATION: High-speed WebP image formats mapping
import Hive1Webp from '@/assets/Com-Impact/Hive-1.webp';
import Hive2Webp from '@/assets/Com-Impact/Hive-2.webp';
import Hive3Webp from '@/assets/Com-Impact/Hive-3.webp';
import Hive4Webp from '@/assets/Com-Impact/Hive-4.webp';

export const Route = createFileRoute('/community-impact')({
  component: CommunityImpactPage,
});

interface SliderImage {
  png: string;
  webp: string;
}

const ImageSlider = ({ images }: { images: SliderImage[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % images.length), 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="relative w-full h-60 md:h-72 overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-gray-50 p-1.5">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full"
        >
          {/* NATIVE WEB RUNTIME FIX: Prioritizes lightweight WebP files, dropping download weights to raw minimums */}
          <picture className="w-full h-full">
            <source srcSet={images[index].webp} type="image/webp" />
            <img
              src={images[index].png}
              alt="VOBCU Cooperative Community Event"
              loading={index === 0 ? "eager" : "lazy"} // Prioritizes the very first slide view to slash contentful paint latency
              decoding="async" // Frees main user interaction threads instantly
              fetchPriority={index === 0 ? "high" : "low"}
              className="w-full h-full object-cover rounded-xl select-none"
            />
          </picture>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const initiativeGroups = [
  {
    title: "Strategic Event Pillars",
    images: [
      { png: Hive1, webp: Hive1Webp },
      { png: Hive2, webp: Hive2Webp },
      { png: Hive3, webp: Hive3Webp }
    ],
    items: [
      { icon: Users, title: 'VOBCU Formation', description: 'Formal introduction of the union to unite local beekeepers.' },
      { icon: GraduationCap, title: 'Technical Training', description: 'Best beekeeping practices and hive health education led by Dr. Ernest.' },
      { icon: ShieldCheck, title: 'Quality & Standards', description: 'Certification guidance in collaboration with the FDA.' },
    ]
  },
  {
    title: "Business & Inclusion",
    images: [
      { png: Hive2, webp: Hive2Webp },
      { png: Hive3, webp: Hive3Webp },
      { png: Hive4, webp: Hive4Webp }
    ],
    items: [
      { icon: HandCoins, title: 'Financial Inclusion', description: 'Integrating insurance and mobile money solutions for growth.' },
      { icon: ClipboardCheck, title: 'Registration', description: 'Formal onboarding requiring Ghana Card and photos.' },
      { icon: Leaf, title: 'Commercial Mindset', description: 'Transitioning to professional, commercial-scale honey production.' },
    ]
  }
];

function CommunityImpactPage() {
  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      <PageBanner
        title="Community Impact"
        subtitle="Vivaldi Foods Ltd is proud to support the Volta and Oti Beekeepers Cooperative Union (VOBCU)."
      />

      <section className="py-12 md:py-16 max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-2 flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
            Empowerment
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight pt-1">
            Empowering Local Beekeepers
          </h2>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-xl mx-auto pt-1">
            Our framework for the upcoming event on Friday, 26th June 2026, aims to provide comprehensive training and financial support for beekeepers in Akatsi Abor and surrounding districts.
          </p>
        </div>

        <div className="space-y-16 md:space-y-20">
          {initiativeGroups.map((group, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              <div className={idx % 2 !== 0 ? "lg:order-2" : "lg:order-1"}>
                <ImageSlider images={group.images} />
              </div>

              <div className={`space-y-5 lg:space-y-6 ${idx % 2 !== 0 ? "lg:order-1" : "lg:order-2"}`}>
                <h3 className="text-lg md:text-xl font-display font-bold text-gray-900 tracking-tight">
                  {group.title}
                </h3>

                <div className="space-y-4">
                  {group.items.map((item, i) => (
                    <div key={i} className="flex gap-4 bg-white p-4 rounded-xl border border-gray-50 shadow-xs">
                      <div className="w-9 h-9 bg-green-50 text-green-700 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs md:text-sm font-bold text-gray-900 mb-0.5">{item.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 max-w-6xl mx-auto px-6 border-t border-gray-100">
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
          <div className="max-w-xl space-y-1.5">
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 tracking-tight">
              Join Our Mission
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              We are inviting community leaders, women, and youth groups to participate in this Vivaldi Foods Ltd initiative. Connect with us to learn about sponsorship and partnership opportunities.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-1 bg-green-700 text-white px-5 py-2.5 font-bold text-xs rounded-xl hover:bg-green-800 transition-colors shrink-0 shadow-sm w-full md:w-auto"
          >
            Contact Us <ChevronRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
