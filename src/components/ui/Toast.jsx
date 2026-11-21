import { useApp } from '../../context/AppContext';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`toast-enter flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium
            ${t.type === 'error' ? 'bg-red-500' : t.type === 'info' ? 'bg-blue-500' : 'bg-pink-500'}`}
        >
          {t.type === 'error' ? <XCircle size={18} /> : t.type === 'info' ? <Info size={18} /> : <CheckCircle size={18} />}
          <span className="flex-1">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
