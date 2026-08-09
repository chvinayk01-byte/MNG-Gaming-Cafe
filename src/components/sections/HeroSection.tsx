import React from 'react';
import { Calendar, ChevronRight, MapPin, Star, Flame, Trophy, ShieldAlert, MessageSquare } from 'lucide-react';
import { BusinessInfo } from '../../types';

interface HeroSectionProps {
  businessInfo: BusinessInfo;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ businessInfo }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0e181c] pt-8 pb-16">
      
      {/* Background Graphic Effects & Images */}
      <div className="absolute inset-0 bg-radial-gradient opacity-90" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Generated Cafe Interior Image Background */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
        <img
          src="/images/hero.jpg"
          alt="MNG Gaming Cafe Interior"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e181c] via-[#0e181c]/70 to-transparent" />
      </div>

      {/* Decorative Neon Spheres */}
      <div className="absolute top-1/4 left-10 h-72 w-72 rounded-full bg-[#52ab98]/10 blur-[120px] pointer-events-none" />
      {/* Dynamic Background Glow & Ambient Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#2b6777]/30 to-[#52ab98]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Verification & Rating Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#52ab98]/30 bg-[#52ab98]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#52ab98] mb-6 backdrop-blur-md">
          <Star className="h-4 w-4 fill-[#52ab98] text-[#52ab98]" />
          <span>5.0 Star Rated Gaming Lounge in Dilsukhnagar</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight">
          PREMIER <span className="text-[#52ab98]">GAMING CAFE</span> IN HYDERABAD
        </h1>

        {/* Verified Location Subtitle */}
        <p className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold uppercase text-[#c8d8e4]/90 tracking-widest">
          <MapPin className="h-4 w-4 text-[#52ab98]" />
          <span>House No. 7-49, Konark Theatre Lane, Dilsukhnagar</span>
        </p>

        {/* Supporting Description */}
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[#c8d8e4] leading-relaxed font-normal">
          Step into MNG Gaming Cafe and enjoy a dedicated space to compete, chill and game with friends.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}?text=Hi%20MNG%20Gaming%20Cafe,%20I%20want%20to%20enquire%20about%20a%20gaming%20session.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#2b6777] via-[#52ab98] to-[#52ab98] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-teal-glow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-5 w-5" />
            <span>CHAT ON WHATSAPP</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#setups"
            className="w-full sm:w-auto rounded-xl border border-[#c8d8e4]/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md hover:border-[#52ab98]/50 hover:bg-[#52ab98]/10 transition-all flex items-center justify-center gap-2"
          >
            <Trophy className="h-5 w-5 text-[#52ab98]" />
            <span>EXPLORE SETUPS</span>
          </a>
        </div>

        {/* Highlight feature badges */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl mx-auto">
          <div className="rounded-xl border border-[#c8d8e4]/10 bg-white/5 p-3 text-center backdrop-blur-sm">
            <Flame className="mx-auto h-5 w-5 text-[#52ab98] mb-1" />
            <div className="text-xs font-bold text-white">Esports Ready</div>
            <div className="text-[10px] text-[#c8d8e4]/70">Competitive Vibes</div>
          </div>
          <div className="rounded-xl border border-[#c8d8e4]/10 bg-white/5 p-3 text-center backdrop-blur-sm">
            <Star className="mx-auto h-5 w-5 text-amber-400 mb-1" />
            <div className="text-xs font-bold text-white">5.0 Star Rating</div>
            <div className="text-[10px] text-[#c8d8e4]/70">Verified by Gamers</div>
          </div>
          <div className="rounded-xl border border-[#c8d8e4]/10 bg-white/5 p-3 text-center backdrop-blur-sm">
            <MapPin className="mx-auto h-5 w-5 text-[#52ab98] mb-1" />
            <div className="text-xs font-bold text-white">Konark Theatre Lane</div>
            <div className="text-[10px] text-[#c8d8e4]/70">Madhura Puri Colony</div>
          </div>
          <div className="rounded-xl border border-[#c8d8e4]/10 bg-white/5 p-3 text-center backdrop-blur-sm">
            <ShieldAlert className="mx-auto h-5 w-5 text-[#2b6777] mb-1" />
            <div className="text-xs font-bold text-white">Open 7 Days</div>
            <div className="text-[10px] text-[#c8d8e4]/70">Daily Gaming</div>
          </div>
        </div>

      </div>
    </section>
  );
};
