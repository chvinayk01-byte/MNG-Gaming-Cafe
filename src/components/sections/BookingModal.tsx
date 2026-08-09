import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, MessageSquare, Gamepad2, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import { GamingStation, Booking, BusinessInfo } from '../../types';
import { db } from '../../services/storage';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  stations: GamingStation[];
  initialSelectedStation?: GamingStation | null;
  businessInfo: BusinessInfo;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  stations,
  initialSelectedStation,
  businessInfo,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Form, 2: Summary, 3: Confirmation

  const resetAndClose = () => {
    setStep(1);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setNotes('');
    setCreatedBooking(null);
    onClose();
  };

  const [selectedStationId, setSelectedStationId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('04:00 PM');
  const [durationHours, setDurationHours] = useState<number>(2);
  const [playerCount, setPlayerCount] = useState<number>(1);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    // Set default date to today YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    setDate(today);

    if (initialSelectedStation) {
      setSelectedStationId(initialSelectedStation.id);
    } else if (stations.length > 0) {
      setSelectedStationId(stations[0].id);
    }
  }, [initialSelectedStation, stations]);

  if (!isOpen) return null;

  const currentStation = stations.find((s) => s.id === selectedStationId) || stations[0];

  // Calculate estimated price if hourly price exists
  const calculatedTotal = currentStation?.hourlyPrice ? currentStation.hourlyPrice * durationHours * playerCount : null;

  const handleNextToSummary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please enter your Name and Contact Phone Number');
      return;
    }
    setStep(2);
  };

  const handleConfirmBooking = () => {
    const existingBookings = db.getBookings();
    const count = existingBookings.length + 1;
    const bookingCode = `MNG-2026-${String(count).padStart(4, '0')}`;

    const newBooking: Booking = {
      id: `b_${Date.now()}`,
      bookingCode,
      setupId: currentStation?.id || 'general',
      setupName: currentStation?.name || 'General Gaming Station',
      date,
      timeSlot,
      durationHours,
      playerCount,
      customerName,
      customerPhone,
      customerEmail: customerEmail || undefined,
      notes: notes || undefined,
      totalPrice: calculatedTotal || undefined,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Save to database
    db.saveBookings([newBooking, ...existingBookings]);
    setCreatedBooking(newBooking);
    setStep(3);
  };

  // Generate WhatsApp prefilled message link
  const getWhatsAppLink = () => {
    if (!createdBooking) return '#';
    const msg = `Hi MNG Gaming Cafe! I would like to confirm my booking request.\n\n📌 Booking ID: ${createdBooking.bookingCode}\n🎮 Station: ${createdBooking.setupName}\n📅 Date: ${createdBooking.date}\n⏰ Time: ${createdBooking.timeSlot}\n⏳ Duration: ${createdBooking.durationHours} Hour(s)\n👤 Name: ${createdBooking.customerName}\n📞 Phone: ${createdBooking.customerPhone}`;
    const encoded = encodeURIComponent(msg);
    const cleanPhone = businessInfo.phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 pb-4 px-4 bg-black/85 backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-2xl rounded-3xl border border-[#c8d8e4]/15 bg-[#132128] shadow-2xl flex flex-col" style={{maxHeight: 'calc(100vh - 32px)'}}>

        {/* ── STICKY HEADER — always visible ── */}
        <div className="shrink-0 px-6 pt-6 pb-4 border-b border-[#c8d8e4]/10">

          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors z-10"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Cafe Name — always visible at very top */}
          <div className="flex items-center gap-3 pr-8 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#52ab98]/15 text-[#52ab98] border border-[#52ab98]/30">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#52ab98]/60 leading-none mb-0.5">Welcome to</p>
              <h2 className="text-lg font-black tracking-tight leading-none">
                <span className="text-white">MNG </span><span className="text-[#52ab98]">Gaming Cafe</span>
              </h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Dilsukhnagar, Hyderabad · Open 10AM–10PM</p>
            </div>
          </div>

          {/* Step Progress Bar */}
          {step !== 3 && (
            <div className="flex items-center gap-2">
              {[1, 2].map((s) => (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase transition-all ${
                    step >= s ? 'text-[#52ab98]' : 'text-slate-500'
                  }`}>
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black border transition-all ${
                      step > s
                        ? 'bg-[#52ab98] border-[#52ab98] text-[#0e181c]'
                        : step === s
                        ? 'border-[#52ab98] text-[#52ab98] bg-[#52ab98]/10'
                        : 'border-slate-600 text-slate-500'
                    }`}>
                      {step > s ? '✓' : s}
                    </span>
                    <span className="hidden sm:inline">{s === 1 ? 'Your Details' : 'Review & Confirm'}</span>
                  </div>
                  {s < 2 && <div className={`flex-1 h-px transition-all ${step > s ? 'bg-[#52ab98]' : 'bg-slate-700'}`} />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Section title */}
          <h3 className="font-heading text-base font-black uppercase text-white mb-5 leading-tight">
            {step === 3 ? '🎉 Booking Request Received!' : '🎮 Book a Gaming Session'}
          </h3>

        {/* STEP 1: FORM */}
        {step === 1 && (
          <form onSubmit={handleNextToSummary} className="space-y-4">
            
            {/* Setup Selection */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                1. Select Gaming Setup
              </label>
              <select
                value={selectedStationId}
                onChange={(e) => setSelectedStationId(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white focus:border-neon-cyan focus:outline-none"
              >
                {stations.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} {s.hourlyPrice ? `(₹${s.hourlyPrice}/hr)` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                  2. Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white focus:border-neon-cyan focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                  3. Select Start Time
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white focus:border-neon-cyan focus:outline-none"
                >
                  {[
                    '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM',
                    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
                    '08:00 PM', '09:00 PM'
                  ].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Duration & Player Count */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                  4. Duration (Hours)
                </label>
                <select
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white focus:border-neon-cyan focus:outline-none"
                >
                  <option value={1}>1 Hour Session</option>
                  <option value={2}>2 Hours Session</option>
                  <option value={3}>3 Hours Session</option>
                  <option value={5}>5 Hours Marathon Pass</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                  5. Number of Players
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={playerCount}
                  onChange={(e) => setPlayerCount(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white focus:border-neon-cyan focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="pt-2 border-t border-white/10 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neon-cyan">
                Customer Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number (+91) *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address (Optional)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                />
              </div>

              <div>
                <textarea
                  placeholder="Special requests or game preferences (Optional)"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                />
              </div>
            </div>

            {/* Form Submit & Back */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-teal-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Review My Booking</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Friendly back to website */}
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#c8d8e4]/70 hover:text-[#52ab98] transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to website</span>
              </button>
            </div>

          </form>
        )}

        {/* STEP 2: BOOKING SUMMARY */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-[#52ab98]/30 bg-[#52ab98]/5 p-5 space-y-4">
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-[#52ab98] border-b border-[#c8d8e4]/10 pb-2">
                Booking Summary
              </h4>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400">Gaming Setup:</span>
                  <div className="font-bold text-white mt-0.5">{currentStation?.name}</div>
                </div>
                <div>
                  <span className="text-slate-400">Date & Time:</span>
                  <div className="font-bold text-white mt-0.5">{date} at {timeSlot}</div>
                </div>
                <div>
                  <span className="text-slate-400">Duration:</span>
                  <div className="font-bold text-white mt-0.5">{durationHours} Hour(s)</div>
                </div>
                <div>
                  <span className="text-slate-400">Players:</span>
                  <div className="font-bold text-white mt-0.5">{playerCount} Player(s)</div>
                </div>
                <div>
                  <span className="text-slate-400">Customer Name:</span>
                  <div className="font-bold text-white mt-0.5">{customerName}</div>
                </div>
                <div>
                  <span className="text-slate-400">Contact Number:</span>
                  <div className="font-bold text-white mt-0.5">{customerPhone}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-slate-300">Estimated Total:</span>
                <span className="font-heading text-xl font-black text-neon-green">
                  {calculatedTotal ? `₹${calculatedTotal}` : 'Contact Cafe for Price'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-[#52ab98]/40 bg-[#52ab98]/10 px-5 py-3 text-xs font-bold uppercase text-[#52ab98] hover:bg-[#52ab98]/20 active:scale-95 transition-all group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Edit Details</span>
              </button>
              <button
                onClick={handleConfirmBooking}
                className="flex-1 rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] py-3 text-xs font-bold uppercase text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm Booking</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMATION STATE */}
        {step === 3 && createdBooking && (
          <div className="space-y-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#52ab98]/10 text-[#52ab98] mx-auto border border-[#52ab98]/30">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <div className="inline-block rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 px-3 py-1 text-xs font-mono font-bold text-neon-cyan mb-2">
                Booking ID: {createdBooking.bookingCode}
              </div>
              <h4 className="font-heading text-xl font-extrabold uppercase text-white">
                Request Sent Successfully!
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Your gaming session slot has been reserved in pending status.
              </p>
            </div>

            <div className="rounded-2xl border border-[#c8d8e4]/10 bg-[#0e181c] p-4 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Setup:</span>
                <span className="text-white font-bold">{createdBooking.setupName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <span className="text-white font-bold">{createdBooking.date} • {createdBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-yellow-400 font-bold uppercase">Pending Confirmation</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25d366] px-5 py-3.5 text-xs font-bold uppercase text-[#0e181c] hover:scale-105 transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Confirm Instantly via WhatsApp</span>
              </a>

              <button
                onClick={resetAndClose}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#52ab98]/30 bg-[#52ab98]/10 py-3 text-xs font-bold uppercase text-[#52ab98] hover:bg-[#52ab98]/20 active:scale-95 transition-all group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to MNG Gaming Cafe</span>
              </button>
            </div>

          </div>
        )}

        </div>{/* end scrollable body */}
      </div>
    </div>
  );
};
