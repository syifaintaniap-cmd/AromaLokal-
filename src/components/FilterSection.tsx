import React, { useState, useRef, useEffect } from 'react';
import {
  Perfume,
  PriceRange,
  AromaCharacter,
  ActivityNeed,
  FilterCriteria,
} from '../types/perfume';
import { ChevronDown, Search, X, Heart, ArrowUpRight, RotateCcw } from 'lucide-react';

interface FilterSectionProps {
  perfumes: Perfume[];
  filteredPerfumes: Perfume[];
  criteria: FilterCriteria;
  onFilterChange: (criteria: FilterCriteria) => void;
  onSelectPerfume: (perfume: Perfume) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

const PRICE_OPTIONS: PriceRange[] = [
  'Semua Harga',
  'Rp50.000 – Rp100.000',
  'Rp100.000 – Rp250.000',
  'Rp250.000 – Rp500.000',
  'Di atas Rp500.000',
];

const AROMA_OPTIONS: AromaCharacter[] = [
  'Semua Aroma',
  'Fruity',
  'Fresh/citrus',
  'Musk',
  'Gourmand',
  'Woody',
];

const ACTIVITY_OPTIONS: ActivityNeed[] = [
  'Semua Kebutuhan',
  'Sekolah',
  'Kerja',
  'Olahraga',
  'Daily',
  'Hangout',
  'Kencan',
  'Outdoor',
  'Formal',
];

export const FilterSection: React.FC<FilterSectionProps> = ({
  perfumes,
  filteredPerfumes,
  criteria,
  onFilterChange,
  onSelectPerfume,
  favorites,
  onToggleFavorite,
}) => {
  const [openDropdown, setOpenDropdown] = useState<'price' | 'aroma' | 'activity' | null>(null);
  const [showAllResults, setShowAllResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPrice = (p: PriceRange) => {
    onFilterChange({ ...criteria, priceRange: p });
    setOpenDropdown(null);
  };

  const handleSelectAroma = (a: AromaCharacter) => {
    onFilterChange({ ...criteria, aroma: a });
    setOpenDropdown(null);
  };

  const handleSelectActivity = (act: ActivityNeed) => {
    onFilterChange({ ...criteria, activity: act });
    setOpenDropdown(null);
  };

  const handleResetFilters = () => {
    onFilterChange({
      priceRange: 'Semua Harga',
      aroma: 'Semua Aroma',
      activity: 'Semua Kebutuhan',
      searchQuery: '',
    });
    setOpenDropdown(null);
  };

  const hasActiveFilters =
    criteria.priceRange !== 'Semua Harga' ||
    criteria.aroma !== 'Semua Aroma' ||
    criteria.activity !== 'Semua Kebutuhan' ||
    criteria.searchQuery.trim() !== '';

  const displayedPerfumes = showAllResults
    ? filteredPerfumes
    : filteredPerfumes.slice(0, 8);

  return (
    <section id="cari-parfum-section" className="py-12 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 text-left">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#243328] tracking-tight">
            Cari Parfum yang Cocok untukmu
          </h2>
          <p className="text-sm sm:text-base text-[#556658] mt-1 font-normal">
            Gunakan filter untuk menemukan parfum lokal yang sesuai.
          </p>
        </div>

        {/* Filter Bar (matching Frame 32) */}
        <div ref={containerRef} className="relative z-30 mb-8">
          <div className="bg-[#FAF9F5] border border-[#35473A]/60 rounded-3xl p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              {/* Dropdown 1: Harga */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(openDropdown === 'price' ? null : 'price')
                  }
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all text-sm font-serif ${
                    openDropdown === 'price' || criteria.priceRange !== 'Semua Harga'
                      ? 'border-[#35473A] bg-[#EFF3EC] text-[#243328] font-bold'
                      : 'border-[#35473A]/40 bg-white text-[#243328] hover:border-[#35473A]'
                  }`}
                >
                  <span className="truncate">
                    {criteria.priceRange === 'Semua Harga'
                      ? 'Harga'
                      : criteria.priceRange}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform duration-200 text-[#35473A] ${
                      openDropdown === 'price' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu (matching Frame 32 exact styling) */}
                {openDropdown === 'price' && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#35473A]/50 rounded-xl shadow-xl z-50 p-1.5 space-y-1">
                    {PRICE_OPTIONS.map((opt) => {
                      const isSelected = criteria.priceRange === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectPrice(opt)}
                          className={`w-full text-center px-3 py-2 text-sm rounded-lg transition-colors font-serif ${
                            isSelected
                              ? 'bg-[#D7E2D5] text-[#243328] font-bold border border-[#A7BFA3]'
                              : 'text-[#243328] hover:bg-[#F2F5F0]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Dropdown 2: Karakter Aroma */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(openDropdown === 'aroma' ? null : 'aroma')
                  }
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all text-sm font-serif ${
                    openDropdown === 'aroma' || criteria.aroma !== 'Semua Aroma'
                      ? 'border-[#35473A] bg-[#EFF3EC] text-[#243328] font-bold'
                      : 'border-[#35473A]/40 bg-white text-[#243328] hover:border-[#35473A]'
                  }`}
                >
                  <span className="truncate">
                    {criteria.aroma === 'Semua Aroma'
                      ? 'Karakter Aroma'
                      : criteria.aroma}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform duration-200 text-[#35473A] ${
                      openDropdown === 'aroma' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu matching Frame 32 */}
                {openDropdown === 'aroma' && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#35473A]/50 rounded-xl shadow-xl z-50 p-1.5 space-y-1">
                    {AROMA_OPTIONS.map((opt) => {
                      const isSelected = criteria.aroma === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectAroma(opt)}
                          className={`w-full text-center px-3 py-2 text-sm rounded-lg transition-colors font-serif ${
                            isSelected
                              ? 'bg-[#D7E2D5] text-[#243328] font-bold border border-[#A7BFA3]'
                              : 'text-[#243328] hover:bg-[#F2F5F0]'
                          }`}
                        >
                          {opt === 'Fruity' ? 'Fruty' : opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Dropdown 3: Kebutuhan */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(openDropdown === 'activity' ? null : 'activity')
                  }
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all text-sm font-serif ${
                    openDropdown === 'activity' || criteria.activity !== 'Semua Kebutuhan'
                      ? 'border-[#35473A] bg-[#EFF3EC] text-[#243328] font-bold'
                      : 'border-[#35473A]/40 bg-white text-[#243328] hover:border-[#35473A]'
                  }`}
                >
                  <span className="truncate">
                    {criteria.activity === 'Semua Kebutuhan'
                      ? 'Kebutuhan'
                      : criteria.activity}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform duration-200 text-[#35473A] ${
                      openDropdown === 'activity' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu matching Frame 32 */}
                {openDropdown === 'activity' && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#35473A]/50 rounded-xl shadow-xl z-50 p-1.5 space-y-1 max-h-72 overflow-y-auto">
                    {ACTIVITY_OPTIONS.map((opt) => {
                      const isSelected = criteria.activity === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectActivity(opt)}
                          className={`w-full text-center px-3 py-2 text-sm rounded-lg transition-colors font-serif ${
                            isSelected
                              ? 'bg-[#D7E2D5] text-[#243328] font-bold border border-[#A7BFA3]'
                              : 'text-[#243328] hover:bg-[#F2F5F0]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons: Search button & Reset */}
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  aria-label="Reset semua filter"
                  className="px-3 py-2.5 rounded-xl border border-[#CCD8C8] text-[#556658] hover:bg-[#EAEFE6] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Reset Filter"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              )}

              {/* Magnifying Glass Button (matching Frame 32 dark green button) */}
              <button
                type="button"
                onClick={() => setOpenDropdown(null)}
                aria-label="Cari parfum dengan filter saat ini"
                className="bg-[#35473A] hover:bg-[#27372B] text-white px-5 py-2.5 rounded-xl flex items-center justify-center transition-transform active:scale-95 shadow-xs"
              >
                <Search className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#637567] font-medium">Filter aktif:</span>
              {criteria.searchQuery && (
                <span className="inline-flex items-center gap-1 bg-[#EAEFE6] text-[#243328] text-xs px-2.5 py-1 rounded-full border border-[#CBD7C6]">
                  Pencarian: "{criteria.searchQuery}"
                  <button
                    onClick={() => onFilterChange({ ...criteria, searchQuery: '' })}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {criteria.priceRange !== 'Semua Harga' && (
                <span className="inline-flex items-center gap-1 bg-[#EAEFE6] text-[#243328] text-xs px-2.5 py-1 rounded-full border border-[#CBD7C6]">
                  {criteria.priceRange}
                  <button
                    onClick={() => onFilterChange({ ...criteria, priceRange: 'Semua Harga' })}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {criteria.aroma !== 'Semua Aroma' && (
                <span className="inline-flex items-center gap-1 bg-[#EAEFE6] text-[#243328] text-xs px-2.5 py-1 rounded-full border border-[#CBD7C6]">
                  Aroma: {criteria.aroma}
                  <button
                    onClick={() => onFilterChange({ ...criteria, aroma: 'Semua Aroma' })}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {criteria.activity !== 'Semua Kebutuhan' && (
                <span className="inline-flex items-center gap-1 bg-[#EAEFE6] text-[#243328] text-xs px-2.5 py-1 rounded-full border border-[#CBD7C6]">
                  Kebutuhan: {criteria.activity}
                  <button
                    onClick={() => onFilterChange({ ...criteria, activity: 'Semua Kebutuhan' })}
                    className="hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Header: "Hasil Pencarianmu" (matching Frame 34 & Frame 35) */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-3">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#243328] tracking-tight">
              Hasil Pencarianmu
            </h3>
            <span className="text-xs sm:text-sm text-[#66776A] font-medium">
              ({filteredPerfumes.length} produk ditemukan)
            </span>
          </div>

          {filteredPerfumes.length > 4 && (
            <button
              onClick={() => setShowAllResults(!showAllResults)}
              className="text-xs sm:text-sm font-semibold text-[#35473A] hover:text-[#1F2C22] inline-flex items-center gap-1 group cursor-pointer"
            >
              <span>{showAllResults ? 'Tampilkan Lebih Sedikit' : 'Lihat Lainnya'}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          )}
        </div>

        {/* Results Grid (matching cards in Frame 34 & Frame 35) */}
        {filteredPerfumes.length === 0 ? (
          <div className="bg-[#FAF9F5] border border-dashed border-[#CCD8C8] rounded-3xl p-12 text-center">
            <div className="text-4xl mb-3">🍃</div>
            <h4 className="font-serif text-xl font-bold text-[#243328]">
              Tidak Ada Parfum yang Cocok dengan Filter Ini
            </h4>
            <p className="text-sm text-[#5B6C5F] mt-1 max-w-md mx-auto">
              Coba sesuaikan pilihan harga, aroma, atau kebutuhanmu untuk menemukan parfum lokal lainnya.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-2 bg-[#35473A] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#263529] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedPerfumes.map((perfume) => {
              const isFav = favorites.includes(perfume.id);

              return (
                <div
                  key={perfume.id}
                  onClick={() => onSelectPerfume(perfume)}
                  className="group relative bg-[#35473A] text-white rounded-2xl p-4 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border border-[#445849]"
                >
                  {/* Top White Square Container for Product Image */}
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

                    {/* View Details Hover Cue */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#35473A] text-white p-1 rounded-full shadow-md">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Card Content exactly matching Frame 34 & Frame 35 */}
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                        {perfume.brand}
                      </h4>
                      <p className="text-sm font-medium text-white/95 mt-0.5 line-clamp-1">
                        {perfume.name}
                      </p>
                      <p className="text-xs text-[#A8BDB0] mt-1 line-clamp-1">
                        {perfume.characterNotes}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-white">
                        {perfume.priceFormatted}
                      </span>

                      {perfume.badge && (
                        <span className="bg-white text-[#243328] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {perfume.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
