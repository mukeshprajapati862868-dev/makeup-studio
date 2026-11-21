import { Routes, Route, Navigate } from 'react-router-dom';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer pages
import Home from './pages/customer/Home';
import Services from './pages/customer/Services';
import Gallery from './pages/customer/Gallery';
import Booking from './pages/customer/Booking';
import MyBooking from './pages/customer/MyBooking';
import About from './pages/customer/About';
import Contact from './pages/customer/Contact';
import Offers from './pages/customer/Offers';

// Admin pages
import AdminLogin from './pages/auth/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Bookings from './pages/admin/Bookings';
import Customers from './pages/admin/Customers';
import TimeSlots from './pages/admin/TimeSlots';
import ArtistsAdmin from './pages/admin/ArtistsAdmin';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import OffersAdmin from './pages/admin/OffersAdmin';
import Payments from './pages/admin/Payments';
import ReviewsAdmin from './pages/admin/ReviewsAdmin';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';

import { useApp } from './context/AppContext';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-display text-xl font-bold animate-pulse">
          L
        </div>
        <p className="text-gray-500 text-sm">Loading LuxeGlow...</p>
      </div>
    </div>
  );
}

export default function App() {
  const { initialized } = useApp();

  if (!initialized) return <LoadingScreen />;

  return (
    <Routes>
      {/* Customer website */}
      <Route element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="booking" element={<Booking />} />
        <Route path="my-booking" element={<MyBooking />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="offers" element={<Offers />} />
      </Route>

      {/* Admin auth */}
      <Route path="admin/login" element={<AdminLogin />} />

      {/* Admin panel */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="customers" element={<Customers />} />
        <Route path="timeslots" element={<TimeSlots />} />
        <Route path="artists" element={<ArtistsAdmin />} />
        <Route path="services" element={<ServicesAdmin />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="offers" element={<OffersAdmin />} />
        <Route path="payments" element={<Payments />} />
        <Route path="reviews" element={<ReviewsAdmin />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
