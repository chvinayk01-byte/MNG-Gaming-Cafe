import React, { useState } from 'react';
import { Gamepad2, MapPin, Phone, Clock, ExternalLink, ShieldCheck, MessageSquare } from 'lucide-react';
import { BusinessInfo, BusinessDayHours } from '../../types';

interface FooterProps {
  businessInfo: BusinessInfo;
  businessHours: BusinessDayHours[];
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  businessInfo,
  businessHours,
  onOpenAdmin,
}) => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="relative border-t border-[#c8d8e4]/10 bg-[#0e181c] pt-16 pb-12 text-[#c8d8e4]/80">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#52ab98]/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          
          {/* Col 1: Business Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#52ab98]/10 border border-[#52ab98]/30">
                <Gamepad2 className="h-6 w-6 text-[#52ab98]" />
              </div>
              <span className="font-heading text-xl font-black text-white">
                MNG <span className="text-[#52ab98]">GAMING CAFE</span>
              </span>
            </div>
            
            <p className="text-sm text-[#c8d8e4]/80 leading-relaxed">
              Play. Compete. Connect. Your premium local gaming destination in Dilsukhnagar, Hyderabad built for squad battles and casual lounge fun.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}?text=Hi%20MNG%20Gaming%20Cafe,%20I%20want%20to%20enquire%20about%20a%20gaming%20session.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] px-4 py-2 text-xs font-bold uppercase text-white shadow-teal-glow hover:scale-105 transition-all"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#52ab98] pl-3">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {['Home', 'Gaming', 'Setups', 'Pricing', 'Games', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-[#52ab98] transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#52ab98]">›</span> {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Business Hours */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#2b6777] pl-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#52ab98]" /> Operating Hours
            </h4>
            <ul className="space-y-2 text-xs">
              {businessHours.map((schedule) => (
                <li key={schedule.day} className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="font-medium text-[#c8d8e4]">{schedule.day}</span>
                  <span className="font-mono text-[#52ab98]">
                    {schedule.isClosed ? 'Closed' : `${schedule.openTime} – ${schedule.closeTime}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verified Contact */}
          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-[#52ab98] pl-3">
              Verified Location
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2.5 items-start">
                <MapPin className="h-4 w-4 text-[#52ab98] shrink-0 mt-0.5" />
                <p className="text-[#c8d8e4] leading-normal">
                  {businessInfo.address}
                </p>
              </div>

              <div className="flex gap-2.5 items-center">
                <Phone className="h-4 w-4 text-[#52ab98] shrink-0" />
                <a href={`tel:${businessInfo.phone}`} className="text-white hover:text-[#52ab98] font-bold">
                  {businessInfo.phone}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={businessInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#c8d8e4]/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-[#52ab98] hover:bg-[#52ab98]/10 transition-all"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#52ab98]" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 MNG Gaming Cafe. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button onClick={() => setModalType('privacy')} className="hover:text-[#52ab98]">
              Privacy Policy
            </button>
            <button onClick={() => setModalType('terms')} className="hover:text-[#52ab98]">
              Terms & Conditions
            </button>
            <button onClick={onOpenAdmin} className="text-[#2b6777] hover:text-[#52ab98] hover:underline flex items-center gap-1 cursor-pointer font-bold">
              <ShieldCheck className="h-3.5 w-3.5" /> Admin System
            </button>
          </div>
        </div>
      </div>

      {/* Policy Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#132128] p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 uppercase">
              {modalType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            
            <div className="max-h-96 overflow-y-auto text-xs text-[#c8d8e4] space-y-3 leading-relaxed pr-2">
              {modalType === 'privacy' ? (
                <>
                  <p>At MNG Gaming Cafe, we respect your privacy. This policy outlines how session booking requests and contact details are handled.</p>
                  <p><strong>1. Information Collection:</strong> We collect details provided during session booking requests (Name, Phone number, Date & Time). This data is strictly used for booking confirmations and cafe communication.</p>
                  <p><strong>2. Data Protection:</strong> We do not sell, rent, or share customer contact numbers with third-party advertisers.</p>
                  <p><strong>3. Enquiries:</strong> If you send an enquiry via phone or WhatsApp, your information is used solely to respond to your request.</p>
                </>
              ) : (
                <>
                  <p>Welcome to MNG Gaming Cafe. By booking a session or visiting our venue, you agree to the following rules:</p>
                  <p><strong>1. Hardware Care:</strong> Respect all gaming equipment including PCs, controllers, displays, and peripherals. Intentional damage will incur full replacement charges.</p>
                  <p><strong>2. Sportsmanship:</strong> Maintain a respectful atmosphere for fellow gamers. Toxic behavior or abusive language may result in session termination without refund.</p>
                  <p><strong>3. Session Timing:</strong> Booking slots are held for up to 15 minutes past start time. Unclaimed slots may be released to waiting customers.</p>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="rounded-xl bg-[#52ab98] px-5 py-2 text-xs font-bold uppercase text-[#0e181c]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
