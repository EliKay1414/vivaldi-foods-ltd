import { Link } from '@tanstack/react-router';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/constants';

export default function Footer() {
  const cleanPhone = (COMPANY_DETAILS.phone || '233256114661').replace(/\D/g, '');

  return (
    // COMPACT BRANDING FOOTER: Standard background color with balanced vertical paddings
    <footer className="bg-[#4a372c] text-white pt-16 border-t border-white/5">
      {/* HORIZONTAL SYMMETRICS: Max width changed from 7xl to 6xl to match header grid layouts perfectly */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">

          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="block max-w-28 md:max-w-32 group">
              <img
                src="/Vivaldi-logo.webp"
                alt="Vivaldi Foods Logo"
                className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02] invert brightness-0 sepia saturate-200 hue-rotate-15 contrast-125"
              />
            </Link>
            <p className="text-white/70 text-xs leading-relaxed antialiased select-none pt-1">
              Committed to delivering high-quality, safe, and responsibly packaged food products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white antialiased">What We Do</h4>
            <ul className="space-y-3 text-xs text-white/70 antialiased">
              <li><Link to="/" className="hover:text-green-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition-colors">Our Story</Link></li>
              <li><Link to="/products" className="hover:text-green-400 transition-colors">Our Products</Link></li>
              <li><Link to="/community-impact" className="hover:text-green-400 transition-colors">Community Impact</Link></li>
              <li><Link to="/OurPartners" className="hover:text-green-400 transition-colors">Where to Buy</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white antialiased">Products & Services</h4>
            <ul className="space-y-3 text-xs text-white/70 antialiased">
              <li className="hover:text-green-400 transition-colors cursor-default">Premium Honey Products</li>
              <li className="hover:text-green-400 transition-colors cursor-default">Food Processing & Packaging</li>
              <li className="hover:text-green-400 transition-colors cursor-default">Wholesale Distribution</li>
              <li className="hover:text-green-400 transition-colors cursor-default">Retail Distribution</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white antialiased">Contact</h4>
            <ul className="space-y-3 text-xs antialiased">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-green-400 shrink-0 mt-0.5" />
                <span className="text-white/70 leading-normal">
                  {COMPANY_DETAILS.address || 'Office: Spintex, Accra'}
                </span>
              </li>

              {/* WhatsApp Link Route */}
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-green-400 shrink-0" />
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-green-400 transition-colors font-medium"
                >
                  {COMPANY_DETAILS.phone || '+233 256 114 661'}
                </a>
              </li>

              {/* Email Link Route */}
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-green-400 shrink-0" />
                <a
                  href={`mailto:${(COMPANY_DETAILS.email || 'socials@vivaldifoodsltd.com').trim().toLowerCase()}`}
                  className="text-white/70 hover:text-green-400 transition-colors font-medium"
                >
                  {COMPANY_DETAILS.email || 'socials@vivaldifoodsltd.com'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 antialiased">
          <p className="text-white/50 text-[11px] font-medium">
            © {new Date().getFullYear()} Vivaldi Foods Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[11px] font-bold uppercase tracking-wider text-white/50">
             <Link to="/" className="hover:text-green-400 transition-colors">Home</Link>
            <Link to="/contact" className="hover:text-green-400 transition-colors">Contact</Link>
            <Link to="/faq" className="hover:text-green-400 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
