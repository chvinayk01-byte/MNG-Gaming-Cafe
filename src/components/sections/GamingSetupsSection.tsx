import React from 'react';
import { Cpu, Monitor, Headphones, Keyboard, Mouse, AlertCircle, MessageSquare } from 'lucide-react';
import { GamingStation, StationAvailability, BusinessInfo } from '../../types';

interface GamingSetupsSectionProps {
  stations: GamingStation[];
  businessInfo: BusinessInfo;
}

export const GamingSetupsSection: React.FC<GamingSetupsSectionProps> = ({
  stations,
  businessInfo,
}) => {
  const getAvailabilityBadge = (status: StationAvailability) => {
    switch (status) {
      case 'available':
        return { text: '🟢 Available', class: 'border-[#52ab98]/30 bg-[#52ab98]/10 text-[#52ab98]' };
      case 'occupied':
        return { text: '🔴 Occupied', class: 'border-rose-500/30 bg-rose-500/10 text-rose-400' };
      case 'reserved':
        return { text: '🟡 Reserved', class: 'border-amber-400/30 bg-amber-400/10 text-amber-400' };
      case 'maintenance':
        return { text: '⚫ Maintenance', class: 'border-slate-500/30 bg-slate-500/10 text-slate-400' };
      default:
        return { text: 'Available', class: 'bg-white/10 text-white' };
    }
  };

  return (
    <section id="setups" className="relative py-24 bg-[#0e181c]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52ab98]/30 bg-[#52ab98]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#52ab98] mb-3">
            <Cpu className="h-4 w-4" /> Hardware & Stations
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            PC GAMING & <span className="text-[#52ab98]">HARDWARE SETUPS</span>
          </h2>
          <p className="mt-3 text-sm text-[#c8d8e4]">
            High-performance hardware setups designed for fast response times and competitive play.
          </p>
        </div>

        {/* Setups Grid or Empty State */}
        {stations.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center max-w-lg mx-auto">
            <AlertCircle className="mx-auto h-12 w-12 text-[#52ab98] mb-3" />
            <h3 className="text-lg font-bold text-white">Gaming setup information is being updated.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stations.map((station) => {
              const badge = getAvailabilityBadge(station.availability);

              return (
                <div
                  key={station.id}
                  className="group relative overflow-hidden rounded-2xl border border-[#c8d8e4]/15 bg-[#132128] p-5 backdrop-blur-xl transition-all duration-300 hover:border-[#52ab98]/60 hover:-translate-y-2 hover:shadow-[0_15px_35px_-10px_rgba(82,171,152,0.3)] shadow-xl flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Setup Header & Availability Badge */}
                    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-[#0e181c] mb-4">
                      <img
                        src={station.image}
                        alt={station.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#132128] via-transparent to-transparent" />

                      <div className={`absolute top-3 right-3 rounded-full border px-3 py-1 text-[11px] font-bold backdrop-blur-md ${badge.class}`}>
                        {badge.text}
                      </div>
                    </div>

                    <h3 className="font-heading text-xl font-extrabold uppercase text-white group-hover:text-[#52ab98] transition-colors mb-4">
                      {station.name}
                    </h3>

                    {/* Hardware Specifications List */}
                    <div className="space-y-2 text-xs text-[#c8d8e4]">
                      {station.cpu && (
                        <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                          <Cpu className="h-4 w-4 text-[#52ab98] shrink-0" />
                          <span className="font-medium">{station.cpu}</span>
                        </div>
                      )}

                      {station.gpu && (
                        <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                          <Cpu className="h-4 w-4 text-[#2b6777] shrink-0" />
                          <span className="font-medium">{station.gpu}</span>
                        </div>
                      )}

                      {(station.monitor || station.refreshRate) && (
                        <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                          <Monitor className="h-4 w-4 text-[#52ab98] shrink-0" />
                          <span className="font-medium">
                            {station.monitor} {station.refreshRate ? `(${station.refreshRate})` : ''}
                          </span>
                        </div>
                      )}

                      {station.headset && (
                        <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                          <Headphones className="h-4 w-4 text-amber-400 shrink-0" />
                          <span className="font-medium">{station.headset}</span>
                        </div>
                      )}

                      {station.keyboard && (
                        <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                          <Keyboard className="h-4 w-4 text-[#c8d8e4] shrink-0" />
                          <span className="font-medium">{station.keyboard}</span>
                        </div>
                      )}

                      {station.mouse && (
                        <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-2 border border-white/5">
                          <Mouse className="h-4 w-4 text-[#52ab98] shrink-0" />
                          <span className="font-medium">{station.mouse}</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Pricing Info & Booking CTA */}
                  <div className="mt-6 pt-4 border-t border-[#c8d8e4]/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-semibold text-[#c8d8e4]/70">Rates</div>
                      <div className="font-heading text-sm font-bold text-white">
                        {station.hourlyPrice ? `₹${station.hourlyPrice} / hr` : 'Contact us for current pricing'}
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}?text=Hi%20MNG%20Gaming%20Cafe,%20I%20want%20to%20enquire%20about%20${encodeURIComponent(station.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] px-4 py-2.5 text-xs font-bold uppercase text-white shadow-teal-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Enquire Station</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
