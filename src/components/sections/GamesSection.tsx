import React, { useState } from 'react';
import { Gamepad2, Search, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Game } from '../../types';

interface GamesSectionProps {
  games: Game[];
}

export const GamesSection: React.FC<GamesSectionProps> = ({ games }) => {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ['All', 'FPS', 'Sports', 'Fighting', 'Racing', 'Battle Royale', 'Adventure'];

  const availableGames = games.filter((g) => g.isAvailable);

  const filteredGames = availableGames.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase()) ||
                          game.genre.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || game.genre.toLowerCase() === selectedGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  return (
    <section id="games" className="relative py-24 bg-dark-950 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neon-cyan mb-3">
            <Gamepad2 className="h-4 w-4" /> Games Library
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            WHAT ARE YOU <span className="text-neon-cyan">PLAYING?</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Browse titles available across PC battle stations and console lounges.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto">
          {/* Genre Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`rounded-xl px-4 py-2 text-xs font-bold uppercase transition-all ${
                  selectedGenre === genre
                    ? 'bg-neon-cyan text-dark-950 shadow-neon-cyan scale-105'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-dark-900 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
            />
          </div>
        </div>

        {/* Games Grid or Empty State */}
        {filteredGames.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center max-w-lg mx-auto">
            <ShieldAlert className="mx-auto h-12 w-12 text-neon-cyan mb-3" />
            <h3 className="text-xl font-bold text-white uppercase">Games Library Updating Soon</h3>
            <p className="text-xs text-slate-400 mt-2">
              Our game list is continuously updated by cafe staff. Contact us or ask at the cafe counter for specific game titles!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-dark-900/90 transition-all duration-300 hover:border-neon-cyan/40 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-dark-800">
                    <img
                      src={game.coverImage}
                      alt={game.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3 rounded-md bg-dark-950/80 px-2.5 py-1 text-[10px] font-bold text-neon-cyan border border-white/10">
                      {game.genre}
                    </div>

                    <div className="absolute top-3 right-3 rounded-md bg-dark-950/80 px-2.5 py-1 text-[10px] font-bold text-white border border-white/10">
                      {game.platform}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-heading text-base font-extrabold uppercase text-white group-hover:text-neon-cyan transition-colors">
                      {game.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-[11px] text-slate-300 border-t border-white/5 mt-2">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-neon-green" />
                    {game.maxPlayers ? `Up to ${game.maxPlayers} Players` : game.mode}
                  </span>
                  <span className="text-neon-cyan font-semibold uppercase">{game.mode}</span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
