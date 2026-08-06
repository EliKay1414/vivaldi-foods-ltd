/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { PageBanner } from '@/components/ui/PageBanner';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Phone, ChevronDown, CheckCircle2, AlertCircle, Building2, Store, HelpCircle } from 'lucide-react';
import Seo from '@/components/ui/Seo';

export const Route = createFileRoute('/our-partners')({
  component: OurPartnersPage,
});

type Region = 'Ahafo' | 'Ashanti' | 'Bono' | 'Bono East' | 'Central' | 'Eastern' | 'Greater Accra Region' | 'Northern' | 'North East' | 'Oti' | 'Savannah' | 'Upper East' | 'Upper West' | 'Volta Region' | 'Western' | 'Western North' | 'Nationwide';

type StoreCategory = 'All' | 'Mart' | 'Filling Station' | 'SuperMarkets' | 'Malls' | 'Pharmacy';

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  gpsAddress: string;
  phone: string;
  region: Region;
  category: StoreCategory;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Contact Store';
}

const stores: StoreLocation[] = [
  {
    id: 1,
    name: "Leed Pharmacy (Akorlor)",
    address: "Hohoe, Akorlor",
    gpsAddress: "VC-0044-8912",
    phone: "+233 24 546 2195",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock"
  },
  {
    id: 2,
    name: "Albertisam",
    address: "Ho-Road, Ho",
    gpsAddress: "VC-0044-8913",
    phone: "+233 54 377 7246",
    region: "Volta Region",
    category: "Mart",
    stockStatus: "In Stock"
  },
  {
    id: 3,
    name: "In His Hands Enterprise",
    address: "Kpando",
    gpsAddress: "VC-0044-8914",
    phone: "+233 55 729 6386",
    region: "Volta Region",
    category: "Mart",
    stockStatus: "In Stock"
  },
  {
    id: 4,
    name: "Domi-DD Supermarket",
    address: "Denu Market, Denu",
    gpsAddress: "VC-0044-8915",
    phone: "+233 24 327 1788",
    region: "Volta Region",
    category: "SuperMarkets",
    stockStatus: "In Stock"
  },
  {
    id: 5,
    name: "Runnel Mart",
    address: "Aflao Road, Aflao",
    gpsAddress: "VC-0044-8916",
    phone: "+233 54 710 2426",
    region: "Volta Region",
    category: "Mart",
    stockStatus: "In Stock"
  },
  {
    id: 6,
    name: "First Family Pharmacy",
    address: "Ho",
    gpsAddress: "VC-0044-8917",
    phone: "+233 55 863 8400",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock"
  },
  {
    id: 7,
    name: "Domingo Pharmacy and Mart",
    address: "Aflao",
    gpsAddress: "VC-0044-8918",
    phone: "+233 20 696 1159",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock"
  },
  {
    id: 8,
    name: "Edivade Pharmacy",
    address: "Manet Junction, Manet",
    gpsAddress: "VC-0044-8919",
    phone: "+233 20 201 1588",
    region: "Greater Accra Region",
    category: "Pharmacy",
    stockStatus: "In Stock"
  },
  {
    id: 9,
    name: "Kassbic Enterprise",
    address: "Kotobabi - Spintex Road",
    gpsAddress: "VC-0044-8920",
    phone: "+233 53 886 3002",
    region: "Greater Accra Region",
    category: "Mart",
    stockStatus: "In Stock"
  },
  {
    id: 10,
    name: "Point of Grace Enterprise",
    address: "Kpando",
    gpsAddress: "VC-0044-8921",
    phone: "+233 24 407 4513",
    region: "Volta Region",
    category: "Mart",
    stockStatus: "In Stock"
  },
  {
    id: 11,
    name: "Petrosol Mart",
    address: "Coca-Cola, Spintex Road",
    gpsAddress: "VC-0044-8922",
    phone: "+233 55 402 5458",
    region: "Greater Accra Region",
    category: "Filling Station",
    stockStatus: "In Stock"
  },
  {
    id: 12,
    name: "Jucad Pharmacy",
    address: "Okaishie Drug Lane",
    gpsAddress: "VC-0044-8923",
    phone: "+233 26 900 1113",
    region: "Greater Accra Region",
    category: "Pharmacy",
    stockStatus: "In Stock"
  },
  {
    id: 13,
    name: "Victorious Mt Zion Pharmacy",
    address: "Ho",
    gpsAddress: "VC-0044-8924",
    phone: "+233 55 458 3230",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock"
  },
  {
    id: 14,
    name: "Narouma Mart",
    address: "Manet New Road (Martey Tsuru)",
    gpsAddress: "VC-0044-8925",
    phone: "+233 24 009 9099",
    region: "Greater Accra Region",
    category: "Mart",
    stockStatus: "In Stock"
  },
  {
    id: 15,
    name: "Marina Mall",
    address: "Airport Commercial Area, Accra",
    gpsAddress: "VC-0044-8926",
    phone: "+233 24 054 0440",
    region: "Greater Accra Region",
    category: "Malls",
    stockStatus: "In Stock"
  },
  {
    id: 16,
    name: "JS Victory Pharmacy",
    address: "Hohoe Road",
    gpsAddress: "VC-0044-8927",
    phone: "+233 53 395 2491",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock"
  },
  {
    id: 17,
    name: "Statesman Pharmacy",
    address: "Hohoe",
    gpsAddress: "VC-0044-8928",
    phone: "+233 24 927 2307",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock"
  },
  {
    id: 18,
    name: "The U Plaza Mart (Madam Irene Shop)",
    address: "Hohoe",
    gpsAddress: "VC-0044-8929",
    phone: "+233 54 128 7983",
    region: "Volta Region",
    category: "Mart",
    stockStatus: "In Stock"
  },
  {
    id: 19,
    name: "Atiwoto / Messiah House",
    address: "Denu Market, Denu",
    gpsAddress: "VC-0044-8930",
    phone: "+233 54 160 6024",
    region: "Volta Region",
    category: "Mart",
    stockStatus: "In Stock"
  },
  {
    id: 20,
    name: "Lyzdee Shopping Mall",
    address: "Ho Central",
    gpsAddress: "VC-0044-8931",
    phone: "N/A",
    region: "Volta Region",
    category: "Malls",
    stockStatus: "In Stock"
  },
  {
    id: 21,
    name: "Silver Link Mart",
    address: "Accra",
    gpsAddress: "VC-0044-8932",
    phone: "+233 24 481 7841",
    region: "Greater Accra Region",
    category: "Mart",
    stockStatus: "In Stock"
  },
  {
    id: 22,
    name: "Vivaldi Foods Distribution",
    address: "Lashibi, Spintex",
    gpsAddress: "VC-0044-8933",
    phone: "+233 30 210 1234",
    region: "Greater Accra Region",
    category: "Mart",
    stockStatus: "In Stock"
  }
];

