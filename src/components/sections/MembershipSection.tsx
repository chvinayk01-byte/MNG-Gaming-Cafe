import React from 'react';
import { Crown, Check, Sparkles, AlertCircle } from 'lucide-react';
import { MembershipPlan, BusinessInfo } from '../../types';

interface MembershipSectionProps {
  memberships: MembershipPlan[];
  businessInfo: BusinessInfo;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ memberships, businessInfo }) => {
  const activeMemberships = memberships.filter((m) => m.isActive);

  return (
    <section id="membership" className="relative py-24 bg-[#0e181c] border-t border-[#c8d8e4]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52ab98]/30 bg-[#52ab98]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#52ab98] mb-3">
            <Crown className="h-4 w-4" /> VIP Pass & Perks
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            LEVEL UP YOUR <span className="text-[#52ab98]">MEMBERSHIP</span>
          </h2>
          <p className="mt-3 text-sm text-[#c8d8e4]">
            Enjoy priority seat reservations, hourly discounts, and tournament perks.
          </p>
        </div>

        {/* Memberships Grid or Empty State */}
        {activeMemberships.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center max-w-lg mx-auto">
            <Crown className="mx-auto h-12 w-12 text-[#52ab98] mb-3" />
            <h3 className="text-xl font-bold text-white uppercase">Membership plans coming soon.</h3>
            <p className="text-xs text-[#c8d8e4]/80 mt-2">
              Ask cafe staff at counter or contact us for current membership passes!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {activeMemberships.map((membership) => (
              <div
                key={membership.id}
                className="relative flex flex-col justify-between rounded-3xl border border-[#c8d8e4]/15 bg-[#132128] p-8 shadow-2xl transition-all duration-300 hover:border-[#52ab98]/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-xl font-black uppercase text-white">
                      {membership.name}
                    </h3>
                    <span className="rounded-lg bg-[#2b6777]/20 border border-[#2b6777]/40 px-3 py-1 text-[10px] font-bold text-[#52ab98] uppercase">
                      {membership.validity}
                    </span>
                  </div>

                  {membership.price ? (
                    <div className="mb-6 flex items-baseline gap-1">
                      <span className="font-heading text-3xl font-black text-white">₹{membership.price}</span>
                      <span className="text-xs text-[#c8d8e4]/70">/ {membership.validity}</span>
                    </div>
                  ) : (
                    <div className="mb-6 text-sm font-bold text-[#52ab98]">
                      Ask Staff for Pricing
                    </div>
                  )}

                  <div className="space-y-3 text-xs text-[#c8d8e4] border-t border-white/10 pt-4 mb-6">
                    {membership.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-[#52ab98] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                    {membership.hasPriorityBooking && (
                      <div className="flex items-start gap-2.5">
                        <Sparkles className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="font-semibold text-white">Priority Seat Reservations</span>
                      </div>
                    )}
                  </div>
                </div>

                <a
                  href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}?text=Hi%20MNG%20Gaming%20Cafe,%20I%20want%20to%20enquire%20about%20joining%20as%20a%20${encodeURIComponent(membership.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-teal-glow hover:scale-105 transition-all"
                >
                  BECOME A MEMBER
                </a>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
