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
      
      {/* Cafe Interior Background Image */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity pointer-events-none">
        <img
          src="/images/mng_lounge_interior.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e181c] via-[#0e181c]/80 to-[#0e181c]/50" />
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
          PREMIUM <span className="text-[#52ab98]">GAMING CAFE</span> IN HYDERABAD
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
            className="btn-shimmer w-full sm:w-auto relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#2b6777] via-[#52ab98] to-[#52ab98] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-teal-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(82,171,152,0.6)] active:scale-95 flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-5 w-5 transition-transform group-hover:rotate-12" />
            <span>CHAT ON WHATSAPP</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </a>

          <a
            href="#setups"
            className="w-full sm:w-auto rounded-xl border border-[#c8d8e4]/20 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md hover:border-[#52ab98]/60 hover:bg-[#52ab98]/15 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg"
          >
            <Trophy className="h-5 w-5 text-[#52ab98] transition-transform group-hover:scale-110" />
            <span>EXPLORE SETUPS</span>
          </a>
        </div>

        {/* Highlight feature badges */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl mx-auto">
          <div className="group rounded-xl border border-[#c8d8e4]/10 bg-white/5 p-3.5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#52ab98]/50 hover:bg-[#52ab98]/10 hover:shadow-[0_10px_25px_-5px_rgba(82,171,152,0.3)] cursor-pointer">
            <Flame className="mx-auto h-5 w-5 text-[#52ab98] mb-1 transition-transform group-hover:scale-125 group-hover:rotate-6" />
            <div className="text-xs font-bold text-white transition-colors group-hover:text-[#52ab98]">High Performance</div>
            <div className="text-[10px] text-[#c8d8e4]/70">PC & PS5 Gaming</div>
          </div>
          <div className="group rounded-xl border border-[#c8d8e4]/10 bg-white/5 p-3.5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/50 hover:bg-amber-400/10 hover:shadow-[0_10px_25px_-5px_rgba(251,191,36,0.3)] cursor-pointer">
            <Star className="mx-auto h-5 w-5 text-amber-400 mb-1 transition-transform group-hover:scale-125 group-hover:rotate-12 fill-amber-400/20 group-hover:fill-amber-400" />
            <div className="text-xs font-bold text-white transition-colors group-hover:text-amber-400">5.0 Star Rating</div>
            <div className="text-[10px] text-[#c8d8e4]/70">Verified by Gamers</div>
          </div>
          <div className="group rounded-xl border border-[#c8d8e4]/10 bg-white/5 p-3.5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#52ab98]/50 hover:bg-[#52ab98]/10 hover:shadow-[0_10px_25px_-5px_rgba(82,171,152,0.3)] cursor-pointer">
            <MapPin className="mx-auto h-5 w-5 text-[#52ab98] mb-1 transition-transform group-hover:scale-125 group-hover:-translate-y-0.5" />
            <div className="text-xs font-bold text-white transition-colors group-hover:text-[#52ab98]">Konark Theatre Lane</div>
            <div className="text-[10px] text-[#c8d8e4]/70">Madhura Puri Colony</div>
          </div>
          <div className="group rounded-xl border border-[#c8d8e4]/10 bg-white/5 p-3.5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2b6777]/60 hover:bg-[#2b6777]/20 hover:shadow-[0_10px_25px_-5px_rgba(43,103,119,0.4)] cursor-pointer">
            <ShieldAlert className="mx-auto h-5 w-5 text-[#2b6777] mb-1 transition-transform group-hover:scale-125 group-hover:rotate-6" />
            <div className="text-xs font-bold text-white transition-colors group-hover:text-[#52ab98]">Open 7 Days</div>
            <div className="text-[10px] text-[#c8d8e4]/70">Daily Gaming</div>
          </div>
        </div>

      </div>
    </section>
  );
};
