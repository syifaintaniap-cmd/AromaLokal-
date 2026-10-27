import React, { useState } from 'react';
import { FAQ_DATA } from '../data/perfumes';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { BrandLeafIcon } from './BrandLeafIcon';

interface FaqSectionProps {
  onStartSearch: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onStartSearch }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First item open by default

  const toggleAccordion = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <section id="faq-section" className="py-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-left">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#243328] tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-sm sm:text-base text-[#556658] mt-1 font-normal">
            Temukan jawaban untuk pertanyaan umum seputar parfum lokal dan penggunaan website.
          </p>
        </div>

        {/* Two Column Layout matching Desktop_2b937708.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Accordion List */}
          <div className="lg:col-span-8 space-y-3">
            {FAQ_DATA.map((item, index) => {
              const isOpen = openIndexes.includes(index);

              return (
                <div
                  key={index}
                  className="bg-white border border-[#CCD8C8] rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#F9FAF7] transition-colors cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#243328] pr-4">
                      {item.question}
                    </span>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#EFF3EB] text-[#35473A] flex items-center justify-center transition-transform">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4E6052] leading-relaxed border-t border-[#EAEFE6] bg-[#FAFBF9]">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: "Masih bingung..." Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#EFF3EB] border border-[#CCD8C8] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs text-left">
              <div>
                <div className="mb-4">
                  <BrandLeafIcon size={34} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#243328] leading-tight mb-2">
                  Masih bingung mencari parfum yang cocok?
                </h3>
                <p className="text-xs sm:text-sm text-[#556658] leading-relaxed mb-6">
                  Kami siap membantumu menemukan aroma terbaik berdasarkan preferensi pribadi, budget, dan aktivitas harianmu.
                </p>
              </div>

              <button
                type="button"
                onClick={onStartSearch}
                className="inline-flex items-center justify-center gap-2 bg-[#35473A] hover:bg-[#253428] text-white px-6 py-3.5 rounded-full font-medium text-sm transition-all duration-200 group shadow-xs cursor-pointer w-full"
              >
                <span>Mulai Cari Parfum</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
