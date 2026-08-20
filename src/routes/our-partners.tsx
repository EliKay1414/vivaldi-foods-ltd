/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Phone, ChevronDown, CheckCircle2, AlertCircle, Building2, Store, HelpCircle, Navigation, ChevronLeft, ChevronRight } from 'lucide-react';
import Seo from '@/components/ui/Seo';
import { stores, allRegions, type StoreLocation, type StoreCategory } from '@/config/partners';

export const Route = createFileRoute('/our-partners')({
  component: OurPartnersPage,
});

const PAGE_SIZE = 6;

function storeDestination(store: StoreLocation) {
  if (store.gpsAddress) return `${store.gpsAddress}, Ghana`;
  return [store.name, store.address, store.region, 'Ghana'].filter(Boolean).join(', ');
}

function ghanaPostUrl(gpsAddress: string) {
  const compact = gpsAddress.replace(/[-\s]/g, '').toUpperCase();
  return `https://ghanapostgps.com/map#${compact}`;
}

function directionsUrl(store: StoreLocation, origin?: { lat: number; lng: number }) {
  const destination = encodeURIComponent(storeDestination(store));
  if (origin) {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination}&travelmode=driving`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
}

function telHref(phone: string) {
  const first = phone.split('/')[0] ?? phone;
  const digits = first.replace(/\D/g, '');
  if (!digits) return undefined;
  if (digits.startsWith('233')) return `tel:+${digits}`;
  if (digits.startsWith('0')) return `tel:+233${digits.slice(1)}`;
  return `tel:+${digits}`;
}

export function OurPartnersPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [navigatingId, setNavigatingId] = useState<number | null>(null);

  const openShopGps = (store: StoreLocation) => {
    const fallback = directionsUrl(store);
    setNavigatingId(store.id);

    const finish = (url: string) => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setNavigatingId(null);
    };

    if (!navigator.geolocation) {
      finish(fallback);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        finish(directionsUrl(store, {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));
      },
      () => finish(fallback),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 },
    );
  };

  const categories: StoreCategory[] = ['All', 'Mart', 'Filling Station', 'SuperMarkets', 'Malls', 'Pharmacy'];

  const filteredStores = stores.filter(store => {
    const matchesRegion = selectedRegion === 'All' || store.region === selectedRegion || store.region === 'Nationwide';
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.gpsAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
    return matchesRegion && matchesSearch && matchesCategory;
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [selectedRegion, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredStores.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedStores = filteredStores.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const getStatusBadge = (status: StoreLocation['stockStatus']) => {
    switch (status) {
      case 'In Stock':
        return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" /> In Stock</span>;
      case 'Limited Stock':
        return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full"><AlertCircle className="w-3 h-3" /> Limited</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full"><HelpCircle className="w-3 h-3" /> Call Store</span>;
    }
  };

  return (
    <div className="bg-amber-50/20 min-h-screen text-gray-800">
      <Seo
        title="Where to Buy & Retail Stockists | Vivaldi Foods Ltd"
        description="Find out where to buy Volta Premium Honey across Ghana. Browse our verified list of local retail stockists, supermarkets, gas marts, and pharmacies in Accra, Spintex, Ho, Aflao, and Kpando."
      />

      <PageBanner title="Our Partners" subtitle="Find an official Vivaldi Foods retail stockist near you." />

      <section className="py-12 max-w-6xl mx-auto px-4 lg:px-6 space-y-4">

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">

            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search store name or address..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-700 transition-colors bg-gray-50/50"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative w-full md:w-64">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-700" />
                  <strong className="text-gray-900">{selectedRegion === 'All' ? 'All Regions' : selectedRegion}</strong>
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 w-full mt-2 max-h-60 overflow-y-auto rounded-xl bg-white border border-gray-100 shadow-lg z-20 p-1.5 space-y-0.5"
                    >
                      <button
                        type="button"
                        onClick={() => { setSelectedRegion('All'); setIsDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${selectedRegion === 'All' ? 'bg-green-50 text-green-800 font-semibold' : 'hover:bg-gray-50'}`}
                      >
                        All Regions
                      </button>
                      {allRegions.map((reg) => (
                        <button
                          key={reg}
                          type="button"
                          onClick={() => { setSelectedRegion(reg); setIsDropdownOpen(false); }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${selectedRegion === reg ? 'bg-green-50 text-green-800 font-semibold' : 'hover:bg-gray-50'}`}
                        >
                          {reg}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="border-t border-gray-50 pt-3">
            <div className="flex flex-wrap gap-1.5 p-1 bg-gray-50/80 rounded-xl w-full border border-gray-100/50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer select-none ${
                    selectedCategory === cat
                      ? 'bg-white text-green-700 shadow-xs border border-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  {cat === 'All' ? 'All Outlets' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredStores.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pagedStores.map((store) => {
                const callHref = store.phone !== 'N/A' ? telHref(store.phone) : undefined;

                return (
                  <div
                    key={store.id}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="space-y-1.5 grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-[9px] font-bold uppercase text-gray-500 rounded-md border border-gray-100">
                          <Building2 className="w-2.5 h-2.5 text-green-700" />
                          {store.category}
                        </span>
                        {getStatusBadge(store.stockStatus)}
                      </div>

                      <h3 className="font-bold text-base text-gray-900 leading-snug">{store.name}</h3>

                      <p className="text-xs text-gray-500 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0 mt-0.5" />
                        <span>
                          {store.address ? (
                            <>
                              <span className="text-gray-600 font-semibold">{store.address}</span>
                              <span className="text-gray-300"> · </span>
                            </>
                          ) : null}
                          <span className="font-medium text-green-700">{store.region}</span>
                        </span>
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <button
                          type="button"
                          onClick={() => openShopGps(store)}
                          disabled={navigatingId === store.id}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 hover:underline bg-green-50/60 px-2 py-0.5 rounded-lg border border-green-100/50 cursor-pointer disabled:opacity-60"
                        >
                          <Navigation size={10} className="fill-current text-green-700" />
                          {navigatingId === store.id ? 'Opening GPS…' : 'GPS directions'}
                        </button>
                        {store.gpsAddress ? (
                          <a
                            href={ghanaPostUrl(store.gpsAddress)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 hover:underline bg-gray-50 px-2 py-0.5 rounded-lg border border-gray-100"
                          >
                            {store.gpsAddress}
                          </a>
                        ) : null}
                      </div>
                    </div>

                    {callHref ? (
                      <a
                        href={callHref}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm w-full"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {store.phone}
                      </a>
                    ) : (
                      <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-gray-400 bg-gray-50 border border-gray-100 cursor-not-allowed w-full select-none">
                        <Store className="w-3.5 h-3.5" /> Walk-In Only
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-green-700 hover:text-green-700 cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold cursor-pointer ${
                      pageNumber === currentPage
                        ? 'bg-green-700 text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-green-700 hover:text-green-700'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 bg-white text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-green-700 hover:text-green-700 cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white text-center py-16 px-4 rounded-2xl border border-gray-100 shadow-sm max-w-sm sm:max-w-none mx-auto w-full">
            <p className="text-sm text-gray-500 font-medium">
              No active stockists found matching your parameters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
