import { Link } from 'react-router-dom';
import { Calendar, Image, Star, Award, Heart, Sparkles, Clock, MapPin, ChevronRight, Quote } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Home() {
  const { services, gallery, reviews, offers, settings, artists } = useApp();
  const popularServices = services.filter(s => s.popular && s.active).slice(0, 4);
  const featuredGallery = gallery.filter(g => g.visible).slice(0, 6);
  const approvedReviews = reviews.filter(r => r.approved && r.visible).slice(0, 3);
  const activeOffers = offers.filter(o => o.active).slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&h=900&fit=crop)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/85 via-charcoal-900/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-xl text-white">
            <p className="text-pink-300 font-medium tracking-widest uppercase text-sm mb-4">Premium Beauty Studio</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Unveil Your <span className="text-pink-300">Radiance</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              Expert bridal, party and professional makeup artistry. Experience luxury beauty services tailored for your most special moments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/booking" className="btn-primary flex items-center gap-2">
                <Calendar size={18} /> Book Appointment
              </Link>
              <Link to="/gallery" className="btn-outline flex items-center gap-2">
                <Image size={18} /> View Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle">Our Expertise</p>
            <h2 className="section-title">Popular Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-3">Handpicked experiences loved by our clients</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map(s => (
              <div key={s.id} className="card group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold mb-1">{s.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-pink-600 font-semibold">₹{s.price.toLocaleString()}</span>
                    <Link to="/booking" state={{ serviceId: s.id }} className="text-sm text-pink-500 font-medium hover:underline flex items-center gap-1">
                      Book <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Featured Bridal */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle">For Your Big Day</p>
              <h2 className="section-title">Featured Bridal Makeup</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your wedding day deserves perfection. Our bridal specialists create timeless looks that photograph beautifully and last from the ceremony to the last dance.
              </p>
              <ul className="space-y-3 mb-8">
                {['HD & Airbrush options', 'Trial session included', 'Home service available', 'Long-lasting premium products'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-charcoal-700">
                    <Sparkles size={16} className="text-pink-500" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className="btn-primary">Book Bridal Session</Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=700&h=800&fit=crop"
                alt="Bridal Makeup"
                className="rounded-2xl shadow-premium w-full object-cover aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-premium p-5 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                    <Award className="text-pink-500" size={22} />
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal-800">500+ Brides</div>
                    <div className="text-sm text-gray-500">Trusted & Loved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      {activeOffers.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <p className="section-subtitle">Limited Time</p>
              <h2 className="section-title">Special Offers</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {activeOffers.map(o => (
                <div key={o.id} className="card flex flex-col sm:flex-row overflow-hidden">
                  <img src={o.image} alt={o.title} className="sm:w-48 h-40 sm:h-auto object-cover" />
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-semibold text-pink-500 uppercase tracking-wide mb-1">{o.discountPercent}% OFF</span>
                    <h3 className="font-display text-xl font-semibold mb-2">{o.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 flex-1">{o.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-400 line-through text-sm mr-2">₹{o.originalPrice.toLocaleString()}</span>
                        <span className="text-pink-600 font-bold text-lg">₹{o.offerPrice.toLocaleString()}</span>
                      </div>
                      <Link to="/booking" className="btn-primary !py-2 !px-4 text-sm">Book Now</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/offers" className="text-pink-600 font-medium hover:underline">View all offers →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-charcoal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-pink-300 font-medium tracking-widest uppercase text-sm mb-3">The LuxeGlow Difference</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold">Why Choose Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Expert Artists', desc: 'Certified professionals with years of bridal & editorial experience.' },
              { icon: Heart, title: 'Premium Products', desc: 'Only top-tier, skin-friendly brands for a flawless finish.' },
              { icon: Clock, title: 'On-Time Service', desc: 'Punctual appointments — we respect your schedule.' },
              { icon: MapPin, title: 'Home Service', desc: 'We come to you for maximum comfort on your special day.' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <item.icon className="text-pink-400" size={26} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artists */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle">Meet the Team</p>
            <h2 className="section-title">Our Makeup Artists</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {artists.filter(a => a.available).map(a => (
              <div key={a.id} className="text-center group">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4 shadow-soft">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-display font-semibold text-lg">{a.name}</h3>
                <p className="text-sm text-pink-500">{a.specialization}</p>
                <p className="text-xs text-gray-400 mt-1">{a.experience} experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-pink-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle">Client Love</p>
            <h2 className="section-title">Testimonials</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {approvedReviews.map(r => (
              <div key={r.id} className="card p-6">
                <Quote className="text-pink-200 mb-3" size={28} />
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.comment}"</p>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                  ))}
                </div>
                <div className="font-semibold text-charcoal-800">{r.customerName}</div>
                <div className="text-xs text-gray-400">{r.service}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="section-subtitle">Our Work</p>
            <h2 className="section-title">Gallery Preview</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredGallery.map(g => (
              <div key={g.id} className="aspect-[3/4] rounded-xl overflow-hidden group relative">
                <img src={g.url} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-sm font-medium">{g.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="btn-secondary">Explore Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">Ready to Glow?</h2>
          <p className="text-pink-100 mb-8 text-lg">Book your appointment today and let our artists create magic for you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booking" className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-full hover:bg-pink-50 transition-colors">
              Book Appointment
            </Link>
            <a href={`https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="border-2 border-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
