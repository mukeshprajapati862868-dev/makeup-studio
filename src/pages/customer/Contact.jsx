import { Phone, MapPin, Clock, MessageCircle, Instagram, Facebook, Mail } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useState } from 'react';

export default function Contact() {
  const { settings, showToast } = useApp();
  const [form, setForm] = useState({ name: '', mobile: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.message) {
      showToast('Please fill all fields', 'error');
      return;
    }
    showToast('Message received! We will contact you soon. (Demo)');
    setForm({ name: '', mobile: '', message: '' });
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="section-subtitle">Get in Touch</p>
          <h1 className="section-title">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <div className="card p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                <MapPin className="text-pink-500" size={22} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-sm text-gray-500">{settings.address}</p>
              </div>
            </div>
            <div className="card p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                <Phone className="text-pink-500" size={22} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <a href={`tel:${settings.mobile}`} className="text-sm text-pink-600 hover:underline">{settings.mobile}</a>
              </div>
            </div>
            <div className="card p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                <MessageCircle className="text-pink-500" size={22} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">WhatsApp</h3>
                <a
                  href={`https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-pink-600 hover:underline"
                >
                  Chat with us
                </a>
              </div>
            </div>
            <div className="card p-6 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center shrink-0">
                <Clock className="text-pink-500" size={22} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Business Hours</h3>
                <p className="text-sm text-gray-500">Mon–Fri: {settings.businessHours?.weekdays}</p>
                <p className="text-sm text-gray-500">Sat: {settings.businessHours?.saturday}</p>
                <p className="text-sm text-gray-500">Sun: {settings.businessHours?.sunday}</p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a href={settings.social?.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-500 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href={settings.social?.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-500 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Form + Map placeholder */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="card p-6 space-y-4">
              <h3 className="font-display text-xl font-semibold">Send a Message</h3>
              <input
                className="input-field"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="input-field"
                placeholder="Mobile number"
                value={form.mobile}
                onChange={e => setForm({ ...form, mobile: e.target.value })}
              />
              <textarea
                className="input-field"
                rows={4}
                placeholder="Your message"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
              <button type="submit" className="btn-primary w-full">Send Message</button>
              <p className="text-xs text-gray-400 text-center">Demo form — messages are not sent to a server.</p>
            </form>

            {/* Map placeholder */}
            <div className="card overflow-hidden h-56 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin size={32} className="mx-auto mb-2 text-pink-400" />
                <p className="text-sm font-medium">Google Maps Placeholder</p>
                <p className="text-xs">{settings.address?.split(',')[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
