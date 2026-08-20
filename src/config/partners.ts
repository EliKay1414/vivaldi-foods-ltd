export type Region =
  | 'Ahafo'
  | 'Ashanti'
  | 'Bono'
  | 'Bono East'
  | 'Central'
  | 'Eastern'
  | 'Greater Accra Region'
  | 'Northern'
  | 'North East'
  | 'Oti'
  | 'Savannah'
  | 'Upper East'
  | 'Upper West'
  | 'Volta Region'
  | 'Western'
  | 'Western North'
  | 'Nationwide';

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
    name: "Supermarket NN Venture",
    address: "Lashibi Community 16 Junction",
    gpsAddress: "",
    phone: "0558513850",
    region: "Greater Accra Region",
    category: "SuperMarkets",
    stockStatus: "In Stock",
  },
  {
    id: 2,
    name: "Bensola Supermarket and Mini Restaurant",
    address: "UG Campus, Akuafo Hall Annex A",
    gpsAddress: "",
    phone: "0500406004",
    region: "Greater Accra Region",
    category: "SuperMarkets",
    stockStatus: "In Stock",
  },
  {
    id: 3,
    name: "Marah Pharmacy",
    address: "Palace Mall, Flower Pot",
    gpsAddress: "",
    phone: "N/A",
    region: "Greater Accra Region",
    category: "Pharmacy",
    stockStatus: "In Stock",
  },
  {
    id: 4,
    name: "Prolife Pharmacy",
    address: "Lekma Hospital, Teshie",
    gpsAddress: "",
    phone: "0547619418 / 0540116276",
    region: "Greater Accra Region",
    category: "Pharmacy",
    stockStatus: "In Stock",
  },
  {
    id: 5,
    name: "Mama Asantewaa Biscuit Shop",
    address: "Madina Market, Busy Lane",
    gpsAddress: "",
    phone: "0244765998",
    region: "Greater Accra Region",
    category: "Mart",
    stockStatus: "In Stock",
  },
  {
    id: 6,
    name: "Kassbic Enterprise",
    address: "Kotobabi, Spintex",
    gpsAddress: "",
    phone: "0245646425",
    region: "Greater Accra Region",
    category: "Mart",
    stockStatus: "In Stock",
  },
  {
    id: 7,
    name: "Edivade Pharmacy",
    address: "Manet Junction",
    gpsAddress: "",
    phone: "0202011588",
    region: "Greater Accra Region",
    category: "Pharmacy",
    stockStatus: "In Stock",
  },
  {
    id: 8,
    name: "Leed Pharmacy",
    address: "Hohoe Hospital Road",
    gpsAddress: "",
    phone: "0245462195",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock",
  },
  {
    id: 9,
    name: "Victorious MT Zion",
    address: "Ho Ministries",
    gpsAddress: "",
    phone: "0204484536",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock",
  },
  {
    id: 10,
    name: "Trafalgar Gate Pharmacy",
    address: "Ho, Opposite Trafalgar Hospital",
    gpsAddress: "",
    phone: "0245937664",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock",
  },
  {
    id: 11,
    name: "Albertisam",
    address: "Ho Market",
    gpsAddress: "",
    phone: "0543777246",
    region: "Volta Region",
    category: "Mart",
    stockStatus: "In Stock",
  },
  {
    id: 12,
    name: "Auntie Dela (Domi-DD)",
    address: "Denu Market",
    gpsAddress: "",
    phone: "0243271788",
    region: "Volta Region",
    category: "SuperMarkets",
    stockStatus: "In Stock",
  },
  {
    id: 13,
    name: "Atiwoto / Messiah House",
    address: "Denu Market",
    gpsAddress: "",
    phone: "0541606024",
    region: "Volta Region",
    category: "Mart",
    stockStatus: "In Stock",
  },
  {
    id: 14,
    name: "Runnel Mart",
    address: "Aflao, Runnel Fuel Station",
    gpsAddress: "",
    phone: "0547102426",
    region: "Volta Region",
    category: "Filling Station",
    stockStatus: "In Stock",
  },
  {
    id: 15,
    name: "Domingo Pharmacy and Mart",
    address: "Aflao (Main Aflao-Denu Road)",
    gpsAddress: "",
    phone: "0206961159",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock",
  },
  {
    id: 16,
    name: "In His Hands Supermarket",
    address: "Kpando",
    gpsAddress: "",
    phone: "0557296386",
    region: "Volta Region",
    category: "SuperMarkets",
    stockStatus: "In Stock",
  },
  {
    id: 17,
    name: "Point of Grace Supermarket",
    address: "Kpando",
    gpsAddress: "",
    phone: "0244074513",
    region: "Volta Region",
    category: "SuperMarkets",
    stockStatus: "In Stock",
  },
  {
    id: 18,
    name: "JS Victory Pharmacy",
    address: "Hohoe",
    gpsAddress: "",
    phone: "0533952491",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock",
  },
  {
    id: 19,
    name: "Statesman Pharmacy",
    address: "Hohoe",
    gpsAddress: "",
    phone: "0249272307",
    region: "Volta Region",
    category: "Pharmacy",
    stockStatus: "In Stock",
  },
  {
    id: 20,
    name: "Sis Irene",
    address: "Hohoe, Market Street",
    gpsAddress: "",
    phone: "0541287983",
    region: "Volta Region",
    category: "Mart",
    stockStatus: "In Stock",
  },
];
