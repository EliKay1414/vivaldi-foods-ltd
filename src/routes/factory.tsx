/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion } from 'framer-motion';
import { Flame, Compass, Filter, Sparkles, CheckCircle2 } from 'lucide-react';
import Seo from '@/components/ui/Seo';

// Process Images
import FromHive from '@/assets/factory/From-hive.webp';
import PreHeating from '@/assets/factory/Pre-heating.webp';
import Filtration from '@/assets/factory/Filtration.webp';
import Packaging from '@/assets/factory/Packaging1.webp';

export const Route = createFileRoute('/factory')({
  component: FactoryPage,
});

const processSteps = [
  {
    image: FromHive,
    title: "Straight from the Hives",
    desc: "Raw, pure honeycombs are carefully harvested by our cooperative beekeeping networks across our apiaries and transported under hygienic conditions directly to our processing factory.",
    icon: <Compass className="w-4 h-4" />,
    detail: "Harvested directly from our apiaries",
    microAnim: "hover:rotate-12 transition-transform duration-500"
  },
  {
    image: PreHeating,
    title: "Optimal Pre-heating",
    desc: "We gently warm the raw honey to exactly 45°C. This specific temperature lowers the viscosity for filtration while strictly preserving the active organic enzymes, vitamins, and natural nutritional elements of raw honey.",
    icon: <Flame className="w-4 h-4" />,
    detail: "Maintained at optimal temperature to preserve nutrients",
    microAnim: "group-hover:animate-pulse"
  },
  {
    image: Filtration,
    title: "Refined Filtration",
    desc: "The liquified honey is routed through a series of micro-mesh pressure filters. This process cleanly removes organic beeswax residues, stray hive fragments, and pollen clusters, leaving a flawless, crystal-clear golden texture.",
    icon: <Filter className="w-4 h-4" />,
    detail: "Zero additives, zero chemical filters",
    microAnim: "group-hover:scale-110 transition-transform duration-500"
  },
  {
    image: Packaging,
    title: "Sanitary Automatic Packaging",
    desc: "Our premium gold liquid is directed to sterile bottling lines where it is airtight-sealed in our signature respective packagings, locked in for ultimate freshness and transport safety.",
    icon: <Sparkles className="w-4 h-4" />,
    detail: "Airtight vacuum-sealed, FDA certified",
    microAnim: "group-hover:translate-y-[-4px] transition-transform duration-500"
  }
];

function FactoryPage() {
  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      <Seo
        title="Our Factory, Processing & FDA Standards | Vivaldi Foods Ltd"
        description="Step inside the Vivaldi Foods Ltd honey processing factory. Discover how our modern, sterile facility in Sakumono / Community 18 adheres to strict FDA hygiene, filtration, and nutrients preservation protocols."
      />

      <PageBanner
        title="Inside our Factory"
        subtitle="Inside our clean, modern facility located in Community 18 / Sakumono, Greater Accra Region."
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
        <div className="absolute top-48 left-10 w-48 h-48 bg-green-700/5 rounded-full blur-3xl" />
        <div className="absolute bottom-48 right-10 w-64 h-64 bg-green-700/5 rounded-full blur-3xl" />

        <div className="max-w-3xl mx-auto text-center mb-20 md:mb-32 space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full inline-block">
            Sourcing & Production Integrity
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 tracking-tight leading-tight">
            Pure from Start to Finish
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto pt-1">
            We stop fake ingredients by working directly with local farmers right from the start. We gently handle raw bee products, keeping heating to an absolute minimum.
          </p>
        </div>

        <div className="relative">
          {/* Central Progress Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200/80 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200/80 md:hidden" />

          <div className="space-y-20 md:space-y-28">
            {processSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">

                  {/* Timeline Nodes */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white bg-green-700 z-20 hidden md:block shadow-sm" />
                  <div className="absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white bg-green-700 z-20 md:hidden shadow-sm" />

                  {/* CONTENT COLUMN */}
                  <div className={`pl-10 md:pl-0 md:col-span-5 ${isEven ? 'md:text-right order-2 md:order-1' : 'md:col-start-8 order-2'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-xl">
                        <CheckCircle2 className="w-3 h-3" /> Phase 0{idx + 1}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-green-700 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* IMAGE COLUMN */}
                  <div className={`md:col-span-5 ${isEven ? 'md:col-start-8 order-1 md:order-2' : 'order-1'}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      /*
                         ASPECT RATIO REFACTOR:
                         - Locked to aspect-[16/10] for a clean, horizontally biased crop.
                         - Object-cover prevents vertical overflow.
                      */
                      className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white p-1.5"
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-xl image-rendering-crisp transition-transform duration-700 group-hover:scale-105"
                      />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
