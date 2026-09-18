import React, { useState, useEffect } from 'react';
import { Gamepad2, Menu, X, MapPin, MessageSquare } from 'lucide-react';
import { BusinessInfo, BusinessDayHours } from '../../types';
import { getStoreStatus } from '../../services/storage';

interface NavbarProps {
  businessInfo: BusinessInfo;
  businessHours: BusinessDayHours[];
}

export const Navbar: React.FC<NavbarProps> = ({
  businessInfo,
  businessHours,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState(() => getStoreStatus(businessInfo, businessHours));

  useEffect(() => {
    const updateStatus = () => setStatus(getStoreStatus(businessInfo, businessHours));
    updateStatus();
    const timer = setInterval(updateStatus, 10000);
    return () => clearInterval(timer);
  }, [businessInfo, businessHours]);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Gaming', href: '#gaming' },
    { name: 'Setups', href: '#setups' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Games', href: '#games' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#c8d8e4]/10 bg-[#0e181c]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2b6777] via-[#52ab98] to-[#c8d8e4] p-0.5 shadow-teal-glow transition-transform group-hover:scale-105">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0e181c]">
              <Gamepad2 className="h-5 w-5 text-[#52ab98] transition-transform group-hover:rotate-12" />
            </div>
          </div>
          <div>
            <span className="font-heading text-lg font-black tracking-wider text-white sm:text-xl">
              MNG <span className="text-[#52ab98]">GAMING CAFE</span>
            </span>
            <div className="flex items-center gap-2 text-[10px] font-medium text-[#c8d8e4]/80">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#52ab98]" /> Dilsukhnagar, Hyd
              </span>
              <span className="text-white/20">•</span>
              <span className={`flex items-center gap-1 font-semibold ${status.isOpen ? 'text-[#52ab98]' : 'text-rose-400'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? 'bg-[#52ab98] animate-pulse' : 'bg-rose-400'}`}></span>
                {status.isOpen ? 'OPEN NOW' : 'CLOSED'}
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-xs font-semibold uppercase tracking-wider text-[#c8d8e4]/90 transition-all duration-300 hover:text-[#52ab98] hover:scale-105 group py-1"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#52ab98] transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_#52ab98]" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Primary WhatsApp CTA */}
          <a
            href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}?text=Hi%20MNG%20Gaming%20Cafe,%20I%20want%20to%20enquire%20about%20a%20gaming%20session.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer relative group overflow-hidden rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-teal-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(82,171,152,0.5)] active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 transition-transform group-hover:rotate-12" />
              WHATSAPP US
            </span>
            <div className="absolute inset-0 bg-white/20 transition-transform -translate-x-full group-hover:translate-x-0" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}?text=Hi%20MNG%20Gaming%20Cafe,%20I%20want%20to%20enquire%20about%20a%20gaming%20session.`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#52ab98] px-3 py-1.5 text-xs font-bold uppercase text-[#0e181c] shadow-teal-glow flex items-center gap-1"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Chat</span>
          </a>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-[#c8d8e4]/15 bg-[#132128] p-2 text-[#c8d8e4] hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#c8d8e4]/10 bg-[#0e181c]/95 px-4 pb-6 pt-2 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3 py-2">
            <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 mb-2 border border-[#c8d8e4]/10">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${status.isOpen ? 'bg-[#52ab98] animate-pulse' : 'bg-rose-400'}`} />
                <span className="text-xs font-semibold text-white">{status.statusText}</span>
              </div>
              <span className="text-xs text-[#c8d8e4]/70">{status.todayHoursText}</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold uppercase text-slate-200 hover:bg-[#52ab98]/10 hover:text-[#52ab98]"
              >
                {link.name}
              </a>
            ))}

            <div className="mt-4 flex flex-col gap-2 pt-2 border-t border-[#c8d8e4]/10">
              <a
                href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}?text=Hi%20MNG%20Gaming%20Cafe,%20I%20want%20to%20enquire%20about%20a%20gaming%20session.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#52ab98] py-2.5 text-sm font-bold text-[#0e181c] shadow-teal-glow"
              >
                <MessageSquare className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
