import React from 'react';
import { ArrowRight, Heart, Search, Info } from 'lucide-react';

interface AboutSectionProps {
  onStartSearch: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onStartSearch }) => {
  return (
    <section id="tentang-kami-section" className="py-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF3EB] border border-[#CCD8C8] rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xs overflow-hidden relative text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#243328] leading-tight tracking-tight">
              Tentang AromaLokal by Moneera
            </h2>

            <p className="text-sm sm:text-base text-[#526356] leading-relaxed max-w-2xl mx-auto">
              AromaLokal by Moneera hadir untuk membantumu menemukan parfum lokal yang sesuai dengan karakter, preferensi aroma, aktivitas, dan anggaranmu. Kami percaya bahwa setiap racikan wewangian anak bangsa memiliki kualitas kelas dunia dan cerita unik yang layak dibanggakan.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#CCD8C8] py-6 border-y border-[#CCD8C8]/80 gap-4 sm:gap-0">
              <div className="flex flex-col items-center text-center px-4 py-2 sm:py-0">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#35473A] mb-2.5 shadow-2xs">
                  <Heart className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#243328]">
                  Dukung Brand Parfum Lokal
                </h4>
                <p className="text-xs text-[#607163] mt-1">
                  Mendorong karya orisinal artisan wewangian Indonesia
                </p>
              </div>

              <div className="flex flex-col items-center text-center px-4 py-2 sm:py-0">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#35473A] mb-2.5 shadow-2xs">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#243328]">
                  Mudah Mencari Parfum yang Tepat
                </h4>
                <p className="text-xs text-[#607163] mt-1">
                  Filter cerdas sesuai aroma, anggaran, dan aktivitas
                </p>
              </div>

              <div className="flex flex-col items-center text-center px-4 py-2 sm:py-0">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#35473A] mb-2.5 shadow-2xs">
                  <Info className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-[#243328]">
                  Informasi Produk yang Lengkap
                </h4>
                <p className="text-xs text-[#607163] mt-1">
                  Detail notes, ketahanan, serta tautan toko resmi
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onStartSearch}
                className="inline-flex items-center gap-2 bg-[#35473A] hover:bg-[#253428] text-white px-8 py-3.5 rounded-full font-medium text-base transition-all duration-200 group shadow-xs cursor-pointer active:scale-95"
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
