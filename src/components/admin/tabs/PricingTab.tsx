import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';
import { PricingPlan } from '../../../types';
import { db } from '../../../services/storage';

interface PricingTabProps {
  plans: PricingPlan[];
  onUpdatePlans: (updated: PricingPlan[]) => void;
}

export const PricingTab: React.FC<PricingTabProps> = ({ plans, onUpdatePlans }) => {
  const [editingPlan, setEditingPlan] = useState<Partial<PricingPlan> | null>(null);

  const handleDelete = (id: string) => {
    if (!confirm('Delete pricing package?')) return;
    const updated = plans.filter((p) => p.id !== id);
    db.savePricing(updated);
    onUpdatePlans(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan?.name || !editingPlan?.duration) return;

    if (editingPlan.id) {
      const updated = plans.map((p) => (p.id === editingPlan.id ? ({ ...p, ...editingPlan } as PricingPlan) : p));
      db.savePricing(updated);
      onUpdatePlans(updated);
    } else {
      const newPlan: PricingPlan = {
        id: `pr_${Date.now()}`,
        name: editingPlan.name,
        duration: editingPlan.duration,
        price: editingPlan.price ? Number(editingPlan.price) : undefined,
        discount: editingPlan.discount || undefined,
        description: editingPlan.description || '',
        applicableDays: editingPlan.applicableDays || 'Monday - Sunday',
        isFeatured: Boolean(editingPlan.isFeatured),
        isActive: true,
      };
      const updated = [newPlan, ...plans];
      db.savePricing(updated);
      onUpdatePlans(updated);
    }

    setEditingPlan(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold uppercase text-white">Pricing Plans & Offers</h3>
        <button
          onClick={() => setEditingPlan({ name: '', duration: '1 Hour', description: '' })}
          className="inline-flex items-center gap-2 rounded-xl bg-neon-cyan px-4 py-2 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
        >
          <Plus className="h-4 w-4" />
          <span>Add Pricing Package</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-white/10 bg-dark-900 p-6 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-base font-bold text-white">{p.name}</h4>
                <span className="text-[10px] font-bold text-neon-cyan uppercase">{p.duration}</span>
              </div>
              <div className="mt-3 font-heading text-2xl font-black text-white">
                {p.price ? `₹${p.price}` : 'Contact Cafe'}
              </div>
              <p className="text-xs text-slate-300 mt-2">{p.description}</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-white/10">
              <button onClick={() => setEditingPlan(p)} className="rounded-lg bg-white/5 p-2 text-slate-300">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(p.id)} className="rounded-lg bg-white/5 p-2 text-slate-400 hover:text-neon-red">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase text-white">
              {editingPlan.id ? 'Edit Plan' : 'Create Plan'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Package Name</label>
                <input
                  type="text"
                  value={editingPlan.name || ''}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingPlan.duration || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, duration: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Price (₹ - Optional)</label>
                  <input
                    type="number"
                    value={editingPlan.price || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingPlan.description || ''}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="w-1/2 rounded-xl border border-white/10 bg-white/5 py-2.5 font-bold uppercase text-slate-300"
                >
                  Cancel
                </button>
                <button type="submit" className="w-1/2 rounded-xl bg-neon-cyan py-2.5 font-bold uppercase text-dark-950">
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
