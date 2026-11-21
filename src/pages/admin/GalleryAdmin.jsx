import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/ui/Modal';

const CATEGORIES = ['Bridal Makeup', 'Party Makeup', 'Engagement Makeup', 'Reception Makeup', 'HD Makeup', 'Natural Makeup', 'Pre-Bridal Makeup', 'Hair Styling', 'Before & After'];
const empty = { title: '', category: 'Bridal Makeup', type: 'image', url: '', visible: true };

export default function GalleryAdmin() {
  const { gallery, saveGalleryItem, deleteGalleryItem } = useApp();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);

  const openAdd = () => { setForm(empty); setEditId(null); setModal(true); };
  const openEdit = (g) => { setForm({ ...g }); setEditId(g.id); setModal(true); };

  const handleSave = () => {
    if (!form.title || !form.url) return;
    saveGalleryItem({ ...form, id: editId || undefined });
    setModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold">Gallery Management</h2>
          <p className="text-sm text-gray-500">{gallery.length} items</p>
        </div>
        <button onClick={openAdd} className="btn-primary !py-2 text-sm flex items-center gap-1">
          <Plus size={16} /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map(g => (
          <div key={g.id} className="bg-white rounded-xl shadow-soft border border-gray-50 overflow-hidden group">
            <div className="aspect-[3/4] relative">
              <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
              {!g.visible && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <EyeOff className="text-white" size={24} />
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="font-medium text-sm truncate">{g.title}</div>
              <div className="text-xs text-gray-400">{g.category}</div>
              <div className="flex gap-1 mt-2">
                <button onClick={() => openEdit(g)} className="p-1 hover:bg-gray-100 rounded"><Edit2 size={13} /></button>
                <button
                  onClick={() => saveGalleryItem({ ...g, visible: !g.visible })}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {g.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                </button>
                <button onClick={() => { if (confirm('Delete?')) deleteGalleryItem(g.id); }} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editId ? 'Edit Item' : 'Add Gallery Item'}>
        <div className="space-y-3">
          <input className="input-field" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <select className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input className="input-field" placeholder="Image URL" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.visible} onChange={e => setForm({ ...form, visible: e.target.checked })} /> Visible
          </label>
          <button onClick={handleSave} className="btn-primary w-full !py-2.5">Save</button>
        </div>
      </Modal>
    </div>
  );
}
