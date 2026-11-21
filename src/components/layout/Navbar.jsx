import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/offers', label: 'Offers' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/my-booking', label: 'My Booking' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { settings } = useApp();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-display font-bold text-lg">
              L
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-semibold text-lg text-charcoal-800 leading-tight">
                {settings.shopName?.split(' ')[0] || 'LuxeGlow'}
              </div>
              <div className="text-[10px] tracking-widest text-pink-500 uppercase">Makeup Studio</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-pink-600 bg-pink-50'
                      : 'text-charcoal-700 hover:text-pink-600 hover:bg-pink-50/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${settings.mobile}`}
              className="hidden md:flex items-center gap-1.5 text-sm text-charcoal-700 hover:text-pink-600"
            >
              <Phone size={16} />
              <span className="font-medium">{settings.mobile}</span>
            </a>
            <Link to="/booking" className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2">
              <Calendar size={16} />
              <span className="hidden sm:inline">Book Now</span>
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-pink-50"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-pink-50 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive ? 'bg-pink-50 text-pink-600' : 'text-charcoal-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/booking"
              onClick={() => setOpen(false)}
              className="btn-primary text-center mt-2"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
