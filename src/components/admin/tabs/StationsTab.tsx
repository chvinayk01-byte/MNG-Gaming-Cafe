import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Cpu, Check, X } from 'lucide-react';
import { GamingCategory, GamingStation, StationAvailability } from '../../../types';
import { db } from '../../../services/storage';

interface StationsTabProps {
  categories: GamingCategory[];
  stations: GamingStation[];
  onUpdateCategories: (updated: GamingCategory[]) => void;
  onUpdateStations: (updated: GamingStation[]) => void;
}

export const StationsTab: React.FC<StationsTabProps> = ({
  categories,
  stations,
  onUpdateCategories,
  onUpdateStations,
}) => {
  const [editingStation, setEditingStation] = useState<Partial<GamingStation> | null>(null);

  // Toggle Category Availability
  const handleToggleCategory = (catId: string) => {
    const updated = categories.map((c) => (c.id === catId ? { ...c, isAvailable: !c.isAvailable } : c));
    db.saveCategories(updated);
    onUpdateCategories(updated);
  };

  // Delete Station
  const handleDeleteStation = (id: string) => {
    if (!confirm('Are you sure you want to delete this gaming station?')) return;
    const updated = stations.filter((s) => s.id !== id);
    db.saveStations(updated);
    onUpdateStations(updated);
  };

  // Save Station
  const handleSaveStation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStation?.name) return;

    if (editingStation.id) {
      // Update
      const updated = stations.map((s) => (s.id === editingStation.id ? ({ ...s, ...editingStation } as GamingStation) : s));
      db.saveStations(updated);
      onUpdateStations(updated);
    } else {
      // Add
      const newStation: GamingStation = {
        id: `st_${Date.now()}`,
        name: editingStation.name,
        categoryId: editingStation.categoryId || categories[0]?.id || 'cat-pc',
        image: editingStation.image || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
        cpu: editingStation.cpu || undefined,
        gpu: editingStation.gpu || undefined,
        ram: editingStation.ram || undefined,
        monitor: editingStation.monitor || undefined,
        refreshRate: editingStation.refreshRate || undefined,
        headset: editingStation.headset || undefined,
        keyboard: editingStation.keyboard || undefined,
        mouse: editingStation.mouse || undefined,
        hourlyPrice: editingStation.hourlyPrice ? Number(editingStation.hourlyPrice) : undefined,
        availability: editingStation.availability || 'available',
        isFeatured: true,
      };
      const updated = [newStation, ...stations];
      db.saveStations(updated);
      onUpdateStations(updated);
    }

    setEditingStation(null);
  };

  return (
    <div className="space-y-10">
      
      {/* 1. Category Enable/Disable Toggles */}
      <div className="rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4">
        <h3 className="font-heading text-lg font-bold uppercase text-white">
          Gaming Categories Management
        </h3>
        <p className="text-xs text-slate-400">
          Enable or disable available gaming experience categories for your website visitors.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-white/10 bg-dark-950"
            >
              <div>
                <div className="font-bold text-sm text-white">{cat.name}</div>
                <div className="text-[10px] text-slate-400">{cat.stationCount} Stations</div>
              </div>
              <button
                onClick={() => handleToggleCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                  cat.isAvailable
                    ? 'bg-neon-green/20 border border-neon-green/40 text-neon-green'
                    : 'bg-neon-pink/20 border border-neon-pink/40 text-neon-pink'
                }`}
              >
                {cat.isAvailable ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Stations List & Creator */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold uppercase text-white">
            Gaming Stations & Hardware Setups
          </h3>

          <button
            onClick={() =>
              setEditingStation({
                name: '',
                categoryId: categories[0]?.id || 'cat-pc',
                availability: 'available',
              })
            }
            className="inline-flex items-center gap-2 rounded-xl bg-neon-cyan px-4 py-2 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Setup</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((st) => (
            <div
              key={st.id}
              className="rounded-2xl border border-white/10 bg-dark-900 p-5 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="h-36 w-full overflow-hidden rounded-xl bg-dark-950 mb-3">
                  <img src={st.image} alt={st.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-base font-bold text-white">{st.name}</h4>
                  <span className="text-[10px] font-bold uppercase text-neon-cyan">{st.availability}</span>
                </div>

                <div className="mt-2 space-y-1 text-xs text-slate-300">
                  {st.cpu && <div>CPU: {st.cpu}</div>}
                  {st.gpu && <div>GPU: {st.gpu}</div>}
                  {st.monitor && <div>Display: {st.monitor}</div>}
                  {st.hourlyPrice && <div className="font-bold text-neon-green mt-1">₹{st.hourlyPrice}/hr</div>}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => setEditingStation(st)}
                  className="rounded-lg bg-white/5 p-2 text-slate-300 hover:text-white"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteStation(st.id)}
                  className="rounded-lg bg-white/5 p-2 text-slate-400 hover:text-neon-red"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Editor Modal */}
      {editingStation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4 my-8">
            <h3 className="font-heading text-lg font-bold uppercase text-white">
              {editingStation.id ? 'Edit Setup' : 'Create Setup'}
            </h3>

            <form onSubmit={handleSaveStation} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Station Name</label>
                <input
                  type="text"
                  value={editingStation.name || ''}
                  onChange={(e) => setEditingStation({ ...editingStation, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={editingStation.categoryId || ''}
                    onChange={(e) => setEditingStation({ ...editingStation, categoryId: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Availability</label>
                  <select
                    value={editingStation.availability || 'available'}
                    onChange={(e) => setEditingStation({ ...editingStation, availability: e.target.value as StationAvailability })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  >
                    <option value="available">🟢 Available</option>
                    <option value="occupied">🔴 Occupied</option>
                    <option value="reserved">🟡 Reserved</option>
                    <option value="maintenance">⚫ Maintenance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingStation.image || ''}
                  onChange={(e) => setEditingStation({ ...editingStation, image: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">CPU</label>
                  <input
                    type="text"
                    value={editingStation.cpu || ''}
                    onChange={(e) => setEditingStation({ ...editingStation, cpu: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">GPU</label>
                  <input
                    type="text"
                    value={editingStation.gpu || ''}
                    onChange={(e) => setEditingStation({ ...editingStation, gpu: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">RAM</label>
                  <input
                    type="text"
                    value={editingStation.ram || ''}
                    onChange={(e) => setEditingStation({ ...editingStation, ram: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Monitor / Refresh Rate</label>
                  <input
                    type="text"
                    value={editingStation.monitor || ''}
                    onChange={(e) => setEditingStation({ ...editingStation, monitor: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Hourly Price (₹)</label>
                <input
                  type="number"
                  value={editingStation.hourlyPrice || ''}
                  onChange={(e) => setEditingStation({ ...editingStation, hourlyPrice: Number(e.target.value) })}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingStation(null)}
                  className="w-1/2 rounded-xl border border-white/10 bg-white/5 py-2.5 font-bold uppercase text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 rounded-xl bg-neon-cyan py-2.5 font-bold uppercase text-dark-950"
                >
                  Save Station
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
