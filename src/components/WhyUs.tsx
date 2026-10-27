import React from 'react';
import { Sparkles, Tag, Info } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF3EB] border border-[#CCD8C8] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#243328] tracking-tight">
              Kenapa AromaLokal?
            </h2>
            <p className="text-sm sm:text-base text-[#5A6C5E] mt-1 font-normal">
              Karena setiap orang punya aroma cerita yang berbeda.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#CCD8C8]/80">
            {/* Pillar 1 */}
            <div className="flex flex-col items-center text-center p-4 sm:p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/70 border border-[#CBD8C7] flex items-center justify-center text-[#243328] shadow-xs">
                <Sparkles className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#243328]">
                Rekomendasi Personal
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6C5F] max-w-xs leading-relaxed">
                Sesuai dengan preferensi aroma dan aktivitasmu.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col items-center text-center p-4 sm:p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/70 border border-[#CBD8C7] flex items-center justify-center text-[#243328] shadow-xs">
                <Tag className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#243328]">
                Pilihan Sesuai Anggaran
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6C5F] max-w-xs leading-relaxed">
                Dari harga terjangkau hingga premium.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col items-center text-center p-4 sm:p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/70 border border-[#CBD8C7] flex items-center justify-center text-[#243328] shadow-xs">
                <Info className="w-6 h-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#243328]">
                Informasi Lengkap
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6C5F] max-w-xs leading-relaxed">
                Deskripsi aroma, ketahanan, takaran dan tautan pembelian.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
