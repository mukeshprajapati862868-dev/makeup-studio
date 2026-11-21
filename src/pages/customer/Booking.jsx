import { useState, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, Phone, MapPin, Users, FileText, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { generateId } from '../../data/demoData';

const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30'
];

export default function Booking() {
  const { services, artists, addBooking, timeConfig } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const preselected = location.state?.serviceId || '';

  const [form, setForm] = useState({
    customerName: '',
    mobile: '',
    serviceId: preselected,
    bookingDate: '',
    requestedTime: '',
    artistId: '',
    persons: 1,
    location: 'Shop',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [step, setStep] = useState(1);

  const selectedService = services.find(s => s.id === form.serviceId);

  const update = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.customerName.trim() || form.customerName.trim().length < 2)
      e.customerName = 'Please enter your full name';
    if (!/^[6-9]\d{9}$/.test(form.mobile.replace(/\s/g, '')))
      e.mobile = 'Enter a valid 10-digit mobile number';
    if (!form.serviceId) e.serviceId = 'Please select a service';
    if (!form.bookingDate) e.bookingDate = 'Please select a date';
    else {
      const selected = new Date(form.bookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) e.bookingDate = 'Date cannot be in the past';
    }
    if (!form.requestedTime) e.requestedTime = 'Please select a time slot';
    if (form.location === 'Home Service' && !form.address.trim())
      e.address = 'Address is required for home service';
    if (form.persons < 1 || form.persons > 10) e.persons = 'Persons must be 1–10';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const service = services.find(s => s.id === form.serviceId);
    const artist = artists.find(a => a.id === form.artistId);
    const booking = {
      id: generateId('BK'),
      customerName: form.customerName.trim(),
      mobile: form.mobile.replace(/\s/g, ''),
      serviceId: form.serviceId,
      serviceName: service?.name || '',
      price: service?.price || 0,
      bookingDate: form.bookingDate,
      requestedTime: form.requestedTime,
      allocatedTime: null,
      artistId: form.artistId || null,
      artistName: artist?.name || null,
      location: form.location,
      address: form.location === 'Home Service' ? form.address : '',
      persons: Number(form.persons),
      notes: form.notes,
      status: 'Pending',
      paymentStatus: 'Pending',
      advanceAmount: 0,
      remainingAmount: service?.price || 0,
      paymentMethod: null,
      transactionRef: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    addBooking(booking);
    setSubmitted(booking);
  };

  // Min date = today
  const minDate = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full card p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="text-green-500" size={32} />
          </div>
          <h2 className="font-display text-2xl font-semibold mb-2">Booking Submitted!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your request has been received. Our team will confirm shortly.
          </p>
          <div className="bg-pink-50 rounded-xl p-4 text-left space-y-2 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500">Booking ID</span>
              <span className="font-semibold text-pink-600">{submitted.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Service</span>
              <span className="font-medium">{submitted.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">{submitted.bookingDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Time</span>
              <span className="font-medium">{submitted.requestedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className="font-medium text-amber-600">Pending</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Save your Booking ID and mobile number to check status later.
          </p>
          <div className="flex flex-col gap-2">
            <Link to={`/my-booking?id=${submitted.id}&mobile=${submitted.mobile}`} className="btn-primary text-center">
              Check Booking Status
            </Link>
            <Link to="/" className="btn-secondary text-center">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="section-subtitle">Appointments</p>
          <h1 className="section-title">Book Your Session</h1>
          <p className="text-gray-500 mt-2 text-sm">Simple booking — no login or OTP required</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
              <User size={15} /> Full Name *
            </label>
            <input
              type="text"
              className={`input-field ${errors.customerName ? 'border-red-300' : ''}`}
              placeholder="Your full name"
              value={form.customerName}
              onChange={e => update('customerName', e.target.value)}
            />
            {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
              <Phone size={15} /> Mobile Number *
            </label>
            <input
              type="tel"
              className={`input-field ${errors.mobile ? 'border-red-300' : ''}`}
              placeholder="10-digit mobile number"
              maxLength={10}
              value={form.mobile}
              onChange={e => update('mobile', e.target.value.replace(/\D/g, ''))}
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          {/* Service */}
          <div>
            <label className="text-sm font-medium text-charcoal-700 mb-1.5 block">Makeup Service *</label>
            <select
              className={`input-field ${errors.serviceId ? 'border-red-300' : ''}`}
              value={form.serviceId}
              onChange={e => update('serviceId', e.target.value)}
            >
              <option value="">Select a service</option>
              {services.filter(s => s.active).map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} — ₹{s.price.toLocaleString()} ({s.duration} min)
                </option>
              ))}
            </select>
            {errors.serviceId && <p className="text-red-500 text-xs mt-1">{errors.serviceId}</p>}
          </div>

          {/* Date & Time */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
                <Calendar size={15} /> Date *
              </label>
              <input
                type="date"
                className={`input-field ${errors.bookingDate ? 'border-red-300' : ''}`}
                min={minDate}
                value={form.bookingDate}
                onChange={e => update('bookingDate', e.target.value)}
              />
              {errors.bookingDate && <p className="text-red-500 text-xs mt-1">{errors.bookingDate}</p>}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
                <Clock size={15} /> Time Slot *
              </label>
              <select
                className={`input-field ${errors.requestedTime ? 'border-red-300' : ''}`}
                value={form.requestedTime}
                onChange={e => update('requestedTime', e.target.value)}
              >
                <option value="">Select time</option>
                {TIME_SLOTS.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.requestedTime && <p className="text-red-500 text-xs mt-1">{errors.requestedTime}</p>}
            </div>
          </div>

          {/* Artist */}
          <div>
            <label className="text-sm font-medium text-charcoal-700 mb-1.5 block">Makeup Artist (Optional)</label>
            <select
              className="input-field"
              value={form.artistId}
              onChange={e => update('artistId', e.target.value)}
            >
              <option value="">Any available artist</option>
              {artists.filter(a => a.available).map(a => (
                <option key={a.id} value={a.id}>{a.name} — {a.specialization}</option>
              ))}
            </select>
          </div>

          {/* Persons & Location */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
                <Users size={15} /> Number of Persons
              </label>
              <input
                type="number"
                min={1}
                max={10}
                className={`input-field ${errors.persons ? 'border-red-300' : ''}`}
                value={form.persons}
                onChange={e => update('persons', e.target.value)}
              />
              {errors.persons && <p className="text-red-500 text-xs mt-1">{errors.persons}</p>}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
                <MapPin size={15} /> Location
              </label>
              <select
                className="input-field"
                value={form.location}
                onChange={e => update('location', e.target.value)}
              >
                <option value="Shop">At Studio</option>
                <option value="Home Service">Home Service</option>
              </select>
            </div>
          </div>

          {form.location === 'Home Service' && (
            <div>
              <label className="text-sm font-medium text-charcoal-700 mb-1.5 block">Address *</label>
              <textarea
                className={`input-field ${errors.address ? 'border-red-300' : ''}`}
                rows={2}
                placeholder="Full address for home service"
                value={form.address}
                onChange={e => update('address', e.target.value)}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal-700 mb-1.5">
              <FileText size={15} /> Special Requirements / Notes
            </label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="Any preferences, allergies, or special requests..."
              value={form.notes}
              onChange={e => update('notes', e.target.value)}
            />
          </div>

          {/* Summary */}
          {selectedService && (
            <div className="bg-pink-50 rounded-xl p-4 text-sm">
              <div className="font-medium text-charcoal-800 mb-2">Booking Summary</div>
              <div className="flex justify-between text-gray-600">
                <span>{selectedService.name}</span>
                <span className="font-semibold text-pink-600">₹{selectedService.price.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">Duration: {selectedService.duration} min · Payment on confirmation (demo)</div>
            </div>
          )}

          <button type="submit" className="btn-primary w-full text-center">
            Submit Booking Request
          </button>
          <p className="text-xs text-center text-gray-400">
            No OTP or login required. You will receive a Booking ID to track status.
          </p>
        </form>
      </div>
    </div>
  );
}
