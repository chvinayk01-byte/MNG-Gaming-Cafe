import React from 'react';
import { Calendar, DollarSign, Cpu, MessageSquare, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Booking, GamingStation, ContactMessage } from '../../../types';

interface OverviewTabProps {
  bookings: Booking[];
  stations: GamingStation[];
  messages: ContactMessage[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ bookings, stations, messages }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const todayBookings = bookings.filter((b) => b.date === todayStr);
  const pendingBookings = bookings.filter((b) => b.status === 'pending');
  const completedBookings = bookings.filter((b) => b.status === 'completed');
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled');

  const todayRevenue = todayBookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);
  const totalRevenue = completedBookings.reduce((acc, b) => acc + (b.totalPrice || 0), 0);

  const activeStationsCount = stations.filter((s) => s.availability === 'available').length;
  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-8">
      
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="rounded-2xl border border-white/10 bg-dark-900 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-slate-400">Today's Bookings</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon-cyan/10 text-neon-cyan">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="font-heading text-3xl font-black text-white">{todayBookings.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Pending: {pendingBookings.length} requests</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-dark-900 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-slate-400">Est. Today Revenue</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon-green/10 text-neon-green">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="font-heading text-3xl font-black text-neon-green">₹{todayRevenue}</div>
          <div className="text-[11px] text-slate-400 mt-1">Total Earned: ₹{totalRevenue}</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-dark-900 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-slate-400">Available Stations</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon-purple/10 text-neon-purple">
              <Cpu className="h-5 w-5" />
            </div>
          </div>
          <div className="font-heading text-3xl font-black text-white">{activeStationsCount} / {stations.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Ready for customers</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-dark-900 p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-slate-400">Unread Messages</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <div className="font-heading text-3xl font-black text-amber-400">{unreadMessagesCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Customer Enquiries</div>
        </div>

      </div>

      {/* Recent Bookings Activity Table */}
      <div className="rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl">
        <h3 className="font-heading text-lg font-extrabold uppercase text-white mb-4">
          Recent Session Requests
        </h3>

        {bookings.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">No session bookings recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Station</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.slice(0, 5).map((b) => (
                  <tr key={b.id} className="hover:bg-white/5">
                    <td className="py-3.5 px-4 font-mono font-bold text-neon-cyan">{b.bookingCode}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{b.customerName} ({b.customerPhone})</td>
                    <td className="py-3.5 px-4 text-slate-300">{b.setupName}</td>
                    <td className="py-3.5 px-4 text-slate-300">{b.date} @ {b.timeSlot}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        b.status === 'confirmed' ? 'bg-neon-green/10 text-neon-green' :
                        b.status === 'pending' ? 'bg-amber-400/10 text-amber-400' :
                        b.status === 'completed' ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-neon-red/10 text-neon-red'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
