/**
 * NextFind — Curated Mock Property Data
 * Real high-resolution architecture & interior photography matching each specific category:
 * - Room: real furnished bedroom
 * - Flat / Apartment: modern furnished living/dining apartment
 * - Independent House / Villa: real residential architecture exterior & interior
 * - Studio: compact modern studio apartment
 * - PG / Hostel: clean shared student / young professional accommodation
 */

export const mockProperties = [
  {
    id: '1',
    title: 'Modern 2BHK Apartment in Indiranagar',
    type: 'flat',
    propertyTypeName: 'Apartment',
    price: 26000,
    deposit: 60000,
    location: {
      city: 'Bengaluru',
      area: 'Indiranagar',
      address: '100 Feet Road, HAL 2nd Stage, Indiranagar',
      lat: 12.9784,
      lng: 77.6408,
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1050,
    furnished: 'fully-furnished',
    furnishedLabel: 'Fully Furnished',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=900&q=85&fit=crop', // Real contemporary apartment living space
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85&fit=crop',
    ],
    amenities: ['wifi', 'ac', 'parking', 'security', 'lift'],
    rating: 4.85,
    reviewCount: 32,
    isVerified: true,
    isAvailable: true,
    postedAt: '2026-11-01',
    owner: {
      id: 'o1',
      name: 'Rajesh Kumar',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&fit=crop',
      responseRate: 98,
      verifiedOwner: true,
    },
    description:
      'Impeccably maintained 2-bedroom corner apartment situated on 100 Feet Road. High ceilings, private balcony, modular kitchen, and 5 minutes walk to CMH Road Metro.',
  },
  {
    id: '2',
    title: 'Spacious Private Room with Attached Bath',
    type: 'room',
    propertyTypeName: 'Private Room',
    price: 8500,
    deposit: 17000,
    location: {
      city: 'Hyderabad',
      area: 'Gachibowli',
      address: 'Near DLF Cybercity, Gachibowli',
      lat: 17.4435,
      lng: 78.3489,
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 260,
    furnished: 'furnished',
    furnishedLabel: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=900&q=85&fit=crop', // Authentic, clean, modern bedroom
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=85&fit=crop',
    ],
    amenities: ['wifi', 'laundry', 'security', 'powerbackup'],
    rating: 4.6,
    reviewCount: 18,
    isVerified: true,
    isAvailable: true,
    postedAt: '2026-11-05',
    owner: {
      id: 'o2',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80&fit=crop',
      responseRate: 94,
      verifiedOwner: true,
    },
    description:
      'Sunlit individual bedroom with ergonomic study desk, ergonomic chair, wardrobe, and high-speed fiber internet. Ideal for tech professionals and students.',
  },
  {
    id: '3',
    title: 'Independent 3BHK Villa with Private Garden',
    type: 'house',
    propertyTypeName: 'Independent House',
    price: 68000,
    deposit: 150000,
    location: {
      city: 'Pune',
      area: 'Koregaon Park',
      address: 'Lane 5, North Main Road, Koregaon Park',
      lat: 18.5362,
      lng: 73.8972,
    },
    bedrooms: 3,
    bathrooms: 3,
    area: 2450,
    furnished: 'fully-furnished',
    furnishedLabel: 'Fully Furnished',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&fit=crop', // Real residential villa exterior & garden
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=900&q=85&fit=crop',
    ],
    amenities: ['wifi', 'ac', 'parking', 'gym', 'garden', 'security', 'cctv'],
    rating: 4.92,
    reviewCount: 41,
    isVerified: true,
    isAvailable: true,
    postedAt: '2026-10-28',
    owner: {
      id: 'o3',
      name: 'Anjali Mehta',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80&fit=crop',
      responseRate: 99,
      verifiedOwner: true,
    },
    description:
      'Stunning architect-designed independent house featuring private landscaping, double covered car parking, solar water heating, and 24/7 security guard.',
  },
  {
    id: '4',
    title: 'Minimalist Studio Apartment near Sea Face',
    type: 'flat',
    propertyTypeName: 'Studio',
    price: 34000,
    deposit: 80000,
    location: {
      city: 'Mumbai',
      area: 'Bandra West',
      address: 'Near Carter Road, Bandra West',
      lat: 19.0596,
      lng: 72.8295,
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 480,
    furnished: 'fully-furnished',
    furnishedLabel: 'Fully Furnished',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=85&fit=crop', // Stylish urban studio
      'https://images.unsplash.com/photo-1502005229762-ae1b46642839?w=900&q=85&fit=crop',
    ],
    amenities: ['wifi', 'ac', 'security', 'lift', 'powerbackup'],
    rating: 4.75,
    reviewCount: 27,
    isVerified: true,
    isAvailable: true,
    postedAt: '2026-11-08',
    owner: {
      id: 'o4',
      name: 'Aryan Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80&fit=crop',
      responseRate: 91,
      verifiedOwner: true,
    },
    description:
      'Designer open-concept studio home within walking distance to Carter Road promenade. Double glazed noise insulation, integrated appliances, and curated lighting.',
  },
  {
    id: '5',
    title: 'Premium Managed PG Room for Women',
    type: 'pg',
    propertyTypeName: 'PG / Hostel',
    price: 11500,
    deposit: 15000,
    location: {
      city: 'Delhi',
      area: 'South Extension',
      address: 'South Extension Part II, Ring Road',
      lat: 28.5731,
      lng: 77.2192,
    },
    bedrooms: 1,
    bathrooms: 1,
    area: 210,
    furnished: 'fully-furnished',
    furnishedLabel: 'Fully Furnished',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=85&fit=crop', // Authentic clean hostel / PG room with beds & study
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=900&q=85&fit=crop',
    ],
    amenities: ['wifi', 'laundry', 'security', 'cctv', 'powerbackup'],
    rating: 4.5,
    reviewCount: 19,
    isVerified: true,
    isAvailable: true,
    postedAt: '2026-11-10',
    owner: {
      id: 'o5',
      name: 'Sunita Verma',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80&fit=crop',
      responseRate: 96,
      verifiedOwner: true,
    },
    description:
      'Secure, hygienic and fully serviced accommodation. Includes daily home-cooked meals, biometric access control, RO purified water, and housekeeping.',
  },
  {
    id: '6',
    title: 'Executive 2BHK Flat with Lake View',
    type: 'flat',
    propertyTypeName: 'Apartment',
    price: 31000,
    deposit: 75000,
    location: {
      city: 'Mumbai',
      area: 'Powai',
      address: 'Hiranandani Complex, Central Avenue, Powai',
      lat: 19.1176,
      lng: 72.9060,
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 890,
    furnished: 'semi-furnished',
    furnishedLabel: 'Semi Furnished',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=85&fit=crop', // Elegant apartment interior with expansive windows
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&q=85&fit=crop',
    ],
    amenities: ['wifi', 'ac', 'parking', 'gym', 'lift', 'powerbackup'],
    rating: 4.88,
    reviewCount: 36,
    isVerified: true,
    isAvailable: true,
    postedAt: '2026-10-20',
    owner: {
      id: 'o6',
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80&fit=crop',
      responseRate: 92,
      verifiedOwner: true,
    },
    description:
      'High-rise residential apartment overlooking Powai Lake. Modern fittings, piped natural gas, clubhouse access, swimming pool, and dedicated basement parking.',
  },
]

