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
    <section className="section-spacing bg-gray-50" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="reveal section-eyebrow justify-center mb-3">How It Works</div>
          <h2 className="reveal reveal-delay-1 section-title max-w-2xl mx-auto">
            From Sourcing To Packaging
          </h2>
          <p className="reveal reveal-delay-2 text-body-sm text-brand-brown/70 max-w-2xl mx-auto mt-4">
            Clear steps help customers and partners understand how we protect product quality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className={`reveal reveal-delay-${index + 1} bg-white border border-brand-brown/10 p-6 min-h-65 flex flex-col`}
            >
              <div className="w-12 h-12 bg-brand-green/10 text-brand-green flex items-center justify-center mb-5">
                <step.icon size={22} />
              </div>
              <span className="text-label-sm text-brand-green mb-2">
                Step {step.num}
              </span>
              <h4 className="text-brand-brown mb-3">
                {step.title}
              </h4>
              <p className="text-body-sm text-brand-brown/70 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
