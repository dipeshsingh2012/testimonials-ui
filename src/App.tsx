import React, { useState } from 'react';
import { TestimonialsFragment } from './components/TestimonialsFragment';

export function App() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900">
      {/* Dev Harness Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center font-serif font-bold text-sm">
              HJ
            </div>
            <div>
              <h1 className="text-sm font-bold text-stone-900 leading-tight">
                testimonials-ui
              </h1>
              <p className="text-[10px] text-stone-500 font-mono">
                Standalone Dev Preview (Port 5181) • Module Federation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
              Federation Remote Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedProduct && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
            <span>
              <strong>Host Navigation Simulated:</strong> Navigating to product: <code>{selectedProduct}</code>
            </span>
            <button
              onClick={() => setSelectedProduct(null)}
              className="text-amber-800 font-bold hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <TestimonialsFragment
          onProductSelect={(id) => setSelectedProduct(id || 'unknown')}
        />
      </main>
    </div>
  );
}

export default App;

