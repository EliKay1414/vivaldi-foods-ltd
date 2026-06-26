/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { ShieldCheck, Sparkles, ClipboardCheck, Microscope } from 'lucide-react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/quality')({
  component: QualityPage,
});

const qualityGuidelines = [
  {
    icon: <ShieldCheck className="text-brand-green shrink-0" size={24} />,
    title: "Zero Food Adulteration",
    desc: "We check every batch to make sure no sugar, syrup, or fake ingredient is added."
  },
  {
    icon: <ClipboardCheck className="text-brand-green shrink-0" size={24} />,
    title: "Hygiene Control Consistency",
    desc: "Our team follows clean handling steps during processing, packing, and storage."
  },
  {
    icon: <Sparkles className="text-brand-green shrink-0" size={24} />,
    title: "Sourcing With Integrity",
    desc: "We source from our trusted apiaries so customers enjoy the best products."
  }
];

function QualityPage() {
  return (
    <div className="bg-brand-cream animate-fade-in min-h-screen">
      <PageBanner
        title="Quality & Safety"
        subtitle="Simple quality checks that help customers buy with confidence."
      />

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/60 p-2 border border-brand-brown/10 shadow-lg"
            >
              <img
                src="/lab-test.png"
                alt="QA Personnel Lab Testing"
                className="w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-3 bg-brand-green/10 w-fit rounded-xs mb-6">
                <Microscope className="text-brand-green" size={32} />
              </div>
              <h2 className="text-3xl font-display font-bold text-brand-brown mb-6">Quality Checks Before Supply</h2>
              <p className="text-brand-brown/80 text-sm leading-relaxed mb-6">
                Before products are supplied, our team checks handling, packaging, and product quality. This helps customers receive clean, pure honey they can trust.
              </p>
              <p className="text-body text-brand-brown/80 leading-relaxed">
                We also keep basic batch records so enquiries, supply requests, and partner conversations can be handled quickly.
              </p>
            </motion.div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-brand-brown mb-4">What We Check</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {qualityGuidelines.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="border border-brand-brown/10 p-8 bg-white/50 backdrop-blur-xs rounded-sm flex flex-col gap-4 shadow-xs"
              >
                <div className="p-3 bg-brand-cream inline-block w-fit rounded-xs">
                  {item.icon}
                </div>
                <h4 className="text-brand-brown uppercase tracking-wider">{item.title}</h4>
                <p className="text-body-sm text-brand-brown/80 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
