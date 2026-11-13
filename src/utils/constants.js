// Application-wide constants

export const APP_NAME = 'NextFind'
export const APP_TAGLINE = 'Find Your Perfect Space'

export const PROPERTY_TYPES = [
  { value: 'room',      label: 'Room' },
  { value: 'flat',      label: 'Flat / Apartment' },
  { value: 'house',     label: 'House' },
  { value: 'pg',        label: 'PG / Hostel' },
  { value: 'studio',    label: 'Studio' },
  { value: 'villa',     label: 'Villa' },
]

export const FURNISHED_OPTIONS = [
  { value: 'furnished',       label: 'Fully Furnished' },
  { value: 'semi-furnished',  label: 'Semi Furnished' },
  { value: 'unfurnished',     label: 'Unfurnished' },
]

export const SORT_OPTIONS = [
  { value: 'relevance',  label: 'Most Relevant' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest',     label: 'Newest First' },
  { value: 'rating',     label: 'Top Rated' },
]

export const AMENITIES = [
  { id: 'wifi',       label: 'WiFi',          icon: 'Wifi' },
  { id: 'ac',         label: 'Air Conditioning', icon: 'Wind' },
  { id: 'parking',    label: 'Parking',       icon: 'Car' },
  { id: 'laundry',    label: 'Laundry',       icon: 'Shirt' },
  { id: 'gym',        label: 'Gym',           icon: 'Dumbbell' },
  { id: 'security',   label: '24/7 Security', icon: 'Shield' },
  { id: 'powerbackup',label: 'Power Backup',  icon: 'Zap' },
  { id: 'lift',       label: 'Lift',          icon: 'ArrowUpDown' },
  { id: 'garden',     label: 'Garden',        icon: 'Trees' },
  { id: 'cctv',       label: 'CCTV',          icon: 'Camera' },
]

export const POPULAR_CITIES = [
  'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad',
  'Pune', 'Chennai', 'Kolkata', 'Ahmedabad',
]

export const ROUTES = {
  HOME:              '/',
  EXPLORE:           '/explore',
  PROPERTY_DETAILS:  '/property/:id',
  LOGIN:             '/login',
  SIGNUP:            '/signup',
  WISHLIST:          '/wishlist',
  USER_DASHBOARD:    '/dashboard',
  OWNER_DASHBOARD:   '/owner/dashboard',
  ADD_PROPERTY:      '/owner/add-property',
  CHAT:              '/chat',
  CHAT_ROOM:         '/chat/:id',
  NOT_FOUND:         '*',
}

