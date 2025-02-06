export type Location = {
  id: string;
  name: string;
  address: string;
  area: string;
  lat: number;
  lng: number;
  description: string;
  isOpen24Hours: boolean;
  rating: number;
  availableBrands: string[];
  isVerified: boolean;
};

export const locations: Location[] = [
  {
    id: '1',
    name: 'Gateway Paan Corner',
    address: 'Near Gateway of India, Colaba',
    area: 'colaba',
    lat: 18.9217,
    lng: 72.8347,
    description: 'Famous for classic suttas since 1960',
    isOpen24Hours: false,
    rating: 4.5,
    availableBrands: ['1', '2', '3'],
    isVerified: true
  },
  {
    id: '2',
    name: 'Linking Road Smoke Shop',
    address: 'Linking Road, Bandra West',
    area: 'bandra',
    lat: 19.0596,
    lng: 72.8295,
    description: 'Best variety of flavors',
    isOpen24Hours: true,
    rating: 4.8,
    availableBrands: ['1', '2'],
    isVerified: true
  },
  {
    id: '3',
    name: 'Juhu Beach Pan Shop',
    address: 'Juhu Beach Road',
    area: 'juhu',
    lat: 19.0883,
    lng: 72.8263,
    description: 'Beachside smoking spot',
    isOpen24Hours: false,
    rating: 4.2,
    availableBrands: ['1', '3'],
    isVerified: true
  },
  {
    id: '4',
    name: 'Andheri Station East',
    address: 'Outside Andheri Station East',
    area: 'andheri',
    lat: 19.1136,
    lng: 72.8697,
    description: 'Local favorite spot',
    isOpen24Hours: true,
    rating: 4.0,
    availableBrands: ['1', '2', '3'],
    isVerified: true
  },
  {
    id: '5',
    name: 'Ghatkopar Market',
    address: 'Near Ghatkopar Station',
    area: 'ghatkopar',
    lat: 19.0785,
    lng: 72.9080,
    description: '24/7 sutta spot',
    isOpen24Hours: true,
    rating: 4.3,
    availableBrands: ['1', '2'],
    isVerified: true
  },
  {
    id: '6',
    name: 'Borivali West',
    address: 'Near Borivali Station West',
    area: 'borivali',
    lat: 19.2321,
    lng: 72.8567,
    description: 'Premium quality pan shop',
    isOpen24Hours: false,
    rating: 4.6,
    availableBrands: ['1', '2', '3'],
    isVerified: true
  }
];

export const getLocationsByArea = (area: string) => {
  const searchTerm = area.toLowerCase();
  return locations.filter(location => 
    location.area.toLowerCase().includes(searchTerm) ||
    location.name.toLowerCase().includes(searchTerm) ||
    location.address.toLowerCase().includes(searchTerm)
  );
};

export const getMumbaiAreas = () => {
  return [...new Set(locations.map(location => location.area))].sort();
};

export const getAllLocations = () => locations; 