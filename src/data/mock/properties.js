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

export const mockUser = {
  id: 'u1',
  name: 'Aarav Joshi',
  email: 'aarav.joshi@email.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80&fit=crop',
  role: 'tenant',
  phone: '+91 98765 43210',
  wishlist: ['1', '3'],
  joinedAt: '2026-01-15',
}
