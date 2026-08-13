import React from 'react';
import { ShieldCheck, MapPin, Users, Flame, Trophy, ChevronRight, MessageSquare, Gamepad } from 'lucide-react';
import { BusinessInfo } from '../../types';

interface AboutSectionProps {
  businessInfo: BusinessInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ businessInfo }) => {
  return (
    <section id="about" className="relative py-24 bg-[#0e181c] overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-96 w-96 rounded-full bg-[#52ab98]/5 blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Visual Gaming Card Stack using generated cafe interior */}
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-3xl border border-[#c8d8e4]/15 bg-[#15242b]/80 p-3 backdrop-blur-xl shadow-2xl">
              <img
                src="/images/mng_lounge_interior.jpg"
                alt="MNG Gaming Hub Lounge Interior"
                className="h-80 w-full rounded-2xl object-cover sm:h-96"
              />

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-[#c8d8e4]/15 bg-[#0e181c]/90 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-heading text-base font-extrabold text-white">Dilsukhnagar Gaming Landmark</div>
                    <div className="text-xs text-[#52ab98] font-medium">Near Konark Theatre Lane</div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#52ab98]/10 text-[#52ab98]">
                    <MapPin className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Accent Border */}
            <div className="absolute -inset-1 z-0 rounded-3xl bg-gradient-to-r from-[#2b6777] via-[#52ab98] to-[#c8d8e4] opacity-25 blur-xl" />
          </div>

          {/* Right Column: Copy & verified details */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#52ab98]/30 bg-[#52ab98]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#52ab98]">
              <Gamepad className="h-4 w-4" /> About MNG Gaming Cafe
            </div>

            <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-4xl lg:text-5xl leading-tight">
              YOUR LOCAL <br />
              <span className="text-[#52ab98]">GAMING HUB</span>
            </h2>

            <p className="text-base text-[#c8d8e4] leading-relaxed font-medium">
              MNG Gaming Cafe is a gaming destination located in Dilsukhnagar, Hyderabad, built for gamers who want to spend time playing, competing and enjoying games with friends.
            </p>

            <div className="rounded-2xl border border-[#c8d8e4]/15 bg-white/5 p-4 space-y-3 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#52ab98] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Convenient Location</h4>
                  <p className="text-xs text-[#c8d8e4]/80 mt-0.5">
                    Located in Madhura Puri Colony, near Konark Theatre Lane and opposite Satyanarayana Swamy Temple, Gaddiannaram, Dilsukhnagar.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#52ab98]/10 text-[#52ab98]">
                  <Users className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-white">Squad & Duo Friendly</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2b6777]/20 text-[#52ab98]">
                  <Trophy className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-white">Competitive Atmosphere</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}?text=Hi%20MNG%20Gaming%20Cafe,%20I%20want%20to%20enquire%20about%20a%20gaming%20session.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-teal-glow hover:scale-105 transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>COME GAME WITH US</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
