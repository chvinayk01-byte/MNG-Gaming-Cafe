import React, { useState } from 'react';
import { ShieldCheck, Lock, X, KeyRound } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin password for local owner access
    if (password === 'MNGgaming2026') {
      setError('');
      setPassword('');
      onLoginSuccess();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl border border-neon-purple/30 bg-dark-900 p-6 sm:p-8 shadow-2xl">
        
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white">
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-purple/10 text-neon-purple border border-neon-purple/30 mb-3 shadow-neon-purple">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h3 className="font-heading text-2xl font-black uppercase text-white">
            ADMIN SYSTEM LOGIN
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            MNG Gaming Cafe Management Access
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
              Enter Admin Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-dark-950 pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-neon-purple focus:outline-none"
                required
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-neon-red/30 bg-neon-red/10 p-3 text-xs text-neon-red font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-neon-purple to-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-neon-purple hover:scale-[1.02] transition-all"
          >
            Access Dashboard
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-[11px] text-slate-500">
          Role-Based Access Control • Supabase & LocalStorage Backend
        </div>

      </div>
    </div>
  );
};
