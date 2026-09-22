import React, { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  X,
  PenSquare,
  ShieldCheck,
  Filter,
  Sparkles,
  Heart,
} from 'lucide-react';
import { useReviews, type ReviewItem } from '@/hooks/useReviews';

export type { ReviewItem };

interface ProductReviewsProps {
  productId: number;
  productName: string;
  productSize: string;
}

export default function ProductReviews({
  productId,
  productName,
  productSize,
}: ProductReviewsProps) {
  // Use dedicated reviews state management hook
  const {
    reviews,
    filteredReviews,
    stats,
    filterRating,
    setFilterRating,
    addReview,
    voteHelpful,
    hasVotedHelpful,
  } = useReviews(productId);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New review form fields
  const [formRating, setFormRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [formAuthor, setFormAuthor] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formComment, setFormComment] = useState('');
  const [formError, setFormError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Open modal reset
  const handleOpenModal = () => {
    setFormRating(5);
    setHoverRating(0);
    setFormAuthor('');
    setFormLocation('');
    setFormTitle('');
    setFormComment('');
    setFormError('');
    setSubmitSuccess(false);
    setIsModalOpen(true);
  };

  // Submit review form via hook
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim()) {
      setFormError('Please type your full name.');
      return;
    }
    if (!formTitle.trim()) {
      setFormError('Please give a short title for your review.');
      return;
    }
    if (!formComment.trim()) {
      setFormError('Please write a few words about your experience.');
      return;
    }

    addReview({
      productId,
      author: formAuthor,
      location: formLocation,
      rating: formRating,
      title: formTitle,
      comment: formComment,
    });

    setSubmitSuccess(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitSuccess(false);
    }, 1500);
  };

  const getRatingFeedback = (star: number) => {
    switch (star) {
      case 5:
        return '5 Stars • Excellent! 100% Pure Volta Honey';
      case 4:
        return '4 Stars • Very Good Honey';
      case 3:
        return '3 Stars • Good & Sweet';
      case 2:
        return '2 Stars • Just Okay';
      case 1:
        return '1 Star • Not Happy';
      default:
        return 'Choose your star rating';
    }
  };

  return (
    <div
      id="customer-reviews"
      className="scroll-mt-28 bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 mb-12"
    >
      {/* 🌟 Header & Review Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-md border border-green-200/60">
              <CheckCircle2 size={13} className="text-green-700" />
              <span>Verified Customer Reviews</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 tracking-tight">
            Customer Reviews & Ratings
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            See what families, bakeries, and shop owners in Ghana say about this honey.
          </p>
        </div>

        {/* 🌟 "Add Review" Button Trigger */}
        <button
          type="button"
          onClick={handleOpenModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-700 hover:bg-green-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl cursor-pointer shadow-md shadow-green-900/10 transition-all active:scale-95 shrink-0"
        >
          <PenSquare size={16} />
          <span>Write a Review</span>
        </button>
      </div>

      {/* 📊 Symmetrical Score Card & Bar Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8 border-b border-gray-100 items-center">
        {/* Left: Overall Score */}
        <div className="flex flex-col items-center justify-center text-center p-6 bg-amber-50/40 rounded-2xl border border-amber-100/60">
          <span className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tight">
            {stats.average}
          </span>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={18}
                className="fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <p className="text-xs font-bold text-gray-700">
            Based on verified customer reviews
          </p>
          <p className="text-[11px] text-green-700 font-semibold mt-1.5 flex items-center gap-1">
            <Heart size={12} className="fill-green-600 text-green-600" />
            <span>{stats.recommendPercentage}% of customers recommend this honey</span>
          </p>
        </div>

        {/* Center: Rating Distribution Bars */}
        <div className="lg:col-span-2 space-y-2.5">
          {[5, 4, 3, 2, 1].map((num) => {
            const star = num as 1 | 2 | 3 | 4 | 5;
            const percentage = stats.pct[star];
            const count = stats.counts[star];
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setFilterRating(filterRating === star ? 'all' : star)}
                  className={`w-14 text-left font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                    filterRating === star ? 'text-green-700 font-bold' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{star} Stars</span>
                </button>

                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-14 text-right text-gray-400 font-medium select-none">
                  {count} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🧭 Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-6">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-gray-400" />
          <span className="text-xs font-bold text-gray-700">Show:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setFilterRating('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                filterRating === 'all'
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Reviews ({reviews.length})
            </button>
            {[5, 4, 3, 2, 1].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilterRating(s)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                  filterRating === s
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{s}</span>
                <Star size={11} className={filterRating === s ? 'fill-white text-white' : 'fill-amber-400 text-amber-400'} />
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs text-gray-400">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </span>
      </div>

      {/* 💬 Customer Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50/60 rounded-2xl border border-gray-100 p-6 space-y-2">
            <p className="text-sm font-bold text-gray-700">No reviews found for this star selection.</p>
            <button
              type="button"
              onClick={() => setFilterRating('all')}
              className="text-xs font-bold text-green-700 hover:underline cursor-pointer"
            >
              Show All Reviews
            </button>
          </div>
        ) : (
          filteredReviews.map((rev) => {
            const hasVoted = hasVotedHelpful(rev.id);
            return (
              <div
                key={rev.id}
                className="p-5 sm:p-6 bg-gray-50/70 hover:bg-gray-50 rounded-2xl border border-gray-100/80 transition-colors space-y-3"
              >
                {/* Author Info & Date */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-black text-sm flex items-center justify-center uppercase shadow-2xs select-none">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">{rev.author}</span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 size={11} /> Verified Buyer
                          </span>
                        )}
                      </div>
                      {rev.location && (
                        <p className="text-[11px] text-gray-400 font-medium">{rev.location}</p>
                      )}
                    </div>
                  </div>

                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={
                        s <= rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      }
                    />
                  ))}
                </div>

                {/* Title */}
                <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                  {rev.title}
                </h4>

                {/* Comment Body */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {rev.comment}
                </p>

                {/* Helpful Button & Guarantee */}
                <div className="pt-2 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-green-700" />
                    <span>100% Pure Volta Honey • Quality Checked</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => voteHelpful(rev.id)}
                    disabled={hasVoted}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      hasVoted
                        ? 'bg-green-50 text-green-700 cursor-default'
                        : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-200'
                    }`}
                  >
                    <ThumbsUp size={12} className={hasVoted ? 'fill-green-700' : ''} />
                    <span>Helpful</span>
                    {rev.helpfulCount > 0 && <span>({rev.helpfulCount})</span>}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ============================================================ */}
      {/* 🌟 MODAL PAGE: ADD / WRITE A CUSTOMER REVIEW                */}
      {/* ============================================================ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {/* Success State */}
            {submitSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-sm">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Thank You for Your Review!</h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto">
                  Your review for <strong>{productName}</strong> has been saved and is now visible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-5">
                {/* Modal Title & Product Subtitle */}
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                    <Sparkles size={11} /> Write a Review
                  </span>
                  <h3 id="review-modal-title" className="text-xl sm:text-2xl font-display font-black text-gray-900 tracking-tight">
                    Share Your Experience
                  </h3>
                  <p className="text-xs text-gray-500">
                    Reviewing: <span className="font-semibold text-gray-800">{productName} ({productSize})</span>
                  </p>
                </div>

                {/* Error Banner */}
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                    {formError}
                  </div>
                )}

                {/* Interactive Star Picker */}
                <div className="space-y-1.5 p-4 bg-amber-50/50 rounded-2xl border border-amber-100 text-center">
                  <label className="text-xs font-bold text-gray-800 block">
                    How would you rate this honey?
                  </label>

                  <div className="flex items-center justify-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = (hoverRating || formRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setFormRating(star)}
                          className="p-1 text-gray-300 hover:scale-115 transition-transform cursor-pointer"
                          aria-label={`Give ${star} stars`}
                        >
                          <Star
                            size={28}
                            className={
                              isFilled
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-gray-200 text-gray-300'
                            }
                          />
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-xs font-bold text-amber-900 transition-all">
                    {getRatingFeedback(hoverRating || formRating)}
                  </p>
                </div>

                {/* Author Full Name */}
                <div className="space-y-1">
                  <label htmlFor="review-author" className="text-xs font-bold text-gray-700">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="review-author"
                    type="text"
                    required
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g. Kwame Mensah"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-green-600 focus:outline-hidden transition-all"
                  />
                </div>

                {/* Location / City */}
                <div className="space-y-1">
                  <label htmlFor="review-location" className="text-xs font-bold text-gray-700">
                    Your Town or City <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="review-location"
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Accra, Kumasi, Tema, or Ho"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-green-600 focus:outline-hidden transition-all"
                  />
                </div>

                {/* Review Headline / Title */}
                <div className="space-y-1">
                  <label htmlFor="review-title" className="text-xs font-bold text-gray-700">
                    Short Title for Your Review <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="review-title"
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Very sweet, thick, and truly pure honey!"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-green-600 focus:outline-hidden transition-all"
                  />
                </div>

                {/* Review Detailed Comment */}
                <div className="space-y-1">
                  <label htmlFor="review-comment" className="text-xs font-bold text-gray-700">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="review-comment"
                    required
                    rows={4}
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    placeholder="Tell us what you liked about this honey, how you use it (tea, bread, breakfast, baking), or how fast your delivery was..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:border-green-600 focus:outline-hidden transition-all resize-none"
                  />
                </div>

                {/* Verification Notice */}
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 text-[11px] text-gray-500">
                  <ShieldCheck size={14} className="text-green-700 shrink-0" />
                  <span>Your honest review helps other families and shops find real, healthy honey.</span>
                </div>

                {/* Modal Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-md shadow-green-900/10 transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <PenSquare size={14} />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
