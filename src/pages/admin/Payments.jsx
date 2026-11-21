import { useApp } from '../../context/AppContext';
import { CreditCard } from 'lucide-react';

export default function Payments() {
  const { bookings } = useApp();
  const withPayment = bookings.filter(b => b.paymentStatus && b.paymentStatus !== 'Pending');

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-semibold">Payment Management</h2>
        <p className="text-sm text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-full mt-1">
          Demo data only — no real payments processed
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Booking ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Advance</th>
                <th className="px-4 py-3 font-medium">Remaining</th>
                <th className="px-4 py-3 font-medium">Method</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Txn Ref</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id} className="border-t border-gray-50 hover:bg-pink-50/20">
                  <td className="px-4 py-3 font-mono text-xs text-pink-600">{b.id}</td>
                  <td className="px-4 py-3">{b.customerName}</td>
                  <td className="px-4 py-3 text-gray-600">{b.serviceName}</td>
                  <td className="px-4 py-3 font-medium">₹{(b.price || 0).toLocaleString()}</td>
                  <td className="px-4 py-3">₹{b.advanceAmount || 0}</td>
                  <td className="px-4 py-3">₹{b.remainingAmount || 0}</td>
                  <td className="px-4 py-3 text-xs">{b.paymentMethod || '—'}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100">{b.paymentStatus}</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-400">{b.transactionRef || '—'}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                    <CreditCard className="mx-auto mb-2 opacity-40" size={32} />
                    No payment records
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
