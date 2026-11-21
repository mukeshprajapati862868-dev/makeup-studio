import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useState } from 'react';

export default function Services() {
  const { services } = useApp();
  const categories = ['All', ...new Set(services.map(s => s.category))];
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? services.filter(s => s.active) : services.filter(s => s.active && s.category === active);

  return (
    <div>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="section-subtitle">What We Offer</p>
          <h1 className="section-title">Services & Pricing</h1>
          <p className="text-gray-500 max-w-xl mx-auto mt-3">Premium makeup and beauty services tailored to every occasion</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active === cat
                  ? 'bg-pink-500 text-white'
                  : 'bg-white border border-pink-100 text-charcoal-700 hover:border-pink-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(s => (
            <div key={s.id} className="card group">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {s.popular && (
                  <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                  <span className="text-pink-600 font-bold whitespace-nowrap">₹{s.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{s.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={13} /> {s.duration} min
                  </span>
                  <Link
                    to="/booking"
                    state={{ serviceId: s.id }}
                    className="text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center gap-1"
                  >
                    Book Now <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">No services in this category.</div>
        )}
      </div>
    </div>
  );
}