const additionalListings = [
  ['7', 'Sunny private room near Manyata Tech Park', 'room', 'Private Room', 10500, 'Bengaluru', 'Hebbal', 1, 1, 290, 'semi-furnished', 'photo-1616486338812-3dadae4b4ace'],
  ['8', 'Shared twin room in a managed co-living home', 'room', 'Shared Room', 7200, 'Pune', 'Viman Nagar', 1, 1, 180, 'fully-furnished', 'photo-1616486029423-aaa4789e8c9a'],
  ['9', 'Compact studio beside HUDA City Centre', 'flat', 'Studio Apartment', 22000, 'Gurugram', 'Sector 41', 1, 1, 510, 'semi-furnished', 'photo-1600210492486-724fe5c67fb0'],
  ['10', 'Bright 1BHK close to metro and markets', 'flat', '1BHK Apartment', 18500, 'Delhi', 'Lajpat Nagar', 1, 1, 680, 'semi-furnished', 'photo-1600607687939-ce8a6c25118c'],
  ['11', 'Renovated 2BHK with balcony and parking', 'flat', '2BHK Apartment', 28500, 'Hyderabad', 'Kondapur', 2, 2, 1120, 'fully-furnished', 'photo-1600607687920-4e2a09cf159d'],
  ['12', 'Family-ready 3BHK in a gated community', 'flat', '3BHK Apartment', 42000, 'Noida', 'Sector 50', 3, 2, 1580, 'semi-furnished', 'photo-1600566753086-00f18fb6b3ea'],
  ['13', 'Independent home with a quiet courtyard', 'house', 'Independent House', 36000, 'Jaipur', 'Vaishali Nagar', 2, 2, 1420, 'fully-furnished', 'photo-1600607687920-4e2a09cf159d'],
  ['14', 'Modern duplex with private terrace', 'house', 'Independent House', 56000, 'Bengaluru', 'Sarjapur Road', 3, 3, 1980, 'semi-furnished', 'photo-1600585154340-be6161a56a0c'],
  ['15', 'Clean women-only PG with meals and Wi-Fi', 'pg', 'PG / Hostel', 12500, 'Mumbai', 'Andheri East', 1, 1, 230, 'fully-furnished', 'photo-1555854877-bab0e564b8d5'],
  ['16', 'Affordable co-living room near Hinjawadi Phase 1', 'pg', 'PG / Hostel', 9800, 'Pune', 'Hinjawadi', 1, 1, 205, 'fully-furnished', 'photo-1564078516393-cf04bd966897'],
  ['17', 'Well-lit 1BHK near Gachibowli offices', 'flat', '1BHK Apartment', 19500, 'Hyderabad', 'Manikonda', 1, 1, 720, 'unfurnished', 'photo-1600566753190-17f0baa2a6c3'],
  ['18', 'Spacious 2BHK with open views and lift', 'flat', '2BHK Apartment', 33500, 'Mumbai', 'Chembur', 2, 2, 1040, 'semi-furnished', 'photo-1600607687644-c7171b42498f'],
]

