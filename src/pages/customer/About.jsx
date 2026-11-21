import { Award, Heart, Users, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export default function About() {
  const { settings, artists } = useApp();

  return (
    <div>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="section-subtitle">Our Story</p>
          <h1 className="section-title">About {settings.shopName}</h1>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold mb-4 text-charcoal-800">
                Where Beauty Meets Artistry
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded with a passion for making every client feel radiant and confident, {settings.shopName} has become a trusted name in premium makeup artistry. From intimate engagement looks to grand bridal transformations, we bring expertise, hygiene and heart to every appointment.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our studio in the heart of the city offers a calm, luxurious space — or we come to you with our professional home service. Every look is customized, every product carefully chosen, and every client treated like family.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, label: '8+ Years', sub: 'Experience' },
                  { icon: Users, label: '2000+', sub: 'Happy Clients' },
                  { icon: Heart, label: '500+', sub: 'Bridal Looks' },
                  { icon: Sparkles, label: '4.9★', sub: 'Average Rating' },
                ].map((s, i) => (
                  <div key={i} className="bg-pink-50 rounded-xl p-4 text-center">
                    <s.icon className="mx-auto text-pink-500 mb-2" size={22} />
                    <div className="font-semibold text-charcoal-800">{s.label}</div>
                    <div className="text-xs text-gray-500">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=500&fit=crop" alt="Studio" className="rounded-2xl object-cover h-64 w-full" />
              <img src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop" alt="Bridal" className="rounded-2xl object-cover h-64 w-full mt-8" />
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop" alt="Makeup" className="rounded-2xl object-cover h-64 w-full -mt-8" />
              <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&h=500&fit=crop" alt="Hair" className="rounded-2xl object-cover h-64 w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-pink-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Meet Our Artists</h2>
            <p className="text-gray-500 mt-2">Talented professionals dedicated to your beauty</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {artists.map(a => (
              <div key={a.id} className="card text-center p-6">
                <img src={a.image} alt={a.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-pink-100" />
                <h3 className="font-display font-semibold text-lg">{a.name}</h3>
                <p className="text-sm text-pink-500 mb-1">{a.specialization}</p>
                <p className="text-xs text-gray-400">{a.experience} · {a.workingHours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl font-semibold mb-4">Ready to experience the difference?</h2>
          <p className="text-gray-500 mb-6">Book your appointment and let us create a look you'll love.</p>
          <Link to="/booking" className="btn-primary">Book Appointment</Link>
        </div>
      </section>
    </div>
  );
}
