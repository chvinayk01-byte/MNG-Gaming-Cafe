import React, { useState } from 'react';
import { Plus, Trash2, Camera } from 'lucide-react';
import { GalleryItem } from '../../../types';
import { db } from '../../../services/storage';

interface GalleryTabProps {
  gallery: GalleryItem[];
  onUpdateGallery: (updated: GalleryItem[]) => void;
}

export const GalleryTab: React.FC<GalleryTabProps> = ({ gallery, onUpdateGallery }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Gaming Setup');
  const [imageUrl, setImageUrl] = useState('');

  const handleDelete = (id: string) => {
    if (!confirm('Delete photo?')) return;
    const updated = gallery.filter((item) => item.id !== id);
    db.saveGallery(updated);
    onUpdateGallery(updated);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    const newItem: GalleryItem = {
      id: `gal_${Date.now()}`,
      title,
      category,
      imageUrl,
      isFeatured: false,
    };

    const updated = [newItem, ...gallery];
    db.saveGallery(updated);
    onUpdateGallery(updated);
    setShowAdd(false);
    setTitle('');
    setImageUrl('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold uppercase text-white">Gallery Photo Manager</h3>
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-neon-cyan px-4 py-2 text-xs font-bold uppercase text-dark-950 shadow-neon-cyan"
        >
          <Plus className="h-4 w-4" />
          <span>Add Photo</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {gallery.map((g) => (
          <div key={g.id} className="relative h-48 rounded-2xl border border-white/10 bg-dark-900 overflow-hidden group shadow-xl">
            <img src={g.imageUrl} alt={g.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-dark-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-bold text-neon-cyan uppercase">{g.category}</div>
                <div className="text-xs font-bold text-white">{g.title}</div>
              </div>
              <button
                onClick={() => handleDelete(g.id)}
                className="self-end rounded-lg bg-neon-red/20 p-2 text-neon-red hover:bg-neon-red hover:text-white transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-dark-900 p-6 shadow-2xl space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase text-white">Add Photo to Gallery</h3>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Photo Title</label>
                <input
                  type="text"
                  placeholder="Esports Lounge View"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryItem['category'])}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                >
                  <option value="Gaming Setup">Gaming Setup</option>
                  <option value="Café Interior">Café Interior</option>
                  <option value="Tournaments">Tournaments</option>
                  <option value="Community">Community</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dark-950 px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="w-1/2 rounded-xl border border-white/10 bg-white/5 py-2.5 font-bold uppercase text-slate-300"
                >
                  Cancel
                </button>
                <button type="submit" className="w-1/2 rounded-xl bg-neon-cyan py-2.5 font-bold uppercase text-dark-950">
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
