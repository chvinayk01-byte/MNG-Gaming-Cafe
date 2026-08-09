export type StationAvailability = 'available' | 'occupied' | 'reserved' | 'maintenance';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type TournamentStatus = 'upcoming' | 'registration_open' | 'full' | 'live' | 'completed';
export type MessageStatus = 'unread' | 'read';

export interface GamingCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  priceStartingAt?: number;
  specifications?: string[];
  isAvailable: boolean;
  stationCount: number;
  isFeatured: boolean;
}

export interface GamingStation {
  id: string;
  name: string;
  categoryId: string;
  image: string;
  cpu?: string;
  gpu?: string;
  ram?: string;
  monitor?: string;
  refreshRate?: string;
  headset?: string;
  keyboard?: string;
  mouse?: string;
  otherSpecs?: string[];
  hourlyPrice?: number;
  availability: StationAvailability;
  isFeatured: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  duration: string; // e.g. "1 Hour", "2 Hours", "Day Pass"
  price?: number;
  discount?: string;
  description: string;
  applicableDays: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface Booking {
  id: string;
  bookingCode: string; // e.g. MNG-2026-0001
  setupId: string;
  setupName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  durationHours: number;
  playerCount: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  totalPrice?: number;
  status: BookingStatus;
  createdAt: string;
}

export interface Game {
  id: string;
  name: string;
  coverImage: string;
  genre: string;
  platform: string;
  mode: 'multiplayer' | 'singleplayer' | 'both';
  maxPlayers?: number;
  description: string;
  isAvailable: boolean;
}

export interface Tournament {
  id: string;
  title: string;
  gameName: string;
  date: string;
  time: string;
  entryFee?: number;
  prizePool?: string;
  maxPlayers: number;
  registeredCount: number;
  status: TournamentStatus;
  rules: string[];
  image: string;
}

export interface TournamentRegistration {
  id: string;
  registrationCode: string;
  tournamentId: string;
  tournamentTitle: string;
  playerName: string;
  phone: string;
  email?: string;
  gameId: string;
  teamName?: string;
  playerCount: number;
  notes?: string;
  createdAt: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price?: number;
  validity: string;
  benefits: string[];
  discountPercent?: number;
  bonusHours?: number;
  hasTournamentBenefits: boolean;
  hasPriorityBooking: boolean;
  isActive: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Google Maps Photo' | 'Gaming Setup' | 'Café Interior' | 'Events' | 'Tournaments' | 'Community' | 'Other';
  imageUrl: string;
  isFeatured: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export interface BusinessDayHours {
  day: string;
  openTime: string; // e.g. "10:00 AM"
  closeTime: string; // e.g. "10:00 PM"
  isClosed: boolean;
}

export interface BusinessInfo {
  name: string;
  category: string;
  address: string;
  phone: string;
  whatsapp: string;
  googleMapsUrl: string;
  rating: number;
  reviewCount: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  statusOverride: 'auto' | 'open' | 'closed';
}
