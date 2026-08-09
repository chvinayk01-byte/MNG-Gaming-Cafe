-- SQL Schema for MNG Gaming Cafe Supabase Backend

-- Enable UUID Extension
create extension if not exists "uuid-ossp";

-- 1. Gaming Categories
create table if not exists public.gaming_categories (
  id text primary key default uuid_generate_v4()::text,
  name text not null,
  description text,
  image text,
  price_starting_at numeric,
  specifications text[],
  is_available boolean default true,
  station_count integer default 0,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Gaming Stations
create table if not exists public.gaming_stations (
  id text primary key default uuid_generate_v4()::text,
  name text not null,
  category_id text references public.gaming_categories(id) on delete cascade,
  image text,
  cpu text,
  gpu text,
  ram text,
  monitor text,
  refresh_rate text,
  headset text,
  keyboard text,
  mouse text,
  other_specs text[],
  hourly_price numeric,
  availability text default 'available' check (availability in ('available', 'occupied', 'reserved', 'maintenance')),
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Pricing Plans
create table if not exists public.pricing_plans (
  id text primary key default uuid_generate_v4()::text,
  name text not null,
  duration text not null,
  price numeric,
  discount text,
  description text,
  applicable_days text default 'Monday - Sunday',
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Bookings
create table if not exists public.bookings (
  id text primary key default uuid_generate_v4()::text,
  booking_code text unique not null,
  setup_id text references public.gaming_stations(id) on delete set null,
  setup_name text not null,
  date date not null,
  time_slot text not null,
  duration_hours integer not null,
  player_count integer default 1,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  notes text,
  total_price numeric,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. Games Library
create table if not exists public.games (
  id text primary key default uuid_generate_v4()::text,
  name text not null,
  cover_image text,
  genre text,
  platform text,
  mode text check (mode in ('multiplayer', 'singleplayer', 'both')),
  max_players integer,
  description text,
  is_available boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 6. Tournaments
create table if not exists public.tournaments (
  id text primary key default uuid_generate_v4()::text,
  title text not null,
  game_name text not null,
  date date not null,
  time text not null,
  entry_fee numeric,
  prize_pool text,
  max_players integer not null,
  registered_count integer default 0,
  status text default 'registration_open' check (status in ('upcoming', 'registration_open', 'full', 'live', 'completed')),
  rules text[],
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 7. Tournament Registrations
create table if not exists public.tournament_registrations (
  id text primary key default uuid_generate_v4()::text,
  registration_code text unique not null,
  tournament_id text references public.tournaments(id) on delete cascade,
  tournament_title text not null,
  player_name text not null,
  phone text not null,
  email text,
  game_id text,
  team_name text,
  player_count integer default 1,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 8. Memberships
create table if not exists public.memberships (
  id text primary key default uuid_generate_v4()::text,
  name text not null,
  price numeric,
  validity text not null,
  benefits text[],
  discount_percent numeric,
  bonus_hours integer,
  has_tournament_benefits boolean default false,
  has_priority_booking boolean default true,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 9. Gallery Items
create table if not exists public.gallery_items (
  id text primary key default uuid_generate_v4()::text,
  title text not null,
  category text not null,
  image_url text not null,
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 10. Contact Messages
create table if not exists public.contact_messages (
  id text primary key default uuid_generate_v4()::text,
  name text not null,
  phone text not null,
  email text,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table public.gaming_categories enable row level security;
alter table public.gaming_stations enable row level security;
alter table public.pricing_plans enable row level security;
alter table public.bookings enable row level security;
alter table public.games enable row level security;
alter table public.tournaments enable row level security;
alter table public.tournament_registrations enable row level security;
alter table public.memberships enable row level security;
alter table public.gallery_items enable row level security;
alter table public.contact_messages enable row level security;

-- Public Read Policies
create policy "Allow public read gaming_categories" on public.gaming_categories for select using (true);
create policy "Allow public read gaming_stations" on public.gaming_stations for select using (true);
create policy "Allow public read pricing_plans" on public.pricing_plans for select using (true);
create policy "Allow public read games" on public.games for select using (true);
create policy "Allow public read tournaments" on public.tournaments for select using (true);
create policy "Allow public read memberships" on public.memberships for select using (true);
create policy "Allow public read gallery_items" on public.gallery_items for select using (true);

-- Public Insert Policies for Bookings, Registrations, Messages
create policy "Allow public insert bookings" on public.bookings for insert with check (true);
create policy "Allow public insert tournament_registrations" on public.tournament_registrations for insert with check (true);
create policy "Allow public insert contact_messages" on public.contact_messages for insert with check (true);
