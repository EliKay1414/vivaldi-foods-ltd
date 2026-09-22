import { useState, useEffect, useMemo, useCallback } from 'react';

export interface ReviewItem {
  id: string;
  productId: number;
  author: string;
  location?: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  createdAt?: number;
  verified: boolean;
  helpfulCount: number;
}

export interface NewReviewInput {
  author: string;
  location?: string;
  rating: number;
  title: string;
  comment: string;
  productId?: number;
}

export interface ReviewStats {
  average: string;
  total: number;
  counts: Record<1 | 2 | 3 | 4 | 5, number>;
  pct: Record<1 | 2 | 3 | 4 | 5, number>;
  recommendPercentage: number;
}

// 🇬🇭 Realistic, authentic Ghanaian customer reviews pre-seeded for Volta Honey bottles
export const DEFAULT_SEED_REVIEWS: Record<number, ReviewItem[]> = {
  // 330g Easy-to-Carry Bottle
  1: [
    {
      id: 'seed-1-1',
      productId: 1,
      author: 'Akosua Danso',
      location: 'Tema Community 6',
      rating: 5,
      title: 'Very easy to use for daily tea and breakfast',
      comment:
        'The squeeze bottle is very easy to use and does not leak or drip. The honey smells very fresh and sweet. There is no fake sugar added at all—you can feel how rich and thick it is right away.',
      date: '3 days ago',
      createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
      verified: true,
      helpfulCount: 16,
    },
    {
      id: 'seed-1-2',
      productId: 1,
      author: 'Kwame Mensah',
      location: 'Airport Residential, Accra',
      rating: 5,
      title: 'Real Volta honey at last!',
      comment:
        'I tested it with both the cold water test and the match test. It did not melt away quickly like fake sugar syrups do. This is 100% real raw honey. A very handy bottle to keep on my office desk.',
      date: '1 week ago',
      createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
      verified: true,
      helpfulCount: 24,
    },
    {
      id: 'seed-1-3',
      productId: 1,
      author: 'Emmanuel Addo',
      location: 'Kumasi',
      rating: 5,
      title: 'Fast delivery and clean packaging',
      comment:
        'I bought two bottles for my mother for her daily morning lemon and ginger tea. The package arrived safely with zero leaks. It feels good knowing it has an FDA approval number right on the bottle.',
      date: '2 weeks ago',
      createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
      verified: true,
      helpfulCount: 9,
    },
  ],
  // 500g Family Bottle
  2: [
    {
      id: 'seed-2-1',
      productId: 2,
      author: 'Dr. Nana Kwesi Mensah',
      location: 'Cantonments, Accra',
      rating: 5,
      title: '100% pure and healthy honey for our home',
      comment:
        'Finding genuine raw honey without fake sugar in Accra is not easy. This Volta honey is completely pure and natural. Our family uses it every day for warm lemon water, breakfast porridge, and cooking.',
      date: '4 days ago',
      createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
      verified: true,
      helpfulCount: 38,
    },
    {
      id: 'seed-2-2',
      productId: 2,
      author: 'Evelyn Antwi',
      location: 'Dzorwulu, Accra',
      rating: 5,
      title: 'Lasts our family 3 weeks of delicious breakfast',
      comment:
        'Our children love this on their bread, pancakes, and oatmeal. It has a beautiful golden color and tastes very natural and sweet. The 500g bottle gives the best value for a whole home.',
      date: '1 week ago',
      createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
      verified: true,
      helpfulCount: 19,
    },
    {
      id: 'seed-2-3',
      productId: 2,
      author: 'Selorm Agbavitor',
      location: 'Ho, Volta Region',
      rating: 5,
      title: 'Real honey from the Volta Region!',
      comment:
        'Knowing this honey comes straight from beekeepers in Adaklu makes me very proud. It is 100% pure and unheated. I recommend this to anyone looking for genuine natural honey.',
      date: '3 weeks ago',
      createdAt: Date.now() - 21 * 24 * 60 * 60 * 1000,
      verified: true,
      helpfulCount: 14,
    },
  ],
  // 330g Wholesale Box
  3: [
    {
      id: 'seed-3-1',
      productId: 3,
      author: 'Beatrice Ofori',
      location: 'Spintex Road, Accra (Grocery Mart)',
      rating: 5,
      title: 'Very popular on our shop shelves',
      comment:
        'We ordered the 330g wholesale boxes for our grocery store. The strong cartons protect the bottles nicely. Our customers love the small size and keep coming back for more every week.',
      date: '1 week ago',
      createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
      verified: true,
      helpfulCount: 21,
    },
    {
      id: 'seed-3-2',
      productId: 3,
      author: 'Samuel K. Boateng',
      location: 'Dansoman, Accra',
      rating: 5,
      title: 'Good profit margins and fast delivery',
      comment:
        'The factory price allows us to make a good profit while selling at a fair price to our customers. Delivery to our store was prompt and easy.',
      date: '2 weeks ago',
      createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
      verified: true,
      helpfulCount: 11,
    },
  ],
  // 500g Wholesale Box
  4: [
    {
      id: 'seed-4-1',
      productId: 4,
      author: 'Patrick K. Nyarko',
      location: 'Achimota, Accra (Bakery)',
      rating: 5,
      title: 'Excellent for baking bread and pastries',
      comment:
        'We use Volta honey for our bakery bread and pastries. It does not turn into hard sugar crystals like fake syrups do. It gives our bread a rich taste and sweet smell.',
      date: '5 days ago',
      createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
      verified: true,
      helpfulCount: 29,
    },
    {
      id: 'seed-4-2',
      productId: 4,
      author: 'Grace Ampofo',
      location: 'Tema Port Area',
      rating: 5,
      title: 'Trusted supplier with genuine FDA approval',
      comment:
        'We supply food items to shops across Ghana. Vivaldi Foods provides real FDA registration and good customer support. Safe and fast delivery every time.',
      date: '3 weeks ago',
      createdAt: Date.now() - 21 * 24 * 60 * 60 * 1000,
      verified: true,
      helpfulCount: 17,
    },
  ],
};

