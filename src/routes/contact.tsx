/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { PageBanner } from '@/components/ui/PageBanner';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  const contactMethods = [
    {
      icon: <Phone className="w-5 h-5" />, // Sized down icon vector
      title: "Call Anytime",
      detail: "+233 302 940 063",
      subDetail: "Mon - Sat: 8am - 5pm",
      color: "bg-green-700", // Standard color protection
      href: "tel:+233302940063"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />, // Sized down icon vector
      title: "WhatsApp Hub",
      detail: "+233 256 114 661",
      subDetail: "24/7 Direct Assistance",
      color: "bg-green-700",
      href: "https://wa.me/233256114661"
    },
    {
      icon: <MapPin className="w-5 h-5" />, // Sized down icon vector
      title: "Headquarters",
      detail: "Community 18 / Sakumono",
      subDetail: "Accra, Ghana (GQ-361-8042)",
      color: "bg-[#4a372c]", // Matches your new footer brown
      href: "#map"
    }
  ];

  return (
    <div className="bg-amber-50/30 min-h-screen">
      <PageBanner title="Contact Us" subtitle="Home / Contact Vivaldi Foods" />

      {/* Contact Methods Section - Removed negative margin to prevent text clipping */}
      <section className="relative py-16 z-10 max-w-6xl mx-auto px-6">
        {/* max-w-5xl keeps the 3-column deck tight and centered on wide viewports */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((item, idx) => (
              <a
                href={item.href}
                target={item.href.startsWith('http') || item.href.startsWith('tel') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                key={idx}
                // Compact p-6 padding makes the cards smaller, sleeker, and symmetrical
                className="bg-white p-6 flex flex-col items-center text-center rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Cute and balanced round icon housing */}
                <div className={`w-12 h-12 ${item.color} text-white flex items-center justify-center rounded-full mb-4`}>
                  {item.icon}
                </div>

                {/* Label text */}
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  {item.title}
                </h4>

                {/* Primary numbers/addresses */}
                <p className="text-sm md:text-base font-bold text-gray-800 mb-1">
                  {item.detail}
                </p>

                {/* Micro operational metrics info */}
                <p className="text-xs text-gray-500">
                  {item.subDetail}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="relative h-100 w-full bg-gray-100 overflow-hidden">
        <iframe
          title="Vivaldi Corporate Hub"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9324545281486!2d-0.03816762512686737!3d5.663118933454796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10207f0000000001%3A0x0!2zNcKwMzknNDcuMiJOIDDCsDAnMTMuMiJX!5e0!3m2!1sen!2sgh!4v1715856488319!5m2!1sen!2sgh"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
          className="hover:filter-none transition-all duration-1000"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
}
