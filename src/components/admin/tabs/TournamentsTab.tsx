import React, { useState } from 'react';
import { Plus, Download, Trophy, Edit2, Trash2, Users } from 'lucide-react';
import { Tournament, TournamentRegistration, TournamentStatus } from '../../../types';
import { db } from '../../../services/storage';

interface TournamentsTabProps {
  tournaments: Tournament[];
  onUpdateTournaments: (updated: Tournament[]) => void;
}

export const TournamentsTab: React.FC<TournamentsTabProps> = ({ tournaments, onUpdateTournaments }) => {
  const [editingTournament, setEditingTournament] = useState<Partial<Tournament> | null>(null);
  const [registrations, setRegistrations] = useState<TournamentRegistration[]>(db.getRegistrations());

  const handleDelete = (id: string) => {
    if (!confirm('Delete tournament?')) return;
    const updated = tournaments.filter((t) => t.id !== id);
    db.saveTournaments(updated);
    onUpdateTournaments(updated);
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert('No player registrations to export.');
      return;
    }

    const headers = ['Code', 'Tournament', 'Player Name', 'Phone', 'Game ID', 'Team Name', 'Date'];
    const rows = registrations.map((r) => [
      r.registrationCode,
      `"${r.tournamentTitle}"`,
      `"${r.playerName}"`,
      r.phone,
      r.gameId,
      `"${r.teamName || ''}"`,
      r.createdAt,
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MNG_Tournaments_Registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTournament?.title || !editingTournament?.gameName) return;

    if (editingTournament.id) {
      const updated = tournaments.map((t) => (t.id === editingTournament.id ? ({ ...t, ...editingTournament } as Tournament) : t));
      db.saveTournaments(updated);
      onUpdateTournaments(updated);
    } else {
      const newTour: Tournament = {
        id: `tour_${Date.now()}`,
        title: editingTournament.title,
        gameName: editingTournament.gameName,
        date: editingTournament.date || '2026-08-30',
        time: editingTournament.time || '02:00 PM',
        entryFee: editingTournament.entryFee ? Number(editingTournament.entryFee) : undefined,
        prizePool: editingTournament.prizePool || undefined,
        maxPlayers: editingTournament.maxPlayers ? Number(editingTournament.maxPlayers) : 16,
        registeredCount: 0,
        status: (editingTournament.status as TournamentStatus) || 'registration_open',
        rules: editingTournament.rules || ['5v5 Tournament Format', 'Fair play rules apply'],
        image: editingTournament.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      };
      const updated = [newTour, ...tournaments];
      db.saveTournaments(updated);
      onUpdateTournaments(updated);
    }

    setEditingTournament(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="font-heading text-lg font-bold uppercase text-white">Tournaments & Esports Events</h3>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase text-slate-200 hover:text-white"
          >
            <Download className="h-4 w-4 text-neon-cyan" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setEditingTournament({ title: '', gameName: 'VALORANT', status: 'registration_open' })}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-neon-cyan px-4 py-2 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
          >
            <Plus className="h-4 w-4" />
            <span>Create Tournament</span>
          </button>
        </div>
      </div>

      {/* Tournaments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tournaments.map((t) => (
          <div key={t.id} className="rounded-2xl border border-white/10 bg-dark-900 p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h4 className="font-heading text-base font-bold text-white">{t.title}</h4>
              <span className="text-[10px] font-bold text-neon-cyan uppercase">{t.status}</span>
            </div>
            <div className="text-xs text-slate-300">
              Game: <span className="font-bold text-white">{t.gameName}</span> • Date: {t.date} @ {t.time}
            </div>
            <div className="text-xs text-slate-400">
              Registered Players: <span className="font-bold text-neon-green">{t.registeredCount} / {t.maxPlayers}</span>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button onClick={() => setEditingTournament(t)} className="rounded-lg bg-white/5 p-2 text-slate-300">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(t.id)} className="rounded-lg bg-white/5 p-2 text-slate-400 hover:text-neon-red">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Registrations List Table */}
      <div className="rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl">
        <h4 className="font-heading text-base font-bold uppercase text-white mb-4">Registered Players List</h4>
        {registrations.length === 0 ? (
          <div className="text-xs text-slate-400 text-center py-4">No player registrations yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Reg Code</th>
                  <th className="py-2.5 px-3">Player Name</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Game ID</th>
                  <th className="py-2.5 px-3">Team Name</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {registrations.map((r) => (
                  <tr key={r.id}>
                    <td className="py-2.5 px-3 font-mono font-bold text-neon-cyan">{r.registrationCode}</td>
                    <td className="py-2.5 px-3 font-semibold text-white">{r.playerName}</td>
                    <td className="py-2.5 px-3 text-slate-300">{r.phone}</td>
                    <td className="py-2.5 px-3 text-slate-300">{r.gameId}</td>
                    <td className="py-2.5 px-3 text-slate-300">{r.teamName || 'Solo'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Editor */}
      {editingTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase text-white">
              {editingTournament.id ? 'Edit Tournament' : 'Create Tournament'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Tournament Title</label>
                <input
                  type="text"
                  value={editingTournament.title || ''}
                  onChange={(e) => setEditingTournament({ ...editingTournament, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Game</label>
                  <input
                    type="text"
                    value={editingTournament.gameName || ''}
                    onChange={(e) => setEditingTournament({ ...editingTournament, gameName: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Status</label>
                  <select
                    value={editingTournament.status || 'registration_open'}
                    onChange={(e) => setEditingTournament({ ...editingTournament, status: e.target.value as TournamentStatus })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  >
                    <option value="registration_open">Registration Open</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="full">Full</option>
                    <option value="live">LIVE</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={editingTournament.date || ''}
                    onChange={(e) => setEditingTournament({ ...editingTournament, date: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Time</label>
                  <input
                    type="text"
                    value={editingTournament.time || ''}
                    onChange={(e) => setEditingTournament({ ...editingTournament, time: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingTournament(null)}
                  className="w-1/2 rounded-xl border border-white/10 bg-white/5 py-2.5 font-bold uppercase text-slate-300"
                >
                  Cancel
                </button>
                <button type="submit" className="w-1/2 rounded-xl bg-neon-cyan py-2.5 font-bold uppercase text-dark-950">
                  Save Tournament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
