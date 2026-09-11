import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { CoffeeCategory, ReviewSubmissionInput } from '../types/testimonial';

interface ReviewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: ReviewSubmissionInput) => void;
}

const PRODUCT_OPTIONS: { name: string; category: CoffeeCategory }[] = [
  { name: 'Attikan Estate (Medium Dark)', category: 'single_origin' },
  { name: 'Baarbara Estate - Whiskey Barrel Aged', category: 'single_origin' },
  { name: 'Excelsa by Mooleh Manay Estate', category: 'producer_series' },
  { name: 'Riverdale Estate - Mosto', category: 'producer_series' },
  { name: 'Cold Brew Blend Bold', category: 'blend' },
  { name: '13th Birthday Blend', category: 'blend' },
  { name: 'Barista Touch Espresso Machine', category: 'equipment' },
  { name: 'Fellow Ode Gen 2 Brew Grinder', category: 'equipment' },
];

const BREW_METHODS = [
  'V60 Pour Over',
  'Espresso (9 bar)',
  'Aeropress',
  'French Press',
  'Cold Brew (18h)',
  'Moka Pot',
  'South Indian Filter',
];

export const ReviewSubmissionModal: React.FC<ReviewSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const [brewMethod, setBrewMethod] = useState(BREW_METHODS[0]);
  const [quote, setQuote] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) return;

    const prod = PRODUCT_OPTIONS[selectedProductIndex];
    const tastingNotes = notesInput
      .split(',')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    onSubmit({
      author: author.trim(),
      location: location.trim() || undefined,
      rating,
      quote: quote.trim(),
      productName: prod.name,
      category: prod.category,
      brewMethod,
      tastingNotes: tastingNotes.length > 0 ? tastingNotes : undefined,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-serif">Thank You!</h3>
            <p className="text-sm text-stone-600 max-w-xs mx-auto">
              Your cupping review has been submitted and shared with our head roasters.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Community Cupping Log
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                Share Your Brew Experience
              </h3>
              <p className="text-xs text-stone-500">
                Help fellow coffee enthusiasts discover their next favorite lot.
              </p>
            </div>

            {/* Star Rating Selector */}
            <div className="space-y-1 pt-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'fill-amber-500 text-amber-500'
                          : 'fill-stone-100 text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-900 ml-2">
                  {rating} of 5 stars
                </span>
              </div>
            </div>

            {/* Author & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  City & State
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bangalore, KA"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
              </div>
            </div>

            {/* Product & Brew Method */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Coffee / Hardware *
                </label>
                <select
                  value={selectedProductIndex}
                  onChange={(e) => setSelectedProductIndex(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white"
                >
                  {PRODUCT_OPTIONS.map((opt, idx) => (
                    <option key={opt.name} value={idx}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Brew Method
                </label>
                <select
                  value={brewMethod}
                  onChange={(e) => setBrewMethod(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800 bg-white"
                >
                  {BREW_METHODS.map((bm) => (
                    <option key={bm} value={bm}>
                      {bm}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tasting Notes Tags */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Tasting Notes (comma-separated)
              </label>
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="e.g. Dark Chocolate, Orange Zest, Molasses"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800"
              />
            </div>

            {/* Review text */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Your Review *
              </label>
              <textarea
                required
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Describe the aroma, cup balance, flavor clarity, and overall brewing impressions..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Submit Cupping Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

