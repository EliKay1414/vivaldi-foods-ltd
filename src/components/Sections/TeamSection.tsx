import { useScrollReveal } from '@/hooks/useScrollReveal';

const team = [
  {
    name: 'Harrison Kafui Enene',
    role: 'Chief Executive Officer (CEO)',
    desc: 'Provides overall leadership and direction, guiding the company’s growth and long-term vision.',
  },
  {
    name: 'Apostle Dr. Peter Yaw Kudiewu',
    role: 'General Manager',
    desc: 'Manages daily operations to ensure smooth processes, quality products, and efficient service.',
  },
  {
    name: 'Bless Kofi Enene',
    role: 'Customer Relationship Manager',
    desc: 'Manages client inquiries, wholesale order fulfillment, and customer satisfaction initiatives.',
  },
  {
    name: 'Edith Dede Akornor',
    role: 'Quality Assurance Manager',
    desc: 'Oversees laboratory testing and strict compliance with overall safety standards.',
  },
  {
    name: 'Enoch Kofi Frimpong',
    role: 'Accountant',
    desc: 'Manages financial records, payments, and reporting to ensure accuracy and proper financial control.',
  },
  {
    name: 'Philip Teye Tetteh',
    role: 'Production Supervisor',
    desc: 'Oversees production activities to ensure safe, efficient operations and consistent product quality.',
  },
];

export default function TeamSection() {
  const ref = useScrollReveal();

  return (
    <section className="py-10 md:py-14 bg-transparent" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Title Block */}
        <div className="text-center mb-10 space-y-1">
          <div className="reveal text-[10px] font-bold uppercase tracking-[0.2em] text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full inline-block">
            Our Leadership
          </div>
          <h2 className="reveal reveal-delay-1 text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight pt-1">
            The Able Team
          </h2>
        </div>

        {/* Dynamic Card Layout */}
        <div className="flex flex-wrap gap-6 justify-center items-stretch">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`reveal reveal-delay-${(i % 2) + 1} group bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden p-6 relative`}
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-green-700" />

              {/* Information area */}
              <div className="flex-1 flex flex-col justify-between space-y-2 pt-2">
                <div>
                  <h4 className="text-base font-bold text-gray-900 tracking-tight leading-tight">
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-bold text-green-700 uppercase tracking-wider pt-0.5">
                    {member.role}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed pt-2">
                    {member.desc}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
