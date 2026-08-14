import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { QuickInfoBar } from './components/sections/QuickInfoBar';
import { AboutSection } from './components/sections/AboutSection';
import { GamingExperienceSection } from './components/sections/GamingExperienceSection';
import { GamingSetupsSection } from './components/sections/GamingSetupsSection';
import { PricingSection } from './components/sections/PricingSection';
import { GamesSection } from './components/sections/GamesSection';
import { TournamentsSection } from './components/sections/TournamentsSection';
import { MembershipSection } from './components/sections/MembershipSection';
import { GallerySection } from './components/sections/GallerySection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { LocationSection } from './components/sections/LocationSection';
import { ContactSection } from './components/sections/ContactSection';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { SEOHead } from './components/seo/SEOHead';
import { GamingIntroSplash } from './components/common/GamingIntroSplash';

import { db } from './services/storage';
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
} from './types';

export function App() {
  // Business & Website Data States
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(db.getBusinessInfo());
  const [businessHours, setBusinessHours] = useState<BusinessDayHours[]>(db.getBusinessHours());
  const [categories, setCategories] = useState<GamingCategory[]>(db.getCategories());
  const [stations, setStations] = useState<GamingStation[]>(db.getStations());
  const [plans, setPlans] = useState<PricingPlan[]>(db.getPricing());
  const [bookings, setBookings] = useState<Booking[]>(db.getBookings());
  const [games, setGames] = useState<Game[]>(db.getGames());
  const [tournaments, setTournaments] = useState<Tournament[]>(db.getTournaments());
  const [memberships, setMemberships] = useState<MembershipPlan[]>(db.getMemberships());
  const [gallery, setGallery] = useState<GalleryItem[]>(db.getGallery());
  const [messages, setMessages] = useState<ContactMessage[]>(db.getMessages());

  // UI States
  const [showSplash, setShowSplash] = useState(true);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Subscribe to real-time live data updates (Admin & User split-second synchronization)
  useEffect(() => {
    const unsubscribe = db.subscribe((key, data) => {
      if (!data) return;
      switch (key) {
        case 'business_info':
          setBusinessInfo(data);
          break;
        case 'business_hours':
          setBusinessHours(data);
          break;
        case 'categories':
          setCategories(data);
          break;
        case 'stations':
          setStations(data);
          break;
        case 'pricing':
          setPlans(data);
          break;
        case 'bookings':
          setBookings(data);
          break;
        case 'games':
          setGames(data);
          break;
        case 'tournaments':
          setTournaments(data);
          break;
        case 'memberships':
          setMemberships(data);
          break;
        case 'gallery':
          setGallery(data);
          break;
        case 'contact_messages':
          setMessages(data);
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAdminMode) {
    return (
      <AdminLayout
        businessInfo={businessInfo}
        businessHours={businessHours}
        categories={categories}
        stations={stations}
        plans={plans}
        bookings={bookings}
        games={games}
        tournaments={tournaments}
        memberships={memberships}
        gallery={gallery}
        messages={messages}
        onUpdateInfo={setBusinessInfo}
        onUpdateHours={setBusinessHours}
        onUpdateCategories={setCategories}
        onUpdateStations={setStations}
        onUpdatePlans={setPlans}
        onUpdateBookings={setBookings}
        onUpdateGames={setGames}
        onUpdateTournaments={setTournaments}
        onUpdateMemberships={setMemberships}
        onUpdateGallery={setGallery}
        onUpdateMessages={setMessages}
        onExitAdmin={() => setIsAdminMode(false)}
      />
    );
  }

  return (
    <div className="min-h-dvh w-full max-w-full overflow-x-hidden bg-[#0e181c] text-[#f2f2f2] font-sans selection:bg-[#52ab98] selection:text-[#0e181c]">
      {/* Gaming Opening Splash Screen Animation */}
      {showSplash && <GamingIntroSplash onComplete={() => setShowSplash(false)} />}

      {/* Local Business JSON-LD SEO Schema */}
      <SEOHead businessInfo={businessInfo} businessHours={businessHours} />

      {/* Navigation Header */}
      <Navbar
        businessInfo={businessInfo}
        businessHours={businessHours}
      />

      {/* Main Public Page Content */}
      <main>
        <HeroSection businessInfo={businessInfo} />

        <QuickInfoBar
          businessInfo={businessInfo}
          businessHours={businessHours}
        />

        <AboutSection businessInfo={businessInfo} />

        <GamingExperienceSection categories={categories} />

        <GamingSetupsSection
          stations={stations}
          businessInfo={businessInfo}
        />

        <PricingSection
          plans={plans}
          businessInfo={businessInfo}
        />

        <GamesSection games={games} />

        <TournamentsSection tournaments={tournaments} />

        <MembershipSection
          memberships={memberships}
          businessInfo={businessInfo}
        />

        <GallerySection items={gallery} businessInfo={businessInfo} />

        <ReviewsSection businessInfo={businessInfo} />

        <LocationSection businessInfo={businessInfo} />

        <ContactSection businessInfo={businessInfo} />
      </main>

      {/* Footer */}
      <Footer
        businessInfo={businessInfo}
        businessHours={businessHours}
        onOpenAdmin={() => setIsAdminLoginOpen(true)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminMode(true);
        }}
      />
    </div>
  );
}

export default App;
