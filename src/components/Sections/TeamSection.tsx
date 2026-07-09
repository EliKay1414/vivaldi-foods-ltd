import { Globe, Share2, Mail } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const team = [
  {
    name: 'Harrison Kafui Enene',
    role: 'Chief Executive Officer (CEO)',
    desc: 'Provides overall leadership and direction, guiding the company’s growth and long-term vision.',
    image: "/ceo-enene.png",
  },
  {
    name: 'Apostle Dr. Peter Yaw Kudiewu',
    role: 'General Manager',
    desc: 'Manages daily operations to ensure smooth processes, quality products, and efficient service.',
    image: "/g-manager.png",
  },
  {
    name: 'Bless Kofi Enene',
    role: 'Customer Relationship Manager',
    desc: 'Manages client inquiries, wholesale order fulfillment, and customer satisfaction initiatives.',
    image: "/Bless.png",
  },
  {
    name: 'Edith Dede Akornor',
    role: 'Quality Assurance Manager',
    desc: 'Oversees laboratory testing and strict compliance with overall safety standards.',
    image: "/Edith.png",
  },
  {
    name: 'Enoch Kofi Frimpong',
    role: 'Accountant',
    desc: 'Manages financial records, payments, and reporting to ensure accuracy and proper financial control.',
    image: "/Kofi.png",
  },
  {
    name: 'Philip Teye Tetteh',
    role: 'Production Supervisor',
    desc: 'Oversees production activities to ensure safe, efficient operations and consistent product quality.',
    image: "/philip.png",
  },
  {
    name: 'Emmanuel Elikplim Atinyuie',
    role: 'Junior Software Engineer and IT Support',
    desc: 'Leads the development of Vivaldi softwares and provides continual technical support.',
    image: "/Eli.png",
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
              className={`reveal reveal-delay-${(i % 2) + 1} group bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 overflow-hidden`}
            >
              {/* FIXED IMAGE HOUSING: Removed the padding and switched to aspect-4/5 so the portrait matches the card edges */}
              <div className="relative overflow-hidden aspect-[4/5] bg-gray-50 border-b border-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://dicebear.com{encodeURIComponent(member.name)}&backgroundColor=15803d,4a372c&textColor=ffffff`;
                  }}
                  // CSS FIX: Setting object-cover ensures the image fills left-to-right and top-to-bottom flawlessly
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Social hover panel */}
                <div className="absolute inset-0 bg-green-800/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                  {[Globe, Share2, Mail].map((Icon, si) => (
                    <a
                      key={si}
                      href="#"
                      className="w-8 h-8 bg-white/20 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-green-800 transition-all shadow-sm"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Information area */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
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
