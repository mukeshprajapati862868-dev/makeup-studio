import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Save } from 'lucide-react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function TimeSlots() {
  const { timeConfig, saveTimeConfig, bookings } = useApp();
  const [form, setForm] = useState({ ...timeConfig });

  const handleSave = () => {
    saveTimeConfig(form);
  };

  const toggleHoliday = (dayIndex) => {
    const holidays = form.weeklyHolidays || [];
    const next = holidays.includes(dayIndex)
      ? holidays.filter(d => d !== dayIndex)
      : [...holidays, dayIndex];
    setForm({ ...form, weeklyHolidays: next });
  };

  // Simple daily occupancy for next 7 days
  const next7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const count = bookings.filter(b => b.bookingDate === dateStr && !['Cancelled', 'Rejected'].includes(b.status)).length;
    return { date: dateStr, day: DAYS[d.getDay()], count };
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold">Time Slot Management</h2>
        <p className="text-sm text-gray-500">Configure studio hours and availability (frontend demo)</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-soft border border-gray-50 p-6 space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock size={18} className="text-pink-500" /> Working Hours
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Opening Time</label>
              <input type="time" className="input-field" value={form.openingTime} onChange={e => setForm({ ...form, openingTime: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Closing Time</label>
              <input type="time" className="input-field" value={form.closingTime} onChange={e => setForm({ ...form, closingTime: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Slot Duration (min)</label>
              <input type="number" className="input-field" value={form.slotDuration} onChange={e => setForm({ ...form, slotDuration: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Max Daily Bookings</label>
              <input type="number" className="input-field" value={form.maxDailyBookings} onChange={e => setForm({ ...form, maxDailyBookings: Number(e.target.value) })} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Lunch Start</label>
              <input type="time" className="input-field" value={form.lunchBreakStart} onChange={e => setForm({ ...form, lunchBreakStart: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Lunch End</label>
              <input type="time" className="input-field" value={form.lunchBreakEnd} onChange={e => setForm({ ...form, lunchBreakEnd: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-2 block">Weekly Holidays</label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day, i) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleHoliday(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    (form.weeklyHolidays || []).includes(i)
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.enabledSlots !== false}
              onChange={e => setForm({ ...form, enabledSlots: e.target.checked })}
            />
            Time slots enabled
          </label>

          <button onClick={handleSave} className="btn-primary !py-2.5 flex items-center gap-2">
            <Save size={16} /> Save Configuration
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-soft border border-gray-50 p-6">
          <h3 className="font-semibold mb-4">Next 7 Days Occupancy</h3>
          <ul className="space-y-2">
            {next7.map(d => (
              <li key={d.date} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                <div>
                  <span className="font-medium">{d.day}</span>
                  <span className="text-gray-400 ml-2 text-xs">{d.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-400 rounded-full"
                      style={{ width: `${Math.min(100, (d.count / (form.maxDailyBookings || 12)) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-12 text-right">{d.count}/{form.maxDailyBookings || 12}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-4">
            Demo only — duplicate prevention is visual. Real allocation happens when you confirm bookings.
          </p>
        </div>
      </div>
    </div>
  );
}
