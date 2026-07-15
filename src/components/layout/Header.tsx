import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useRouter } from '@tanstack/react-router';
import { Menu, X, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/constants';

// RESOLVED VITE STRING PATH: Directly references the public asset file path as a static root string
const vivaldiLogo = "/Vivaldi-logo.webp";

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Factory', href: '/factory' },
      { label: 'Quality & Safety', href: '/quality' },
      { label: 'Community Impact', href: '/community-impact' },
      { label: 'Our Team', href: '/team' },
      { label: 'Our Services', href: '/services' },
      { label: 'FAQs', href: '/faq' },
    ]
  },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'Our Partners', href: '/OurPartners' }, // Synced case parameter naming convention
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  const { subscribe } = useRouter();

  useEffect(() => {
    const handler = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    return subscribe('onBeforeNavigate', () => {
      setMobileOpen(false);
      setExpandedItem(null);
    });
  }, [subscribe]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    setExpandedItem(null);
  }, []);

  const toggleExpanded = (label: string) => {
    setExpandedItem(prev => prev === label ? null : label);
  };

  const cleanPhone = (COMPANY_DETAILS.phone || '233256114661').replace(/\D/g, '');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className={`bg-[#4a372c] text-white/70 text-[10px] font-bold tracking-wider hidden lg:block transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-9 opacity-100 border-b border-white/10'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`mailto:${COMPANY_DETAILS.email}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors uppercase">
              <Mail size={12} className="text-amber-500" /> {COMPANY_DETAILS.email}
            </a>
            <a href={`https://wa.me/${cleanPhone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-400 transition-colors uppercase">
              <Phone size={12} className="text-amber-500" /> {COMPANY_DETAILS.phone}
            </a>
          </div>
          <div className="flex items-center gap-4 uppercase font-bold text-white/80">
            <span>{COMPANY_DETAILS.hours || 'Mon - Sat: 8:00 AM - 5:00 PM'}</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-1.5' : 'bg-white py-3'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Image Brand Logo */}
            <Link to="/" className="block max-w-28 md:max-w-32 group" onClick={closeMenu}>
              <img
                src={vivaldiLogo}
                alt="Vivaldi Foods Ltd"
                className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  <Link
                    to={link.href as '/'}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${location.pathname === link.href ? 'text-green-700' : 'text-gray-700 hover:text-green-700'}`}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={12} className="opacity-60 group-hover:rotate-180 transition-transform duration-200" />}
                  </Link>

                  {link.children && (
                    <div className="absolute top-full left-0 w-48 bg-white shadow-md rounded-b-xl border border-gray-100 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 overflow-hidden">
                      <div className="py-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href as '/'}
                            className="block px-4 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-green-700 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact" className="ml-4 bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-green-800 transition-all shadow-sm active:scale-95">
                Enquiry
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="lg:hidden text-gray-900 p-1.5 hover:bg-gray-50 rounded-xl transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close main menu" : "Open main menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — WhatsApp-style overlay */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white z-50 lg:hidden flex flex-col transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="max-w-24">
            <img
              src={vivaldiLogo}
              alt="Vivaldi Foods Ltd"
              className="w-full h-auto object-contain"
            />
          </div>
          <button
            onClick={closeMenu}
            className="text-gray-500 hover:text-gray-800 transition-colors p-1.5 hover:bg-gray-50 rounded-xl"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav items — WhatsApp-style list */}
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-gray-50 last:border-b-0">
                {link.children ? (
                  <>
                    {/* MOBILE ACTION REFACTOR: Separated the link routing context from accordion expansion logic */}
                    <div className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <Link
                        to={link.href as '/'}
                        onClick={closeMenu}
                        className={`flex-1 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${location.pathname === link.href ? 'text-green-700' : 'text-gray-800'}`}
                      >
                        {link.label}
                      </Link>

                      {/* Chevron Box expansion trigger handles child item reveal paths exclusively */}
                      <button
                        onClick={() => toggleExpanded(link.label)}
                        className="px-6 py-4 border-l border-gray-100 text-gray-400 hover:text-green-700 transition-colors"
                        aria-label={`Toggle ${link.label} sub-navigation`}
                      >
                        <ChevronRight
                          size={16}
                          className={`transition-transform duration-200 ${expandedItem === link.label ? 'rotate-90 text-green-700' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Sub-items */}
                    <div
                      className={`overflow-hidden transition-all duration-200 bg-gray-50/50 ${expandedItem === link.label ? 'max-h-96' : 'max-h-0'}`}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href as '/'}
                          onClick={closeMenu}
                          className="flex items-center gap-3 px-8 py-3.5 text-xs font-semibold text-gray-600 hover:text-green-700 hover:bg-green-50/50 transition-colors border-b border-gray-100/40 last:border-b-0"
                        >
                          <span className="w-1 h-1 rounded-full bg-green-700 shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href as '/'}
                    onClick={closeMenu}
                    className={`flex items-center px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors hover:bg-gray-50 ${location.pathname === link.href ? 'text-green-700' : 'text-gray-800'}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer footer */}
        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 space-y-4">
          <Link
            to="/contact"
            onClick={closeMenu}
            className="block w-full text-center bg-green-700 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-green-800 transition-all shadow-sm active:scale-95"
          >
            Enquiry
          </Link>
          <div className="space-y-1">
            <p className="text-green-700 text-[10px] font-bold uppercase tracking-widest">Contact Us</p>
            <a
              href={`https://wa.me{cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-green-700 transition-colors text-xs font-medium block"
            >
              {COMPANY_DETAILS.phone}
            </a>
            <p className="text-gray-500 text-xs font-medium">{COMPANY_DETAILS.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
