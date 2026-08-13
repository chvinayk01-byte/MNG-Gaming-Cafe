import React, { useState } from 'react';
import { Tag, Clock, Check, Sparkles, Zap, Image as ImageIcon, X, Maximize2 } from 'lucide-react';
import { PricingPlan, BusinessInfo } from '../../types';

interface PricingSectionProps {
  plans: PricingPlan[];
  businessInfo: BusinessInfo;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ plans, businessInfo }) => {
  const [showMenuCard, setShowMenuCard] = useState(false);
  const activePlans = plans.filter((p) => p.isActive);

  return (
    <section id="pricing" className="relative py-24 bg-[#0e181c] border-t border-[#c8d8e4]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52ab98]/30 bg-[#52ab98]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#52ab98] mb-3">
            <Tag className="h-4 w-4" /> Official Tariff Card & Rates
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            PRICING & <span className="text-[#52ab98]">RATES MENU</span>
          </h2>
          <p className="mt-3 text-sm text-[#c8d8e4]">
            Official rate menu card for PC Gaming, PS5, PS5 Pro, Snooker & Board Games at MNG Gaming Cafe.
          </p>

          {/* Rate Menu Card Preview Action */}
          <div className="mt-6">
            <button
              onClick={() => setShowMenuCard(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-teal-glow hover:scale-105 transition-all cursor-pointer"
            >
              <ImageIcon className="h-4 w-4 text-white" />
              <span>View Official Rate Card Image</span>
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        {activePlans.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center max-w-lg mx-auto">
            <Clock className="mx-auto h-12 w-12 text-[#52ab98] mb-3" />
            <h3 className="text-xl font-bold text-white uppercase">Contact Us For Current Pricing</h3>
            <p className="text-xs text-[#c8d8e4]/80 mt-2">
              Our hourly rates and package offers are available directly at the cafe counter or over phone.
            </p>
            <a
              href={`tel:${businessInfo.phone}`}
              className="mt-6 inline-flex rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] px-6 py-2.5 text-xs font-bold uppercase text-white shadow-teal-glow"
            >
              Call {businessInfo.phone}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {activePlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${
                  plan.isFeatured
                    ? 'border-[#52ab98] bg-[#132128] shadow-teal-glow z-10'
                    : 'border-[#c8d8e4]/15 bg-[#132128]/70 hover:border-[#52ab98]/40'
                }`}
              >
                {plan.isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#2b6777] to-[#52ab98] px-4 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-md flex items-center gap-1">
                    <Zap className="h-3 w-3 fill-white" /> Popular Offer
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-heading text-lg font-extrabold uppercase text-white">{plan.name}</h3>
                    <div className="rounded-lg bg-white/5 px-2.5 py-1 text-[10px] font-bold text-[#52ab98] uppercase shrink-0">
                      {plan.duration}
                    </div>
                  </div>

                  {/* Price display */}
                  <div className="mt-5 mb-4">
                    {plan.price ? (
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-3xl font-black text-white">₹{plan.price}</span>
                        <span className="text-xs text-[#c8d8e4]/70">/ {plan.duration}</span>
                      </div>
                    ) : (
                      <div className="text-base font-bold text-[#52ab98]">
                        Contact us for current pricing
                      </div>
                    )}

                    {plan.discount && (
                      <span className="inline-block mt-2 rounded-md bg-[#52ab98]/10 border border-[#52ab98]/20 px-2 py-0.5 text-[10px] font-bold text-[#52ab98]">
                        {plan.discount}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#c8d8e4] leading-relaxed border-t border-white/10 pt-4 mb-4">
                    {plan.description}
                  </p>

                  <div className="space-y-2 text-xs text-[#c8d8e4]/80">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#52ab98] shrink-0" />
                      <span>Valid on: {plan.applicableDays}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#52ab98] shrink-0" />
                      <span>Official MNG Lounge Rates</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <a
                    href={`https://wa.me/${businessInfo.phone.replace(/[^0-9]/g, '')}?text=Hi%20MNG%20Gaming%20Cafe,%20I%20want%20to%20enquire%20about%20the%20${encodeURIComponent(plan.name)}%20(${encodeURIComponent(plan.price ? '₹' + plan.price : '')}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center block rounded-xl py-3 text-xs font-bold uppercase tracking-wider transition-all ${
                      plan.isFeatured
                        ? 'bg-gradient-to-r from-[#2b6777] to-[#52ab98] text-white shadow-teal-glow hover:scale-105'
                        : 'border border-[#c8d8e4]/20 bg-white/5 text-white hover:bg-[#52ab98]/10 hover:border-[#52ab98]'
                    }`}
                  >
                    Enquire Package
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Official Rate Card Lightbox Modal */}
      {showMenuCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowMenuCard(false)}
              className="absolute -top-12 right-0 text-slate-400 hover:text-white p-2"
            >
              <X className="h-8 w-8" />
            </button>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e181c] p-2 shadow-2xl">
              <img
                src="/images/mng_rate_card.jpg"
                alt="Official MNG Gaming Cafe Tariff Card Menu"
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="font-heading text-lg font-bold text-white">Official MNG Gaming Cafe Tariff Card</h3>
              <p className="text-xs text-[#52ab98] uppercase font-bold">House No. 7-49, Konark Theatre Lane, Dilsukhnagar, Hyd</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
