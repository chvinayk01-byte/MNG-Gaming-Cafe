import {
  BusinessInfo,
  BusinessDayHours,
  GamingCategory,
  GamingStation,
  PricingPlan,
  Booking,
  Game,
  Tournament,
  TournamentRegistration,
  MembershipPlan,
  GalleryItem,
  ContactMessage
} from '../types';

// Verified Business Information (Strict baseline per specs)
export const VERIFIED_BUSINESS_INFO: BusinessInfo = {
  name: "MNG Gaming Cafe",
  category: "Gaming Cafe / Game Shop",
  address: "House No. 7-49, Konark Theatre Lane, opposite Satyanarayana Swamy Temple, Gaddiannaram, Madhura Puri Colony, Dilsukhnagar, Hyderabad, Telangana 500070, India",
  phone: "+91 81433 44336",
  whatsapp: "+91 81433 44336",
  googleMapsUrl: "https://www.google.com/maps/place/MNG+Gaming+Cafe/@17.3667396,78.5253742,3a,75y,90t/data=!3m8!1e2!3m6!1sCIABIhBTYSrVclFSQsEM97BQ_Io-!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWkfweFwrdkPKP1i4wHJjTGO6SkVW8kTHU0ndD3k86iQEbUFoK-Vy07acaVIGLL1HWo6lbiTz5SY8aQX9wkPOWyKJqS-TktSCHHvlPd6BsnLBg_G2OTcDXYUROtK5h5EtQEQIToc9T1JbIgL%3Dw203-h124-k-no!7i6240!8i3832!4m18!1m8!3m7!1s0x3bcb990044fe7f7f:0x2b6c00bdab1457c7!2sMNG+Gaming+Cafe!8m2!3d17.3666612!4d78.5253429!10e1!16s%2Fg%2F11xkq_vbfd!3m8!1s0x3bcb990044fe7f7f:0x2b6c00bdab1457c7!8m2!3d17.3666612!4d78.5253429!10e5!14m1!1BCgIgAQ!16s%2Fg%2F11xkq_vbfd",
  rating: 5.0,
  reviewCount: 60,
  coordinates: {
    lat: 17.3666612,
    lng: 78.5253429
  },
  statusOverride: 'auto'
};

export const VERIFIED_BUSINESS_HOURS: BusinessDayHours[] = [
  { day: "Monday", openTime: "10:00 AM", closeTime: "10:00 PM", isClosed: false },
  { day: "Tuesday", openTime: "10:00 AM", closeTime: "10:00 PM", isClosed: false },
  { day: "Wednesday", openTime: "10:00 AM", closeTime: "10:00 PM", isClosed: false },
  { day: "Thursday", openTime: "10:00 AM", closeTime: "10:00 PM", isClosed: false },
  { day: "Friday", openTime: "10:00 AM", closeTime: "10:00 PM", isClosed: false },
  { day: "Saturday", openTime: "10:00 AM", closeTime: "10:00 PM", isClosed: false },
  { day: "Sunday", openTime: "12:00 PM", closeTime: "06:00 PM", isClosed: false },
];

// Seed Data using high resolution cafe interior images
const DEFAULT_CATEGORIES: GamingCategory[] = [
  {
    id: "cat-pc",
    name: "PC Gaming",
    description: "High-FPS Esports PC battle stations with 144Hz/240Hz displays, gaming gear, and preloaded competitive games.",
    image: "/images/mng_pc_stations.jpg",
    priceStartingAt: 150,
    isAvailable: true,
    stationCount: 10,
    isFeatured: true,
  },
  {
    id: "cat-ps5",
    name: "PS 5 Console Lounge",
    description: "PlayStation 5 sofa gaming lounge. Single player: ₹150 / hr | Double player: ₹200 / hr.",
    image: "/images/mng_pool_lounge.jpg",
    priceStartingAt: 150,
    isAvailable: true,
    stationCount: 4,
    isFeatured: true,
  },
  {
    id: "cat-ps5-pro",
    name: "PS 5 PRO Lounge",
    description: "Ultra high-definition PS5 Pro lounge. Single player: ₹200 / hr | Per Controller: ₹100 / hr.",
    image: "/images/mng_pool_lounge.jpg",
    priceStartingAt: 200,
    isAvailable: true,
    stationCount: 2,
    isFeatured: true,
  },
  {
    id: "cat-snooker",
    name: "Snooker & Pool Table",
    description: "Professional full-size snooker and pool table lounge at ₹200 / hr.",
    image: "/images/mng_full_interior.jpg",
    priceStartingAt: 200,
    isAvailable: true,
    stationCount: 2,
    isFeatured: true,
  },
  {
    id: "cat-board-games",
    name: "Board Games Zone",
    description: "Chess, Jenga, and tabletop board games area at ₹100 / hr.",
    image: "/images/mng_neon_reception.jpg",
    priceStartingAt: 100,
    isAvailable: true,
    stationCount: 4,
    isFeatured: true,
  }
];

