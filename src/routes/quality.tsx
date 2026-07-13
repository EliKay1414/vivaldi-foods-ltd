/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { ShieldCheck, Sparkles, ClipboardCheck, Microscope } from 'lucide-react';
import { motion } from 'framer-motion';

// PRODUCTION REFACTOR: Importing the asset locally so Vite handles paths and build optimization correctly
import labTestImg from '@/assets/images/Lab-Test.webp';

export const Route = createFileRoute('/quality')({
  component: QualityPage,
});

const qualityGuidelines = [
  {
    icon: <ShieldCheck className="text-green-700 shrink-0" size={18} />,
    title: "Zero Food Adulteration",
    desc: "We check every batch to make sure no sugar, syrup, or fake ingredient is added."
  },
  {
    icon: <ClipboardCheck className="text-green-700 shrink-0" size={18} />,
    title: "Hygiene Control Consistency",
    desc: "Our team follows clean handling steps during processing, packing, and storage."
  },
  {
    icon: <Sparkles className="text-green-700 shrink-0" size={18} />,
    title: "Sourcing With Integrity",
    desc: "We source from our trusted apiaries so customers enjoy the best products."
  }
];

function QualityPage() {
  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      <PageBanner
        title="Quality & Safety"
        subtitle="Simple quality checks that help customers buy with confidence."
      />

      {/* COMPACT SECTION: Standardized vertical paddings matching the clean layout framework */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">

          {/* TOP LAYOUT SPLIT: Perfectly uniform block distribution */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">

            {/* IMAGE REFACTOR: Using the imported module block asset directly inside the view */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-5 overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white p-1.5"
            >
              <img
                src={labTestImg}
                alt="QA Personnel Lab Testing"
                loading="eager"
                decoding="async"
                className="w-full h-auto max-h-72 object-cover rounded-xl image-rendering-crisp"
              />
            </motion.div>

            {/* CONTENT REFACTOR: Shifted up and gap compressed using a tighter space-y-3 stack */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 space-y-3"
            >
              <div className="p-2.5 bg-green-50 text-green-700 w-fit rounded-xl">
                <Microscope size={20} />
              </div>
              <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 tracking-tight leading-tight pt-1">
                Quality Checks Before Supply
              </h2>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                Before products are supplied, our team checks handling, packaging, and product quality. This helps customers receive clean, pure honey they can trust.
              </p>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                We also keep basic batch records so enquiries, supply requests, and partner conversations can be handled quickly.
              </p>
            </motion.div>
          </div>

          {/* LOWER HEADER CONTROL: Symmetrical margin separation */}
          <div className="max-w-2xl mx-auto text-center mb-10 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full">
              Standards
            </span>
            <h3 className="text-xl font-display font-bold text-gray-900 tracking-tight pt-1">
              What We Check
            </h3>
          </div>

          {/* Guidelines Grid Directory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qualityGuidelines.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="border border-gray-100 p-5 bg-white rounded-2xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-2 bg-gray-50 inline-block w-fit rounded-xl">
                  {item.icon}
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 pt-0.5">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
