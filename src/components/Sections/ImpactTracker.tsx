import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Award, Heart, ShieldCheck, Users } from 'lucide-react';

const metrics = [
  {
    id: 'beekeepers',
    value: '30+',
    label: 'Beekeepers Trained',
    desc: 'Training in safer honey handling and harvesting.',
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: 'hives',
    value: '1,000+',
    label: 'Managed Hives',
    desc: 'Hive planning that supports cleaner supply.',
    icon: <Award className="w-5 h-5" />,
  },
  {
    id: 'farmers',
    value: '30+',
    label: 'Partners Supported',
    desc: 'Local partners connected to clearer supply channels.',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: 'partners',
    value: '4+',
    label: 'Focus Areas',
    desc: 'Supply, quality, training, and environment support.',
    icon: <ArrowUpRight className="w-5 h-5" />,
  },
];

const tabContents = {
  empowerment: {
    title: 'Community Supply Partnerships',
    subtitle: 'Helping local beekeepers connect to reliable buyers.',
    description:
      'Vivaldi Foods works with farmers and beekeepers in Volta communities. Our goal is a simple, fair, and reliable honey supply chain that supports customers and local producers.',
    bullets: [
      'Clear market access for rural honey producers.',
      'Better planning for seasonal honey supply.',
      'Stronger communication between producers and buyers.',
    ],
  },
  environment: {
    title: 'Protecting The Volta Environment',
    subtitle: 'Encouraging safer beekeeping methods.',
    description:
      'We support safer honey handling methods that reduce harm to bees and nearby vegetation. This helps protect the natural areas that make Volta honey special.',
    bullets: [
      'Lower fire risk from safer harvesting methods.',
      'Better protection for bees and local plants.',
      'Responsible apiary planning near communities.',
    ],
  },
  skills: {
    title: 'Skills And Agribusiness Training',
    subtitle: 'Practical training for safer honey production.',
    description:
      'We support training that helps young people and farmers learn better honey handling, basic records, hive care, and clean collection practices.',
    bullets: [
      'Practical training in hive care and clean collection.',
      'Simple record keeping for better supply planning.',
      'Encouraging more women and youth to join beekeeping.',
    ],
  },
};

export default function ImpactTracker() {
  const [activeTab, setActiveTab] = useState<keyof typeof tabContents>('empowerment');
  const currentTab = tabContents[activeTab];

  return (
    // COMPACT SPACING: Standardized padding wrappers for a smooth, cohesive aesthetic
    <section className="py-12 md:py-16 bg-white border-t border-gray-100 relative overflow-hidden text-gray-800">
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-700/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6">

        {/* CENTERED HEADER REFACTOR: Aligned perfectly to lock down top-level visual symmetry */}
        <div className="max-w-3xl mx-auto text-center mb-10 space-y-2 flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
            Community Impact
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight pt-1">
            Supporting Communities And Nature
          </h2>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
            Our impact work is focused on practical training, safer sourcing, and stronger local partnerships.
          </p>
        </div>

        {/* SYMMETRICAL METRIC DECK: Fluid flex-wrap container instead of static height boxes */}
        <div className="flex flex-wrap gap-5 justify-center items-stretch mb-10">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-gray-50/50 border border-gray-100 p-5 rounded-2xl flex flex-col justify-between w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] max-w-sm transition-all duration-300 hover:shadow-sm"
            >
              <div>
                <div className="w-10 h-10 bg-green-50 text-green-700 rounded-xl flex items-center justify-center mb-4">
                  {metric.icon}
                </div>
                <div className="font-display font-bold text-2xl md:text-3xl text-gray-900 mb-1">
                  {metric.value}
                </div>
                <h5 className="text-xs md:text-sm font-bold text-gray-800 mb-1.5 tracking-tight leading-tight">
                  {metric.label}
                </h5>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed pt-1">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>

        {/* INTERACTIVE TAB BOX REFACTOR: Wrapped inside a sleek card boundary container */}
        <div className="bg-white border border-gray-100 p-5 md:p-6 rounded-2xl shadow-xs">
          <div className="flex flex-wrap border-b border-gray-100 mb-6 pb-0.5">
            {(['empowerment', 'environment', 'skills'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors relative ${
                  activeTab === tab ? 'text-green-700' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tab === 'empowerment' && 'Supply Partners'}
                {tab === 'environment' && 'Environment'}
                {tab === 'skills' && 'Training'}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-700"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-2">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block">
                  {currentTab.subtitle}
                </span>
                <h3 className="text-lg md:text-xl font-display font-bold text-gray-900 tracking-tight">
                  {currentTab.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed pt-1">
                  {currentTab.description}
                </p>
              </div>

              <ul className="lg:col-span-5 space-y-2.5 bg-gray-50/50 p-4 rounded-xl border border-gray-50">
                {currentTab.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-600 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
