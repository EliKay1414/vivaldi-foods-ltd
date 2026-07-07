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
      icon: <Phone className="w-8 h-8" />,
      title: "Call Anytime",
      detail: "+233 302 940 063",
      subDetail: "Mon - Sat: 8am - 5pm",
      color: "bg-brand-green",
      href: "tel:+233302940063"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp Hub",
      detail: "+233 256 114 661",
      subDetail: "24/7 Direct Assistance",
      color: "bg-brand-green",
      href: "https://wa.me/233256114661"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Headquarters",
      detail: "Community 18 / Sakumono",
      subDetail: "Accra, Ghana (GQ-361-8042)",
      color: "bg-brand-brown",
      href: "#map"
    }
  ];

  return (
    <div className="bg-brand-cream selection-corporate">
      <PageBanner title="Contact Us" subtitle="Home / Contact Vivaldi Foods" />

      {/* Contact Methods Section */}
      <section className="relative -mt-16 z-10 pb-32">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((item, idx) => (
              <a
                href={item.href}
                target={item.href.startsWith('http') || item.href.startsWith('tel') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                key={idx}
                className="bg-white p-10 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-20 h-20 ${item.color} text-white flex items-center justify-center rounded-full mb-6`}>
                  {item.icon}
                </div>
                <h4 className="text-label-sm text-brand-brown/40 mb-3">{item.title}</h4>
                <p className="text-body-lg font-bold text-brand-brown block mb-1">{item.detail}</p>
                <p className="text-body-sm text-brand-brown/60">{item.subDetail}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="relative h-125 w-full bg-brand-brown/5 overflow-hidden">
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
