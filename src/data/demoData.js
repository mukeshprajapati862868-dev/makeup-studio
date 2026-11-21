// Demo seed data for LuxeGlow Makeup Studio

export const DEMO_SERVICES = [
  {
    id: 'svc-001',
    name: 'Bridal Makeup',
    description: 'Complete bridal makeover with HD foundation, airbrush option, false lashes, and long-lasting finish for your special day.',
    price: 15000,
    duration: 180,
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
    active: true,
    popular: true
  },
  {
    id: 'svc-002',
    name: 'Party Makeup',
    description: 'Glamorous party look with bold eyes, contouring, and radiant finish perfect for celebrations and events.',
    price: 4500,
    duration: 90,
    category: 'Party',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop',
    active: true,
    popular: true
  },
  {
    id: 'svc-003',
    name: 'Engagement Makeup',
    description: 'Elegant engagement look balancing soft romance with camera-ready perfection.',
    price: 8000,
    duration: 120,
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop',
    active: true,
    popular: false
  },
  {
    id: 'svc-004',
    name: 'Reception Makeup',
    description: 'Stunning reception makeup designed to last through dancing and late-night celebrations.',
    price: 10000,
    duration: 150,
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&h=400&fit=crop',
    active: true,
    popular: true
  },
  {
    id: 'svc-005',
    name: 'HD Makeup',
    description: 'High-definition makeup ideal for photography and video with flawless finish under studio lights.',
    price: 6000,
    duration: 100,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
    active: true,
    popular: false
  },
  {
    id: 'svc-006',
    name: 'Airbrush Makeup',
    description: 'Lightweight airbrush application for a natural, seamless and long-lasting coverage.',
    price: 7500,
    duration: 90,
    category: 'Specialty',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=400&fit=crop',
    active: true,
    popular: false
  },
  {
    id: 'svc-007',
    name: 'Facial Treatment',
    description: 'Deep cleansing facial with premium products to prep skin before any makeup application.',
    price: 2500,
    duration: 60,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop',
    active: true,
    popular: false
  },
  {
    id: 'svc-008',
    name: 'Hair Styling',
    description: 'Professional hairstyling including updos, curls, waves and traditional Indian styles.',
    price: 3500,
    duration: 75,
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&h=400&fit=crop',
    active: true,
    popular: true
  },
  {
    id: 'svc-009',
    name: 'Saree Draping',
    description: 'Expert saree draping in classic and contemporary styles for a perfect silhouette.',
    price: 1500,
    duration: 30,
    category: 'Styling',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=400&fit=crop',
    active: true,
    popular: false
  },
  {
    id: 'svc-010',
    name: 'Pre-Bridal Package',
    description: 'Complete pre-bridal package including facials, cleanup, hair treatments and trial makeup.',
    price: 25000,
    duration: 300,
    category: 'Package',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&h=400&fit=crop',
    active: true,
    popular: true
  }
];

export const DEMO_ARTISTS = [
  {
    id: 'art-001',
    name: 'Priya Sharma',
    mobile: '9876543210',
    specialization: 'Bridal & HD Makeup',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    workingHours: '10:00 - 19:00',
    available: true,
    experience: '8 years'
  },
  {
    id: 'art-002',
    name: 'Ananya Patel',
    mobile: '9876543211',
    specialization: 'Party & Airbrush',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    workingHours: '11:00 - 20:00',
    available: true,
    experience: '6 years'
  },
  {
    id: 'art-003',
    name: 'Meera Kapoor',
    mobile: '9876543212',
    specialization: 'Natural & Engagement',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    workingHours: '09:00 - 18:00',
    available: true,
    experience: '5 years'
  },
  {
    id: 'art-004',
    name: 'Sneha Reddy',
    mobile: '9876543213',
    specialization: 'Hair Styling & Saree',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
    workingHours: '10:00 - 19:00',
    available: true,
    experience: '7 years'
  }
];

