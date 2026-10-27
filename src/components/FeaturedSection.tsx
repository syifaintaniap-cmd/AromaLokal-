import React from 'react';
import { Perfume } from '../types/perfume';
import { Heart, ArrowUpRight } from 'lucide-react';

interface FeaturedSectionProps {
  perfumes: Perfume[];
  onSelectPerfume: (perfume: Perfume) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  perfumes,
  onSelectPerfume,
  favorites,
  onToggleFavorite,
}) => {
  // Take the 4 primary featured perfumes
  const featured = perfumes.filter((p) => p.badge && p.badge !== 'Pilihan Editor').slice(0, 4);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 text-left">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#243328] tracking-tight">
            Rekomendasi Parfum Lokal
          </h2>
          <p className="text-sm sm:text-base text-[#556658] mt-1 font-normal">
            Pilihan terbaik untuk berbagai kebutuhanmu.
          </p>
        </div>

        {/* 4 Featured Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((perfume) => {
            const isFav = favorites.includes(perfume.id);

            return (
              <div
                key={perfume.id}
                onClick={() => onSelectPerfume(perfume)}
                className="group relative bg-[#35473A] text-white rounded-2xl p-4 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border border-[#445849]"
              >
                {/* Top Image Box */}
                <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden p-3 flex items-center justify-center">
                  <img
                    src={perfume.imageUrl}
                    alt={`${perfume.brand} ${perfume.name}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => onToggleFavorite(perfume.id, e)}
                    aria-label={`Simpan ${perfume.name} ke favorit`}
                    className={`absolute top-2 right-2 p-1.5 rounded-full transition-colors ${
                      isFav
                        ? 'bg-rose-50 text-rose-500'
                        : 'bg-black/10 text-neutral-600 hover:bg-black/20'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current text-rose-500' : ''}`} />
                  </button>

                  {/* Click detail cue */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#35473A] text-white p-1 rounded-full">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Details matching desktop design */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                      {perfume.brand}
                    </h3>
                    <p className="text-sm font-medium text-white/90 mt-0.5">
                      {perfume.name}
                    </p>
                    <p className="text-xs text-[#A8BDB0] mt-1 capitalize">
                      {perfume.characterNotes}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-white">
                      {perfume.priceFormatted}
                    </span>

                    {/* Badge */}
                    {perfume.badge && (
                      <span className="bg-white text-[#243328] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                        {perfume.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
