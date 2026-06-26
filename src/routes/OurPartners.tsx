/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Phone, Navigation, Check, MessageSquare } from 'lucide-react';

export const Route = createFileRoute('/OurPartners')({
  component: OurPartnersPage,
});

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  phone: string;
  region: 'Spintex' | 'East Legon' | 'Sakumono' | 'Airport' | 'Nungua' | 'Accra Central';
  stockStatus: 'In Stock' | 'Limited Stock' | 'Contact Store';
  mapUrl: string;
}

const stores: StoreLocation[] = [
  {
    id: 1,
    name: "China Mall Supermarket",
    address: "Palace Mall, Spintex Rd, Accra, Ghana",
    phone: "+233 30 281 5900",
    region: "Spintex",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.835948956972!2d-0.10304382512674994!3d5.663593833449339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10207fa2f33c3933%3A0xe54fb028945417ab!2sPalace%20Mall!5e0!3m2!1sen!2sgh!4v1715860000000!5m2!1sen!2sgh"
  },
  {
    id: 2,
    name: "Palace Mall Supermarket",
    address: "Palace Mall, Flower Pot, Spintex Rd, Accra, Ghana",
    phone: "+233 30 254 3166",
    region: "East Legon",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.6277028448833!2d-0.1554907251264931!3d5.6946014332152865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10207dca08f0a049%3A0xe8c1303cc5f6dcf!2sKoala%20Supermarket%20-%20East%20Legon!5e0!3m2!1sen!2sgh!4v1715860100000!5m2!1sen!2sgh"
  },
  {
    id: 3,
    name: "Marina Mall Supermarket",
    address: "Marina Mall, Airport Bypass Rd, Airport Residential Area, Accra, Ghana",
    phone: "+233 30 274 2460",
    region: "Airport",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.763428987483!2d-0.17724122512665893!3d5.6140599334057865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10207efb6d19a27b%3A0x6a0a03bf5ffb6c7a!2sMarina%20Mall!5e0!3m2!1sen!2sgh!4v1715860300000!5m2!1sen!2sgh"
  },
  {
    id: 4,
    name: "Shoprite Junction Mall",
    address: "Junction Mall, Nungua Barrier / Sakumono, Accra, Ghana",
    phone: "+233 30 290 8599",
    region: "Nungua",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9995188820063!2d-0.07687892512693892!3d5.612845633538411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10207fd76249adcb%3A0xc39f289cf2de1d8c!2sJunction%20Mall!5e0!3m2!1sen!2sgh!4v1715860400000!5m2!1sen!2sgh"
  },
  {
    id: 5,
    name: "Melcom Superstore Sakumono",
    address: "Sakumono Bypass, Community 18, Sakumono, Accra, Ghana",
    phone: "+233 30 225 1500",
    region: "Sakumono",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9324545281486!2d-0.03816762512686737!3d5.663118933454796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10207f0000000001%3A0x0!2zNcKwMzknNDcuMiJOIDDCsDAnMTMuMiJX!5e0!3m2!1sen!2sgh!4v1715856488319!5m2!1sen!2sgh"
  },
  {
    id: 7,
    name: "Vivaldi Foods Corporate Hub",
    address: "Community 18 / Sakumono Vivian Farm, Greater Accra Region (GQ-361-8042)",
    phone: "+233 256 114 661",
    region: "Sakumono",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9324545281486!2d-0.03816762512686737!3d5.663118933454796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10207f0000000001%3A0x0!2zNcKwMzknNDcuMiJOIDDCsDAnMTMuMiJX!5e0!3m2!1sen!2sgh!4v1715856488319!5m2!1sen!2sgh"
  }
];

function OurPartnersPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeStore, setActiveStore] = useState<StoreLocation>(stores[0]);

  const filteredStores = stores.filter(store => {
    const matchesRegion = selectedRegion === 'All' || store.region === selectedRegion;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleWhatsAppDelivery = (storeName: string) => {
    const text = `Hello Vivaldi Foods! I would like to place a delivery order for Volta Premium Honey. I usually buy from ${storeName} but I would like direct home delivery. Please let me know how to order. Thank you!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/233256114661?text=${encodedText}`, '_blank');
  };

  const getStatusColor = (status: StoreLocation['stockStatus']) => {
    switch (status) {
      case 'In Stock': return 'bg-brand-green/10 text-brand-green border-brand-green/20';
      case 'Limited Stock': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'Contact Store': return 'bg-slate-400/10 text-slate-500 border-slate-400/20';
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen selection-corporate">
      <PageBanner
        title="Find a Retailer Near You"
        subtitle="Vivaldi's Volta Premium Honey is stocked at premium supermarkets and stores across Greater Accra."
      />

      <section className="py-16 max-w-7xl mx-auto px-6">
        {/* Layout grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Panel: Filters & Store List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 border border-brand-brown/10 shadow-sm rounded-sm">
              <h3 className="text-xl font-display font-bold text-brand-brown mb-4">Search Stockists</h3>

              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search store name or street..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-brand-cream/50 border border-brand-brown/10 focus:border-brand-green focus:bg-white outline-none text-sm transition-all duration-300"
                />
              </div>

              {/* Region Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Sakumono', 'Spintex', 'East Legon', 'Airport', 'Nungua'].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => {
                      setSelectedRegion(reg);
                      // Auto-select first store in filtered set if exists
                      const firstMatched = stores.find(s => reg === 'All' || s.region === reg);
                      if (firstMatched) setActiveStore(firstMatched);
                    }}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-all duration-300 ${
                      selectedRegion === reg
                        ? 'bg-brand-green text-white border-brand-green'
                        : 'bg-brand-cream text-brand-brown/60 border-brand-brown/10 hover:border-brand-brown'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* Store Listings Container */}
            <div className="space-y-4 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredStores.length > 0 ? (
                  filteredStores.map((store) => (
                    <motion.div
                      key={store.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onClick={() => setActiveStore(store)}
                      className={`p-6 border transition-all duration-300 cursor-pointer relative rounded-sm ${
                        activeStore.id === store.id
                          ? 'bg-white border-brand-green shadow-md translate-x-1'
                          : 'bg-white/70 hover:bg-white border-brand-brown/5 shadow-sm'
                      }`}
                    >
                      {activeStore.id === store.id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-green" />
                      )}

                      <div className="flex justify-between items-start gap-4 mb-3">
                        <h4 className="font-display font-bold text-brand-brown text-lg leading-tight">
                          {store.name}
                        </h4>
                        <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest border rounded-full ${getStatusColor(store.stockStatus)}`}>
                          {store.stockStatus}
                        </span>
                      </div>

                      <div className="space-y-2 text-xs text-brand-brown/70 mb-4">
                        <p className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                          <span>{store.address}</span>
                        </p>
                        <p className="flex items-center gap-2.5">
                          <Phone className="w-4 h-4 text-brand-brown/40 shrink-0" />
                          <a href={`tel:${store.phone}`} className="hover:text-brand-green transition-colors">{store.phone}</a>
                        </p>
                      </div>

                      {/* Small Quick Actions Bar */}
                      <div className="flex gap-3 pt-3 border-t border-brand-brown/5 text-[10px] font-bold uppercase tracking-widest">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsAppDelivery(store.name);
                          }}
                          className="flex items-center gap-1.5 text-brand-green hover:opacity-85 transition-opacity"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Order Delivery</span>
                        </button>

                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ", " + store.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-brand-brown/60 hover:text-brand-green transition-colors ml-auto"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Navigate</span>
                        </a>
                      </div>

                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-white/40 border border-brand-brown/5 p-6 rounded-sm">
                    <p className="text-sm text-brand-brown/50 font-medium">No stocking supermarkets match your search query.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Interactive Iframe Map Container */}
          <div className="lg:col-span-7 h-170 bg-white border border-brand-brown/10 p-3 shadow-sm rounded-sm flex flex-col justify-between">
            {/* Map Header details */}
            <div className="p-4 border-b border-brand-brown/5 bg-brand-cream/30 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold text-brand-green uppercase tracking-widest block mb-1">
                  Selected Stockist
                </span>
                <h3 className="text-lg font-display font-bold text-brand-brown leading-tight">
                  {activeStore.name}
                </h3>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeStore.name + ", " + activeStore.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-corporate px-5 py-2.5 text-[10px] gap-2 font-bold"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>

            {/* Embedded Iframe Map View */}
            <div className="grow relative overflow-hidden bg-brand-cream/10 my-3">
              <iframe
                title={activeStore.name}
                src={activeStore.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) contrast(1.05)' }}
                className="hover:filter-none transition-all duration-700"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            {/* Quick Trust / Delivery Banner inside Map block */}
            <div className="p-4 bg-brand-brown text-white flex items-center justify-between text-xs rounded-sm">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-green bg-white/10 rounded-full p-1" />
                <span>Cannot find stock in your local supermarket? Order direct via WhatsApp.</span>
              </div>
              <button
                onClick={() => handleWhatsAppDelivery("Direct Hub")}
                className="text-amber-400 font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                Order Direct
              </button>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
