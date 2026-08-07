
export type Region = 'Ahafo' | 'Ashanti' | 'Bono' | 'Bono East' | 'Central' | 'Eastern' | 'Greater Accra Region' | 'Northern' | 'North East' | 'Oti' | 'Savannah' | 'Upper East' | 'Upper West' | 'Volta Region' | 'Western' | 'Western North' | 'Nationwide';

export type StoreCategory = 'All' | 'Mart' | 'Filling Station' | 'SuperMarkets' | 'Malls' | 'Pharmacy';

export interface StoreLocation {
  id: number;
  name: string;
  address: string;
  gpsAddress: string;
  phone: string;
  region: Region;
  category: StoreCategory;
  stockStatus: 'In Stock' | 'Limited Stock' | 'Contact Store';
}

export const allRegions: Region[] = [
  'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern',
  'Greater Accra Region', 'Northern', 'North East', 'Oti', 'Savannah',
  'Upper East', 'Upper West', 'Volta Region', 'Western', 'Western North', 'Nationwide'
];

export const stores: StoreLocation[] = [
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