const DEFAULT_STATIONS: GamingStation[] = [
  {
    id: "st-pc-1",
    name: "Esports PC Battle Station #1",
    categoryId: "cat-pc",
    image: "/images/mng_pc_stations.jpg",
    cpu: "High-Performance Multi-Core CPU",
    gpu: "Dedicated Esports GPU",
    ram: "16GB DDR4/DDR5 RAM",
    monitor: "240Hz High-Refresh Gaming Monitor",
    refreshRate: "240Hz",
    headset: "Pro Gaming Headset",
    keyboard: "Mechanical RGB Keyboard",
    mouse: "Precision Gaming Mouse",
    hourlyPrice: 150,
    availability: "available",
    isFeatured: true,
  },
  {
    id: "st-pc-2",
    name: "Esports PC Battle Station #2",
    categoryId: "cat-pc",
    image: "/images/mng_pc_stations.jpg",
    cpu: "High-Performance Multi-Core CPU",
    gpu: "Dedicated Esports GPU",
    ram: "16GB RAM",
    monitor: "144Hz Gaming Display",
    refreshRate: "144Hz",
    headset: "Pro Gaming Headset",
    keyboard: "Mechanical RGB Keyboard",
    mouse: "Gaming Mouse",
    hourlyPrice: 150,
    availability: "available",
    isFeatured: true,
  },
  {
    id: "st-ps5-1",
    name: "PS 5 Lounge Zone",
    categoryId: "cat-ps5",
    image: "/images/mng_pool_lounge.jpg",
    monitor: "4K Ultra HD Display",
    headset: "DualSense Controllers",
    hourlyPrice: 150,
    otherSpecs: ["Single Player: ₹150 / hr", "Double Player: ₹200 / hr"],
    availability: "available",
    isFeatured: true,
  },
  {
    id: "st-ps5pro-1",
    name: "PS 5 PRO Lounge Zone",
    categoryId: "cat-ps5-pro",
    image: "/images/mng_pool_lounge.jpg",
    monitor: "4K HDR Pro Display",
    headset: "PS5 Pro DualSense Edge",
    hourlyPrice: 200,
    otherSpecs: ["Single Player: ₹200 / hr", "Per Controller: ₹100 / hr"],
    availability: "available",
    isFeatured: true,
  },
  {
    id: "st-snooker-1",
    name: "Snooker & Pool Table",
    categoryId: "cat-snooker",
    image: "/images/mng_full_interior.jpg",
    hourlyPrice: 200,
    otherSpecs: ["Professional Cues & Balls", "₹200 / hr"],
    availability: "available",
    isFeatured: true,
  },
  {
    id: "st-board-1",
    name: "Board Games Table (Chess / Jenga)",
    categoryId: "cat-board-games",
    image: "/images/mng_neon_reception.jpg",
    hourlyPrice: 100,
    otherSpecs: ["Chess, Jenga, Cards", "₹100 / hr"],
    availability: "available",
    isFeatured: true,
  }
];

