import React, { useState } from 'react';
import { Trophy, Calendar, Clock, Users, ShieldCheck, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { Tournament, TournamentRegistration, TournamentStatus } from '../../types';
import { db } from '../../services/storage';

interface TournamentsSectionProps {
  tournaments: Tournament[];
}

export const TournamentsSection: React.FC<TournamentsSectionProps> = ({ tournaments }) => {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<TournamentRegistration | null>(null);

  // Form State
  const [playerName, setPlayerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gameId, setGameId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [notes, setNotes] = useState('');

  const getStatusBadge = (status: TournamentStatus) => {
    switch (status) {
      case 'registration_open':
        return { text: 'Registration Open', class: 'bg-neon-green/10 text-neon-green border-neon-green/30' };
      case 'upcoming':
        return { text: 'Upcoming', class: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30' };
      case 'full':
        return { text: 'Full', class: 'bg-neon-pink/10 text-neon-pink border-neon-pink/30' };
      case 'live':
        return { text: 'LIVE NOW', class: 'bg-amber-400/10 text-amber-400 border-amber-400/30 animate-pulse' };
      case 'completed':
        return { text: 'Completed', class: 'bg-slate-500/10 text-slate-400 border-slate-500/30' };
      default:
        return { text: status, class: 'bg-white/10 text-white' };
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTournament) return;

    const existingRegs = db.getRegistrations();
    const count = existingRegs.length + 1;
    const registrationCode = `REG-2026-${String(count).padStart(4, '0')}`;

    const newReg: TournamentRegistration = {
      id: `reg_${Date.now()}`,
      registrationCode,
      tournamentId: selectedTournament.id,
      tournamentTitle: selectedTournament.title,
      playerName,
      phone,
      email: email || undefined,
      gameId,
      teamName: teamName || undefined,
      playerCount: teamName ? 5 : 1,
      notes: notes || undefined,
      createdAt: new Date().toISOString(),
    };

    db.saveRegistrations([newReg, ...existingRegs]);

    // Update tournament registered count
    const allTournaments = db.getTournaments();
    const updated = allTournaments.map((t) =>
      t.id === selectedTournament.id ? { ...t, registeredCount: t.registeredCount + 1 } : t
    );
    db.saveTournaments(updated);

    setRegistrationSuccess(newReg);
  };

  const closeModal = () => {
    setSelectedTournament(null);
    setRegistrationSuccess(null);
    setPlayerName('');
    setPhone('');
    setEmail('');
    setGameId('');
    setTeamName('');
    setNotes('');
  };

  return (
    <section id="tournaments" className="relative py-24 bg-dark-900 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neon-cyan mb-3">
            <Trophy className="h-4 w-4" /> Esports & Tournaments
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            ENTER THE <span className="text-neon-cyan">ARENA</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Compete in local Hyderabad gaming tournaments and showcase your skill.
          </p>
        </div>

        {/* Tournaments Grid or Empty State */}
        {tournaments.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center max-w-lg mx-auto">
            <Trophy className="mx-auto h-12 w-12 text-neon-cyan mb-3" />
            <h3 className="text-xl font-bold text-white uppercase">No Upcoming Tournaments</h3>
            <p className="text-xs text-slate-400 mt-2">
              Tournament schedules are being finalized. Check back soon or register your interest at the cafe!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tournaments.map((tournament) => {
              const badge = getStatusBadge(tournament.status);

              return (
                <div
                  key={tournament.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-dark-950 p-6 shadow-2xl transition-all duration-300 hover:border-neon-cyan/50 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Image & Status */}
                    <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-dark-800 mb-6">
                      <img
                        src={tournament.image}
                        alt={tournament.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />

                      <div className={`absolute top-4 left-4 rounded-full border px-3 py-1 text-xs font-bold uppercase backdrop-blur-md ${badge.class}`}>
                        {badge.text}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="font-heading text-lg font-black uppercase text-neon-cyan">
                          {tournament.gameName}
                        </span>
                        {tournament.prizePool && (
                          <span className="rounded-lg bg-amber-400/20 border border-amber-400/40 px-3 py-1 text-xs font-bold text-amber-400 backdrop-blur-md">
                            Prize: {tournament.prizePool}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-heading text-2xl font-black uppercase text-white group-hover:text-neon-cyan transition-colors mb-4">
                      {tournament.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 mb-6">
                      <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5">
                        <Calendar className="h-4 w-4 text-neon-cyan shrink-0" />
                        <span>Date: {tournament.date}</span>
                      </div>

                      <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5">
                        <Clock className="h-4 w-4 text-neon-green shrink-0" />
                        <span>Time: {tournament.time}</span>
                      </div>

                      <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5">
                        <Users className="h-4 w-4 text-neon-purple shrink-0" />
                        <span>Slots: {tournament.registeredCount} / {tournament.maxPlayers}</span>
                      </div>

                      <div className="flex items-center gap-2 rounded-xl bg-white/5 p-2.5">
                        <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                        <span>Entry: {tournament.entryFee ? `₹${tournament.entryFee}` : 'Free Entry'}</span>
                      </div>
                    </div>

                    {/* Rules */}
                    {tournament.rules && tournament.rules.length > 0 && (
                      <div className="mb-6 rounded-xl border border-white/5 bg-white/5 p-4 space-y-1.5 text-xs text-slate-400">
                        <div className="font-bold text-white uppercase text-[10px] tracking-wider mb-1">Rules Summary:</div>
                        {tournament.rules.map((rule, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="text-neon-cyan font-bold">•</span>
                            <span>{rule}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={() => setSelectedTournament(tournament)}
                      disabled={tournament.status === 'full' || tournament.status === 'completed'}
                      className="w-full rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-dark-950 shadow-neon-cyan hover:scale-[1.02] disabled:opacity-50 disabled:pointer-events-none transition-all"
                    >
                      {tournament.status === 'registration_open' ? 'Register Now' : 'View Tournament Details'}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Registration Modal */}
      {selectedTournament && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-dark-900 p-6 sm:p-8 shadow-2xl my-8">
            
            <button onClick={closeModal} className="absolute top-6 right-6 text-slate-400 hover:text-white">
              <X className="h-6 w-6" />
            </button>

            {!registrationSuccess ? (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/10 text-neon-cyan">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-black uppercase text-white">
                      Tournament Registration
                    </h3>
                    <p className="text-xs text-neon-cyan font-bold">{selectedTournament.title}</p>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Player Full Name *"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone Number (+91) *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="In-Game ID / Riot ID *"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Team Name (If Squad Event)"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                  />
                </div>

                <textarea
                  placeholder="Additional Notes or Teammate Riot IDs"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none"
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-neon-cyan to-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-dark-950 shadow-neon-cyan"
                  >
                    SUBMIT REGISTRATION
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-green/10 text-neon-green mx-auto border border-neon-green/30">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div>
                  <div className="inline-block rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 px-3 py-1 text-xs font-mono font-bold text-neon-cyan mb-2">
                    Code: {registrationSuccess.registrationCode}
                  </div>
                  <h4 className="font-heading text-xl font-extrabold uppercase text-white">
                    Registration Confirmed!
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    You are registered for {registrationSuccess.tournamentTitle}.
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="w-full rounded-xl bg-neon-cyan py-3 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
