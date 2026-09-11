import React, { useState } from 'react';
import { PlusCircle, MessageSquareQuote } from 'lucide-react';
import { Testimonial, CoffeeCategory, ReviewSubmissionInput } from '../types/testimonial';
import { INITIAL_TESTIMONIALS } from '../data/mockTestimonials';
import { TestimonialCard } from './TestimonialCard';
import { TestimonialStats } from './TestimonialStats';
import { ReviewSubmissionModal } from './ReviewSubmissionModal';

export interface TestimonialsFragmentProps {
  title?: string;
  subtitle?: string;
  onProductSelect?: (productId?: string) => void;
  showStats?: boolean;
  className?: string;
}

const FILTER_PILLS: { label: string; value: CoffeeCategory }[] = [
  { label: 'All Reviews', value: 'all' },
  { label: 'Single Origin Estates', value: 'single_origin' },
  { label: 'Producer Series Nano-Lots', value: 'producer_series' },
  { label: 'Signature Blends', value: 'blend' },
  { label: 'Hardware & Espresso Gear', value: 'equipment' },
];

export const TestimonialsFragment: React.FC<TestimonialsFragmentProps> = ({
  title = 'What Our Community Is Brewing',
  subtitle = 'Unfiltered cupping notes, extraction dial-ins, and stories from coffee lovers across India.',
  onProductSelect,
  showStats = true,
  className = '',
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [activeFilter, setActiveFilter] = useState<CoffeeCategory>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const filteredList = testimonials.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.category === activeFilter;
  });

  const handleReviewSubmit = (input: ReviewSubmissionInput) => {
    const newReview: Testimonial = {
      id: `rev-user-${Date.now()}`,
      author: input.author.toUpperCase(),
      location: input.location,
      rating: input.rating,
      quote: input.quote,
      productName: input.productName,
      category: input.category,
      brewMethod: input.brewMethod,
      tastingNotes: input.tastingNotes,
      verifiedBuyer: true,
      date: 'Just now',
    };

    setTestimonials((prev) => [newReview, ...prev]);
  };

  return (
    <section className={`space-y-8 py-4 ${className}`}>
      {/* Header Area */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-xs font-bold text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
            <MessageSquareQuote className="w-4 h-4 text-amber-700" />
            Verified Customer Impressions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 mt-1">
            {title}
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-xl">
            {subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Share Your Cupping Notes
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {FILTER_PILLS.map((pill) => (
          <button
            key={pill.value}
            type="button"
            onClick={() => setActiveFilter(pill.value)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeFilter === pill.value
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:border-amber-700'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      {filteredList.length === 0 ? (
        <div className="py-16 text-center text-stone-400 text-sm bg-stone-50 rounded-3xl border border-stone-200/60">
          No reviews found in this category yet. Be the first to share your extraction!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((t) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              onProductClick={onProductSelect}
            />
          ))}
        </div>
      )}

      {/* Trust & Stats Banner */}
      {showStats && <TestimonialStats />}

      {/* Review Submission Modal */}
      <ReviewSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </section>
  );
};

