import { Bug, Warehouse, Globe, ShieldCheck } from 'lucide-react';

const coreStrengths = [
  { icon: Bug, title: "100% Real Honey", desc: "Honey fresh from healthy Volta beehives." },
  { icon: ShieldCheck, title: "No Fake Sugar", desc: "Zero added sugar, syrup, or fake water." },
  { icon: Warehouse, title: "Clean Bottling", desc: "Packed in clean, safe rooms under FDA rules." },
  { icon: Globe, title: "Fast Delivery", desc: "Fast supply for homes, shops, and wholesale buyers." },
];

export const Features = () => {
  return (
    /* COMPACT PARADIGM LAYER: Applied standardized clean padding gaps (py-12 md:py-16) */
    <section className="py-12 md:py-16 bg-amber-50/20 relative z-10 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreStrengths.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md transition-all duration-300 hover:-translate-y-1 group flex flex-col items-start"
            >
              {/* Cute and balanced round icon housing matching your main header theme */}
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-4 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <item.icon size={20} />
              </div>

              <h4 className="text-sm md:text-base font-bold text-gray-900 tracking-tight mb-1.5">
                {item.title}
              </h4>

              <p className="text-xs text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
