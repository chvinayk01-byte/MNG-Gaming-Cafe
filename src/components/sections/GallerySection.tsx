import React, { useState } from 'react';
import { Camera, X, Maximize2, MapPin, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { GalleryItem, BusinessInfo } from '../../types';

interface GallerySectionProps {
  items: GalleryItem[];
  businessInfo: BusinessInfo;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items, businessInfo }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Café Interior', 'Gaming Setup', 'Tournaments', 'Community'];

  const filteredItems = items.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${businessInfo.coordinates.lat},${businessInfo.coordinates.lng}`;

  return (
    <section id="gallery" className="relative py-24 bg-[#132128] border-t border-[#c8d8e4]/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#52ab98]/30 bg-[#52ab98]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#52ab98] mb-3">
            <Camera className="h-4 w-4" /> Google Maps & Interior Photos
          </div>
          <h2 className="font-heading text-3xl font-black uppercase text-white sm:text-5xl">
            INSIDE <span className="text-[#52ab98]">MNG GAMING CAFE</span>
          </h2>
          <p className="mt-3 text-sm text-[#c8d8e4]/90">
            Real photos and Google Maps verified location in Dilsukhnagar, Hyderabad.
          </p>

          {/* Google Maps Direct Photos Action Button */}
          <div className="mt-6">
            <a
              href={businessInfo.googleMapsUrl || googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#2b6777] to-[#52ab98] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-teal-glow hover:scale-105 transition-all"
            >
              <MapPin className="h-4 w-4 text-white" />
              <span>View 60+ Photos on Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-[#52ab98] text-[#0e181c] shadow-teal-glow scale-105'
                  : 'border border-[#c8d8e4]/15 bg-white/5 text-[#c8d8e4] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative h-64 overflow-hidden rounded-2xl border border-[#c8d8e4]/15 bg-[#0e181c] cursor-pointer shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e181c] via-[#0e181c]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />



              <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#0e181c]/80 text-[#52ab98] opacity-0 group-hover:opacity-100 transition-opacity border border-white/10">
                <Maximize2 className="h-4 w-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-bold uppercase text-[#52ab98] block mb-1">
                  {item.category}
                </span>
                <h4 className="font-heading text-sm font-bold text-white line-clamp-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 text-slate-400 hover:text-white"
            >
              <X className="h-8 w-8" />
            </button>

            <img
              src={lightboxImage.imageUrl}
              alt={lightboxImage.title}
              className="w-full max-h-[80vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
            />

            <div className="mt-4 text-center">
              <h3 className="font-heading text-lg font-bold text-white">{lightboxImage.title}</h3>
              <p className="text-xs text-[#52ab98] uppercase font-bold">{lightboxImage.category}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
