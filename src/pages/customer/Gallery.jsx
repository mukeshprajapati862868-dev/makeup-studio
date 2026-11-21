import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const CATEGORIES = [
  'All', 'Bridal Makeup', 'Party Makeup', 'Engagement Makeup',
  'Reception Makeup', 'HD Makeup', 'Natural Makeup',
  'Pre-Bridal Makeup', 'Hair Styling', 'Before & After'
];

export default function Gallery() {
  const { gallery } = useApp();
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const items = gallery.filter(g => g.visible && (filter === 'All' || g.category === filter));

  const openLightbox = (index) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox(i => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setLightbox(i => (i === items.length - 1 ? 0 : i + 1));

  return (
    <div>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="section-subtitle">Portfolio</p>
          <h1 className="section-title">Our Gallery</h1>
          <p className="text-gray-500 max-w-xl mx-auto mt-3">Browse our latest bridal, party and specialty looks</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? 'bg-pink-500 text-white'
                  : 'bg-white border border-pink-100 text-charcoal-700 hover:border-pink-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="aspect-[3/4] rounded-xl overflow-hidden group relative focus:outline-none"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-white text-sm font-medium">{item.title}</span>
                <span className="text-pink-200 text-xs">{item.category}</span>
              </div>
            </button>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 text-gray-400">No images in this category yet.</div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && items[lightbox] && (
        <div className="fixed inset-0 z-50 lightbox-overlay flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full" onClick={closeLightbox}>
            <X size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={e => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft size={32} />
          </button>
          <img
            src={items[lightbox].url}
            alt={items[lightbox].title}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 rounded-full"
            onClick={e => { e.stopPropagation(); next(); }}
          >
            <ChevronRight size={32} />
          </button>
          <div className="absolute bottom-6 left-0 right-0 text-center text-white">
            <div className="font-medium">{items[lightbox].title}</div>
            <div className="text-sm text-gray-300">{items[lightbox].category}</div>
          </div>
        </div>
      )}
    </div>
  );
}
