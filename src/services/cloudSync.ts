import { createClient } from '@supabase/supabase-js';

// Supabase environment variables if available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Cloud Sync Engine key for public real-time relay
const CLOUD_SYNC_ENDPOINT = 'https://kv-store-api.deno.dev/mng_gaming_cafe_live_v1';

export type SyncDataType = 
  | 'business_info'
  | 'business_hours'
  | 'categories'
  | 'stations'
  | 'pricing'
  | 'bookings'
  | 'games'
  | 'tournaments'
  | 'memberships'
  | 'gallery'
  | 'contact_messages';

export interface CloudPayload {
  key: SyncDataType;
  data: any;
  updatedAt: string;
}

// Push local data update to the shared Cloud database
export async function pushToCloudStore(key: SyncDataType, data: any): Promise<void> {
  const payload: CloudPayload = {
    key,
    data,
    updatedAt: new Date().toISOString()
  };

  // 1. If Supabase client is initialized, sync to Supabase tables
  if (supabase) {
    try {
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
      }
    } catch (err) {
      console.warn('Supabase cloud push error:', err);
    }
  }

  // 2. High-speed Live Cloud Storage Endpoint for zero-config cross-device sync
  try {
    await fetch(`${CLOUD_SYNC_ENDPOINT}/${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    // Graceful silent fallback to local BroadcastChannel if offline
  }
}

// Fetch all shared cloud data for initial hydration & synchronization
export async function pullFromCloudStore(key: SyncDataType): Promise<any | null> {
  try {
    const response = await fetch(`${CLOUD_SYNC_ENDPOINT}/${key}`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      const result: CloudPayload = await response.json();
      if (result && result.data) {
        return result.data;
      }
    }
  } catch (err) {
    // Return null on offline / network error to keep local state intact
  }

  return null;
}
