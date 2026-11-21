import { Star, Eye, EyeOff, Trash2, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ReviewsAdmin() {
  const { reviews, updateReview, deleteReview } = useApp();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl font-semibold">Reviews Management</h2>
        <p className="text-sm text-gray-500">{reviews.length} reviews</p>
      </div>

      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className="bg-white rounded-2xl shadow-soft border border-gray-50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{r.customerName}</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{r.date}</span>
                </div>
                <p className="text-sm text-gray-600">{r.comment}</p>
                <p className="text-xs text-pink-500 mt-1">{r.service}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!r.approved && (
                  <button
                    onClick={() => updateReview(r.id, { approved: true, visible: true })}
                    className="p-1.5 hover:bg-green-50 text-green-600 rounded-lg"
                    title="Approve"
                  >
                    <Check size={15} />
                  </button>
                )}
                <button
                  onClick={() => updateReview(r.id, { visible: !r.visible })}
                  className="p-1.5 hover:bg-gray-100 rounded-lg"
                  title={r.visible ? 'Hide' : 'Show'}
                >
                  {r.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  onClick={() => { if (confirm('Delete review?')) deleteReview(r.id); }}
                  className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${r.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {r.approved ? 'Approved' : 'Pending'}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${r.visible ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                {r.visible ? 'Visible' : 'Hidden'}
              </span>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="text-center py-16 text-gray-400">No reviews yet</div>
        )}
      </div>
    </div>
  );
}
