import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Cpu,
  Tag,
  Gamepad2,
  Trophy,
  Crown,
  Camera,
  MessageSquare,
  Clock,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import {
  BusinessInfo,
  BusinessDayHours,
  GamingCategory,
  GamingStation,
  PricingPlan,
  Booking,
  Game,
  Tournament,
  MembershipPlan,
  GalleryItem,
  ContactMessage,
} from '../../types';

import { OverviewTab } from './tabs/OverviewTab';
import { BookingsTab } from './tabs/BookingsTab';
import { StationsTab } from './tabs/StationsTab';
import { PricingTab } from './tabs/PricingTab';
import { GamesTab } from './tabs/GamesTab';
import { TournamentsTab } from './tabs/TournamentsTab';
import { MembershipsTab } from './tabs/MembershipsTab';
import { GalleryTab } from './tabs/GalleryTab';
import { MessagesTab } from './tabs/MessagesTab';
import { BusinessInfoTab } from './tabs/BusinessInfoTab';

interface AdminLayoutProps {
  businessInfo: BusinessInfo;
  businessHours: BusinessDayHours[];
  categories: GamingCategory[];
  stations: GamingStation[];
  plans: PricingPlan[];
  bookings: Booking[];
  games: Game[];
  tournaments: Tournament[];
  memberships: MembershipPlan[];
  gallery: GalleryItem[];
  messages: ContactMessage[];

  onUpdateInfo: (info: BusinessInfo) => void;
  onUpdateHours: (hours: BusinessDayHours[]) => void;
  onUpdateCategories: (cats: GamingCategory[]) => void;
  onUpdateStations: (sts: GamingStation[]) => void;
  onUpdatePlans: (plans: PricingPlan[]) => void;
  onUpdateBookings: (bks: Booking[]) => void;
  onUpdateGames: (gms: Game[]) => void;
  onUpdateTournaments: (tours: Tournament[]) => void;
  onUpdateMemberships: (mems: MembershipPlan[]) => void;
  onUpdateGallery: (gal: GalleryItem[]) => void;
  onUpdateMessages: (msgs: ContactMessage[]) => void;

  onExitAdmin: () => void;
}

type AdminTab =
  | 'overview'
  | 'bookings'
  | 'stations'
  | 'pricing'
  | 'games'
  | 'tournaments'
  | 'memberships'
  | 'gallery'
  | 'messages'
  | 'business';

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  businessInfo,
  businessHours,
  categories,
  stations,
  plans,
  bookings,
  games,
  tournaments,
  memberships,
  gallery,
  messages,
  onUpdateInfo,
  onUpdateHours,
  onUpdateCategories,
  onUpdateStations,
  onUpdatePlans,
  onUpdateBookings,
  onUpdateGames,
  onUpdateTournaments,
  onUpdateMemberships,
  onUpdateGallery,
  onUpdateMessages,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck, badge: bookings.filter((b) => b.status === 'pending').length },
    { id: 'stations', label: 'Gaming Stations', icon: Cpu },
    { id: 'pricing', label: 'Pricing Plans', icon: Tag },
    { id: 'games', label: 'Games Library', icon: Gamepad2 },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'memberships', label: 'Memberships', icon: Crown },
    { id: 'gallery', label: 'Gallery', icon: Camera },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: messages.filter((m) => m.status === 'unread').length },
    { id: 'business', label: 'Hours & Settings', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans">
      
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-dark-900/90 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="font-heading text-base font-extrabold text-white uppercase tracking-wider">
              MNG GAMING CAFE <span className="text-neon-purple">ADMIN SYSTEM</span>
            </span>
            <div className="text-[10px] text-slate-400">Dilsukhnagar, Hyderabad</div>
          </div>
        </div>

        <button
          onClick={onExitAdmin}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase text-slate-200 hover:border-neon-cyan hover:text-neon-cyan transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>Exit Admin to Website</span>
        </button>
      </header>

      {/* Main Admin Sidebar + Content Body */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 border-r border-white/10 bg-dark-900 p-4 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-visible py-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-neon-purple text-white shadow-neon-purple'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>

                  {Boolean(item.badge) && item.badge! > 0 && (
                    <span className="rounded-full bg-neon-pink px-2 py-0.5 text-[10px] font-extrabold text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
          {activeTab === 'overview' && (
            <OverviewTab bookings={bookings} stations={stations} messages={messages} />
          )}
          {activeTab === 'bookings' && (
            <BookingsTab bookings={bookings} stations={stations} onUpdateBookings={onUpdateBookings} />
          )}
          {activeTab === 'stations' && (
            <StationsTab
              categories={categories}
              stations={stations}
              onUpdateCategories={onUpdateCategories}
              onUpdateStations={onUpdateStations}
            />
          )}
          {activeTab === 'pricing' && <PricingTab plans={plans} onUpdatePlans={onUpdatePlans} />}
          {activeTab === 'games' && <GamesTab games={games} onUpdateGames={onUpdateGames} />}
          {activeTab === 'tournaments' && (
            <TournamentsTab tournaments={tournaments} onUpdateTournaments={onUpdateTournaments} />
          )}
          {activeTab === 'memberships' && (
            <MembershipsTab memberships={memberships} onUpdateMemberships={onUpdateMemberships} />
          )}
          {activeTab === 'gallery' && <GalleryTab gallery={gallery} onUpdateGallery={onUpdateGallery} />}
          {activeTab === 'messages' && (
            <MessagesTab messages={messages} onUpdateMessages={onUpdateMessages} />
          )}
          {activeTab === 'business' && (
            <BusinessInfoTab
              businessInfo={businessInfo}
              businessHours={businessHours}
              onUpdateInfo={onUpdateInfo}
              onUpdateHours={onUpdateHours}
            />
          )}
        </main>

      </div>

    </div>
  );
};
