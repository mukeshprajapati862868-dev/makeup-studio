import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Calendar, Clock, User, Phone, MapPin, CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { bookingStorage } from '../../storage/storage';

const statusConfig = {
  Pending: { color: 'bg-amber-100 text-amber-700', icon: AlertCircle },
  Confirmed: { color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
  'In Progress': { color: 'bg-purple-100 text-purple-700', icon: Loader },
  Completed: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
  Rejected: { color: 'bg-red-100 text-red-700', icon: XCircle },
  Cancelled: { color: 'bg-gray-100 text-gray-600', icon: XCircle },
};

export default function MyBooking() {
  const [searchParams] = useSearchParams();
  const { bookings } = useApp();
  const [bookingId, setBookingId] = useState(searchParams.get('id') || '');
  const [mobile, setMobile] = useState(searchParams.get('mobile') || '');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searchParams.get('id') && searchParams.get('mobile')) {
      handleSearch();
    }
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setError('');
    setResult(null);
    setSearched(true);

    if (!bookingId.trim() || !mobile.trim()) {
      setError('Please enter both Booking ID and Mobile Number');
      return;
    }

    const found = bookingStorage.findByMobileAndId(
      mobile.replace(/\s/g, ''),
      bookingId.trim().toUpperCase()
    );

    if (found) {
      setResult(found);
    } else {
      // Also try case-insensitive search in current state
      const fromState = bookings.find(
        b => b.id.toUpperCase() === bookingId.trim().toUpperCase() &&
             b.mobile === mobile.replace(/\s/g, '')
      );
      if (fromState) setResult(fromState);
      else setError('No booking found with this ID and mobile number. Please check and try again.');
    }
  };

  const StatusIcon = result ? (statusConfig[result.status]?.icon || AlertCircle) : AlertCircle;

  return (
    <div>
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <p className="section-subtitle">Track Appointment</p>
          <h1 className="section-title">My Booking</h1>
          <p className="text-gray-500 mt-2 text-sm">Enter your Booking ID and mobile number — no login needed</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-10">
        <form onSubmit={handleSearch} className="card p-6 space-y-4 mb-8">
          <div>
            <label className="text-sm font-medium text-charcoal-700 mb-1.5 block">Booking ID</label>
            <input
              type="text"
              className="input-field uppercase"
              placeholder="e.g. BK1001"
              value={bookingId}
              onChange={e => setBookingId(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-charcoal-700 mb-1.5 block">Mobile Number</label>
            <input
              type="tel"
              className="input-field"
              placeholder="10-digit mobile number"
              maxLength={10}
              value={mobile}
              onChange={e => setMobile(e.target.value.replace(/\D/g, ''))}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            <Search size={18} /> Check Status
          </button>
        </form>

        {result && (
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-semibold">Booking Details</h3>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[result.status]?.color || 'bg-gray-100'}`}>
                <StatusIcon size={13} />
                {result.status}
              </span>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="flex justify-between py-2 border-b border-pink-50">
                <span className="text-gray-500">Booking ID</span>
                <span className="font-semibold text-pink-600">{result.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-pink-50">
                <span className="text-gray-500 flex items-center gap-1"><User size={14} /> Customer</span>
                <span className="font-medium">{result.customerName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-pink-50">
                <span className="text-gray-500 flex items-center gap-1"><Phone size={14} /> Mobile</span>
                <span className="font-medium">{result.mobile}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-pink-50">
                <span className="text-gray-500">Service</span>
                <span className="font-medium">{result.serviceName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-pink-50">
                <span className="text-gray-500 flex items-center gap-1"><Calendar size={14} /> Date</span>
                <span className="font-medium">{result.bookingDate}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-pink-50">
                <span className="text-gray-500 flex items-center gap-1"><Clock size={14} /> Requested Time</span>
                <span className="font-medium">{result.requestedTime}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-pink-50">
                <span className="text-gray-500 flex items-center gap-1"><Clock size={14} /> Allocated Time</span>
                <span className="font-medium">{result.allocatedTime || 'Not yet allocated'}</span>
              </div>
              {result.artistName && (
                <div className="flex justify-between py-2 border-b border-pink-50">
                  <span className="text-gray-500">Artist</span>
                  <span className="font-medium">{result.artistName}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-pink-50">
                <span className="text-gray-500 flex items-center gap-1"><MapPin size={14} /> Location</span>
                <span className="font-medium">{result.location}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-pink-50">
                <span className="text-gray-500">Payment Status</span>
                <span className="font-medium">{result.paymentStatus}</span>
              </div>
              {result.price > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-semibold">₹{result.price.toLocaleString()}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-400 text-center pt-2">
              Demo data — contact studio for any changes.
            </p>
          </div>
        )}

        {searched && !result && !error && (
          <div className="text-center text-gray-400 py-8">No results</div>
        )}

        <div className="text-center mt-8">
          <Link to="/booking" className="text-pink-600 font-medium hover:underline text-sm">
            Book a new appointment →
          </Link>
        </div>
      </div>
    </div>
  );
}
