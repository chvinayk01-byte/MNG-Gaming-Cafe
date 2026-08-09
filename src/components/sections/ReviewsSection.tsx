import React from 'react';
import { Star, ExternalLink, ShieldCheck, ThumbsUp } from 'lucide-react';
import { BusinessInfo } from '../../types';

interface ReviewsSectionProps {
  businessInfo: BusinessInfo;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ businessInfo }) => {
  return (
    <section id="reviews" className="relative py-20 bg-dark-950 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        <div className="relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900 p-8 sm:p-12 shadow-2xl text-center">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
              <ShieldCheck className="h-4 w-4" /> Verified Customer Feedback
            </div>

            <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
              WHAT GAMERS <span className="text-amber-400">SAY</span>
            </h2>

            {/* Rating Stars & Stats */}
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Star className="h-7 w-7 fill-amber-400" />
                <Star className="h-7 w-7 fill-amber-400" />
                <Star className="h-7 w-7 fill-amber-400" />
                <Star className="h-7 w-7 fill-amber-400" />
                <Star className="h-7 w-7 fill-amber-400" />
              </div>

              <div className="font-heading text-4xl font-black text-white">
                5.0 / 5.0
              </div>

              <p className="text-sm font-semibold text-slate-300">
                Based on <span className="text-neon-cyan font-bold">60 verified Google Reviews</span> for MNG Gaming Cafe in Dilsukhnagar, Hyderabad.
              </p>
            </div>

            {/* Direct Google Reviews Link Button */}
            <div className="pt-4">
              <a
                href={businessInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-8 py-4 text-xs font-black uppercase tracking-wider text-dark-950 shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span>VIEW ALL GOOGLE REVIEWS</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
