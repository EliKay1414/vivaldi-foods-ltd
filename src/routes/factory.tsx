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
    desc: "Raw, pure honeycombs are carefully harvested by our cooperative beekeeping networks across our apiaries and transported under hygyienic conditions directly to our processing factory.",
    icon: <Compass className="w-6 h-6" />,
    detail: "Harvested directly from our apiaries",
    microAnim: "hover:rotate-12 transition-transform duration-500"
  },
  {
    image: PreHeating,
    title: "Optimal Pre-heating",
    desc: "We gently warm the raw honey to exactly 45°C. This specific temperature lowers the viscosity for filtration while strictly preserving the active organic enzymes, vitamins, and natural nutritional elements of raw honey.",
    icon: <Flame className="w-6 h-6" />,
    detail: "Maintained at optimal tempreature to preserve nutrients",
    microAnim: "group-hover:animate-pulse"
  },
  {
    image: Filtration,
    title: "Refined Filtration",
    desc: "The liquified honey is routed through a series of micro-mesh pressure filters. This process cleanly removes organic beeswax residues, stray hive fragments, and pollen clusters, leaving a flawless, crystal-clear golden texture.",
    icon: <Filter className="w-6 h-6" />,
    detail: "Zero additives, zero chemical filters",
    microAnim: "group-hover:scale-110 transition-transform duration-500"
  },
  {
    image: Packaging,
    title: "Sanitary Automatic Packaging",
    desc: "Our premium gold liquid is directed to sterile bottling lines where it is airtight-sealed in our signature in their  respective packagings, locked in for ultimate freshness and transport safety.",
    icon: <Sparkles className="w-6 h-6" />,
    detail: "Airtight vacuum-sealed, FDA certified",
    microAnim: "group-hover:translate-y-[-4px] transition-transform duration-500"
  }
];

function FactoryPage() {
  return (
    <div className="bg-brand-cream min-h-screen selection-corporate">
      <PageBanner
        title="Inside our Factory"
        subtitle="Inside our clean, modern facility located in Community 18 / Sakumono, Greater Accra Region."
      />

      <section className="py-16 md:py-20 max-w-7xl mx-auto px-6 relative">
        {/* Honeycomb decorative vectors */}
        <div className="absolute top-48 left-10 w-48 h-48 bg-brand-green/5 rounded-full blur-3xl" />
        <div className="absolute bottom-48 right-10 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl" />

        {/* Intro Header Section */}
        <div className="max-w-3xl mb-24 text-left">
          <span className="text-label block mb-3">Sourcing & Production Integrity</span>
          <h2 className="text-brand-brown mt-2 mb-6 tracking-tight leading-tight">
            Pure from Start to Finish
          </h2>
          <p className="text-body text-slate-body/90 leading-relaxed font-medium">
            To combat food adulteration vulnerabilities in raw supply chains, Vivaldi Foods Ltd. establishes localized control starting directly at the source. Our Sakumono processing facility handles natural bee inputs with minimal thermal loops, systematically preserving nutritional integrity at every single step.
          </p>
        </div>

        {/* Dynamic Vertical Timeline */}
        <div className="relative">

          {/* Central Progress Line of Honey - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-brand-brown/10 -translate-x-1/2 hidden md:block" />

          {/* Central Progress Line of Honey (Active Golden Scroll-triggered Tracing) - Desktop */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute left-1/2 top-0 w-1 bg-linear-to-b from-brand-green via-amber-500 to-amber-600 -translate-x-1/2 hidden md:block origin-top"
          />

          {/* Left Progress Line of Honey - Mobile */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-brand-brown/10 md:hidden" />
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-4 top-0 w-1 bg-linear-to-b from-brand-green to-amber-500 md:hidden origin-top"
          />

          {/* Steps Loop */}
          <div className="space-y-20 md:space-y-32">
            {processSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center group">

                  {/* Timeline Glowing Node - Desktop */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-brand-cream bg-white z-20 flex items-center justify-center shadow-md group-hover:scale-115 transition-transform duration-300 md:flex">
                    <motion.div
                      initial={{ scale: 0.5, backgroundColor: "#2B1E17" }}
                      whileInView={{ scale: 1, backgroundColor: "#5B9F43" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="w-4 h-4 rounded-full"
                    />
                  </div>

                  {/* Timeline Glowing Node - Mobile */}
                  <div className="absolute left-4 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-brand-cream bg-white z-20 flex items-center justify-center shadow-md md:hidden">
                    <div className="w-3 h-3 rounded-full bg-brand-green" />
                  </div>

                  {/* Content Container (Alternates left/right based on index) */}
                  <div className={`pl-10 md:pl-0 md:col-span-5 ${isEven ? 'md:text-right order-2 md:order-1' : 'md:col-start-8 order-2'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                      className="space-y-4"
                    >
                      {/* Step Indicator */}
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-green/10 text-label-sm rounded-none">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Phase 0{idx + 1}
                      </span>

                      <h3 className="text-brand-brown tracking-tight group-hover:text-brand-green transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-body text-slate-body/80 leading-relaxed">
                        {step.desc}
                      </p>

                      {/* Technical Detail Pill */}
                      <div className={`flex items-center gap-2.5 text-body-sm text-brand-brown/60 uppercase tracking-wider ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <div className={`p-1.5 bg-brand-brown/5 rounded-full ${step.microAnim}`}>
                          {step.icon}
                        </div>
                        <span>{step.detail}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Image Block Container */}
                  <div className={`pl-10 md:pl-0 md:col-span-5 ${isEven ? 'md:col-start-8 order-1 md:order-2' : 'md:col-start-1 order-1'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, delay: 0.1 }}
                      className="relative overflow-hidden border border-brand-brown/10 p-2 bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 rounded-sm"
                    >
                      <div className="aspect-video md:aspect-4/3 w-full overflow-hidden bg-brand-cream/50 relative">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-brand-brown/5 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Sanitary Certification Banner */}
      <section className="py-16 md:py-20 bg-brand-cream text-brand-brown text-center relative overflow-hidden border-t border-brand-brown/10">
        <div className="absolute inset-0 bg-[radial-gradient(#5B9F43_1px,transparent_1px)] bg-size-[16px_16px] opacity-5" />
        <div className="container-custom relative z-10 max-w-4xl">
          <span className="text-brand-green font-bold text-xs uppercase tracking-[0.3em] block mb-4">Laboratory Standards</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
            FDA Certified Facility & Full Traceability
          </h2>
          <p className="text-brand-brown/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8">
            Every batch of Volta Premium Honey undergoes multi-parameter laboratory chemical tests to verify zero sucrose/syrup adulteration, zero pesticide traces, and strict moisture levels before leaving our facility.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="border border-brand-brown/10 px-6 py-3 bg-white text-xs font-bold uppercase tracking-widest shadow-sm">
              FDA Ghana Approved
            </span>
            <span className="border border-brand-brown/10 px-6 py-3 bg-white text-xs font-bold uppercase tracking-widest shadow-sm">
              GSA Quality Certified
            </span>
            <span className="border border-brand-brown/10 px-6 py-3 bg-white text-xs font-bold uppercase tracking-widest shadow-sm">
              100% Volta Harvested
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
