import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  storage, bookingStorage, serviceStorage, artistStorage,
  galleryStorage, offerStorage, reviewStorage, settingsStorage,
  timeSlotStorage, adminSession
} from '../storage/storage';
import {
  DEMO_SERVICES, DEMO_ARTISTS, DEMO_GALLERY, DEMO_OFFERS,
  DEMO_REVIEWS, DEMO_SETTINGS, DEMO_TIME_CONFIG, generateDemoBookings
} from '../data/demoData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [initialized, setInitialized] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [artists, setArtists] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [offers, setOffers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState(DEMO_SETTINGS);
  const [timeConfig, setTimeConfig] = useState(DEMO_TIME_CONFIG);
  const [admin, setAdmin] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Initialize demo data if empty
  useEffect(() => {
    const init = () => {
      if (!serviceStorage.getAll().length) {
        serviceStorage.save(DEMO_SERVICES);
      }
      if (!artistStorage.getAll().length) {
        artistStorage.save(DEMO_ARTISTS);
      }
      if (!galleryStorage.getAll().length) {
        galleryStorage.save(DEMO_GALLERY);
      }
      if (!offerStorage.getAll().length) {
        offerStorage.save(DEMO_OFFERS);
      }
      if (!reviewStorage.getAll().length) {
        reviewStorage.save(DEMO_REVIEWS);
      }
      if (!settingsStorage.get()) {
        settingsStorage.save(DEMO_SETTINGS);
      }
      if (!timeSlotStorage.get()) {
        timeSlotStorage.save(DEMO_TIME_CONFIG);
      }
      if (!bookingStorage.getAll().length) {
        bookingStorage.save(generateDemoBookings());
      }

      setServices(serviceStorage.getAll());
      setArtists(artistStorage.getAll());
      setGallery(galleryStorage.getAll());
      setOffers(offerStorage.getAll());
      setReviews(reviewStorage.getAll());
      setSettings(settingsStorage.get() || DEMO_SETTINGS);
      setTimeConfig(timeSlotStorage.get() || DEMO_TIME_CONFIG);
      setBookings(bookingStorage.getAll());
      setAdmin(adminSession.get());
      setInitialized(true);
    };
    init();
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  // Booking operations
  const addBooking = (booking) => {
    const saved = bookingStorage.add(booking);
    setBookings(bookingStorage.getAll());
    showToast(`Booking ${saved.id} submitted successfully!`);
    return saved;
  };

  const updateBooking = (id, updates) => {
    const updated = bookingStorage.update(id, updates);
    setBookings(bookingStorage.getAll());
    showToast('Booking updated');
    return updated;
  };

  // Services
  const saveService = (service) => {
    if (service.id && services.find(s => s.id === service.id)) {
      serviceStorage.update(service.id, service);
    } else {
      serviceStorage.add({ ...service, id: `svc-${Date.now()}` });
    }
    setServices(serviceStorage.getAll());
    showToast('Service saved');
  };

  const deleteService = (id) => {
    serviceStorage.remove(id);
    setServices(serviceStorage.getAll());
    showToast('Service deleted');
  };

  // Artists
  const saveArtist = (artist) => {
    if (artist.id && artists.find(a => a.id === artist.id)) {
      artistStorage.update(artist.id, artist);
    } else {
      artistStorage.add({ ...artist, id: `art-${Date.now()}` });
    }
    setArtists(artistStorage.getAll());
    showToast('Artist saved');
  };

  const deleteArtist = (id) => {
    artistStorage.remove(id);
    setArtists(artistStorage.getAll());
    showToast('Artist deleted');
  };

  // Gallery
  const saveGalleryItem = (item) => {
    if (item.id && gallery.find(g => g.id === item.id)) {
      galleryStorage.update(item.id, item);
    } else {
      galleryStorage.add({ ...item, id: `gal-${Date.now()}` });
    }
    setGallery(galleryStorage.getAll());
    showToast('Gallery item saved');
  };

  const deleteGalleryItem = (id) => {
    galleryStorage.remove(id);
    setGallery(galleryStorage.getAll());
    showToast('Item deleted');
  };

  // Offers
  const saveOffer = (offer) => {
    if (offer.id && offers.find(o => o.id === offer.id)) {
      offerStorage.update(offer.id, offer);
    } else {
      offerStorage.add({ ...offer, id: `off-${Date.now()}` });
    }
    setOffers(offerStorage.getAll());
    showToast('Offer saved');
  };

  const deleteOffer = (id) => {
    offerStorage.remove(id);
    setOffers(offerStorage.getAll());
    showToast('Offer deleted');
  };

  // Reviews
  const updateReview = (id, updates) => {
    reviewStorage.update(id, updates);
    setReviews(reviewStorage.getAll());
    showToast('Review updated');
  };

  const deleteReview = (id) => {
    reviewStorage.remove(id);
    setReviews(reviewStorage.getAll());
    showToast('Review deleted');
  };

  // Settings
  const saveSettings = (newSettings) => {
    settingsStorage.save(newSettings);
    setSettings(newSettings);
    showToast('Settings saved');
  };

  const saveTimeConfig = (config) => {
    timeSlotStorage.save(config);
    setTimeConfig(config);
    showToast('Time slots updated');
  };

  // Admin auth (demo)
  const loginAdmin = (username, password) => {
    // Demo credentials: admin / admin123
    if (username === 'admin' && password === 'admin123') {
      const session = { username: 'admin', loggedInAt: new Date().toISOString() };
      adminSession.set(session);
      setAdmin(session);
      showToast('Welcome back, Admin!');
      return true;
    }
    showToast('Invalid credentials', 'error');
    return false;
  };

  const logoutAdmin = () => {
    adminSession.clear();
    setAdmin(null);
    showToast('Logged out');
  };

  const resetDemoData = () => {
    storage.clearAll();
    window.location.reload();
  };

  // Stats helpers
  const getStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const customers = new Set(bookings.map(b => b.mobile)).size;
    return {
      totalCustomers: customers,
      totalBookings: bookings.length,
      todayBookings: bookings.filter(b => b.bookingDate === today).length,
      pending: bookings.filter(b => b.status === 'Pending').length,
      confirmed: bookings.filter(b => b.status === 'Confirmed').length,
      completed: bookings.filter(b => b.status === 'Completed').length,
      cancelled: bookings.filter(b => b.status === 'Cancelled').length,
      inProgress: bookings.filter(b => b.status === 'In Progress').length,
      revenue: bookings
        .filter(b => b.status === 'Completed' || b.paymentStatus === 'Paid')
        .reduce((sum, b) => sum + (b.price || 0), 0),
      demoRevenue: bookings
        .filter(b => b.paymentStatus === 'Paid' || b.paymentStatus === 'Advance Paid')
        .reduce((sum, b) => sum + (b.advanceAmount || 0) + (b.paymentStatus === 'Paid' ? (b.remainingAmount || 0) : 0), 0)
    };
  };

  const value = {
    initialized,
    bookings, services, artists, gallery, offers, reviews, settings, timeConfig, admin, toasts,
    showToast,
    addBooking, updateBooking,
    saveService, deleteService,
    saveArtist, deleteArtist,
    saveGalleryItem, deleteGalleryItem,
    saveOffer, deleteOffer,
    updateReview, deleteReview,
    saveSettings, saveTimeConfig,
    loginAdmin, logoutAdmin, resetDemoData,
    getStats,
    setBookings
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
