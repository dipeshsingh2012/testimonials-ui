import React from 'react';
import { Star, ShieldCheck, Flame, Award } from 'lucide-react';

interface TestimonialStatsProps {
  averageRating?: number;
  totalReviews?: number;
  className?: string;
}

export const TestimonialStats: React.FC<TestimonialStatsProps> = ({
  averageRating = 4.95,
  totalReviews = 1840,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-white rounded-3xl border border-stone-200/80 shadow-xs ${className}`}>
      {/* 1. Overall Score */}
      <div className="flex items-center gap-4 border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 pr-0 md:pr-4">
        <div className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
          {averageRating.toFixed(1)}
        </div>
        <div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <p className="text-[11px] text-stone-600 font-semibold mt-0.5">
            Based on {totalReviews.toLocaleString()} cupping reviews
          </p>
        </div>
      </div>

      {/* 2. Direct Trade Pillar */}
      <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 pr-0 md:pr-4">
        <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-stone-900">100% Direct-Trade</h4>
          <p className="text-[11px] text-stone-600">Zero middlemen, premium farmgate prices</p>
        </div>
      </div>

      {/* 3. Roast-to-Order Pillar */}
      <div className="flex items-center gap-3 border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 pr-0 md:pr-4">
        <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
          <Flame className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-stone-900">Roast-to-Order</h4>
          <p className="text-[11px] text-stone-600">Dispatched within 48h of roast</p>
        </div>
      </div>

      {/* 4. Spatial Verified Gear Pillar */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
          <Award className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-stone-900">CounterCheck™ Verified</h4>
          <p className="text-[11px] text-stone-600">Cabinet clearance guaranteed</p>
        </div>
      </div>
    </div>
  );
};

