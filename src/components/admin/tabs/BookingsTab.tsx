import React, { useState } from 'react';
import { Search, Filter, Plus, CheckCircle2, XCircle, Clock, Trash2 } from 'lucide-react';
import { Booking, BookingStatus, GamingStation } from '../../../types';
import { db } from '../../../services/storage';

interface BookingsTabProps {
  bookings: Booking[];
  stations: GamingStation[];
  onUpdateBookings: (updated: Booking[]) => void;
}

export const BookingsTab: React.FC<BookingsTabProps> = ({ bookings, stations, onUpdateBookings }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Manual booking form
  const [setupId, setSetupId] = useState(stations[0]?.id || '');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('04:00 PM');
  const [durationHours, setDurationHours] = useState(2);
  const [status, setStatus] = useState<BookingStatus>('confirmed');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(search.toLowerCase()) ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.customerPhone.includes(search);
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    const updated = bookings.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b));
    db.saveBookings(updated);
    onUpdateBookings(updated);
  };

  const handleDelete = (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking record?')) return;
    const updated = bookings.filter((b) => b.id !== bookingId);
    db.saveBookings(updated);
    onUpdateBookings(updated);
  };

  const handleCreateManualBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const station = stations.find((s) => s.id === setupId);
    const count = bookings.length + 1;
    const bookingCode = `MNG-2026-${String(count).padStart(4, '0')}`;

    const newBooking: Booking = {
      id: `b_${Date.now()}`,
      bookingCode,
      setupId,
      setupName: station?.name || 'Manual Reservation',
      date,
      timeSlot,
      durationHours,
      playerCount: 1,
      customerName,
      customerPhone,
      status,
      totalPrice: station?.hourlyPrice ? station.hourlyPrice * durationHours : undefined,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBooking, ...bookings];
    db.saveBookings(updated);
    onUpdateBookings(updated);
    setShowAddModal(false);
    setCustomerName('');
    setCustomerPhone('');
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search code, name, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-dark-900 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-dark-900 px-3 py-2 text-xs text-white focus:border-neon-cyan focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-neon-cyan px-4 py-2.5 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
        >
          <Plus className="h-4 w-4" />
          <span>Add Manual Booking / Block Slot</span>
        </button>
      </div>

      {/* Bookings Table */}
      <div className="rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">No bookings match the search filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Booking Code</th>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Setup</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/5">
                    <td className="py-3.5 px-4 font-mono font-bold text-neon-cyan">{b.bookingCode}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{b.customerName}</div>
                      <div className="text-slate-400 text-[11px]">{b.customerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{b.setupName}</td>
                    <td className="py-3.5 px-4 text-slate-300">{b.date} @ {b.timeSlot}</td>
                    <td className="py-3.5 px-4 text-slate-300">{b.durationHours} hr(s)</td>
                    <td className="py-3.5 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase border bg-dark-950 focus:outline-none ${
                          b.status === 'confirmed' ? 'border-neon-green/30 text-neon-green' :
                          b.status === 'pending' ? 'border-amber-400/30 text-amber-400' :
                          b.status === 'completed' ? 'border-neon-cyan/30 text-neon-cyan' : 'border-neon-red/30 text-neon-red'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-slate-500 hover:text-neon-red transition-colors"
                        title="Delete Booking"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Manual Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase text-white">Create Manual Booking</h3>
            
            <form onSubmit={handleCreateManualBooking} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Customer Name</label>
                <input
                  type="text"
                  placeholder="Rahul"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Station</label>
                <select
                  value={setupId}
                  onChange={(e) => setSetupId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-xs text-white"
                >
                  {stations.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-bold uppercase text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 rounded-xl bg-neon-cyan py-2.5 text-xs font-bold uppercase text-dark-950"
                >
                  Save Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
