import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, AlertTriangle, XCircle, Gamepad2 } from 'lucide-react';
import { Booking, BookingStatus } from '../../types';
import { db } from '../../services/storage';

interface BookingTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingTrackerModal: React.FC<BookingTrackerModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundBookings, setFoundBookings] = useState<Booking[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const all = db.getBookings();
    const query = searchQuery.trim().toLowerCase();

    const results = all.filter(
      (b) =>
        b.bookingCode.toLowerCase().includes(query) ||
        b.customerPhone.includes(query) ||
        b.customerName.toLowerCase().includes(query)
    );

    setFoundBookings(results);
    setHasSearched(true);
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return { text: 'Confirmed', icon: CheckCircle2, class: 'bg-neon-green/10 text-neon-green border-neon-green/30' };
      case 'pending':
        return { text: 'Pending', icon: Clock, class: 'bg-amber-400/10 text-amber-400 border-amber-400/30' };
      case 'completed':
        return { text: 'Completed', icon: CheckCircle2, class: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30' };
      case 'cancelled':
        return { text: 'Cancelled', icon: XCircle, class: 'bg-neon-red/10 text-neon-red border-neon-red/30' };
      default:
        return { text: status, icon: Clock, class: 'bg-white/10 text-white' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-dark-900 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neon-purple/10 text-neon-purple border border-neon-purple/30">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-black uppercase text-white">TRACK BOOKING REQUEST</h3>
            <p className="text-xs text-slate-400">Enter Booking ID (e.g. MNG-2026-0001) or Phone Number</p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search by Booking Code or Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
            required
          />
          <button
            type="submit"
            className="rounded-xl bg-neon-cyan px-5 py-3 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {hasSearched && (
          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {foundBookings && foundBookings.length > 0 ? (
              foundBookings.map((booking) => {
                const badge = getStatusBadge(booking.status);
                const BadgeIcon = badge.icon;

                return (
                  <div
                    key={booking.id}
                    className="rounded-2xl border border-white/10 bg-dark-950 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-neon-cyan">
                        {booking.bookingCode}
                      </span>
                      <span className={`inline-flex items-center gap-1 border px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${badge.class}`}>
                        <BadgeIcon className="h-3 w-3" />
                        {badge.text}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400">Setup:</span>
                        <div className="font-semibold text-white">{booking.setupName}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Date & Time:</span>
                        <div className="font-semibold text-white">{booking.date} • {booking.timeSlot}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Customer:</span>
                        <div className="font-semibold text-white">{booking.customerName}</div>
                      </div>
                      <div>
                        <span className="text-slate-400">Duration:</span>
                        <div className="font-semibold text-white">{booking.durationHours} Hours</div>
                      </div>
                    </div>

                    {booking.totalPrice && (
                      <div className="pt-2 border-t border-white/5 flex justify-between text-xs">
                        <span className="text-slate-400">Total Price:</span>
                        <span className="font-bold text-neon-green">₹{booking.totalPrice}</span>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="rounded-xl border border-white/5 bg-white/5 p-6 text-center text-xs text-slate-400">
                No booking requests found matching "{searchQuery}".
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
