import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/ui/Modal';

const empty = { name: '', mobile: '', specialization: '', image: '', workingHours: '10:00 - 19:00', available: true, experience: '' };

export default function ArtistsAdmin() {
  const { artists, saveArtist, deleteArtist } = useApp();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const openAdd = () => { setForm(empty); setEditId(null); setModal(true); };
  const openEdit = (a) => { setForm({ ...a }); setEditId(a.id); setModal(true); };

  const handleSave = () => {
    if (!form.name) return;
    saveArtist({
      ...form,
      id: editId || undefined,
      image: form.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop'
    });
    setModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">Artist Management</h2>
          <p className="text-sm text-gray-500">{artists.length} artists</p>
        </div>
        <button onClick={openAdd} className="btn-primary !py-2 text-sm flex items-center gap-1">
          <Plus size={16} /> Add Artist
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {artists.map(a => (
          <div key={a.id} className="bg-white rounded-2xl shadow-soft border border-gray-50 p-5 flex gap-4">
            <img src={a.image} alt={a.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{a.name}</h3>
              <p className="text-xs text-pink-500">{a.specialization}</p>
              <p className="text-xs text-gray-400 mt-0.5">{a.mobile} · {a.workingHours}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${a.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {a.available ? 'Available' : 'Unavailable'}
                </span>
                <div className="ml-auto flex gap-1">
                  <button onClick={() => openEdit(a)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={13} /></button>
                  <button onClick={() => { if (confirm('Delete artist?')) deleteArtist(a.id); }} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={13} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Edit Artist' : 'Add Artist'}>
        <div className="space-y-3">
          <input className="input-field" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="input-field" placeholder="Mobile" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
          <input className="input-field" placeholder="Specialization" value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} />
          <input className="input-field" placeholder="Experience (e.g. 5 years)" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
          <input className="input-field" placeholder="Working hours" value={form.workingHours} onChange={e => setForm({ ...form, workingHours: e.target.value })} />
          <input className="input-field" placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.available} onChange={e => setForm({ ...form, available: e.target.checked })} /> Available
          </label>
          <button onClick={handleSave} className="btn-primary w-full !py-2.5">Save Artist</button>
        </div>
      </Modal>
    </div>
  );
}
