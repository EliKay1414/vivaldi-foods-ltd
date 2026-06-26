import { Link } from '@tanstack/react-router';

import { Phone, Mail, MapPin } from 'lucide-react';

import { COMPANY_DETAILS } from '@/lib/constants';

import vivaldiLogo from '@/assets/images/Vivaldi-logo.jpg';



export default function Footer() {
  return (
    <footer className="bg-[#3a2a22] text-white pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">

          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="block max-w-32 md:max-w-36 group">
              <img
                src={vivaldiLogo}
                alt="Vivaldi Foods Logo"
                className="w-full h-auto object-contain transition-transform group-hover:scale-[1.01]"
              />
            </Link>
            <p className="text-white text-body-sm leading-relaxed pt-2">
              Committed to delivering high-quality, safe, and responsibly packaged food products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-8">What We Do</h4>
            <ul className="space-y-4 text-body-sm text-white">
              <li><Link to="/about" className="hover:text-amber-500 transition-colors">Our Story</Link></li>
              <li><Link to="/products" className="hover:text-amber-500 transition-colors">Our Products</Link></li>
              <li><Link to="/community-impact" className="hover:text-amber-500 transition-colors">Community Impact</Link></li>
              <li><Link to="/OurPartners" className="hover:text-amber-500 transition-colors">Where to Buy</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Inquiries & Support</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white mb-8">Products & Services</h4>
            <ul className="space-y-4 text-body-sm text-white">
              <li className="hover:text-amber-500 transition-colors cursor-default">Premium Honey Products</li>
              <li className="hover:text-amber-500 transition-colors cursor-default">Food Processing & Packaging</li>
              <li className="hover:text-amber-500 transition-colors cursor-default">Wholesale Distribution</li>
              <li className="hover:text-amber-500 transition-colors cursor-default">Retail Distribution</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white mb-8">Contact</h4>
            <ul className="space-y-4 text-body-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 shrink-0" />
                <span className="text-white">
                  {COMPANY_DETAILS.address||'Community 18 / Sakumono 361 (GQ-361-8042), Accra, Ghana'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-amber-500 shrink-0" />
                <a href="https://wa.me/233256114661" target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-500 transition-colors">
                  {COMPANY_DETAILS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-500 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email||'vivaldifoods@gmail.com'}`} className="text-white hover:text-amber-500 transition-colors">
                  {COMPANY_DETAILS.email || 'vivaldifoods@gmail.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-label-sm">
            © {new Date().getFullYear()} Vivaldi Foods Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-label-sm text-white">
            <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <Link to="/faq" className="hover:text-amber-500 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
