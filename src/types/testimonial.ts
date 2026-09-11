export type CoffeeCategory = 'all' | 'single_origin' | 'producer_series' | 'blend' | 'equipment';

export interface Testimonial {
  id: string;
  author: string;
  location?: string;
  rating: number; // 1-5
  quote: string;
  productName: string;
  productId?: string;
  category: CoffeeCategory;
  brewMethod?: string;
  tastingNotes?: string[];
  verifiedBuyer: boolean;
  date: string;
}

export interface ReviewSubmissionInput {
  author: string;
  location?: string;
  rating: number;
  quote: string;
  productName: string;
  category: CoffeeCategory;
  brewMethod?: string;
  tastingNotes?: string[];
}

