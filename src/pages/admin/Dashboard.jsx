import { Link } from 'react-router-dom';
import {
  Users, Calendar, Clock, CheckCircle, XCircle, AlertCircle,
  IndianRupee, TrendingUp, Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const STATUS_COLORS = {
  Pending: '#f59e0b',
  Confirmed: '#3b82f6',
  Completed: '#22c55e',
  Cancelled: '#ef4444',
  'In Progress': '#a855f7',
  Rejected: '#f87171'
};

export default function Dashboard() {
  const { bookings, services, getStats } = useApp();
  const stats = getStats();

  // Monthly data (last 6 months)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const count = bookings.filter(b => b.bookingDate?.startsWith(key)).length;
    const revenue = bookings
      .filter(b => b.bookingDate?.startsWith(key) && (b.status === 'Completed' || b.paymentStatus === 'Paid'))
      .reduce((s, b) => s + (b.price || 0), 0);
    monthlyData.push({
      month: monthNames[d.getMonth()],
      bookings: count,
      revenue: Math.round(revenue / 1000)
    });
  }

  const statusData = [
    { name: 'Pending', value: stats.pending },
    { name: 'Confirmed', value: stats.confirmed },
    { name: 'Completed', value: stats.completed },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Cancelled', value: stats.cancelled },
  ].filter(d => d.value > 0);

  // Popular services
  const serviceCounts = {};
  bookings.forEach(b => {
    serviceCounts[b.serviceName] = (serviceCounts[b.serviceName] || 0) + 1;
  });
  const popularServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const recent = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);
  const upcoming = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Pending')
    .sort((a, b) => a.bookingDate.localeCompare(b.bookingDate))
    .slice(0, 5);

  const cards = [
    { label: 'Total Customers', value: stats.totalCustomers, icon: Users, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Bookings', value: stats.totalBookings, icon: Calendar, color: 'bg-pink-50 text-pink-600' },
    { label: "Today's Bookings", value: stats.todayBookings, icon: Clock, color: 'bg-purple-50 text-purple-600' },
    { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'bg-amber-50 text-amber-600' },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: 'bg-red-50 text-red-600' },
    { label: 'Demo Revenue', value: `₹${(stats.demoRevenue || 0).toLocaleString()}`, icon: IndianRupee, color: 'bg-champagne-100 text-champagne-700' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-charcoal-800">Dashboard</h2>
          <p className="text-sm text-gray-500">Overview of your studio performance (demo data)</p>
        </div>
        <Link to="/admin/bookings" className="btn-primary text-sm !py-2 self-start">Manage Bookings</Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-soft border border-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.color}`}>
                <c.icon size={18} />
              </div>
            </div>
            <div className="text-2xl font-bold text-charcoal-800">{c.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-soft border border-gray-50">
          <h3 className="font-semibold text-charcoal-800 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-pink-500" /> Monthly Bookings
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#ec4899" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-soft border border-gray-50">
          <h3 className="font-semibold text-charcoal-800 mb-4">Booking Status</h3>
          <div className="h-64">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusData.map((entry, i) => (
                      <Cell key={i} fill={STATUS_COLORS[entry.name] || '#ccc'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">No data</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-soft border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-charcoal-800">Recent Bookings</h3>
            <Link to="/admin/bookings" className="text-sm text-pink-500 hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium">ID</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Service</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(b => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-pink-50/30">
                    <td className="py-2.5 font-mono text-xs text-pink-600">{b.id}</td>
                    <td className="py-2.5">{b.customerName}</td>
                    <td className="py-2.5 text-gray-600">{b.serviceName}</td>
                    <td className="py-2.5 text-gray-500">{b.bookingDate}</td>
                    <td className="py-2.5">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100">{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular + Upcoming */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow-soft border border-gray-50">
            <h3 className="font-semibold text-charcoal-800 mb-3 flex items-center gap-2">
              <Sparkles size={16} className="text-pink-500" /> Popular Services
            </h3>
            <ul className="space-y-2">
              {popularServices.map(([name, count]) => (
                <li key={name} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate">{name}</span>
                  <span className="font-semibold text-pink-600">{count}</span>
                </li>
              ))}
              {popularServices.length === 0 && <li className="text-sm text-gray-400">No data yet</li>}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-soft border border-gray-50">
            <h3 className="font-semibold text-charcoal-800 mb-3">Upcoming</h3>
            <ul className="space-y-3">
              {upcoming.map(b => (
                <li key={b.id} className="text-sm border-b border-gray-50 pb-2 last:border-0">
                  <div className="font-medium">{b.customerName}</div>
                  <div className="text-gray-500 text-xs">{b.serviceName} · {b.bookingDate} {b.allocatedTime || b.requestedTime}</div>
                </li>
              ))}
              {upcoming.length === 0 && <li className="text-sm text-gray-400">No upcoming bookings</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
