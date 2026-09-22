import React from 'react';
import { ShieldCheck, Truck, Sparkles, Smartphone } from 'lucide-react';

const pillars = [
  {
    icon: Sparkles,
    title: '100% Pure Honey',
    desc: 'No added sugar, syrup, or fake water. Just real honey straight from the hive.',
  },
  {
    icon: ShieldCheck,
    title: 'Tested & Safe to Eat',
    desc: 'Bottled in a clean factory and approved by FDA Ghana for your family.',
  },
  {
    icon: Truck,
    title: 'Fast Doorstep Delivery',
    desc: 'Quick delivery to your home or shop in Accra, and across all towns in Ghana.',
  },
  {
    icon: Smartphone,
    title: 'Pay with Mobile Money',
    desc: 'Easy payment with MTN MoMo, Telecel Cash, or cash when your bottle arrives.',
  },
];

export const TrustBar: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/30 border border-amber-100/40"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                  <Icon size={19} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