const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: "pr-pc-1h",
    name: "PC Gaming - 1 Hour",
    duration: "1 Hour",
    price: 150,
    description: "High FPS competitive PC gaming session.",
    applicableDays: "Monday - Sunday",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "pr-pc-3h",
    name: "PC Gaming - 3 Hours Pass",
    duration: "3 Hours",
    price: 250,
    discount: "Save ₹200",
    description: "Best value for squad sessions and ranked grinding.",
    applicableDays: "Monday - Sunday",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "pr-pc-5h",
    name: "PC Gaming - 5 Hours Pass",
    duration: "5 Hours",
    price: 400,
    discount: "Save ₹350",
    description: "Extended marathon pass for serious gamers.",
    applicableDays: "Monday - Sunday",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "pr-pc-8h",
    name: "PC Gaming - 8 Hours Pass",
    duration: "8 Hours",
    price: 550,
    discount: "Save ₹650",
    description: "All-day gaming pass for long competitive sessions.",
    applicableDays: "Monday - Sunday",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "pr-day-pass",
    name: "Unlimited Day Pass",
    duration: "Full Day",
    price: 700,
    discount: "Best Value",
    description: "Full day access to PC gaming & cafe facilities.",
    applicableDays: "Monday - Sunday",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "pr-ps5-single",
    name: "PS 5 - Single Player",
    duration: "1 Hour",
    price: 150,
    description: "PS5 solo gaming session per hour.",
    applicableDays: "Monday - Sunday",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "pr-ps5-double",
    name: "PS 5 - Double Player",
    duration: "1 Hour",
    price: 200,
    description: "PS5 2-player co-op / 1v1 lounge gaming session per hour.",
    applicableDays: "Monday - Sunday",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "pr-ps5pro-single",
    name: "PS 5 PRO - Single Player",
    duration: "1 Hour",
    price: 200,
    description: "Next-gen PS5 Pro solo gaming session per hour.",
    applicableDays: "Monday - Sunday",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "pr-ps5pro-controller",
    name: "PS 5 PRO - Extra Controller",
    duration: "1 Hour",
    price: 100,
    description: "Additional controller for PS5 Pro per hour.",
    applicableDays: "Monday - Sunday",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "pr-snooker",
    name: "Snooker / Pool Table",
    duration: "1 Hour",
    price: 200,
    description: "Snooker & pool table access per hour.",
    applicableDays: "Monday - Sunday",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "pr-board",
    name: "Any Board Game",
    duration: "1 Hour",
    price: 100,
    description: "Chess, Jenga, and tabletop games per hour.",
    applicableDays: "Monday - Sunday",
    isFeatured: false,
    isActive: true,
  }
];

const DEFAULT_GAMES: Game[] = [
  {
    id: "gm-1",
    name: "VALORANT",
    coverImage: "/images/mng_pc_stations.jpg",
    genre: "FPS",
    platform: "PC",
    mode: "multiplayer",
    maxPlayers: 5,
    description: "5v5 character-based tactical shooter where precise gunplay meets adaptive agent abilities.",
    isAvailable: true,
  },
  {
    id: "gm-2",
    name: "Counter-Strike 2",
    coverImage: "/images/mng_pc_stations.jpg",
    genre: "FPS",
    platform: "PC",
    mode: "multiplayer",
    maxPlayers: 5,
    description: "The largest technical leap forward in Counter-Strike history.",
    isAvailable: true,
  },
  {
    id: "gm-3",
    name: "EA SPORTS FC / FIFA",
    coverImage: "/images/mng_pool_lounge.jpg",
    genre: "Sports",
    platform: "Console / PC",
    mode: "multiplayer",
    maxPlayers: 4,
    description: "The world's game featuring realistic football action and couch co-op multiplayer.",
    isAvailable: true,
  },
  {
    id: "gm-4",
    name: "Tekken 8 / Spider-Man 2",
    coverImage: "/images/mng_pool_lounge.jpg",
    genre: "Fighting / Action",
    platform: "Console / PC",
    mode: "multiplayer",
    maxPlayers: 2,
    description: "High-octane 1v1 fighting and action games for intense lounge duels.",
    isAvailable: true,
  }
];

const DEFAULT_TOURNAMENTS: Tournament[] = [
  {
    id: "tour-1",
    title: "Dilsukhnagar Valorant Showdown",
    gameName: "VALORANT",
    date: "2026-08-23",
    time: "02:00 PM",
    prizePool: "Exciting Rewards & Bragging Rights",
    maxPlayers: 16,
    registeredCount: 4,
    status: "registration_open",
    rules: [
      "5v5 Tournament Format",
      "Bring your own gear allowed or use cafe setups",
      "Fair play & sportsmanship rules strictly enforced"
    ],
    image: "/images/mng_pc_stations.jpg"
  }
];

