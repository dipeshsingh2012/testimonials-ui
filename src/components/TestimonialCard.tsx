import React from 'react';
import { Star, CheckCircle2, Coffee, Sparkles } from 'lucide-react';
import { Testimonial } from '../types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onProductClick?: (productId?: string) => void;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  onProductClick,
}) => {
  return (
    <div className="h-full bg-[#FFFDF7] border border-[#eee7db] rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(217,119,6,0.06)] transition-all duration-300 group">
      <div className="space-y-4">
        {/* Top bar: Stars & Verified Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating
                    ? 'fill-amber-500 text-amber-500'
                    : 'fill-stone-200 text-stone-200'
                }`}
              />
            ))}
          </div>

          {testimonial.verifiedBuyer && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold tracking-wide">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Verified Cupper
            </span>
          )}
        </div>

        {/* Review Quote */}
        <blockquote className="text-stone-800 text-sm leading-relaxed font-normal">
          "{testimonial.quote}"
        </blockquote>

        {/* Tasting Notes Tags */}
        {testimonial.tastingNotes && testimonial.tastingNotes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {testimonial.tastingNotes.map((note) => (
              <span
                key={note}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50/80 text-amber-900 border border-amber-200/60 text-[10px] font-semibold"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                {note}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Product reference, brew method & author */}
      <div className="pt-5 mt-4 border-t border-stone-100 space-y-3">
        {/* Product / Lot Info */}
        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => onProductClick && onProductClick(testimonial.productId)}
            className="text-left font-semibold text-stone-900 hover:text-amber-800 transition-colors flex items-center gap-1.5 group-hover:underline"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="truncate max-w-[200px]">{testimonial.productName}</span>
          </button>
          {testimonial.brewMethod && (
            <span className="text-[10px] text-stone-600 font-medium shrink-0 bg-stone-100 px-2 py-0.5 rounded-full">
              {testimonial.brewMethod}
            </span>
          )}
        </div>

        {/* Author info */}
        <div className="flex items-center justify-between text-xs text-stone-600 pt-1">
          <div>
            <span className="font-bold text-stone-900 tracking-wider uppercase font-sans">
              {testimonial.author}
            </span>
            {testimonial.location && (
              <span className="text-[11px] text-stone-600 ml-1.5">
                • {testimonial.location}
              </span>
            )}
          </div>
          <span className="text-[10px] text-stone-500">{testimonial.date}</span>
        </div>
      </div>
    </div>
  );
};

