import { Link } from 'react-router-dom';
import { Tag, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Offers() {
  const { offers } = useApp();
  const active = offers.filter(o => o.active);

  return (
    <div>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="section-subtitle">Exclusive Deals</p>
          <h1 className="section-title">Special Offers</h1>
          <p className="text-gray-500 max-w-xl mx-auto mt-3">Limited-time packages and discounts for our valued clients</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {active.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No active offers at the moment. Check back soon!</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {active.map(o => (
              <div key={o.id} className="card overflow-hidden group">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={o.image} alt={o.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Tag size={14} /> {o.discountPercent}% OFF
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold mb-2">{o.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{o.description}</p>
                  <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
                    <Calendar size={13} />
                    Valid: {o.startDate} → {o.endDate}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 line-through text-sm mr-2">₹{o.originalPrice.toLocaleString()}</span>
                      <span className="text-pink-600 font-bold text-xl">₹{o.offerPrice.toLocaleString()}</span>
                    </div>
                    <Link to="/booking" className="btn-primary !py-2 !px-4 text-sm">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