const DEFAULT_MEMBERSHIPS: MembershipPlan[] = [
  {
    id: "mem-1",
    name: "Rookie Pass Member",
    validity: "1 Month",
    benefits: [
      "Special hourly rates on PC & PS5",
      "Priority seat reservations",
      "Member-only discord access"
    ],
    hasTournamentBenefits: false,
    hasPriorityBooking: true,
    isActive: true,
  },
  {
    id: "mem-2",
    name: "Pro Esports Member",
    validity: "3 Months",
    benefits: [
      "Maximum discount on all PC & PS5 sessions",
      "Free tournament entry pass",
      "Dedicated PC reservation preference",
      "Bonus gaming hours on weekends"
    ],
    hasTournamentBenefits: true,
    hasPriorityBooking: true,
    isActive: true,
  }
];

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal-real-lounge-interior",
    title: "MNG Gaming Arena - ANT Esports Battle Lounge & Workstations",
    category: "Café Interior",
    imageUrl: "/images/mng_lounge_interior.jpg",
    isFeatured: true
  },
  {
    id: "gal-real-1",
    title: "Official Neon Entrance & Reception",
    category: "Café Interior",
    imageUrl: "/images/mng_neon_reception.jpg",
    isFeatured: true
  },
  {
    id: "gal-real-2",
    title: "Pool & Snooker Lounge with Console Wall Art",
    category: "Café Interior",
    imageUrl: "/images/mng_pool_lounge.jpg",
    isFeatured: true
  },
  {
    id: "gal-real-4",
    title: "MNG Gaming Arena - Full Lounge View",
    category: "Café Interior",
    imageUrl: "/images/mng_full_interior.jpg",
    isFeatured: true
  },
  {
    id: "gal-real-3",
    title: "High-Spec RGB PC Esports Battle Stations",
    category: "Gaming Setup",
    imageUrl: "/images/mng_pc_stations.jpg",
    isFeatured: true
  }
];

const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: "b-1",
    bookingCode: "MNG-2026-0001",
    setupId: "st-1",
    setupName: "Esports PC Station #1",
    date: "2026-08-10",
    timeSlot: "04:00 PM",
    durationHours: 2,
    playerCount: 1,
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    status: "confirmed",
    createdAt: "2026-08-08T18:00:00Z"
  }
];

import { realtimeEngine, RealtimeEntityKey } from './realtimeEngine';

type DataChangeListener = (key: RealtimeEntityKey, data: any) => void;

