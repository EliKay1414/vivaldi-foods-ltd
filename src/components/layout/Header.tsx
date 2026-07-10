import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useRouter } from '@tanstack/react-router';
import { Menu, X, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/constants';
import vivaldiLogo from '/public/Vivaldi-logo.webp';


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
  { label: 'Our Partners', href: '/ourPartners' },
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className={`bg-forest-950 text-white/70 text-[8px] font-medium tracking-wider hidden lg:block transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-8 opacity-100 border-b border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href={`mailto:${COMPANY_DETAILS.email}`} className="flex items-center gap-2 hover:text-amber-400 transition-colors uppercase">
              <Mail size={11} className="text-amber-500" /> {COMPANY_DETAILS.email}
            </a>
            <a href="https://wa.me/233256114661" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-400 transition-colors uppercase">
              <Phone size={11} className="text-amber-500" /> {COMPANY_DETAILS.phone}
            </a>
          </div>
          <div className="flex items-center gap-4 uppercase">
            <span>{COMPANY_DETAILS.hours || 'Mon - Fri: 8:00 AM - 5:00 PM'}</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-1' : 'bg-white py-2'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Image Brand Logo */}
            <Link to="/" className="block max-w-28 md:max-w-32 group" onClick={closeMenu}>
              <img
                src={vivaldiLogo}
                alt="Vivaldi Foods Ltd"
                className="w-full h-auto object-contain transition-transform group-hover:scale-[1.01]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  <Link
                    to={link.href as '/'}
                    className={`px-3 py-1.5 text-label-sm transition-colors flex items-center gap-1 ${location.pathname === link.href ? 'text-amber-600' : 'text-slate-700 hover:text-amber-600'}`}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={13} className="opacity-50 group-hover:rotate-180 transition-transform" />}
                  </Link>

                  {link.children && (
                    <div className="absolute top-full left-0 w-48 bg-white shadow-xl opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 border-t-2 border-amber-500">
                      <div className="py-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href as '/'}
                            className="block px-4 py-2 text-label-sm text-slate-600 hover:bg-slate-50 hover:text-amber-600 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact" className="ml-4 bg-forest-900 text-white px-5 py-2 rounded-sm text-label-sm hover:bg-amber-600 transition-all hover:shadow-md active:scale-95">
                Enquiry
              </Link>
            </div>

            {/* Mobile Menu Open Toggle Button */}
            <button
              className="lg:hidden text-forest-950 p-1.5"
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
        className={`fixed inset-0 bg-black/40 z-59 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white z-60 lg:hidden flex flex-col transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Main navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="max-w-24">
            <img
              src={vivaldiLogo}
              alt="Vivaldi Foods Ltd"
              className="w-full h-auto object-contain"
            />
          </div>
          <button
            onClick={closeMenu}
            className="text-slate-500 hover:text-slate-800 transition-colors p-1"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav items — WhatsApp-style list */}
        <nav className="flex-1 overflow-y-auto">
          <ul>
            {navLinks.map((link) => (
              <li key={link.label} className="border-b border-slate-100 last:border-b-0">
                {link.children ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(link.label)}
                      className="w-full flex items-center justify-between px-6 py-4 text-[15px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors text-left"
                    >
                      <span>{link.label}</span>
                      <ChevronRight
                        size={16}
                        className={`text-slate-400 transition-transform duration-200 ${expandedItem === link.label ? 'rotate-90' : ''}`}
                      />
                    </button>
                    {/* Sub-items */}
                    <div
                      className={`overflow-hidden transition-all duration-200 bg-slate-50 ${expandedItem === link.label ? 'max-h-96' : 'max-h-0'}`}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href as '/'}
                          onClick={closeMenu}
                          className="flex items-center gap-3 px-8 py-3.5 text-[14px] text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-colors border-b border-slate-100/70 last:border-b-0"
                        >
                          <span className="w-1 h-1 rounded-full bg-amber-500 shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.href as '/'}
                    onClick={closeMenu}
                    className={`flex items-center px-6 py-4 text-[15px] font-semibold transition-colors hover:bg-slate-50 ${location.pathname === link.href ? 'text-amber-600' : 'text-slate-800'}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer footer */}
        <div className="px-6 py-5 border-t border-slate-100 bg-slate-50">
          <Link
            to="/contact"
            onClick={closeMenu}
            className="block w-full text-center bg-forest-900 text-white px-5 py-3 rounded-sm text-label-sm hover:bg-amber-600 transition-all active:scale-95 mb-4"
          >
            Enquiry
          </Link>
          <p className="text-amber-600 text-[9px] font-bold uppercase tracking-widest mb-1.5">Contact Us</p>
          <a
            href="https://wa.me/233256114661"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-amber-600 transition-colors text-xs mb-0.5 block"
          >
            {COMPANY_DETAILS.phone}
          </a>
          <p className="text-slate-500 text-xs">{COMPANY_DETAILS.email}</p>
        </div>
      </div>
    </header>
  );
}
