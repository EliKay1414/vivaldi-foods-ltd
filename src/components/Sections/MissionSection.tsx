import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Leaf, Truck, Users } from 'lucide-react';

// Secure local asset filesystem paths preserved
import productionHub from '@/assets/images/production-hub.png';
import productionHubWebp from '@/assets/images/production-hub.webp';

// PRODUCTION REFACTOR: Unified dataset mapping array with your three corporate parameters
const tabs = [
  {
    key: 'about',
    label: 'About Us',
    title: 'About Vivaldi Foods',
    text: 'Vivaldi Foods Ltd. is a growing food processing company dedicated to delivering 100% pure, natural, and safe food products. We focus on keeping our products free from added sugars or fake ingredients to guarantee complete customer satisfaction.',
    points: [
      'Natural ingredients only',
      'No artificial additives',
      'Ethical sourcing standards',
      'Committed to customer trust',
    ],
  },
  {
    key: 'mission',
    label: 'Our Mission',
    title: 'Our Core Mission',
    text: 'Our mission is to provide high-quality, safe, and hygienically processed food products to consumers while actively combating food fraud and adulteration through strict quality control and responsible food processing practices.',
    points: [
      'Strict food safety protocols',
      'Adulteration prevention',
      'Transparent sourcing process',
      'Quality-focused production',
    ],
  },
  {
    key: 'vision',
    label: 'Our Vision',
    title: 'Our Vision & Future',
    text: 'To become a leading large-scale food processing company that elevates local Ghanaian food products to international markets, strengthens the national economy, and improves the quality of life of local communities through trusted and globally competitive food solutions.',
    points: [
      'Expand global market reach',
      'Support local communities',
      'Promote Ghanaian food culture',
      'Deliver consistency and trust',
    ],
  },
];

export default function MissionSection() {
  const [active, setActive] = useState('about');
  const current = tabs.find((t) => t.key === active)!;

  return (
    // COMPACT SPACING: Standardized layout section wrappers for smooth padding transitions (py-12 md:py-16)
    <section className="py-12 md:py-16 bg-white overflow-hidden text-gray-800 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Interactive Tab Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
              Mission & Vision
            </div>

            {/* High-End Symmetrical Tabs Navigation */}
            <div className="flex flex-wrap border-b border-gray-100 relative">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`relative px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                    active === t.key ? 'text-green-700' : 'text-gray-400 hover:text-gray-700'
                  }`}
                >
                  {t.label}
                  {active === t.key && (
                    <motion.div
                      layoutId="activeMissionTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-700"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content Box wrapper */}
            <div className="min-h-72.5 sm:min-h-60">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-3"
                >
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">
                    {current.title}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                    {current.text}
                  </p>

                  {/* Symmetrical Internal Points Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {current.points.map((pt, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={pt}
                        className="flex items-center gap-2.5 p-3 bg-gray-50/50 rounded-xl border border-gray-100 shadow-xs"
                      >
                        <div className="shrink-0 bg-green-50 p-1 rounded-lg text-green-700">
                          <Check size={12} />
                        </div>
                        <span className="text-xs font-bold text-gray-800 tracking-tight">
                          {pt}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Trigger Button */}
            <div className="pt-2">
            <Link
            // ROUTING FIX: Enforces TanStack Router type routing to make the link fully clickable
            to="/products"
            search={{}} /* Clears stale query parameters explicitly */
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm group cursor-pointer"
            >
              Discover More
             <ArrowRight className="transition-transform group-hover:translate-x-0.5" size={13} />
             </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual Component Assets & Trust Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:pt-4"
          >
            {/* Image Box configured with modern Picture performance markers */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white p-1.5 relative">
              <picture className="w-full h-full">
                <source srcSet={productionHubWebp} type="image/webp" />
                <img
                  src={productionHub}
                  alt="Honey processing and packing hub"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-80 md:h-100 object-cover rounded-xl transition-transform duration-700 hover:scale-[1.02]"
                />
              </picture>
            </div>

            {/* Floating Symmetrical Trust Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 left-4 right-4 md:left-10 md:right-auto md:w-80 bg-white p-5 shadow-md border border-gray-100 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="text-center shrink-0">
                  <div className="font-display font-bold text-3xl text-green-700">100%</div>
                  <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest pt-0.5">Pure Sourced</div>
                </div>
                <div className="h-10 w-px bg-gray-100 shrink-0" />
                <p className="text-xs text-gray-500 font-medium italic leading-relaxed">
                  "Delivering carefully processed authentic food products that meet highest hygiene standards."
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Cards Flex Wrap Grid Loop */}
        <div className="mt-20 flex flex-wrap gap-6 justify-center items-stretch">
          {[
            { icon: <ShieldCheck size={20} />, title: 'Premium Foods', desc: 'Sourcing only natural products with no artificial additives.' },
            { icon: <Leaf size={20} />, title: 'Sourced Locally', desc: 'Sourced directly from local honey producers.' },
            { icon: <Truck size={20} />, title: 'Wholesale Supply', desc: 'Supplying grocery stores, supermarkets, wholesale distributors, and family homes.' },
            { icon: <Users size={20} />, title: 'Safe & Certified', desc: 'Regular quality testing to meet top food safety standards and regulations.' },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="group p-6 bg-white border border-gray-100 rounded-2xl flex flex-col justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div>
                <div className="w-11 h-11 bg-green-50 text-green-700 rounded-xl flex items-center justify-center mb-5 group-hover:bg-green-700 group-hover:text-white transition-colors duration-300">
                  {card.icon}
                </div>
                <h4 className="text-xs md:text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                  {card.title}
                </h4>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed pt-1">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
