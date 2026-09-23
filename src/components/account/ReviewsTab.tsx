import React, { useState } from 'react';
import { Star, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { productCatalog } from '@/config/commerce';
import { toast } from 'react-toastify';

export const ReviewsTab: React.FC = () => {
  const [rating, setRating] = useState(5);
  const [selectedProductId, setSelectedProductId] = useState(productCatalog[0]?.id || 1);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitted(true);
    toast.success('Thank you! Your review has been submitted.');
    setComment('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 space-y-6">
      <div className="pb-4 border-b border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
          Product Reviews
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Reviews and feedback on our honey products.
        </p>
      </div>

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl bg-gray-50/60 p-5 rounded-2xl border border-gray-200/80"
      >
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
          Write A Review
        </h4>

        {submitted && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-xs text-green-800 font-semibold animate-scale-in">
            <CheckCircle2 size={15} className="text-green-700" />
            <span>Your review has been submitted successfully.</span>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Product</label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(Number(e.target.value))}
            className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-green-700"
          >
            {productCatalog.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.size})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700 block">Rating</label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="cursor-pointer p-0.5 text-amber-400 hover:scale-110 transition-transform"
              >
                <Star
                  size={20}
                  fill={star <= rating ? 'currentColor' : 'none'}
                  className={star <= rating ? 'text-amber-400' : 'text-gray-300'}
                />
              </button>
            ))}
            <span className="text-xs font-bold text-gray-700 ml-2">
              {rating} of 5 Stars
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-700">Review</label>
          <textarea
            required
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-green-700 bg-white"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
        >
          <Sparkles size={13} />
          <span>Submit Review</span>
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
          Customer Reviews
        </h4>

        <div className="p-4 border border-gray-100 rounded-2xl space-y-2 bg-brand-cream/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="text-[10px] text-gray-400">Verified Buyer</span>
          </div>
          <h5 className="text-xs font-bold text-gray-900">
            Volta Raw Wildflower Honey (1kg Glass Jar)
          </h5>
          <p className="text-xs text-gray-600 leading-relaxed">
            "Authentic taste and smooth texture. Fast delivery within Accra."
          </p>
          <div className="flex items-center gap-1 text-[10px] text-green-700 font-bold">
            <ShieldCheck size={12} />
            <span>Verified Purchase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTab;
