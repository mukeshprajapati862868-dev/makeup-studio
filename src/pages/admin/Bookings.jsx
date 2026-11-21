import { useState, useMemo } from 'react';
import { Search, Eye, Check, X, Edit2, Clock, UserPlus, Play, CheckCircle, Ban } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/ui/Modal';

const STATUSES = ['All', 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Rejected', 'Cancelled'];

export default function Bookings() {
  const { bookings, artists, updateBooking, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const perPage = 10;

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch =
        !search ||
        b.id.toLowerCase().includes(search.toLowerCase()) ||
        b.customerName.toLowerCase().includes(search.toLowerCase()) ||
        b.mobile.includes(search);
      const matchStatus = statusFilter === 'All' || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const openView = (b) => {
    setSelected(b);
    setEditForm(null);
  };

  const openEdit = (b) => {
    setSelected(b);
    setEditForm({
      allocatedTime: b.allocatedTime || b.requestedTime || '',
      artistId: b.artistId || '',
      status: b.status,
      paymentStatus: b.paymentStatus,
      notes: b.notes || ''
    });
  };

  const applyAction = (id, updates) => {
    updateBooking(id, updates);
    setSelected(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (!selected || !editForm) return;
    const artist = artists.find(a => a.id === editForm.artistId);
    applyAction(selected.id, {
      allocatedTime: editForm.allocatedTime,
      artistId: editForm.artistId || null,
      artistName: artist?.name || null,
      status: editForm.status,
      paymentStatus: editForm.paymentStatus,
      notes: editForm.notes
    });
  };

  const statusBadge = (status) => {
    const colors = {
      Pending: 'bg-amber-100 text-amber-700',
      Confirmed: 'bg-blue-100 text-blue-700',
      'In Progress': 'bg-purple-100 text-purple-700',
      Completed: 'bg-green-100 text-green-700',
      Rejected: 'bg-red-100 text-red-700',
      Cancelled: 'bg-gray-100 text-gray-600'
    };
    return (
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold">Booking Management</h2>
          <p className="text-sm text-gray-500">{filtered.length} bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="input-field !pl-9"
            placeholder="Search by ID, name or mobile..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <select
          className="input-field sm:w-40"
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
        >
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Date / Time</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(b => (
                <tr key={b.id} className="border-t border-gray-50 hover:bg-pink-50/20">
                  <td className="px-4 py-3 font-mono text-xs text-pink-600">{b.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{b.customerName}</div>
                    <div className="text-xs text-gray-400">{b.mobile}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{b.serviceName}</td>
                  <td className="px-4 py-3">
                    <div>{b.bookingDate}</div>
                    <div className="text-xs text-gray-400">
                      Req: {b.requestedTime} {b.allocatedTime && `· Alloc: ${b.allocatedTime}`}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{b.location}</td>
                  <td className="px-4 py-3">{statusBadge(b.status)}</td>
                  <td className="px-4 py-3 text-xs">{b.paymentStatus}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openView(b)} className="p-1.5 rounded-lg hover:bg-gray-100" title="View">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg hover:bg-gray-100" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      {b.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => applyAction(b.id, { status: 'Confirmed', allocatedTime: b.requestedTime })}
                            className="p-1.5 rounded-lg hover:bg-green-50 text-green-600"
                            title="Approve"
                          >
                            <Check size={15} />
                          </button>
                          <button
                            onClick={() => applyAction(b.id, { status: 'Rejected' })}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                            title="Reject"
                          >
                            <X size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">No bookings found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50 text-sm">
            <span className="text-gray-500">Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1 rounded-lg border disabled:opacity-40 hover:bg-gray-50"
              >
                Prev
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1 rounded-lg border disabled:opacity-40 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View / Edit Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => { setSelected(null); setEditForm(null); }}
        title={editForm ? 'Edit Booking' : 'Booking Details'}
        size="lg"
      >
        {selected && !editForm && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              {[
                ['Booking ID', selected.id],
                ['Customer', selected.customerName],
                ['Mobile', selected.mobile],
                ['Service', selected.serviceName],
                ['Price', `₹${(selected.price || 0).toLocaleString()}`],
                ['Date', selected.bookingDate],
                ['Requested Time', selected.requestedTime],
                ['Allocated Time', selected.allocatedTime || '—'],
                ['Artist', selected.artistName || '—'],
                ['Location', selected.location],
                ['Persons', selected.persons],
                ['Status', selected.status],
                ['Payment', selected.paymentStatus],
                ['Advance', `₹${selected.advanceAmount || 0}`],
                ['Remaining', `₹${selected.remainingAmount || 0}`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between border-b border-gray-50 py-1.5">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-right">{val}</span>
                </div>
              ))}
            </div>
            {selected.address && (
              <div className="text-sm"><span className="text-gray-500">Address: </span>{selected.address}</div>
            )}
            {selected.notes && (
              <div className="text-sm"><span className="text-gray-500">Notes: </span>{selected.notes}</div>
            )}

            <div className="flex flex-wrap gap-2 pt-4 border-t">
              {selected.status === 'Pending' && (
                <>
                  <button onClick={() => applyAction(selected.id, { status: 'Confirmed', allocatedTime: selected.requestedTime })} className="btn-primary !py-2 text-sm flex items-center gap-1">
                    <Check size={14} /> Approve
                  </button>
                  <button onClick={() => applyAction(selected.id, { status: 'Rejected' })} className="btn-secondary !py-2 text-sm flex items-center gap-1 text-red-600">
                    <X size={14} /> Reject
                  </button>
                </>
              )}
              {selected.status === 'Confirmed' && (
                <button onClick={() => applyAction(selected.id, { status: 'In Progress' })} className="btn-primary !py-2 text-sm flex items-center gap-1">
                  <Play size={14} /> Mark In Progress
                </button>
              )}
              {selected.status === 'In Progress' && (
                <button onClick={() => applyAction(selected.id, { status: 'Completed', paymentStatus: 'Paid', remainingAmount: 0 })} className="btn-primary !py-2 text-sm flex items-center gap-1">
                  <CheckCircle size={14} /> Mark Completed
                </button>
              )}
              {!['Completed', 'Cancelled', 'Rejected'].includes(selected.status) && (
                <button onClick={() => applyAction(selected.id, { status: 'Cancelled' })} className="btn-secondary !py-2 text-sm flex items-center gap-1">
                  <Ban size={14} /> Cancel
                </button>
              )}
              <button onClick={() => openEdit(selected)} className="btn-secondary !py-2 text-sm flex items-center gap-1">
                <Edit2 size={14} /> Edit
              </button>
            </div>
          </div>
        )}

        {selected && editForm && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Allocated Time</label>
              <input
                type="time"
                className="input-field"
                value={editForm.allocatedTime}
                onChange={e => setEditForm({ ...editForm, allocatedTime: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Assign Artist</label>
              <select
                className="input-field"
                value={editForm.artistId}
                onChange={e => setEditForm({ ...editForm, artistId: e.target.value })}
              >
                <option value="">— Select —</option>
                {artists.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <select
                className="input-field"
                value={editForm.status}
                onChange={e => setEditForm({ ...editForm, status: e.target.value })}
              >
                {STATUSES.filter(s => s !== 'All').map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Payment Status</label>
              <select
                className="input-field"
                value={editForm.paymentStatus}
                onChange={e => setEditForm({ ...editForm, paymentStatus: e.target.value })}
              >
                {['Pending', 'Advance Paid', 'Paid', 'Refunded'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Notes</label>
              <textarea
                className="input-field"
                rows={2}
                value={editForm.notes}
                onChange={e => setEditForm({ ...editForm, notes: e.target.value })}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={saveEdit} className="btn-primary !py-2 text-sm">Save Changes</button>
              <button onClick={() => setEditForm(null)} className="btn-secondary !py-2 text-sm">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
