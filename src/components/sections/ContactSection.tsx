import React from 'react';
import { Phone, MessageSquare, Navigation } from 'lucide-react';
import { BusinessInfo } from '../../types';

interface ContactSectionProps {
  businessInfo: BusinessInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ businessInfo }) => {
  const cleanPhone = businessInfo.phone.replace(/[^0-9]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hi MNG Gaming Cafe, I would like to enquire about a gaming session.')}`;

  return (
    <section id="contact" className="relative py-24 bg-dark-950 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neon-cyan mb-3">
            <MessageSquare className="h-4 w-4" /> Get In Touch
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            READY TO <span className="text-neon-cyan">GAME?</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Have questions about sessions, setups, or reservations? Contact us directly.
          </p>
        </div>

        {/* Centered Direct Contact Actions Card */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-3xl border border-white/10 bg-dark-900/80 p-8 sm:p-10 shadow-2xl space-y-6 text-center backdrop-blur-md">
            <h3 className="font-heading text-2xl font-black uppercase text-white tracking-wide">
              DIRECT CONTACT <span className="text-[#52ab98]">ACTIONS</span>
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Connect instantly with the MNG Gaming Cafe desk in Dilsukhnagar, Hyderabad.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={`tel:${businessInfo.phone}`}
                className="btn-shimmer w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#52ab98] px-6 py-4 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan hover:scale-105 hover:shadow-[0_0_30px_rgba(82,171,152,0.6)] active:scale-95 transition-all duration-300"
              >
                <Phone className="h-4 w-4" />
                <span>CALL NOW ({businessInfo.phone})</span>
              </a>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl border border-[#52ab98]/40 bg-[#52ab98]/10 px-6 py-4 text-xs font-bold uppercase text-white hover:border-[#52ab98] hover:bg-[#52ab98]/25 hover:scale-105 hover:shadow-[0_0_25px_rgba(82,171,152,0.4)] active:scale-95 transition-all duration-300"
              >
                <MessageSquare className="h-4 w-4 text-[#52ab98]" />
                <span>WHATSAPP US</span>
              </a>
            </div>

            <div className="pt-2">
              <a
                href={businessInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase text-slate-300 hover:text-white hover:border-[#52ab98]/50 hover:bg-[#52ab98]/10 hover:scale-105 transition-all duration-300"
              >
                <Navigation className="h-4 w-4 text-[#52ab98]" />
                <span>GET GOOGLE MAPS DIRECTIONS</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
