import { Globe, Share2, Mail } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

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
    role: ' Junior Software Engineer and IT Support',
    desc: 'Leads the development of Vivaldi softwares and provides continual technical support.',
    image: "/Eli.png",
  },
]


export default function TeamSection() {
  const ref = useScrollReveal()

  return (
    <section className="py-16 md:py-20 bg-amber-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="reveal section-eyebrow justify-center mb-3">Our Leadership</div>
          <h2 className="reveal reveal-delay-1 section-title">The Able Team</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {team.map((member, i) => (
            <div
              key={member.name}
              className={`reveal reveal-delay-${(i % 2) + 1} card-lift group bg-white rounded-sm overflow-hidden shadow-sm flex flex-col justify-between max-w-88 w-full mx-auto`}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-4/5 bg-brand-cream border border-brand-green/20 rounded-t-sm">
                <img
                  src={member.image}
                  alt={member.name}
                  onError={(e) => {
                    // Fallback to a generic avatar placeholder if the local image is not uploaded yet
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=5b9f43,2b1e17&textColor=ffffff`;
                  }}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Social overlay */}
                <div className="absolute inset-0 bg-brand-green/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[Globe, Share2, Mail].map((Icon, si) => (
                    <a key={si} href="#" className="w-9 h-9 bg-white/20 hover:bg-white rounded-full flex items-center justify-center text-white hover:text-brand-brown transition-all">
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 border-t-2 border-brand-green grow flex flex-col justify-between">
                <div>
                  <h4 className="text-brand-brown leading-tight">{member.name}</h4>
                  <p className="text-label-sm text-brand-green mt-1 mb-3">{member.role}</p>
                  <p className="text-body-sm text-gray-600 leading-relaxed">{member.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
