import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Crown } from 'lucide-react';
import { MembershipPlan } from '../../../types';
import { db } from '../../../services/storage';

interface MembershipsTabProps {
  memberships: MembershipPlan[];
  onUpdateMemberships: (updated: MembershipPlan[]) => void;
}

export const MembershipsTab: React.FC<MembershipsTabProps> = ({ memberships, onUpdateMemberships }) => {
  const [editing, setEditing] = useState<Partial<MembershipPlan> | null>(null);

  const handleDelete = (id: string) => {
    if (!confirm('Delete membership plan?')) return;
    const updated = memberships.filter((m) => m.id !== id);
    db.saveMemberships(updated);
    onUpdateMemberships(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.name || !editing?.validity) return;

    if (editing.id) {
      const updated = memberships.map((m) => (m.id === editing.id ? ({ ...m, ...editing } as MembershipPlan) : m));
      db.saveMemberships(updated);
      onUpdateMemberships(updated);
    } else {
      const newPlan: MembershipPlan = {
        id: `mem_${Date.now()}`,
        name: editing.name,
        validity: editing.validity,
        price: editing.price ? Number(editing.price) : undefined,
        benefits: editing.benefits || ['Discounted rates', 'Priority booking'],
        hasTournamentBenefits: Boolean(editing.hasTournamentBenefits),
        hasPriorityBooking: true,
        isActive: true,
      };
      const updated = [newPlan, ...memberships];
      db.saveMemberships(updated);
      onUpdateMemberships(updated);
    }

    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold uppercase text-white">Membership Plans</h3>
        <button
          onClick={() => setEditing({ name: '', validity: '1 Month' })}
          className="inline-flex items-center gap-2 rounded-xl bg-neon-cyan px-4 py-2 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
        >
          <Plus className="h-4 w-4" />
          <span>Add Membership</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memberships.map((m) => (
          <div key={m.id} className="rounded-2xl border border-white/10 bg-dark-900 p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="font-heading text-base font-bold text-white">{m.name}</h4>
              <span className="text-[10px] font-bold text-neon-purple uppercase">{m.validity}</span>
            </div>
            <div className="font-heading text-xl font-bold text-white">
              {m.price ? `₹${m.price}` : 'Ask Staff'}
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button onClick={() => setEditing(m)} className="rounded-lg bg-white/5 p-2 text-slate-300">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(m.id)} className="rounded-lg bg-white/5 p-2 text-slate-400 hover:text-neon-red">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase text-white">
              {editing.id ? 'Edit Membership' : 'Create Membership'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Plan Name</label>
                <input
                  type="text"
                  value={editing.name || ''}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Validity</label>
                  <input
                    type="text"
                    value={editing.validity || ''}
                    onChange={(e) => setEditing({ ...editing, validity: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editing.price || ''}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
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