// Helper to interact with LocalStorage & Realtime Cloud Engine
class RealtimeCloudStorageEngine {
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel('mng_realtime_channel');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data && event.data.key) {
            this.notifyLocalListeners(event.data.key as RealtimeEntityKey, event.data.value, false);
          }
        };
      }

      window.addEventListener('storage', (e) => {
        if (e.key && e.key.startsWith('mng_')) {
          const key = e.key.replace('mng_', '') as RealtimeEntityKey;
          try {
            const data = e.newValue ? JSON.parse(e.newValue) : null;
            this.notifyLocalListeners(key, data, false);
          } catch {
            // silent catch
          }
        }
      });

      // Subscribe to global online WebSocket & SSE Realtime events
      realtimeEngine.subscribe((key, data) => {
        if (!data) return;
        try {
          const localStr = localStorage.getItem(`mng_${key}`) || '';
          const newStr = JSON.stringify(data);
          if (localStr !== newStr) {
            localStorage.setItem(`mng_${key}`, newStr);
            this.notifyLocalListeners(key, data, false);
          }
        } catch {
          // silent catch
        }
      });
    }
  }

  // Subscribe to live data changes across app
  subscribe(listener: DataChangeListener): () => void {
    return realtimeEngine.subscribe(listener);
  }

  private notifyLocalListeners(key: RealtimeEntityKey, data: any, broadcast = true): void {
    if (broadcast && this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ key, value: data, time: Date.now() });
      } catch (err) {
        // silent catch
      }
    }
  }

  private getItem<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(`mng_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: RealtimeEntityKey, value: T): void {
    try {
      localStorage.setItem(`mng_${key}`, JSON.stringify(value));
      this.notifyLocalListeners(key, value, true);
      // Broadcast online change across all devices in real-time WebSockets / SSE
      realtimeEngine.broadcastOnlineChange(key, value);
    } catch (err) {
      console.error('Storage error:', err);
    }
  }

  // Business Info
  getBusinessInfo(): BusinessInfo {
    return this.getItem('business_info', VERIFIED_BUSINESS_INFO);
  }
  saveBusinessInfo(info: BusinessInfo): void {
    this.setItem('business_info', info);
  }

  // Business Hours
  getBusinessHours(): BusinessDayHours[] {
    return this.getItem('business_hours', VERIFIED_BUSINESS_HOURS);
  }
  saveBusinessHours(hours: BusinessDayHours[]): void {
    this.setItem('business_hours', hours);
  }

  // Categories
  getCategories(): GamingCategory[] {
    const items = this.getItem('categories', DEFAULT_CATEGORIES);
    if (!items.some(i => i.id === 'cat-ps5' || i.id === 'cat-ps5-pro')) {
      return DEFAULT_CATEGORIES;
    }
    return items;
  }
  saveCategories(data: GamingCategory[]): void {
    this.setItem('categories', data);
  }

  // Stations
  getStations(): GamingStation[] {
    const items = this.getItem('stations', DEFAULT_STATIONS);
    if (!items.some(i => i.id === 'st-ps5-1')) {
      return DEFAULT_STATIONS;
    }
    return items;
  }
  saveStations(data: GamingStation[]): void {
    this.setItem('stations', data);
  }

  // Pricing
  getPricing(): PricingPlan[] {
    const items = this.getItem('pricing', DEFAULT_PRICING);
    if (!items.some(i => i.id === 'pr-pc-1h' || i.id === 'pr-day-pass')) {
      return DEFAULT_PRICING;
    }
    return items;
  }
  savePricing(data: PricingPlan[]): void {
    this.setItem('pricing', data);
  }

  // Games
  getGames(): Game[] {
    return this.getItem('games', DEFAULT_GAMES);
  }
  saveGames(data: Game[]): void {
    this.setItem('games', data);
  }

  // Tournaments
  getTournaments(): Tournament[] {
    return this.getItem('tournaments', DEFAULT_TOURNAMENTS);
  }
  saveTournaments(data: Tournament[]): void {
    this.setItem('tournaments', data);
  }

  // Tournament Registrations
  getRegistrations(): TournamentRegistration[] {
    return this.getItem('tournament_registrations', []);
  }
  saveRegistrations(data: TournamentRegistration[]): void {
    this.setItem('tournament_registrations', data);
  }

  // Memberships
  getMemberships(): MembershipPlan[] {
    return this.getItem('memberships', DEFAULT_MEMBERSHIPS);
  }
  saveMemberships(data: MembershipPlan[]): void {
    this.setItem('memberships', data);
  }

  // Gallery
  getGallery(): GalleryItem[] {
    const items = this.getItem('gallery', DEFAULT_GALLERY);
    const cleaned = items.filter(i => i.id.startsWith('gal-real-'));
    return cleaned.length > 0 ? cleaned : DEFAULT_GALLERY;
  }
  saveGallery(data: GalleryItem[]): void {
    this.setItem('gallery', data);
  }

  // Bookings
  getBookings(): Booking[] {
    return this.getItem('bookings', DEFAULT_BOOKINGS);
  }
  saveBookings(data: Booking[]): void {
    this.setItem('bookings', data);
  }

  // Messages
  getMessages(): ContactMessage[] {
    return this.getItem('contact_messages', []);
  }
  saveMessages(data: ContactMessage[]): void {
    this.setItem('contact_messages', data);
  }
}

export const db = new RealtimeCloudStorageEngine();

// Calculate open / closed status for Hyderabad timezone (IST / UTC+5:30)
export function getStoreStatus(info: BusinessInfo, hoursList: BusinessDayHours[]): {
  isOpen: boolean;
  statusText: string;
  todayHoursText: string;
} {
  if (info.statusOverride === 'open') {
    return { isOpen: true, statusText: 'OPEN NOW', todayHoursText: 'Manual Override' };
  }
  if (info.statusOverride === 'closed') {
    return { isOpen: false, statusText: 'CLOSED NOW', todayHoursText: 'Manual Override' };
  }

  // Calculate open / closed status for Indian Standard Time (Asia/Kolkata timezone)
  const now = new Date();
  const istDateStr = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  const istTime = new Date(istDateStr);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = days[istTime.getDay()];

  const todaySchedule = hoursList.find(h => h.day.toLowerCase() === currentDayName.toLowerCase());

  if (!todaySchedule || todaySchedule.isClosed) {
    return { isOpen: false, statusText: 'CLOSED TODAY', todayHoursText: 'Closed Today' };
  }

  const currentMinutes = istTime.getHours() * 60 + istTime.getMinutes();

  const parseMinutes = (timeStr: string): number => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return 0;
    let hrs = parseInt(match[1], 10);
    const mins = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && hrs < 12) hrs += 12;
    if (ampm === 'AM' && hrs === 12) hrs = 0;
    return hrs * 60 + mins;
  };

  const openMins = parseMinutes(todaySchedule.openTime);
  const closeMins = parseMinutes(todaySchedule.closeTime);

  let isOpen = false;
  if (closeMins > openMins) {
    isOpen = currentMinutes >= openMins && currentMinutes < closeMins;
  } else if (closeMins < openMins) {
    // Overnight schedule (e.g. 10:00 PM to 02:00 AM)
    isOpen = currentMinutes >= openMins || currentMinutes < closeMins;
  } else {
    // 24 Hours open
    isOpen = true;
  }

  const todayHoursText = `${todaySchedule.openTime} – ${todaySchedule.closeTime}`;

  return {
    isOpen,
    statusText: isOpen ? 'OPEN NOW' : 'CLOSED NOW',
    todayHoursText
  };
}
