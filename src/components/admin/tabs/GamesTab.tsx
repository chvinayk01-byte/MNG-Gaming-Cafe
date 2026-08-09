import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Gamepad2 } from 'lucide-react';
import { Game } from '../../../types';
import { db } from '../../../services/storage';

interface GamesTabProps {
  games: Game[];
  onUpdateGames: (updated: Game[]) => void;
}

export const GamesTab: React.FC<GamesTabProps> = ({ games, onUpdateGames }) => {
  const [editingGame, setEditingGame] = useState<Partial<Game> | null>(null);

  const handleDelete = (id: string) => {
    if (!confirm('Delete game title?')) return;
    const updated = games.filter((g) => g.id !== id);
    db.saveGames(updated);
    onUpdateGames(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGame?.name) return;

    if (editingGame.id) {
      const updated = games.map((g) => (g.id === editingGame.id ? ({ ...g, ...editingGame } as Game) : g));
      db.saveGames(updated);
      onUpdateGames(updated);
    } else {
      const newGame: Game = {
        id: `gm_${Date.now()}`,
        name: editingGame.name,
        coverImage: editingGame.coverImage || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
        genre: editingGame.genre || 'FPS',
        platform: editingGame.platform || 'PC',
        mode: editingGame.mode || 'multiplayer',
        maxPlayers: editingGame.maxPlayers ? Number(editingGame.maxPlayers) : 5,
        description: editingGame.description || '',
        isAvailable: true,
      };
      const updated = [newGame, ...games];
      db.saveGames(updated);
      onUpdateGames(updated);
    }

    setEditingGame(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold uppercase text-white">Games Library</h3>
        <button
          onClick={() => setEditingGame({ name: '', genre: 'FPS', platform: 'PC', mode: 'multiplayer' })}
          className="inline-flex items-center gap-2 rounded-xl bg-neon-cyan px-4 py-2 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
        >
          <Plus className="h-4 w-4" />
          <span>Add Game Title</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map((g) => (
          <div key={g.id} className="rounded-2xl border border-white/10 bg-dark-900 p-4 space-y-3 shadow-xl">
            <div className="h-32 w-full overflow-hidden rounded-xl bg-dark-950">
              <img src={g.coverImage} alt={g.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-heading text-base font-bold text-white">{g.name}</h4>
              <span className="text-[10px] font-bold text-neon-cyan uppercase">{g.genre}</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">{g.description}</p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button onClick={() => setEditingGame(g)} className="rounded-lg bg-white/5 p-2 text-slate-300">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(g.id)} className="rounded-lg bg-white/5 p-2 text-slate-400 hover:text-neon-red">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase text-white">
              {editingGame.id ? 'Edit Game' : 'Add Game'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Game Name</label>
                <input
                  type="text"
                  value={editingGame.name || ''}
                  onChange={(e) => setEditingGame({ ...editingGame, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Genre</label>
                  <input
                    type="text"
                    value={editingGame.genre || ''}
                    onChange={(e) => setEditingGame({ ...editingGame, genre: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Platform</label>
                  <input
                    type="text"
                    value={editingGame.platform || ''}
                    onChange={(e) => setEditingGame({ ...editingGame, platform: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editingGame.coverImage || ''}
                  onChange={(e) => setEditingGame({ ...editingGame, coverImage: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingGame.description || ''}
                  onChange={(e) => setEditingGame({ ...editingGame, description: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingGame(null)}
                  className="w-1/2 rounded-xl border border-white/10 bg-white/5 py-2.5 font-bold uppercase text-slate-300"
                >
                  Cancel
                </button>
                <button type="submit" className="w-1/2 rounded-xl bg-neon-cyan py-2.5 font-bold uppercase text-dark-950">
                  Save Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