const additionalGalleryPhotos = [
  'photo-1600607687920-4e2a09cf159d', 'photo-1600566753376-12c8ab7fb75b', 'photo-1600607687939-ce8a6c2518c',
  'photo-1600210492486-724fe5c67fb0', 'photo-1600566753086-00f18fb6b3ea', 'photo-1600566753190-17f0baa2a6c3',
  'photo-1600566753376-12c8ab7fb75b', 'photo-1600607687920-4e2a09cf159d', 'photo-1564078516393-cf04bd966897',
  'photo-1600210492486-724fe5c67fb0', 'photo-1600607687939-ce8a6c2518c', 'photo-1600566753086-00f18fb6b3ea',
]

for (const [index, [id, title, type, propertyTypeName, price, city, area, bedrooms, bathrooms, size, furnished, photo]] of additionalListings.entries()) {
  mockProperties.push({
    id, title, type, propertyTypeName, price, deposit: price * 2,
    location: { city, area, address: `${area}, ${city}`, lat: null, lng: null },
    bedrooms, bathrooms, area: size, furnished,
    furnishedLabel: furnished.replace('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    images: [`https://images.unsplash.com/${photo}?w=900&q=85&fit=crop`, `https://images.unsplash.com/${additionalGalleryPhotos[index]}?w=900&q=85&fit=crop`],
    amenities: ['wifi', 'security', 'parking'], rating: null, reviewCount: 0, isVerified: false, isAvailable: true,
    postedAt: '2026-11-12',
    owner: { id: `owner-${id}`, name: 'NextFind Demo Host', avatar: '', responseRate: 95, verifiedOwner: false },
    description: `${title}. A well-maintained rental in ${area}, with practical amenities and convenient access to everyday essentials.`,
  })
}
