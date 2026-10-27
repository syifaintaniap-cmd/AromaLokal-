import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HighlightBannerProps {
  onExploreLongLasting: () => void;
}

export const HighlightBanner: React.FC<HighlightBannerProps> = ({ onExploreLongLasting }) => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF3EB] border border-[#CCD8C8] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column Text matching Frame 38 */}
            <div className="md:col-span-8 lg:col-span-9 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-[#CBD8C7] text-xs font-semibold text-[#35473A]">
                <Sparkles className="w-3.5 h-3.5 text-[#C0A062]" />
                <span>Rekomendasi Ketahanan Juara</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#243328] leading-snug tracking-tight">
                Untuk produk Parfum lokal tahan lama, lirik produk dari Normal Estate atau Amhtra
              </h2>

              <p className="text-sm sm:text-base text-[#4F6052] leading-relaxed max-w-3xl">
                Anda yang mencari parfume lokal dengan ketahanan aroma yang baik? Produk dari Normal Estate atau Amhtra bisa menjadi pilihan menarik untuk dilirik. Keduanya dikenal menghadirkan karakter wangi yang kuat dan tahan lama sehingga cocok digunakan untuk aktivitas seharian tanpa perlu sering re-apply.
              </p>

              <div className="pt-2">
                <button
                  onClick={onExploreLongLasting}
                  className="inline-flex items-center gap-2 bg-[#35473A] hover:bg-[#253428] text-white px-6 py-3 rounded-full text-sm font-medium transition-all group shadow-xs cursor-pointer"
                >
                  <span>Eksplor Pilihan Tahan Lama</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column Product Visual */}
            <div className="md:col-span-4 lg:col-span-3 flex justify-center items-center">
              <div className="relative w-48 sm:w-56 h-48 sm:h-56 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#DCE4D8] rounded-full blur-xl opacity-60" />
                <img
                  src="/assets/aistudio/Frame_38_312691c0.png"
                  alt="Moneera / Amhtra High Longevity Perfume"
                  className="relative max-h-full max-w-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
