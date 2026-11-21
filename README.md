# LuxeGlow Makeup Studio — Frontend Website

Premium, modern Makeup Studio / Beauty Parlour website built with **React + Vite**.  
**Frontend only** — all data is stored in the browser via **LocalStorage**. No backend, no OTP, no real payments.

---

## Features

### Customer Website
- Home (hero, popular services, bridal feature, offers, artists, testimonials, gallery preview)
- Services & Pricing with category filters
- Gallery with category filters + lightbox
- Booking form (name, mobile, service, date, time, artist, location, notes) — **no login / OTP**
- My Booking lookup by Booking ID + Mobile
- About Us, Contact Us, Special Offers

### Admin Panel (demo login)
- Dashboard with live stats, charts (Recharts), recent & upcoming bookings
- Booking management (approve / reject / allocate time / assign artist / status workflow)
- Customers, Time slots, Artists, Services, Gallery, Offers
- Payments (demo), Reviews, Reports + CSV export
- Shop settings + **Reset demo data**

**Admin demo credentials**
- Username: `admin`
- Password: `admin123`

---

## Tech Stack

- React 18 + Vite
- React Router DOM
- Tailwind CSS
- Lucide React (icons)
- Recharts (dashboard charts)
- LocalStorage for all demo data

---

## Installation

```bash
cd makeup-studio
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
makeup-studio/
├── public/
├── src/
│   ├── components/     # UI, layout, shared
│   ├── pages/
│   │   ├── customer/   # Public website pages
│   │   ├── admin/      # Admin panel pages
│   │   └── auth/       # Admin login
│   ├── layouts/
│   ├── context/        # AppContext + LocalStorage state
│   ├── storage/        # LocalStorage helpers
│   ├── data/           # Demo seed data
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## Booking Workflow (Demo)

1. Customer selects service → date → time → enters name & mobile → submits  
2. Booking is saved in LocalStorage with status **Pending** and a unique Booking ID  
3. Admin sees it in **Bookings**, can Approve / Reject / Allocate time / Assign artist  
4. Customer checks status on **My Booking** using Booking ID + Mobile  

Statuses: Pending → Confirmed → In Progress → Completed (or Rejected / Cancelled)

---

## Notes

- This is a **frontend-only demo**. LocalStorage is not a cloud database.
- All payment information is labelled as demo data.
- Use **Admin → Settings → Reset Demo Data** to restore seed data.
- Images are loaded from Unsplash (internet required for images).

---

## License

Demo / educational project. Customize freely for your studio.
