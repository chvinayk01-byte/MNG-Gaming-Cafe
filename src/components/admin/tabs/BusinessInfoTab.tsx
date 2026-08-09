import React, { useState } from 'react';
import { Clock, MapPin, Save, ShieldCheck } from 'lucide-react';
import { BusinessInfo, BusinessDayHours } from '../../../types';
import { db } from '../../../services/storage';

interface BusinessInfoTabProps {
  businessInfo: BusinessInfo;
  businessHours: BusinessDayHours[];
  onUpdateInfo: (updated: BusinessInfo) => void;
  onUpdateHours: (updated: BusinessDayHours[]) => void;
}

export const BusinessInfoTab: React.FC<BusinessInfoTabProps> = ({
  businessInfo,
  businessHours,
  onUpdateInfo,
  onUpdateHours,
}) => {
  const [info, setInfo] = useState<BusinessInfo>({ ...businessInfo });
  const [hours, setHours] = useState<BusinessDayHours[]>([...businessHours]);
  const [saved, setSaved] = useState(false);

  const handleHourChange = (idx: number, field: keyof BusinessDayHours, value: any) => {
    const updated = [...hours];
    updated[idx] = { ...updated[idx], [field]: value };
    setHours(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveBusinessInfo(info);
    db.saveBusinessHours(hours);
    onUpdateInfo(info);
    onUpdateHours(hours);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      
      {/* Status Override Header */}
      <div className="rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4">
        <h3 className="font-heading text-lg font-bold uppercase text-white">Live Store Status Control</h3>
        <p className="text-xs text-slate-400">
          Override automatic IST business hours status if cafe is temporarily closed or open for special events.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {[
            { id: 'auto', label: 'Automatic (By Clock)', desc: 'Mon-Sat 10AM-10PM, Sun 12PM-6PM' },
            { id: 'open', label: 'Force OPEN NOW', desc: 'Override status to Open' },
            { id: 'closed', label: 'Force CLOSED NOW', desc: 'Override status to Closed' },
          ].map((mode) => (
            <button
              type="button"
              key={mode.id}
              onClick={() => setInfo({ ...info, statusOverride: mode.id as any })}
              className={`p-4 rounded-2xl border text-left transition-all ${
                info.statusOverride === mode.id
                  ? 'border-neon-cyan bg-neon-cyan/10 text-white shadow-neon-cyan'
                  : 'border-white/10 bg-dark-950 text-slate-400'
              }`}
            >
              <div className="font-bold text-xs uppercase text-white">{mode.label}</div>
              <div className="text-[10px] mt-1 opacity-80">{mode.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Business Details Editor */}
      <div className="rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4">
        <h3 className="font-heading text-lg font-bold uppercase text-white">Business Contact & Location Info</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Business Name</label>
            <input
              type="text"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-2.5 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Category</label>
            <input
              type="text"
              value={info.category}
              onChange={(e) => setInfo({ ...info, category: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-2.5 text-white"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-300 mb-1">Full Address</label>
            <textarea
              rows={2}
              value={info.address}
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-2.5 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Phone Number</label>
            <input
              type="text"
              value={info.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value, whatsapp: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-2.5 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">WhatsApp Contact</label>
            <input
              type="text"
              value={info.whatsapp}
              onChange={(e) => setInfo({ ...info, whatsapp: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-2.5 text-white"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-300 mb-1">Google Maps URL</label>
            <input
              type="text"
              value={info.googleMapsUrl}
              onChange={(e) => setInfo({ ...info, googleMapsUrl: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-2.5 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Google Rating (e.g. 5.0)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={info.rating}
              onChange={(e) => setInfo({ ...info, rating: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-2.5 text-white"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Review Count (e.g. 60)</label>
            <input
              type="number"
              min="0"
              value={info.reviewCount}
              onChange={(e) => setInfo({ ...info, reviewCount: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-2.5 text-white"
              required
            />
          </div>
        </div>
      </div>

      {/* Operating Hours Editor Table */}
      <div className="rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4">
        <h3 className="font-heading text-lg font-bold uppercase text-white">Verified Operating Hours</h3>

        <div className="space-y-3">
          {hours.map((schedule, idx) => (
            <div key={schedule.day} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center p-3 rounded-xl border border-white/5 bg-dark-950 text-xs">
              <span className="font-bold text-white">{schedule.day}</span>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Open Time</label>
                <input
                  type="text"
                  value={schedule.openTime}
                  onChange={(e) => handleHourChange(idx, 'openTime', e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-dark-900 px-3 py-1.5 text-white"
                  disabled={schedule.isClosed}
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Close Time</label>
                <input
                  type="text"
                  value={schedule.closeTime}
                  onChange={(e) => handleHourChange(idx, 'closeTime', e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-dark-900 px-3 py-1.5 text-white"
                  disabled={schedule.isClosed}
                />
              </div>
              <div className="flex items-center gap-2 pt-3 sm:pt-0">
                <input
                  type="checkbox"
                  id={`closed_${schedule.day}`}
                  checked={schedule.isClosed}
                  onChange={(e) => handleHourChange(idx, 'isClosed', e.target.checked)}
                  className="rounded border-white/10"
                />
                <label htmlFor={`closed_${schedule.day}`} className="font-bold text-slate-300">
                  Closed All Day
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        {saved && (
          <span className="text-xs font-bold text-neon-green">
            ✓ Settings Saved Successfully!
          </span>
        )}
        <button
          type="submit"
          className="ml-auto inline-flex items-center gap-2 rounded-xl bg-neon-cyan px-6 py-3 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
        >
          <Save className="h-4 w-4" />
          <span>Save Settings</span>
        </button>
      </div>

    </form>
  );
};
