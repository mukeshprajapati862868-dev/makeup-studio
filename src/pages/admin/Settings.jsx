import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Settings() {
  const { settings, saveSettings, resetDemoData } = useApp();
  const [form, setForm] = useState({ ...settings });

  const handleSave = () => {
    saveSettings(form);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-display text-2xl font-semibold">Shop Settings</h2>
        <p className="text-sm text-gray-500">Update studio information (saved in LocalStorage)</p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-gray-50 p-6 space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Shop Name</label>
          <input className="input-field" value={form.shopName || ''} onChange={e => setForm({ ...form, shopName: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Tagline</label>
          <input className="input-field" value={form.tagline || ''} onChange={e => setForm({ ...form, tagline: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Address</label>
          <textarea className="input-field" rows={2} value={form.address || ''} onChange={e => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Mobile</label>
            <input className="input-field" value={form.mobile || ''} onChange={e => setForm({ ...form, mobile: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">WhatsApp</label>
            <input className="input-field" value={form.whatsapp || ''} onChange={e => setForm({ ...form, whatsapp: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Email</label>
          <input className="input-field" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Weekdays</label>
            <input className="input-field" value={form.businessHours?.weekdays || ''} onChange={e => setForm({ ...form, businessHours: { ...form.businessHours, weekdays: e.target.value } })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Saturday</label>
            <input className="input-field" value={form.businessHours?.saturday || ''} onChange={e => setForm({ ...form, businessHours: { ...form.businessHours, saturday: e.target.value } })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Sunday</label>
            <input className="input-field" value={form.businessHours?.sunday || ''} onChange={e => setForm({ ...form, businessHours: { ...form.businessHours, sunday: e.target.value } })} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Booking Rules</label>
          <textarea className="input-field" rows={2} value={form.bookingRules || ''} onChange={e => setForm({ ...form, bookingRules: e.target.value })} />
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button onClick={handleSave} className="btn-primary !py-2.5 flex items-center gap-2">
            <Save size={16} /> Save Settings
          </button>
          <button
            onClick={() => {
              if (confirm('Reset all demo data and reload? This cannot be undone.')) {
                resetDemoData();
              }
            }}
            className="btn-secondary !py-2.5 flex items-center gap-2 text-red-600"
          >
            <RotateCcw size={16} /> Reset Demo Data
          </button>
        </div>
      </div>
    </div>
  );
}
