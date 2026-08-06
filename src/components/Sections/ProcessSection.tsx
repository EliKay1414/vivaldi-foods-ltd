import { ClipboardCheck, PackageCheck, SearchCheck, Sprout } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const steps = [
  {
    num: '01',
    title: 'Volta Sourcing Integrity',
    desc: 'We work with trusted Volta supply areas so customers know where the honey comes from.',
    icon: Sprout,
  },
  {
    num: '02',
    title: 'Hygiene Control Consistency',
    desc: 'Honey is handled in clean spaces with simple steps that protect product quality.',
    icon: ClipboardCheck,
  },
  {
    num: '03',
    title: 'Zero Food Adulteration',
    desc: 'We check for added sugar, syrup, or fake ingredients before products are supplied.',
    icon: SearchCheck,
  },
  {
    num: '04',
    title: 'Safe Packaging',
    desc: 'Products are sealed and prepared for homes, shops, distributors, and partners.',
    icon: PackageCheck,
  },
];

export default function ProcessSection() {
  const ref = useScrollReveal();

  return (
    /* COMPACT PARADIGM CONTAINER: Synchronized vertical spacing margins across sections (py-12 md:py-16) */
    <section className="py-12 md:py-16 bg-white border-t border-gray-100 relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* CENTERED HEADER BAR */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-2 flex flex-col items-center">
          <span className="reveal text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
            How It Works
          </span>
          <h2 className="reveal reveal-delay-1 text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight pt-1">
            From Sourcing To Packaging
          </h2>
          <p className="reveal reveal-delay-2 text-gray-500 text-xs md:text-sm leading-relaxed max-w-xl mx-auto pt-1">
            Clear steps help customers and partners understand how we protect product quality.
          </p>
        </div>

        {/* SYMMETRIC FLUID FLOW DECK GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className={`reveal reveal-delay-${index + 1} bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col items-start`}
            >
              {/* Symmetrical round housing for icons */}
              <div className="w-11 h-11 bg-green-50 text-green-700 flex items-center justify-center rounded-xl mb-4 shrink-0">
                <step.icon size={18} />
              </div>

              <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1.5 block">
                Step {step.num}
              </span>

              <h4 className="text-sm md:text-base font-bold text-gray-900 tracking-tight mb-2">
                {step.title}
              </h4>

              <p className="text-xs text-gray-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
