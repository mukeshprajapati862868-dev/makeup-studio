// LocalStorage utility helpers for demo data management

const PREFIX = 'luxeglow_';

export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(PREFIX + key);
  },

  clearAll() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(PREFIX))
      .forEach(k => localStorage.removeItem(k));
  }
};

// Specific entity helpers
export const bookingStorage = {
  getAll: () => storage.get('bookings', []),
  save: (bookings) => storage.set('bookings', bookings),
  add: (booking) => {
    const list = bookingStorage.getAll();
    list.unshift(booking);
    bookingStorage.save(list);
    return booking;
  },
  update: (id, updates) => {
    const list = bookingStorage.getAll().map(b =>
      b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b
    );
    bookingStorage.save(list);
    return list.find(b => b.id === id);
  },
  getById: (id) => bookingStorage.getAll().find(b => b.id === id),
  findByMobileAndId: (mobile, id) =>
    bookingStorage.getAll().find(b => b.mobile === mobile && b.id === id)
};

export const serviceStorage = {
  getAll: () => storage.get('services', []),
  save: (services) => storage.set('services', services),
  add: (service) => {
    const list = serviceStorage.getAll();
    list.push(service);
    serviceStorage.save(list);
    return service;
  },
  update: (id, updates) => {
    const list = serviceStorage.getAll().map(s =>
      s.id === id ? { ...s, ...updates } : s
    );
    serviceStorage.save(list);
    return list.find(s => s.id === id);
  },
  remove: (id) => {
    const list = serviceStorage.getAll().filter(s => s.id !== id);
    serviceStorage.save(list);
  }
};

export const artistStorage = {
  getAll: () => storage.get('artists', []),
  save: (artists) => storage.set('artists', artists),
  add: (artist) => {
    const list = artistStorage.getAll();
    list.push(artist);
    artistStorage.save(list);
    return artist;
  },
  update: (id, updates) => {
    const list = artistStorage.getAll().map(a =>
      a.id === id ? { ...a, ...updates } : a
    );
    artistStorage.save(list);
    return list.find(a => a.id === id);
  },
  remove: (id) => {
    const list = artistStorage.getAll().filter(a => a.id !== id);
    artistStorage.save(list);
  }
};

export const galleryStorage = {
  getAll: () => storage.get('gallery', []),
  save: (items) => storage.set('gallery', items),
  add: (item) => {
    const list = galleryStorage.getAll();
    list.unshift(item);
    galleryStorage.save(list);
    return item;
  },
  update: (id, updates) => {
    const list = galleryStorage.getAll().map(g =>
      g.id === id ? { ...g, ...updates } : g
    );
    galleryStorage.save(list);
  },
  remove: (id) => {
    const list = galleryStorage.getAll().filter(g => g.id !== id);
    galleryStorage.save(list);
  }
};

export const offerStorage = {
  getAll: () => storage.get('offers', []),
  save: (offers) => storage.set('offers', offers),
  add: (offer) => {
    const list = offerStorage.getAll();
    list.push(offer);
    offerStorage.save(list);
    return offer;
  },
  update: (id, updates) => {
    const list = offerStorage.getAll().map(o =>
      o.id === id ? { ...o, ...updates } : o
    );
    offerStorage.save(list);
  },
  remove: (id) => {
    const list = offerStorage.getAll().filter(o => o.id !== id);
    offerStorage.save(list);
  }
};

export const reviewStorage = {
  getAll: () => storage.get('reviews', []),
  save: (reviews) => storage.set('reviews', reviews),
  add: (review) => {
    const list = reviewStorage.getAll();
    list.unshift(review);
    reviewStorage.save(list);
    return review;
  },
  update: (id, updates) => {
    const list = reviewStorage.getAll().map(r =>
      r.id === id ? { ...r, ...updates } : r
    );
    reviewStorage.save(list);
  },
  remove: (id) => {
    const list = reviewStorage.getAll().filter(r => r.id !== id);
    reviewStorage.save(list);
  }
};

export const settingsStorage = {
  get: () => storage.get('settings', null),
  save: (settings) => storage.set('settings', settings)
};

export const timeSlotStorage = {
  get: () => storage.get('timeSlots', null),
  save: (config) => storage.set('timeSlots', config)
};

export const adminSession = {
  get: () => storage.get('adminSession', null),
  set: (session) => storage.set('adminSession', session),
  clear: () => storage.remove('adminSession'),
  isLoggedIn: () => !!storage.get('adminSession')
};

export const customerStorage = {
  getAll: () => {
    const bookings = bookingStorage.getAll();
    const map = {};
    bookings.forEach(b => {
      if (!map[b.mobile]) {
        map[b.mobile] = {
          name: b.customerName,
          mobile: b.mobile,
          totalBookings: 0,
          lastBooking: null,
          notes: ''
        };
      }
      map[b.mobile].totalBookings += 1;
      if (!map[b.mobile].lastBooking || b.createdAt > map[b.mobile].lastBooking) {
        map[b.mobile].lastBooking = b.createdAt;
        map[b.mobile].name = b.customerName;
      }
    });
    return Object.values(map);
  }
};
