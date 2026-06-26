import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Award, Heart, ShieldCheck, Users } from 'lucide-react';

const metrics = [
  {
    id: 'beekeepers',
    value: '30+',
    label: 'Beekeepers Trained',
    desc: 'Training in safer honey handling and harvesting.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: 'hives',
    value: '1000+',
    label: 'Managed Hives',
    desc: 'Hive planning that supports cleaner supply.',
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: 'farmers',
    value: '30+',
    label: 'Farmers and Beekeepers Supported',
    desc: 'Local partners connected to clearer supply channels.',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: 'partners',
    value: '4+',
    label: 'Focus Areas',
    desc: 'Supply, quality, training, and environment support.',
    icon: <ArrowUpRight className="w-6 h-6" />,
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
    <section className="section-spacing bg-white border-t border-brand-brown/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl" />

      <div className="container-custom">
        <div className="sec-title centered mb-12">
          <span className="sub-title">Community Impact</span>
          <h2 className="text-brand-brown tracking-tight text-balance">
            Supporting Communities And Nature
          </h2>
          <p className="text-body-sm text-brand-brown/70 max-w-2xl mx-auto mt-4">
            Our impact work is focused on practical training, safer sourcing, and stronger local partnerships.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-brand-cream/50 border border-brand-brown/10 p-6 min-h-52.5 flex flex-col"
            >
              <div className="w-11 h-11 bg-brand-green/10 text-brand-green flex items-center justify-center mb-5">
                {metric.icon}
              </div>
              <div className="font-display font-bold text-3xl text-brand-brown mb-2">{metric.value}</div>
              <h5 className="text-brand-brown mb-2">{metric.label}</h5>
              <p className="text-caption text-brand-brown/65 leading-relaxed">{metric.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-cream border border-brand-brown/10 p-6 md:p-8">
          <div className="flex flex-wrap border-b border-brand-brown/10 mb-8 pb-1">
            {(['empowerment', 'environment', 'skills'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-label-sm transition-colors relative ${
                  activeTab === tab ? 'text-brand-green' : 'text-brand-brown/50 hover:text-brand-brown'
                }`}
              >
                {tab === 'empowerment' && 'Supply Partners'}
                {tab === 'environment' && 'Environment'}
                {tab === 'skills' && 'Training'}
                {activeTab === tab && (
                  <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-7">
                <span className="text-xs font-bold text-brand-green uppercase tracking-widest block mb-2">
                  {currentTab.subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-brown mb-4">
                  {currentTab.title}
                </h3>
                <p className="text-brand-brown/75 text-sm md:text-base leading-relaxed">
                  {currentTab.description}
                </p>
              </div>

              <ul className="lg:col-span-5 space-y-3">
                {currentTab.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-sm text-brand-brown/75">
                    <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
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
