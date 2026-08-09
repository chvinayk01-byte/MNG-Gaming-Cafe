import React, { useState, useEffect } from 'react';
import { Gamepad2, Zap, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface GamingIntroSplashProps {
  onComplete: () => void;
}

export const GamingIntroSplash: React.FC<GamingIntroSplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('CONNECTING TO MNG GAMING NETWORK...');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play subtle futuristic audio blips using Web Audio API if sound enabled
  const playSoundEffect = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio errors if audio context blocked by browser autoplay policy
    }
  };

  useEffect(() => {
    const statusMessages = [
      'CONNECTING TO MNG GAMING NETWORK...',
      'INITIALIZING HIGH-PERFORMANCE RIGS...',
      'LOADING ESPORTS & CONSOLE LOUNGE...',
      'VERIFYING STORE STATUS (DILSUKHNAGAR)...',
      'SYSTEM ONLINE - WELCOME GAMER!'
    ];

    playSoundEffect(440, 'triangle', 0.15);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 4;
        
        if (next < 25) setStatusText(statusMessages[0]);
        else if (next < 50) setStatusText(statusMessages[1]);
        else if (next < 75) setStatusText(statusMessages[2]);
        else if (next < 95) setStatusText(statusMessages[3]);
        else setStatusText(statusMessages[4]);

        if (next % 20 === 0 && next < 100) {
          playSoundEffect(500 + next * 3, 'sine', 0.08);
        }

        if (next >= 100) {
          clearInterval(timer);
          playSoundEffect(880, 'sine', 0.25);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return next;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete, soundEnabled]);

  const handleSkip = () => {
    playSoundEffect(600, 'square', 0.1);
    setIsFadingOut(true);
    setTimeout(onComplete, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0e181c] text-[#f2f2f2] transition-all duration-700 ease-out select-none min-h-dvh h-dvh w-screen max-w-full overflow-hidden ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#2b6777_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e181c]/80 via-transparent to-[#0e181c] pointer-events-none" />

      {/* Top Controls: Sound Toggle & Skip */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center gap-1.5 rounded-full border border-[#c8d8e4]/20 bg-white/5 p-2 text-xs text-[#c8d8e4] hover:border-[#52ab98] hover:text-[#52ab98] transition-all cursor-pointer"
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4 text-[#52ab98]" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 rounded-full border border-[#52ab98]/40 bg-[#52ab98]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#52ab98] hover:bg-[#52ab98]/20 transition-all cursor-pointer shadow-teal-glow"
        >
          <span>Skip Intro</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Central Gaming HUD Box */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md px-6">
        
        {/* Glowing Logo Icon */}
        <div className="relative mb-8">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] opacity-60 blur-2xl animate-pulse" />
          
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-[#52ab98]/50 bg-[#132128] text-[#52ab98] shadow-2xl">
            <Gamepad2 className="h-12 w-12 animate-bounce text-[#52ab98]" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#52ab98]/30 bg-[#52ab98]/10 px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#52ab98]">
            <Zap className="h-3 w-3" /> Premier Gaming Lounge
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            MNG <span className="text-[#52ab98]">GAMING CAFE</span>
          </h1>
          <p className="text-xs text-[#c8d8e4]/80 font-mono tracking-wider">Dilsukhnagar · Hyderabad</p>
        </div>

        {/* Telemetry Progress Bar */}
        <div className="w-full space-y-3 bg-[#132128]/80 p-5 rounded-2xl border border-[#c8d8e4]/15 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold">
            <span className="text-[#52ab98] truncate max-w-[80%]">{statusText}</span>
            <span className="text-white font-black">{progress}%</span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#0e181c] border border-[#c8d8e4]/15 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2b6777] via-[#52ab98] to-[#52ab98] transition-all duration-75 shadow-[0_0_15px_#52ab98]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-[#c8d8e4]/70 pt-1">
            <span className="flex items-center gap-1 text-[#52ab98]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#52ab98] animate-ping" />
              SYSTEM ONLINE
            </span>
            <span>•</span>
            <span>HYDERABAD, TS</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">5.0★ RATED</span>
          </div>
        </div>

      </div>
    </div>
  );
};
