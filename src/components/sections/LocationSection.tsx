import React from 'react';
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { BusinessInfo } from '../../types';

interface LocationSectionProps {
  businessInfo: BusinessInfo;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ businessInfo }) => {
  return (
    <section id="location" className="relative py-24 bg-[#0e181c] border-t border-[#c8d8e4]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52ab98]/30 bg-[#52ab98]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#52ab98] mb-3">
            <MapPin className="h-4 w-4" /> Dilsukhnagar Lounge
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            FIND <span className="text-[#52ab98]">US</span>
          </h2>
          <p className="mt-3 text-sm text-[#c8d8e4]">
            Conveniently located near Konark Theatre Lane in Dilsukhnagar, Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Address Details Card */}
          <div className="rounded-3xl border border-[#c8d8e4]/15 bg-[#132128] p-8 shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#52ab98]/10 text-[#52ab98] mb-6 border border-[#52ab98]/30">
                <MapPin className="h-6 w-6" />
              </div>

              <h3 className="font-heading text-2xl font-black uppercase text-white mb-2">
                {businessInfo.name}
              </h3>
              
              <div className="text-xs text-[#52ab98] font-bold uppercase mb-4 tracking-wider">
                Gaming Cafe / Game Shop
              </div>

              <div className="space-y-4 text-xs text-[#c8d8e4] leading-relaxed border-t border-[#c8d8e4]/15 pt-4">
                <p className="font-medium text-white">
                  {businessInfo.address}
                </p>
                <div className="rounded-xl border border-[#c8d8e4]/10 bg-white/5 p-3 text-[11px] text-[#c8d8e4]/80">
                  📍 Landmarks: Opposite Satyanarayana Swamy Temple • Konark Theatre Lane • Gaddiannaram
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-3 pt-4 border-t border-[#c8d8e4]/15">
              <a
                href={businessInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-teal-glow hover:scale-[1.02] transition-all"
              >
                <Navigation className="h-4 w-4" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href={`tel:${businessInfo.phone}`}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#c8d8e4]/20 bg-white/5 py-3 text-xs font-bold uppercase text-white hover:bg-[#52ab98]/10 hover:border-[#52ab98] hover:text-[#52ab98] transition-all"
              >
                <Phone className="h-4 w-4" />
                <span>CALL NOW</span>
              </a>
            </div>

          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-2 rounded-3xl border border-[#c8d8e4]/15 bg-[#132128] overflow-hidden shadow-2xl relative min-h-[350px]">
            <iframe
              title="MNG Gaming Cafe Google Maps Location"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.4988776850235!2d${businessInfo.coordinates.lng}!3d${businessInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIyJzAwLjAiTiA3OMKwMzEnMzEuMiJF!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="contrast-125 opacity-90 transition-all duration-500"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