const STORAGE_KEY_REVIEWS = 'vivaldi_all_reviews';
const STORAGE_KEY_VOTES = 'vivaldi_helpful_votes';
const REVIEWS_EVENT = 'vivaldi-reviews-updated';

/**
 * Load all reviews dictionary from localStorage or default seed
 */
function loadAllReviewsFromStorage(): Record<number, ReviewItem[]> {
  if (typeof window === 'undefined') return DEFAULT_SEED_REVIEWS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_REVIEWS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse reviews from localStorage', e);
  }
  return DEFAULT_SEED_REVIEWS;
}

/**
 * Save all reviews dictionary to localStorage and broadcast change event
 */
function saveAllReviewsToStorage(data: Record<number, ReviewItem[]>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(REVIEWS_EVENT));
  } catch (e) {
    console.error('Failed to save reviews to localStorage', e);
  }
}

/**
 * Load voted review IDs
 */
function loadVotedIdsFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_VOTES);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

/**
 * Custom hook for managing reviews state & localStorage persistence
 * @param productId Optional product ID to filter reviews. If omitted, exposes all reviews.
 */
export function useReviews(productId?: number) {
  const [allReviews, setAllReviews] = useState<Record<number, ReviewItem[]>>(() => loadAllReviewsFromStorage());
  const [votedIds, setVotedIds] = useState<string[]>(() => loadVotedIdsFromStorage());
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  // Synchronize state when storage changes across windows or local dispatches
  useEffect(() => {
    const handleUpdate = () => {
      setAllReviews(loadAllReviewsFromStorage());
      setVotedIds(loadVotedIdsFromStorage());
    };

    window.addEventListener(REVIEWS_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(REVIEWS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Filter reviews for the current product
  const reviews: ReviewItem[] = useMemo(() => {
    if (typeof productId === 'number') {
      return allReviews[productId] || DEFAULT_SEED_REVIEWS[productId] || [];
    }
    // Return flat list of all reviews across all products if no productId specified
    return Object.values(allReviews).flat();
  }, [allReviews, productId]);

  // Filtered reviews by rating tab
  const filteredReviews = useMemo(() => {
    if (filterRating === 'all') return reviews;
    return reviews.filter((r) => Math.round(r.rating) === filterRating);
  }, [reviews, filterRating]);

  // Compute stats
  const stats: ReviewStats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) {
      return {
        average: '5.0',
        total: 0,
        counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        pct: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
        recommendPercentage: 100,
      };
    }

    const counts: Record<1 | 2 | 3 | 4 | 5, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    let recommendCount = 0;

    reviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
      counts[star] = (counts[star] || 0) + 1;
      sum += r.rating;
      if (r.rating >= 4) recommendCount += 1;
    });

    const average = (sum / total).toFixed(1);
    const pct: Record<1 | 2 | 3 | 4 | 5, number> = {
      5: Math.round((counts[5] / total) * 100),
      4: Math.round((counts[4] / total) * 100),
      3: Math.round((counts[3] / total) * 100),
      2: Math.round((counts[2] / total) * 100),
      1: Math.round((counts[1] / total) * 100),
    };

    const recommendPercentage = Math.round((recommendCount / total) * 100);

    return { average, total, counts, pct, recommendPercentage };
  }, [reviews]);

  /**
   * Add a new customer review to the store
   */
  const addReview = useCallback(
    (input: NewReviewInput): ReviewItem => {
      const targetProdId = input.productId ?? productId ?? 1;

      const newReview: ReviewItem = {
        id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId: targetProdId,
        author: input.author.trim(),
        location: input.location?.trim() || 'Accra, Ghana',
        rating: Math.min(5, Math.max(1, input.rating)),
        title: input.title.trim(),
        comment: input.comment.trim(),
        date: 'Just now',
        createdAt: Date.now(),
        verified: true,
        helpfulCount: 0,
      };

      const updated = {
        ...allReviews,
        [targetProdId]: [newReview, ...(allReviews[targetProdId] || [])],
      };

      saveAllReviewsToStorage(updated);
      setAllReviews(updated);

      return newReview;
    },
    [allReviews, productId]
  );

  /**
   * Vote a review as helpful (persists per device)
   */
  const voteHelpful = useCallback(
    (reviewId: string) => {
      if (votedIds.includes(reviewId)) return;

      const newVoted = [...votedIds, reviewId];
      try {
        localStorage.setItem(STORAGE_KEY_VOTES, JSON.stringify(newVoted));
      } catch {
        // ignore
      }
      setVotedIds(newVoted);

      const targetProdId = productId ?? 1;
      const currentList = allReviews[targetProdId] || [];
      const updatedList = currentList.map((item) =>
        item.id === reviewId ? { ...item, helpfulCount: item.helpfulCount + 1 } : item
      );

      const updated = {
        ...allReviews,
        [targetProdId]: updatedList,
      };

      saveAllReviewsToStorage(updated);
      setAllReviews(updated);
    },
    [allReviews, productId, votedIds]
  );

  const hasVotedHelpful = useCallback(
    (reviewId: string) => votedIds.includes(reviewId),
    [votedIds]
  );

  /**
   * Reset reviews back to seed defaults (useful for testing)
   */
  const resetReviews = useCallback(
    (targetProdId?: number) => {
      let nextState: Record<number, ReviewItem[]>;
      if (typeof targetProdId === 'number') {
        nextState = {
          ...allReviews,
          [targetProdId]: DEFAULT_SEED_REVIEWS[targetProdId] || [],
        };
      } else {
        nextState = DEFAULT_SEED_REVIEWS;
      }
      saveAllReviewsToStorage(nextState);
      setAllReviews(nextState);
    },
    [allReviews]
  );

  return {
    reviews,
    allReviews,
    filteredReviews,
    stats,
    filterRating,
    setFilterRating,
    addReview,
    voteHelpful,
    hasVotedHelpful,
    resetReviews,
  };
}

export default useReviews;
