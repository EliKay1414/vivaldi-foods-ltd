import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { Check, ShieldCheck, Leaf, Truck, Users, ArrowRight } from 'lucide-react'
import productionHub from '@/assets/images/production-hub.webp';

const tabs = [
  {
    key: 'about',
    label: 'About Us',
    heading: 'Carefully Sourced, Responsibly Packaged',
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
    heading: '100% Pure Honey Sourced with Excellence',
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
    heading: 'Elevating Local Products Globally',
    text: 'To become a leading large-scale food processing company that elevates local Ghanaian food products to international markets, strengthens the national economy, and improves the quality of life of local communities through trusted and globally competitive food solutions.',
    points: [
      'Expand global market reach',
      'Support local communities',
      'Promote Ghanaian food culture',
      'Deliver consistency and trust',
    ],
  },
]

export default function MissionSection() {
  const [active, setActive] = useState('about')
  const current = tabs.find((t) => t.key === active)!

  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Interactive Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-eyebrow text-accent-600 mb-3">Mission & Vision</div>

            {/* High-End Tabs */}
            <div className="flex gap-1 mb-8 border-b border-slate-100 relative">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`relative px-6 py-4 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                    active === t.key ? 'text-accent-600' : 'text-slate-400 hover:text-slate-800'
                  }`}
                >
                  {t.label}
                  {active === t.key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content with AnimatePresence */}
            <div className="min-h-75">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-brand-brown mb-4">{current.heading}</h3>
                  <p className="text-body text-slate-600 leading-relaxed mb-8">{current.text}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {current.points.map((pt, i) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={pt}
                        className="flex items-center gap-3 p-3 bg-forest-50/50 rounded-none border-l-2 border-accent-500"
                      >
                        <Check size={16} className="text-accent-600 shrink-0" />
                        <span className="text-body-sm font-semibold text-forest-900">{pt}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10">
              <Link to="/about" className="btn-primary group">
                Discover More <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visuals & Social Proof */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-none overflow-hidden shadow-2xl relative">
              <img
                src={productionHub}
                alt="Honey processing and packing hub"
                className="w-full h-137.5 object-cover hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-forest-950/10 mix-blend-multiply" />
            </div>

            {/* Floating Trust Card */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-8 -left-8 -right-8 md:left-12 md:right-auto md:w-87.5 bg-white p-8 shadow-2xl border-t-4 border-accent-500"
            >
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-display font-bold text-4xl text-accent-600">100%</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pure Sourced</div>
                </div>
                <div className="h-12 w-px bg-slate-100" />
                <p className="text-sm text-slate-600 italic">"Delivering carefully processed authentic food products that meet highest hygiene standards."</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-32 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <ShieldCheck size={28} />, title: 'Premium Foods', desc: 'Sourcing only natural products with no artificial additives.' },
            { icon: <Leaf size={28} />, title: 'Sourced Locally', desc: 'Sourced directly from local producers.' },
            { icon: <Truck size={28} />, title: 'Wholesale Supply', desc: 'Supplying grocery stores, supermarkets, wholesale distributors, and family homes.' },
            { icon: <Users size={28} />, title: 'Safe & Certified', desc: 'Regular quality testing to meet top food safety standards and regulations.' },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group p-8 bg-white border border-slate-100 hover:border-accent-500 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-forest-50 flex items-center justify-center text-accent-600 mb-6 group-hover:bg-accent-600 group-hover:text-white transition-colors duration-500">
                {card.icon}
              </div>
              <h4 className="font-display font-bold text-lg text-forest-900 mb-3 uppercase tracking-tight">{card.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
