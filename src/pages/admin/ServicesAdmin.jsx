import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/ui/Modal';

const empty = { name: '', description: '', price: '', duration: 60, category: 'Bridal', image: '', active: true, popular: false };

export default function ServicesAdmin() {
  const { services, saveService, deleteService } = useApp();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const openAdd = () => {
    setForm(empty);
    setEditId(null);
    setModal(true);
  };

  const openEdit = (s) => {
    setForm({ ...s, price: String(s.price), duration: String(s.duration) });
    setEditId(s.id);
    setModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    saveService({
      ...form,
      id: editId || undefined,
      price: Number(form.price),
      duration: Number(form.duration),
      image: form.image || 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop'
    });
    setModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">Services Management</h2>
          <p className="text-sm text-gray-500">{services.length} services</p>
        </div>
        <button onClick={openAdd} className="btn-primary !py-2 text-sm flex items-center gap-1">
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map(s => (
          <div key={s.id} className="bg-white rounded-2xl shadow-soft border border-gray-50 overflow-hidden">
            <img src={s.image} alt={s.name} className="h-36 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{s.name}</h3>
                  <p className="text-xs text-gray-400">{s.category} · {s.duration} min</p>
                </div>
                <span className="font-bold text-pink-600">₹{s.price.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">{s.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${s.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {s.active ? 'Active' : 'Inactive'}
                </span>
                {s.popular && <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-600">Popular</span>}
                <div className="ml-auto flex gap-1">
                  <button onClick={() => openEdit(s)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit2 size={14} /></button>
                  <button onClick={() => { if (confirm('Delete this service?')) deleteService(s.id); }} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Edit Service' : 'Add Service'}>
        <div className="space-y-3">
          <input className="input-field" placeholder="Service name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <textarea className="input-field" rows={2} placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="input-field" type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <input className="input-field" type="number" placeholder="Duration (min)" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
          </div>
          <select className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {['Bridal', 'Party', 'Specialty', 'Skincare', 'Hair', 'Styling', 'Package'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input className="input-field" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} /> Active
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.popular} onChange={e => setForm({ ...form, popular: e.target.checked })} /> Popular
            </label>
          </div>
          <button onClick={handleSave} className="btn-primary w-full !py-2.5">Save Service</button>
        </div>
      </Modal>
    </div>
  );
}
