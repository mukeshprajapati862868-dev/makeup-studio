import { useApp } from '../../context/AppContext';
import { Download, BarChart3 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function Reports() {
  const { bookings, services, artists, getStats } = useApp();
  const stats = getStats();

  const exportCSV = () => {
    const headers = ['ID', 'Customer', 'Mobile', 'Service', 'Date', 'Time', 'Status', 'Payment', 'Price'];
    const rows = bookings.map(b => [
      b.id, b.customerName, b.mobile, b.serviceName, b.bookingDate,
      b.allocatedTime || b.requestedTime, b.status, b.paymentStatus, b.price
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `luxeglow-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Service popularity
  const serviceCounts = {};
  bookings.forEach(b => {
    serviceCounts[b.serviceName] = (serviceCounts[b.serviceName] || 0) + 1;
  });
  const serviceData = Object.entries(serviceCounts)
    .map(([name, count]) => ({ name: name.length > 15 ? name.slice(0, 15) + '…' : name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Artist performance
  const artistCounts = {};
  bookings.forEach(b => {
    if (b.artistName) artistCounts[b.artistName] = (artistCounts[b.artistName] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold">Reports & Analytics</h2>
          <p className="text-sm text-gray-500">Demo analytics from LocalStorage data</p>
        </div>
        <button onClick={exportCSV} className="btn-primary !py-2 text-sm flex items-center gap-2 self-start">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: stats.totalBookings },
          { label: 'Completed', value: stats.completed },
          { label: 'Customers', value: stats.totalCustomers },
          { label: 'Demo Revenue', value: `₹${(stats.demoRevenue || 0).toLocaleString()}` },
        ].map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-soft border border-gray-50">
            <div className="text-2xl font-bold text-charcoal-800">{c.value}</div>
            <div className="text-xs text-gray-500">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-soft border border-gray-50">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-pink-500" /> Popular Services
          </h3>
          <div className="h-64">
            {serviceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ec4899" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-soft border border-gray-50">
          <h3 className="font-semibold mb-4">Artist Performance</h3>
          <ul className="space-y-3">
            {Object.entries(artistCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([name, count]) => (
                <li key={name} className="flex justify-between text-sm">
                  <span>{name}</span>
                  <span className="font-semibold text-pink-600">{count} bookings</span>
                </li>
              ))}
            {Object.keys(artistCounts).length === 0 && (
              <li className="text-sm text-gray-400">No assigned bookings yet</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
