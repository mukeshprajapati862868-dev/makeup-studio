import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Phone, Calendar } from 'lucide-react';

export default function Customers() {
  const { bookings } = useApp();

  const customers = useMemo(() => {
    const map = {};
    bookings.forEach(b => {
      if (!map[b.mobile]) {
        map[b.mobile] = {
          name: b.customerName,
          mobile: b.mobile,
          totalBookings: 0,
          lastBooking: null,
          history: []
        };
      }
      map[b.mobile].totalBookings += 1;
      map[b.mobile].history.push(b);
      if (!map[b.mobile].lastBooking || b.createdAt > map[b.mobile].lastBooking) {
        map[b.mobile].lastBooking = b.createdAt;
        map[b.mobile].name = b.customerName;
      }
    });
    return Object.values(map).sort((a, b) => b.totalBookings - a.totalBookings);
  }, [bookings]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-semibold">Customer Management</h2>
        <p className="text-sm text-gray-500">{customers.length} unique customers from bookings</p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Mobile</th>
                <th className="px-4 py-3 font-medium">Total Bookings</th>
                <th className="px-4 py-3 font-medium">Last Booking</th>
                <th className="px-4 py-3 font-medium">Recent Services</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.mobile} className="border-t border-gray-50 hover:bg-pink-50/20">
                  <td className="px-4 py-3 font-medium flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-semibold">
                      {c.name.charAt(0)}
                    </div>
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 flex items-center gap-1">
                    <Phone size={13} /> {c.mobile}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-pink-50 text-pink-600 font-semibold px-2 py-0.5 rounded-full text-xs">
                      {c.totalBookings}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {c.lastBooking ? new Date(c.lastBooking).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {c.history.slice(0, 2).map(h => h.serviceName).join(', ')}
                    {c.history.length > 2 && ` +${c.history.length - 2}`}
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-400">
                    <Users className="mx-auto mb-2 opacity-40" size={32} />
                    No customers yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
