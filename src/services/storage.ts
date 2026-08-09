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
    name: "Gaming PCs",
    description: "High-performance PC gaming stations configured for esports, high FPS competitive titles, and immersive graphics.",
    image: "/images/hero.jpg",
    isAvailable: true,
    stationCount: 10,
    isFeatured: true,
  },
  {
    id: "cat-console",
    name: "Console Gaming",
    description: "Next-gen sofa gaming area ideal for co-op multiplayer, sports, fighting games, and lounge sessions with friends.",
    image: "/images/interior.jpg",
    isAvailable: true,
    stationCount: 4,
    isFeatured: true,
  },
  {
    id: "cat-multiplayer",
    name: "Multiplayer Lounge",
    description: "Group battle stations designed for squad gaming, LAN parties, and friendly tournaments.",
    image: "/images/community.jpg",
    isAvailable: true,
    stationCount: 6,
    isFeatured: true,
  }
];

const DEFAULT_STATIONS: GamingStation[] = [
  {
    id: "st-1",
    name: "Esports PC Station #1",
    categoryId: "cat-pc",
    image: "/images/hero.jpg",
    cpu: "High-Performance Multi-Core CPU",
    gpu: "Dedicated Gaming GPU",
    ram: "16GB High-Speed DDR4/DDR5",
    monitor: "High-Refresh Rate Gaming Monitor",
    refreshRate: "144Hz / 240Hz",
    headset: "Surround Sound Gaming Headset",
    keyboard: "Mechanical RGB Keyboard",
    mouse: "Precision Gaming Mouse",
    availability: "available",
    isFeatured: true,
  },
  {
    id: "st-2",
    name: "Esports PC Station #2",
    categoryId: "cat-pc",
    image: "/images/interior.jpg",
    cpu: "High-Performance Multi-Core CPU",
    gpu: "Dedicated Gaming GPU",
    ram: "16GB RAM",
    monitor: "Esports Display",
    refreshRate: "144Hz",
    headset: "Pro Gaming Headset",
    keyboard: "Mechanical RGB",
    mouse: "Gaming Mouse",
    availability: "available",
    isFeatured: true,
  },
  {
    id: "st-3",
    name: "Console Zone - Station A",
    categoryId: "cat-console",
    image: "/images/community.jpg",
    monitor: "4K HDR Ultra HD Display",
    headset: "Dual Wireless Controllers & Audio",
    availability: "available",
    isFeatured: true,
  }
];

const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: "pr-1",
    name: "Quick Game (1 Hour)",
    duration: "1 Hour",
    description: "Perfect for a quick match or warm-up session.",
    applicableDays: "Monday - Sunday",
    isFeatured: false,
    isActive: true,
  },
  {
    id: "pr-2",
    name: "Gamer Pass (3 Hours)",
    duration: "3 Hours",
    description: "Best value for extended squad gaming and competitive sessions.",
    applicableDays: "Monday - Sunday",
    isFeatured: true,
    isActive: true,
  },
  {
    id: "pr-3",
    name: "Day Grind Pass",
    duration: "5+ Hours",
    description: "Ultimate marathon pass for serious gamers and tournament training.",
    applicableDays: "Monday - Saturday",
    isFeatured: false,
    isActive: true,
  }
];

const DEFAULT_GAMES: Game[] = [
  {
    id: "gm-1",
    name: "VALORANT",
    coverImage: "/images/community.jpg",
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
    coverImage: "/images/interior.jpg",
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
    coverImage: "/images/hero.jpg",
    genre: "Sports",
    platform: "Console / PC",
    mode: "multiplayer",
    maxPlayers: 4,
    description: "The world's game featuring realistic football action and couch co-op multiplayer.",
    isAvailable: true,
  },
  {
    id: "gm-4",
    name: "Tekken / Fighting Lounge",
    coverImage: "/images/interior.jpg",
    genre: "Fighting",
    platform: "Console / PC",
    mode: "multiplayer",
    maxPlayers: 2,
    description: "High-octane 1v1 fighting games for intense couch duels.",
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
    image: "/images/hero.jpg"
  }
];

const DEFAULT_MEMBERSHIPS: MembershipPlan[] = [
  {
    id: "mem-1",
    name: "Rookie Member",
    validity: "1 Month",
    benefits: [
      "Discounted hourly rates",
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
      "Maximum discount on all sessions",
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
    id: "gal-real-1",
    title: "MNG Gaming Cafe - Official Neon Entrance & Reception",
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
    id: "gal-real-3",
    title: "High-Spec RGB PC Esports Battle Stations",
    category: "Gaming Setup",
    imageUrl: "/images/mng_pc_stations.jpg",
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
    id: "gal-1",
    title: "Pro Gaming Battle Setup",
    category: "Gaming Setup",
    imageUrl: "/images/hero.jpg",
    isFeatured: false
  },
  {
    id: "gal-2",
    title: "Ambient Lounge Arena",
    category: "Café Interior",
    imageUrl: "/images/interior.jpg",
    isFeatured: false
  },
  {
    id: "gal-3",
    title: "Community Esports Gathering",
    category: "Community",
    imageUrl: "/images/community.jpg",
    isFeatured: false
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

// Helper to interact with LocalStorage
class LocalStorageEngine {
  private getItem<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(`mng_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`mng_${key}`, JSON.stringify(value));
    } catch (err) {
      console.error('LocalStorage error:', err);
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
    return this.getItem('categories', DEFAULT_CATEGORIES);
  }
  saveCategories(data: GamingCategory[]): void {
    this.setItem('categories', data);
  }

  // Stations
  getStations(): GamingStation[] {
    return this.getItem('stations', DEFAULT_STATIONS);
  }
  saveStations(data: GamingStation[]): void {
    this.setItem('stations', data);
  }

  // Pricing
  getPricing(): PricingPlan[] {
    return this.getItem('pricing', DEFAULT_PRICING);
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
    return items.filter(i => i.id !== 'gal-gmaps-1' && i.category !== ('Google Maps Photo' as any));
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

export const db = new LocalStorageEngine();

// Calculate open / closed status for Hyderabad timezone (IST / UTC+5:30)
export function getStoreStatus(info: BusinessInfo, hoursList: BusinessDayHours[]): {
  isOpen: boolean;
  statusText: string;
  todayHoursText: string;
} {
  if (info.statusOverride === 'open') {
    return { isOpen: true, statusText: 'OPEN NOW (Manual)', todayHoursText: 'Manual Override' };
  }
  if (info.statusOverride === 'closed') {
    return { isOpen: false, statusText: 'CLOSED (Manual)', todayHoursText: 'Manual Override' };
  }

  const now = new Date();
  const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utcMs + (3600000 * 5.5)); // IST is UTC + 5:30

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = days[istTime.getDay()];

  const todaySchedule = hoursList.find(h => h.day.toLowerCase() === currentDayName.toLowerCase());

  if (!todaySchedule || todaySchedule.isClosed) {
    return { isOpen: false, statusText: 'CLOSED TODAY', todayHoursText: 'Closed' };
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

  const isOpen = currentMinutes >= openMins && currentMinutes < closeMins;
  const todayHoursText = `${todaySchedule.openTime} – ${todaySchedule.closeTime}`;

  return {
    isOpen,
    statusText: isOpen ? 'OPEN NOW' : 'CLOSED NOW',
    todayHoursText
  };
}