const allRegions: Region[] = [
  'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern',
  'Greater Accra Region', 'Northern', 'North East', 'Oti', 'Savannah',
  'Upper East', 'Upper West', 'Volta Region', 'Western', 'Western North', 'Nationwide'
];

export function OurPartnersPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories: StoreCategory[] = ['All', 'Mart', 'Filling Station', 'SuperMarkets', 'Malls', 'Pharmacy'];

  const filteredStores = stores.filter(store => {
    const matchesRegion = selectedRegion === 'All' || store.region === selectedRegion || store.region === 'Nationwide';
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.gpsAddress.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || store.category === selectedCategory;
    return matchesRegion && matchesSearch && matchesCategory;
  });

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

      <section className="py-12 max-w-4xl mx-auto px-4 lg:px-6 space-y-4">

        {/* SHADCN-STYLE CONTROL PANEL MATRIX */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">

            {/* Search Box Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-3.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search store name, address, or GPS code (e.g. GQ-361)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-700 transition-colors bg-gray-50/50"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Clean Region Dropdown Selection */}
            <div className="relative w-full md:w-64">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
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

          {/* SHADCN TABS INTERFACE LAYOUT FOR CATEGORIES */}
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

        {/* Clean, Non-Complex Unified Content Cards Deck Layout */}
        {filteredStores.length > 0 ? (
          <div className="space-y-4">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all duration-200 hover:shadow-md"
              >
                {/* Left: Metadata Details */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-[9px] font-bold uppercase text-gray-500 rounded-md border border-gray-100">
                      <Building2 className="w-2.5 h-2.5 text-green-700" />
                      {store.category}
                    </span>
                    <h3 className="font-bold text-base text-gray-900">{store.name}</h3>
                    {getStatusBadge(store.stockStatus)}
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0" />
                    <span className="text-gray-600 font-semibold">{store.address}</span> <span className="text-gray-300">|</span> <span className="font-medium text-green-700">{store.region}</span>
                  </p>
                </div>

                {/* Right: Phone Action Button */}
                <div className="shrink-0 pt-2 sm:pt-0">
                  {store.phone !== 'N/A' ? (
                    <a
                      href={`tel:${store.phone.replace(/[^0-9+]/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-green-700 hover:bg-green-800 transition-colors shadow-sm w-full sm:w-auto"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {store.phone}
                    </a>
                  ) : (
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-gray-400 bg-gray-50 border border-gray-100 cursor-not-allowed w-full sm:w-auto">
                      <Store className="w-3.5 h-3.5" /> Walk-In Only
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="bg-white text-center py-16 px-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">No active stockists found matching your parameters.</p>
          </div>
        )
        }
      </section>
    </div>
  );
}
