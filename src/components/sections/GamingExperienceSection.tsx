import React from 'react';
import { ChevronRight, Gamepad2, Cpu, Monitor, Sparkles } from 'lucide-react';
import { GamingCategory } from '../../types';

interface GamingExperienceSectionProps {
  categories: GamingCategory[];
}

export const GamingExperienceSection: React.FC<GamingExperienceSectionProps> = ({
  categories,
}) => {
  const activeCategories = categories.filter((c) => c.isAvailable);

  return (
    <section id="gaming" className="relative py-24 bg-[#132128]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52ab98]/30 bg-[#52ab98]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#52ab98] mb-3">
            <Sparkles className="h-4 w-4" /> Gaming Lounge & Battle Stations
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            CHOOSE YOUR <span className="text-[#52ab98]">GAMING ARENA</span>
          </h2>
          <p className="mt-3 text-sm text-[#c8d8e4]/90">
            From high FPS competitive PC gaming to sofa console lounge sessions in Dilsukhnagar.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeCategories.map((category) => (
            <div
              key={category.id}
              className="group relative rounded-3xl border border-[#c8d8e4]/15 bg-[#0e181c] p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:border-[#52ab98]/60 hover:-translate-y-2 hover:shadow-[0_15px_35px_-10px_rgba(82,171,152,0.3)] cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                
                {/* Image Cover */}
                <div className="h-44 w-full sm:w-48 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#132128]">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-black uppercase text-white transition-colors duration-300 group-hover:text-[#52ab98]">
                      {category.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#c8d8e4] leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="mt-6 pt-4 border-t border-[#c8d8e4]/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#c8d8e4]">
                  {category.stationCount} Station{category.stationCount > 1 ? 's' : ''} Ready
                </span>
                
                <a
                  href="#setups"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase text-[#52ab98] hover:text-white transition-colors cursor-pointer"
                >
                  <span>View Setups</span>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