export const DEMO_GALLERY = [
  { id: 'gal-001', title: 'Classic Bridal Look', category: 'Bridal Makeup', type: 'image', url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-002', title: 'Glam Party Makeup', category: 'Party Makeup', type: 'image', url: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-003', title: 'Soft Engagement Look', category: 'Engagement Makeup', type: 'image', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-004', title: 'Reception Glam', category: 'Reception Makeup', type: 'image', url: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-005', title: 'HD Studio Finish', category: 'HD Makeup', type: 'image', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-006', title: 'Natural Everyday Glow', category: 'Natural Makeup', type: 'image', url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-007', title: 'Pre-Bridal Glow', category: 'Pre-Bridal Makeup', type: 'image', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-008', title: 'Elegant Updo', category: 'Hair Styling', type: 'image', url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-009', title: 'Before & After Transformation', category: 'Before & After', type: 'image', url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-010', title: 'Traditional Bridal', category: 'Bridal Makeup', type: 'image', url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-011', title: 'Smokey Party Eyes', category: 'Party Makeup', type: 'image', url: 'https://images.unsplash.com/photo-1526045478516-990287a1a6a7?w=800&h=1000&fit=crop', visible: true },
  { id: 'gal-012', title: 'Floral Hair Style', category: 'Hair Styling', type: 'image', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=1000&fit=crop', visible: true }
];

export const DEMO_OFFERS = [
  {
    id: 'off-001',
    title: 'Bridal Season Special',
    description: 'Book complete bridal package and get free trial makeup + saree draping.',
    discountPercent: 15,
    originalPrice: 28000,
    offerPrice: 23800,
    startDate: '2025-01-01',
    endDate: '2026-12-31',
    active: true,
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop'
  },
  {
    id: 'off-002',
    title: 'Festive Combo',
    description: 'Party Makeup + Hair Styling at a special festive price.',
    discountPercent: 20,
    originalPrice: 8000,
    offerPrice: 6400,
    startDate: '2025-10-01',
    endDate: '2026-11-30',
    active: true,
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop'
  },
  {
    id: 'off-003',
    title: 'Pre-Bridal Glow Package',
    description: '3 facials + cleanup + trial makeup at exclusive package rate.',
    discountPercent: 25,
    originalPrice: 12000,
    offerPrice: 9000,
    startDate: '2025-01-01',
    endDate: '2026-12-31',
    active: true,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop'
  }
];

export const DEMO_REVIEWS = [
  {
    id: 'rev-001',
    customerName: 'Riya Mehta',
    rating: 5,
    comment: 'Absolutely stunning bridal makeup! Priya made me feel like a princess. Highly recommended for any bride.',
    service: 'Bridal Makeup',
    date: '2025-09-15',
    approved: true,
    visible: true
  },
  {
    id: 'rev-002',
    customerName: 'Anjali Singh',
    rating: 5,
    comment: 'Best party makeup experience. The look lasted all night and photos came out gorgeous.',
    service: 'Party Makeup',
    date: '2025-10-02',
    approved: true,
    visible: true
  },
  {
    id: 'rev-003',
    customerName: 'Neha Gupta',
    rating: 4,
    comment: 'Very professional team. The engagement look was soft yet glamorous. Will book again for reception.',
    service: 'Engagement Makeup',
    date: '2025-08-20',
    approved: true,
    visible: true
  },
  {
    id: 'rev-004',
    customerName: 'Pooja Verma',
    rating: 5,
    comment: 'Home service was excellent. Punctual, hygienic and the makeup was flawless for my sister’s wedding.',
    service: 'Bridal Makeup',
    date: '2025-07-10',
    approved: true,
    visible: true
  }
];

export const DEMO_SETTINGS = {
  shopName: 'LuxeGlow Makeup Studio',
  tagline: 'Where Beauty Meets Artistry',
  logo: '/favicon.svg',
  address: '4/33 sec h Sahara state jankipuram Lucknow',
  email: 'hello@luxeglow.studio',
  businessHours: {
    weekdays: '10:00 AM - 8:00 PM',
    saturday: '10:00 AM - 9:00 PM',
    sunday: '11:00 AM - 6:00 PM'
  },
  social: {
    instagram: 'https://instagram.com/luxeglow',
    facebook: 'https://facebook.com/luxeglow',
    youtube: 'https://youtube.com/@luxeglow'
  },
  bookingRules: 'Advance booking recommended. Cancellation free up to 24 hours before appointment.'
};

export const DEMO_TIME_CONFIG = {
  openingTime: '10:00',
  closingTime: '20:00',
  slotDuration: 60, // minutes
  lunchBreakStart: '13:30',
  lunchBreakEnd: '14:30',
  weeklyHolidays: [0], // Sunday
  specialHolidays: [],
  maxDailyBookings: 12,
  enabledSlots: true
};

// Generate a few demo bookings
export function generateDemoBookings() {
  const today = new Date();
  const bookings = [];
  const statuses = ['Pending', 'Confirmed', 'Completed', 'In Progress'];
  const services = DEMO_SERVICES;
  const artists = DEMO_ARTISTS;

  for (let i = 0; i < 12; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - Math.floor(Math.random() * 20) + 5);
    const service = services[i % services.length];
    const status = statuses[i % statuses.length];
    const hour = 10 + (i % 8);
    const bookingDate = d.toISOString().split('T')[0];

    bookings.push({
      id: `BK${String(1000 + i).padStart(4, '0')}`,
      customerName: ['Aisha Khan', 'Sanya Malhotra', 'Divya Nair', 'Kavya Iyer', 'Ishita Rao', 'Tanvi Shah'][i % 6],
      mobile: `98${String(70000000 + i * 1111).slice(0, 8)}`,
      serviceId: service.id,
      serviceName: service.name,
      price: service.price,
      bookingDate,
      requestedTime: `${String(hour).padStart(2, '0')}:00`,
      allocatedTime: status === 'Pending' ? null : `${String(hour).padStart(2, '0')}:00`,
      artistId: status === 'Pending' ? null : artists[i % artists.length].id,
      artistName: status === 'Pending' ? null : artists[i % artists.length].name,
      location: i % 3 === 0 ? 'Home Service' : 'Shop',
      address: i % 3 === 0 ? 'Andheri West, Mumbai' : '',
      persons: 1 + (i % 2),
      notes: i % 4 === 0 ? 'Please use soft colors' : '',
      status,
      paymentStatus: status === 'Completed' ? 'Paid' : status === 'Confirmed' ? 'Advance Paid' : 'Pending',
      advanceAmount: status === 'Pending' ? 0 : Math.round(service.price * 0.3),
      remainingAmount: status === 'Completed' ? 0 : Math.round(service.price * 0.7),
      paymentMethod: 'Demo / Cash',
      transactionRef: status !== 'Pending' ? `TXN${10000 + i}` : null,
      createdAt: new Date(d.getTime() - 86400000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  return bookings;
}

export function generateId(prefix = 'ID') {
  return `${prefix}${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
