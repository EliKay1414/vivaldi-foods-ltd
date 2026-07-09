/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion } from 'framer-motion';
import { Flame, Compass, Filter, Sparkles, CheckCircle2 } from 'lucide-react';

// Process Images
import FromHive from '@/assets/factory/From-hive.png';
import PreHeating from '@/assets/factory/Pre-heating.png';
import Filtration from '@/assets/factory/Filtration.png';
import Packaging from '@/assets/factory/Packaging1.png';

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
      <PageBanner
        title="Inside our Factory"
        subtitle="Inside our clean, modern facility located in Community 18 / Sakumono, Greater Accra Region."
      />

      {/* Core Timeline Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 relative overflow-hidden">
        {/* Honeycomb decorative background vectors */}
        <div className="absolute top-48 left-10 w-48 h-48 bg-green-700/5 rounded-full blur-3xl" />
        <div className="absolute bottom-48 right-10 w-64 h-64 bg-green-700/5 rounded-full blur-3xl" />

        {/* REFACTORED HEADER: Centered perfectly to anchor the page symmetry */}
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

        {/* Dynamic Vertical Timeline Container */}
        <div className="relative">

          {/* Central Progress Line of Honey - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200/80 -translate-x-1/2 hidden md:block" />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-green-700 via-amber-500 to-amber-600 -translate-x-1/2 hidden md:block origin-top"
          />

          {/* Left Progress Line of Honey - Mobile */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200/80 md:hidden" />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-4 top-0 w-1 bg-gradient-to-b from-green-700 to-amber-500 md:hidden origin-top"
          />

          {/* Steps Loop */}
          <div className="space-y-20 md:space-y-28">
            {processSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">

                  {/* Timeline Glowing Node - Desktop */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white bg-gray-50 z-20 hidden md:flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <motion.div
                      initial={{ scale: 0.5, backgroundColor: "#4a372c" }}
                      whileInView={{ scale: 1, backgroundColor: "#15803d" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="w-3 h-3 rounded-full"
                    />
                  </div>

                  {/* Timeline Glowing Node - Mobile */}
                  <div className="absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white bg-white z-20 flex items-center justify-center shadow-sm md:hidden">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-700" />
                  </div>

                  {/* Content Block Container (Alternates layout alignment based on index status) */}
                  <div className={`pl-10 md:pl-0 md:col-span-5 ${isEven ? 'md:text-right order-2 md:order-1 md:items-end flex flex-col' : 'md:col-start-8 order-2 flex flex-col'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-3.5"
                    >
                      {/* Step Indicator Phase Label */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Phase 0{idx + 1}
                      </span>

                      {/* Header Title */}
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-green-700 transition-colors duration-200">
                        {step.title}
                      </h3>

                      {/* Paragraph description body */}
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.desc}
                      </p>

                      {/* Technical Detail Badge Pill */}
                      <div className={`flex items-center gap-2 pt-1 text-xs font-semibold text-amber-700 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className={`p-2 bg-amber-50 rounded-xl ${step.microAnim} text-amber-600 shrink-0`}>
                          {step.icon}
                        </div>
                        <span className="leading-tight">{step.detail}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Image Block Container Media Housing */}
                  <div className={`pl-10 md:pl-0 md:col-span-5 ${isEven ? 'md:col-start-8 order-1 md:order-2' : 'md:col-start-1 order-1'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6 }}
                      className="relative overflow-hidden border border-gray-100 p-2 bg-white shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl"
                    >
                      <div className="aspect-video md:aspect-[4/3] w-full overflow-hidden bg-gray-50 relative rounded-xl">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gray-900/5 group-hover:opacity-0 transition-opacity duration-500" />
                      </div>
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
