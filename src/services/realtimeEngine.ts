import { createClient, RealtimeChannel } from '@supabase/supabase-js';

// Environment credentials for Supabase Cloud Database & Realtime WebSockets
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://mng-gaming-cafe.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.demoKey';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Initialize Supabase Client
export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Global Online Cloud Realtime Relay Endpoint (High-Performance Deno KV & SSE Stream)
const REALTIME_CLOUD_RELAY = 'https://kv-store-api.deno.dev/mng_gaming_cafe_v2';

export type RealtimeEntityKey =
  | 'business_info'
  | 'business_hours'
  | 'categories'
  | 'stations'
  | 'pricing'
  | 'bookings'
  | 'games'
  | 'tournaments'
  | 'tournament_registrations'
  | 'memberships'
  | 'gallery'
  | 'contact_messages';

export type RealtimeListener = (key: RealtimeEntityKey, data: any) => void;

class PortfolioRealtimeEngine {
  private listeners: Set<RealtimeListener> = new Set();
  private supabaseChannel: RealtimeChannel | null = null;
  private eventSource: EventSource | null = null;
  private isConnected = false;

  constructor() {
    this.initSupabaseRealtime();
    this.initCloudSSE();
  }

  // Subscribe to real-time online updates across all components
  subscribe(listener: RealtimeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(key: RealtimeEntityKey, data: any): void {
    this.listeners.forEach((listener) => {
      try {
        listener(key, data);
      } catch (err) {
        console.error(`[RealtimeEngine] Listener error for ${key}:`, err);
      }
    });
  }

  // 1. Supabase Realtime WebSockets Listener
  private initSupabaseRealtime(): void {
    if (!supabase) return;

    try {
      this.supabaseChannel = supabase
        .channel('mng-global-realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public' },
          (payload) => {
            console.log('[Supabase Realtime] Database Event:', payload.table, payload.eventType);
            const tableToKeyMap: Record<string, RealtimeEntityKey> = {
              gaming_categories: 'categories',
              gaming_stations: 'stations',
              pricing_plans: 'pricing',
              bookings: 'bookings',
              games: 'games',
              tournaments: 'tournaments',
              tournament_registrations: 'tournament_registrations',
              memberships: 'memberships',
              gallery_items: 'gallery',
              contact_messages: 'contact_messages'
            };

            const key = tableToKeyMap[payload.table];
            if (key) {
              // Trigger reload for that entity
              this.fetchLatestCloudData(key);
            }
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('[Supabase Realtime] Connected & Listening via WebSockets!');
            this.isConnected = true;
          }
        });
    } catch (err) {
      console.warn('[Supabase Realtime] Setup error:', err);
    }
  }

  // 2. Global Server-Sent Events (SSE) / WebSocket Relay Stream
  private initCloudSSE(): void {
    if (typeof window === 'undefined') return;

    try {
      // Connect to online real-time cloud SSE stream
      this.eventSource = new EventSource(`${REALTIME_CLOUD_RELAY}/stream`);

      this.eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload && payload.key && payload.data) {
            this.notify(payload.key as RealtimeEntityKey, payload.data);
          }
        } catch {
          // silent parse error
        }
      };

      this.eventSource.onerror = () => {
        // SSE auto-reconnects
      };
    } catch (err) {
      // silent fallback
    }
  }

  // Broadcast an online change globally across all devices
  async broadcastOnlineChange(key: RealtimeEntityKey, data: any): Promise<void> {
    // 1. Notify local listeners on current device
    this.notify(key, data);

    // 2. Push to Online Realtime Cloud Relay (Instant split-second push to all devices)
    try {
      await fetch(`${REALTIME_CLOUD_RELAY}/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          data,
          timestamp: new Date().toISOString()
        })
      });
    } catch {
      // Keep local state intact if network is slow
    }

    // 3. Upsert to Supabase if configured
    if (supabase) {
      this.syncEntityToSupabase(key, data).catch((err) => {
        console.warn(`[Supabase Upsert] Error for ${key}:`, err);
      });
    }
  }

  // Fetch entity from Cloud Database
  async fetchLatestCloudData(key: RealtimeEntityKey): Promise<any | null> {
    try {
      const res = await fetch(`${REALTIME_CLOUD_RELAY}/get/${key}`, {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json && json.data) {
          this.notify(key, json.data);
          return json.data;
        }
      }
    } catch {
      // Fallback
    }
    return null;
  }

  // Helper to sync entity directly to Supabase Tables
  private async syncEntityToSupabase(key: RealtimeEntityKey, data: any): Promise<void> {
    if (!supabase) return;

    if (key === 'contact_messages' && Array.isArray(data) && data.length > 0) {
      const latest = data[0];
      await supabase.from('contact_messages').upsert({
        id: latest.id,
        name: latest.name,
        phone: latest.phone,
        email: latest.email || null,
        message: latest.message,
        status: latest.status || 'unread',
        created_at: latest.createdAt || new Date().toISOString()
      });
    } else if (key === 'pricing' && Array.isArray(data)) {
      const formatted = data.map((p) => ({
        id: p.id,
        name: p.name,
        duration: p.duration,
        price: p.price || null,
        discount: p.discount || null,
        description: p.description || '',
        applicable_days: p.applicableDays || 'Monday - Sunday',
        is_featured: p.isFeatured || false,
        is_active: p.isActive !== false
      }));
      await supabase.from('pricing_plans').upsert(formatted);
    } else if (key === 'bookings' && Array.isArray(data) && data.length > 0) {
      const latest = data[0];
      await supabase.from('bookings').upsert({
        id: latest.id,
        booking_code: latest.bookingCode || `MNG-${Date.now()}`,
        setup_name: latest.setupName || 'Gaming Station',
        date: latest.date || new Date().toISOString().split('T')[0],
        time_slot: latest.timeSlot || '04:00 PM',
        duration_hours: latest.durationHours || 1,
        player_count: latest.playerCount || 1,
        customer_name: latest.customerName,
        customer_phone: latest.customerPhone,
        customer_email: latest.customerEmail || null,
        status: latest.status || 'pending'
      });
    }
  }
}

export const realtimeEngine = new PortfolioRealtimeEngine();
