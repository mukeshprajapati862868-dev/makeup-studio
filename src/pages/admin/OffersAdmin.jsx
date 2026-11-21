import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/ui/Modal';

const empty = { title: '', description: '', discountPercent: 10, originalPrice: '', offerPrice: '', startDate: '', endDate: '', active: true, image: '' };

export default function OffersAdmin() {
  const { offers, saveOffer, deleteOffer } = useApp();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const openAdd = () => { setForm(empty); setEditId(null); setModal(true); };
  const openEdit = (o) => {
    setForm({ ...o, originalPrice: String(o.originalPrice), offerPrice: String(o.offerPrice), discountPercent: String(o.discountPercent) });
    setEditId(o.id);
    setModal(true);
  };

  const handleSave = () => {
    if (!form.title) return;
    saveOffer({
      ...form,
      id: editId || undefined,
      originalPrice: Number(form.originalPrice),
      offerPrice: Number(form.offerPrice),
      discountPercent: Number(form.discountPercent),
      image: form.image || 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop'
    });
    setModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">Offers Management</h2>
          <p className="text-sm text-gray-500">{offers.length} offers</p>
        </div>
        <button onClick={openAdd} className="btn-primary !py-2 text-sm flex items-center gap-1">
          <Plus size={16} /> Create Offer
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {offers.map(o => (
          <div key={o.id} className="bg-white rounded-2xl shadow-soft border border-gray-50 flex overflow-hidden">
            <img src={o.image} alt={o.title} className="w-28 object-cover" />
            <div className="p-4 flex-1">
              <div className="flex justify-between">
                <h3 className="font-semibold">{o.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${o.active ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
                  {o.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{o.description}</p>
              <div className="mt-2 text-sm">
                <span className="text-gray-400 line-through mr-2">₹{o.originalPrice?.toLocaleString()}</span>
                <span className="font-bold text-pink-600">₹{o.offerPrice?.toLocaleString()}</span>
                <span className="text-xs text-pink-500 ml-2">({o.discountPercent}% off)</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{o.startDate} → {o.endDate}</div>
              <div className="flex gap-1 mt-2">
                <button onClick={() => openEdit(o)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={13} /></button>
                <button onClick={() => { if (confirm('Delete?')) deleteOffer(o.id); }} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Edit Offer' : 'Create Offer'}>
        <div className="space-y-3">
          <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <textarea className="input-field" rows={2} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-3 gap-2">
            <input className="input-field" type="number" placeholder="% Off" value={form.discountPercent} onChange={e => setForm({ ...form, discountPercent: e.target.value })} />
            <input className="input-field" type="number" placeholder="Original ₹" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} />
            <input className="input-field" type="number" placeholder="Offer ₹" value={form.offerPrice} onChange={e => setForm({ ...form, offerPrice: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input className="input-field" type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
            <input className="input-field" type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
          </div>
          <input className="input-field" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} /> Active
          </label>
          <button onClick={handleSave} className="btn-primary w-full !py-2.5">Save Offer</button>
        </div>
      </Modal>
    </div>
  );
}
