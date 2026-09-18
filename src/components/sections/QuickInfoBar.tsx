import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, MapPin, Clock, X, CheckCircle } from 'lucide-react';
import { BusinessInfo, BusinessDayHours } from '../../types';
import { getStoreStatus } from '../../services/storage';

interface QuickInfoBarProps {
  businessInfo: BusinessInfo;
  businessHours: BusinessDayHours[];
}

export const QuickInfoBar: React.FC<QuickInfoBarProps> = ({ businessInfo, businessHours }) => {
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [status, setStatus] = useState(() => getStoreStatus(businessInfo, businessHours));

  useEffect(() => {
    const updateStatus = () => setStatus(getStoreStatus(businessInfo, businessHours));
    updateStatus();
    const timer = setInterval(updateStatus, 10000);
    return () => clearInterval(timer);
  }, [businessInfo, businessHours]);

  return (
    <section className="relative z-20 -mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 rounded-2xl border border-white/10 bg-dark-900/90 p-4 backdrop-blur-xl shadow-2xl">
        
        {/* Card 1: Google Rating */}
        <a
          href={businessInfo.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-amber-400/50 hover:bg-amber-400/10 hover:shadow-[0_8px_20px_-4px_rgba(251,191,36,0.3)] cursor-pointer"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-400/10 text-amber-400 group-hover:scale-125 transition-transform duration-300">
            <Star className="h-5 w-5 fill-amber-400" />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1 font-heading text-lg font-extrabold text-white">
              5.0 <span className="text-xs text-amber-400">★★★★★</span>
            </div>
            <div className="text-xs text-slate-400 group-hover:text-amber-200 transition-colors">Google Rating</div>
          </div>
        </a>

        {/* Card 2: Google Reviews */}
        <a
          href={businessInfo.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#52ab98]/50 hover:bg-[#52ab98]/10 hover:shadow-[0_8px_20px_-4px_rgba(82,171,152,0.3)] cursor-pointer"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10 text-neon-cyan group-hover:scale-125 transition-transform duration-300">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div className="text-center sm:text-left">
            <div className="font-heading text-lg font-extrabold text-white">
              60+
            </div>
            <div className="text-xs text-slate-400 group-hover:text-emerald-200 transition-colors">Google Reviews</div>
          </div>
        </a>

        {/* Card 3: Location */}
        <a
          href="#location"
          className="group flex flex-col sm:flex-row items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#52ab98]/50 hover:bg-[#52ab98]/10 hover:shadow-[0_8px_20px_-4px_rgba(82,171,152,0.3)] cursor-pointer"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-green/10 text-neon-green group-hover:scale-125 transition-transform duration-300">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="text-center sm:text-left">
            <div className="font-heading text-sm font-bold text-white line-clamp-1">
              Dilsukhnagar
            </div>
            <div className="text-xs text-slate-400 group-hover:text-emerald-200 transition-colors">Hyderabad, Telangana</div>
          </div>
        </a>

        {/* Card 4: Hours Trigger */}
        <button
          onClick={() => setShowHoursModal(true)}
          className="group flex flex-col sm:flex-row items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#2b6777]/60 hover:bg-[#2b6777]/20 hover:shadow-[0_8px_20px_-4px_rgba(43,103,119,0.4)] text-left cursor-pointer"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neon-purple/10 text-neon-purple group-hover:scale-125 transition-transform duration-300">
            <Clock className="h-5 w-5" />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 font-heading text-sm font-bold text-white">
              <span className={`h-2 w-2 rounded-full ${status.isOpen ? 'bg-neon-green animate-pulse' : 'bg-neon-pink'}`} />
              <span>{status.isOpen ? 'OPEN NOW' : 'CLOSED'}</span>
            </div>
            <div className="text-xs text-slate-400 underline decoration-dotted group-hover:text-cyan-200 transition-colors">View Schedule</div>
          </div>
        </button>

      </div>

      {/* Opening Hours Modal */}
      {showHoursModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-dark-900 p-6 shadow-2xl">
            
            <button
              onClick={() => setShowHoursModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-purple/10 text-neon-purple">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-extrabold text-white uppercase">Operating Hours</h3>
                <p className="text-xs text-slate-400">MNG Gaming Cafe • Dilsukhnagar</p>
              </div>
            </div>

            {/* Current Status Box */}
            <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${status.isOpen ? 'bg-neon-green animate-pulse' : 'bg-neon-pink'}`} />
                <span className="font-bold text-sm text-white">{status.statusText}</span>
              </div>
              <span className="text-xs text-neon-cyan font-mono">{status.todayHoursText}</span>
            </div>

            {/* Full 7 Days Table */}
            <div className="space-y-2 text-xs">
              {businessHours.map((schedule) => (
                <div
                  key={schedule.day}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-dark-950/60"
                >
                  <span className="font-semibold text-slate-200">{schedule.day}</span>
                  <span className="font-mono text-neon-cyan">
                    {schedule.isClosed ? 'Closed' : `${schedule.openTime} – ${schedule.closeTime}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowHoursModal(false)}
                className="w-full rounded-xl bg-neon-cyan px-4 py-2.5 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
              >
                Got It
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
