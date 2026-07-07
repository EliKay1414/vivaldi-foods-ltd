/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';

export const Route = createFileRoute('/OurPartners')({
  component: OurPartnersPage,
});

type Region = 'Ahafo' | 'Ashanti' | 'Bono' | 'Bono East' | 'Central' | 'Eastern' | 'Greater Accra' | 'Northern' | 'North East' | 'Oti' | 'Savannah' | 'Upper East' | 'Upper West' | 'Volta' | 'Western' | 'Western North' | 'Nationwide';

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  phone: string;
  region: Region;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Contact Store';
  mapUrl: string;
}

const stores: StoreLocation[] = [
  // --- Original Stockists ---
  {
    id: 1,
    name: "Marina Mall",
    address: "Airport City, Accra",
    phone: "+233 30 274 2460",
    region: "Greater Accra",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Marina+Mall,Accra,Ghana"
  },
  {
    id: 2,
    name: "Petrosol Marts",
    address: "Accra, Ghana",
    phone: "N/A",
    region: "Greater Accra",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Petrosol+Marts,Accra,Ghana"
  },
  {
    id: 3,
    name: "Lyzzdee Shopping",
    address: "Ho, Volta Region",
    phone: "N/A",
    region: "Volta",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Lyzzdee+Shopping,Ho,Ghana"
  },
  {
    id: 4,
    name: "Silver Link Mart",
    address: "Ho, Volta Region",
    phone: "N/A",
    region: "Volta",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Silver+Link+Mart,Ho,Ghana"
  },
  {
    id: 5,
    name: "Victories Mount Zion Pharmacy",
    address: "Ho, Volta Region",
    phone: "N/A",
    region: "Volta",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Victories+Mount+Zion+Pharmacy,Ho,Ghana"
  },
  {
    id: 6,
    name: "Sebatose Pharmacy",
    address: "Kpando, Volta Region",
    phone: "N/A",
    region: "Volta",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Sebatose+Pharmacy,Kpando,Ghana"
  },
  {
    id: 7,
    name: "Choice Mart & Pharmacy",
    address: "Kpando, Volta Region",
    phone: "N/A",
    region: "Volta",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Choice+Mart+&+Pharmacy,Kpando,Ghana"
  },
  {
    id: 8,
    name: "Volta Premium Honey Nationwide Delivery",
    address: "Community 18, Sakumono",
    phone: "+233 256 114 661",
    region: "Nationwide",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Volta+Premium+Honey+Delivery,Community+18,Sakumono,Ghana"
  },

  // --- Additional Regional Placeholders ---
  {
    id: 9,
    name: "Melcom Kumasi",
    address: "Adum, Kumasi",
    phone: "N/A",
    region: "Ashanti",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Melcom,Adum,Kumasi,Ghana"
  },
  {
    id: 10,
    name: "Shoprite Takoradi",
    address: "Takoradi Mall, Western",
    phone: "N/A",
    region: "Western",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Shoprite,Takoradi+Mall,Ghana"
  },
  {
    id: 11,
    name: "Big Dream Supermarket",
    address: "Sunyani City Center",
    phone: "N/A",
    region: "Bono",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Big+Dream+Supermarket,Sunyani,Ghana"
  },
  {
    id: 14,
    name: "Koforidua Market Hub",
    address: "Koforidua, Eastern",
    phone: "N/A",
    region: "Eastern",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Koforidua,Ghana"
  },
  {
    id: 15,
    name: "Melcom Bolgatanga",
    address: "Bolgatanga, Upper East",
    phone: "N/A",
    region: "Upper East",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Bolgatanga,Ghana"
  },
  {
    id: 16,
    name: "Girapa Mall",
    address: "Wa, Upper West",
    phone: "N/A",
    region: "Upper West",
    stockStatus: "In Stock",
    mapUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Wa,Ghana"
  }
];

const allRegions: Region[] = [
  'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern',
  'Greater Accra', 'Northern', 'North East', 'Oti', 'Savannah',
  'Upper East', 'Upper West', 'Volta', 'Western', 'Western North'
];

function OurPartnersPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStore, setActiveStore] = useState<StoreLocation>(stores[0]);

 const filteredStores = stores.filter(store => {
    const matchesRegion = selectedRegion === 'All' || store.region === selectedRegion || store.region === 'Nationwide';
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="bg-brand-cream min-h-screen">
      <PageBanner title="Find a Retailer" subtitle="Locate our partners across Ghana." />

      <section className="py-8 lg:py-16 max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 border border-brand-brown/10 shadow-sm">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 text-brand-brown/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search stores..."
                  className="w-full pl-10 py-2 border border-brand-brown/10 text-sm"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setSelectedRegion('All')} className={`px-3 py-1 text-[10px] font-bold uppercase ${selectedRegion === 'All' ? 'bg-brand-green text-white' : 'bg-brand-cream'}`}>All</button>
                {allRegions.map(reg => (
                  <button key={reg} onClick={() => setSelectedRegion(reg)} className={`px-3 py-1 text-[10px] font-bold uppercase ${selectedRegion === reg ? 'bg-brand-green text-white' : 'bg-brand-cream'}`}>{reg}</button>
                ))}
              </div>
            </div>

            <div className="h-100 overflow-y-auto space-y-2 pr-2">
              {filteredStores.map((store) => (
                <motion.div
                  key={store.id}
                  onClick={() => setActiveStore(store)}
                  className={`p-4 border cursor-pointer ${activeStore.id === store.id ? 'border-brand-green bg-white' : 'bg-white'}`}
                >
                  <h4 className="font-bold text-sm text-brand-brown">{store.name}</h4>
                  <p className="text-[10px] text-brand-brown/60 mb-2">{store.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[10px] font-bold text-brand-green underline"
                  >
                    <MapPin className="w-3 h-3" /> Get Directions
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-8 h-100 lg:h-150 bg-white border border-brand-brown/10">
            <iframe
              title={`${activeStore.name} location map`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src={activeStore.mapUrl}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
