/* eslint-disable react-refresh/only-export-components */
import { createFileRoute } from '@tanstack/react-router';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { PageBanner } from '@/components/ui/PageBanner';
import Seo from '@/components/ui/Seo';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  const contactMethods = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Call Anytime",
      detail: "+233 302 940 063",
      subDetail: "Mon - Sat: 8am - 5pm",
      color: "bg-green-700",
      href: "tel:+233302940063"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "WhatsApp Hub",
      detail: "+233 256 114 661",
      subDetail: "24/7 Direct Assistance",
      color: "bg-green-700",
      href: "https://wa.me"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Headquarters",
      detail: "Community 18 / Sakumono",
      subDetail: "Accra, Ghana (GQ-361-8042)",
      color: "bg-[#4a372c]",
      href: "#map"
    }
  ];

  return (
    <div className="bg-amber-50/30 min-h-screen">
      {/* TYPE-SAFE CLIENT INJECTION: Updates the document metadata safely within the browser loop */}
      <Seo
        title="Contact Us & Inquiries | Vivaldi Foods Ltd"
        description="Get in touch with Vivaldi Foods Ltd. Contact our Spintex headquarters for wholesale inquiries, bulk product distribution, and retail sales."
      />

      <PageBanner title="Contact Us" subtitle="Contact Vivaldi Foods" />

      <section className="relative py-16 z-10 max-w-6xl mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((item, idx) => (
              <a
                href={item.href}
                target={item.href.startsWith('http') || item.href.startsWith('tel') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                key={idx}
                className="bg-white p-6 flex flex-col items-center text-center rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${item.color} text-white flex items-center justify-center rounded-full mb-4`}>
                  {item.icon}
                </div>

                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  {item.title}
                </h4>

                <p className="text-sm md:text-base font-bold text-gray-800 mb-1">
                  {item.detail}
                </p>

                <p className="text-xs text-gray-500">
                  {item.subDetail}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RESTORED ACCURATE GOOGLE MAPS HUB: Fully updated with the Farm Vivian Map embed link */}
      <section id="map" className="relative h-100 w-full bg-gray-100 overflow-hidden">
        <iframe
          title="Vivaldi Corporate Hub - Farm Vivian"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5548489084226!2d-0.06714612688910238!3d5.632526432879313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf86bb299227db%3A0xfeb483778540ee6e!2sFarm%20Vivian!5e0!3m2!1sen!2sgh!4v1786032398160!5m2!1sen!2sgh"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'contrast(1.1) saturate(1.1)' }}
          className="transition-all duration-1000"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </section>
    </div>
  );
}
