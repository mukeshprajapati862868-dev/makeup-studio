import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { settings } = useApp();

  return (
    <footer className="bg-charcoal-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center font-display font-bold">
                L
              </div>
              <span className="font-display text-xl font-semibold">{settings.shopName}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {settings.tagline}. Premium bridal, party and professional makeup services with a touch of luxury.
            </p>
            <div className="flex gap-3">
              <a href={settings.social?.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors">
                <Instagram size={16} />
              </a>
              <a href={settings.social?.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors">
                <Facebook size={16} />
              </a>
              <a href={settings.social?.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-pink-400 transition-colors">Services & Pricing</Link></li>
              <li><Link to="/gallery" className="hover:text-pink-400 transition-colors">Gallery</Link></li>
              <li><Link to="/offers" className="hover:text-pink-400 transition-colors">Special Offers</Link></li>
              <li><Link to="/about" className="hover:text-pink-400 transition-colors">About Us</Link></li>
              <li><Link to="/booking" className="hover:text-pink-400 transition-colors">Book Appointment</Link></li>
              <li><Link to="/my-booking" className="hover:text-pink-400 transition-colors">Check My Booking</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-2">
                <MapPin size={16} className="text-pink-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={16} className="text-pink-400 shrink-0" />
                <a href={`tel:${settings.mobile}`} className="hover:text-pink-400">{settings.mobile}</a>
              </li>
              <li className="flex gap-2 items-center">
                <MessageCircle size={16} className="text-pink-400 shrink-0" />
                <a href={`https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-pink-400">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg mb-4">Business Hours</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex gap-2">
                <Clock size={16} className="text-pink-400 shrink-0 mt-0.5" />
                <div>
                  <div>Mon – Fri: {settings.businessHours?.weekdays}</div>
                  <div>Saturday: {settings.businessHours?.saturday}</div>
                  <div>Sunday: {settings.businessHours?.sunday}</div>
                </div>
              </li>
            </ul>
            <Link to="/booking" className="inline-block mt-4 btn-primary text-sm !py-2">
              Book Now
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {settings.shopName}. All rights reserved. Frontend Demo Only.</p>
          <div className="flex gap-4">
            <Link to="/admin/login" className="hover:text-pink-400">Admin Login</Link>
            <span>|</span>
            <span>Demo Project – LocalStorage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
