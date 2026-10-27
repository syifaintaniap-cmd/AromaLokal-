import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  onStartSearch: () => void;
  onLearnMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartSearch, onLearnMore }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs matching Desktop design */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] leading-[1.18] font-bold text-[#243328] tracking-tight">
              Tentukan Parfum Lokal <br className="hidden sm:inline" />
              Sesuai Karakter dan <br className="hidden sm:inline" />
              Aktivitasmu
            </h1>

            <p className="text-base sm:text-lg text-[#556559] max-w-xl font-normal leading-relaxed">
              Rekomendasi parfum lokal berdasarkan aroma, harga dan kebutuhanmu dalam satu tempat.
            </p>

            {/* CTA Buttons matching design */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartSearch}
                className="inline-flex items-center justify-center gap-2 bg-[#35473A] hover:bg-[#28372C] text-white px-7 py-3.5 rounded-full font-medium text-base shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 group cursor-pointer"
              >
                <span>Mulai Cari Parfum</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onLearnMore}
                className="inline-flex items-center justify-center bg-transparent hover:bg-[#EAEFE6]/80 text-[#243328] border border-[#35473A]/60 px-7 py-3.5 rounded-full font-medium text-base transition-all duration-200 cursor-pointer"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div className="pt-6 border-t border-[#E1E6DC] grid grid-cols-3 gap-4 text-xs text-[#526356]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#35473A]" />
                <span className="font-medium">100% Produk Asli</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#35473A]" />
                <span className="font-medium">Tahan 8-14 Jam</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C0A062]" />
                <span className="font-medium">Kurasi Terlengkap</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Moneera Perfumes & Leaves matching Desktop_2b937708.png exactly */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="w-full max-w-[520px]">
              <img
                src="/assets/aistudio/hero_bottles.png"
                alt="Moneera Eau de Parfum Collection"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 drop-shadow-sm select-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
