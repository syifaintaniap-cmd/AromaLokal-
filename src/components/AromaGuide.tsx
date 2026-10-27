import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Dumbbell,
  Compass,
  Smile,
  Heart,
  Sparkles,
  Sun,
  ChevronDown,
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { AROMA_TYPES_INFO, ACTIVITIES_RECOMMENDATION } from '../data/perfumes';
import { AromaCharacter, ActivityNeed } from '../types/perfume';

interface AromaGuideProps {
  onSelectAromaFilter: (aroma: AromaCharacter) => void;
  onSelectActivityFilter: (activity: ActivityNeed) => void;
}

export const AromaGuide: React.FC<AromaGuideProps> = ({
  onSelectAromaFilter,
  onSelectActivityFilter,
}) => {
  const [activeTipIndex, setActiveTipIndex] = useState<number | null>(0);

  const tips = [
    {
      title: 'Sesuaikan dengan Aroma',
      content:
        'Pilihlah aroma yang selaras dengan kepribadian dan suhu tubuhmu. Notes awal (top notes) bertahan 15-30 menit, sedangkan aroma inti (middle notes) dan aroma dasar (base notes) yang akan menempel sepanjang hari. Semprotkan di pergelangan tangan dan tunggu 20 menit sebelum memutuskan.',
    },
    {
      title: 'Perhatikan Konsentrasi (EDT vs EDP vs Extrait)',
      content:
        'Extrait de Parfum mengandung 25-40% minyak murni untuk ketahanan 10-14 jam. Eau de Parfum (EDP) mengandung 15-20% untuk 6-8 jam. Eau de Toilette (EDT) mengandung 5-15% sangat cocok untuk kesegaran harian dan setelah berolahraga.',
    },
    {
      title: 'Titik Semprot Tahan Lama',
      content:
        'Aplikasikan pada pulse points seperti pergelangan tangan, leher, di belakang telinga, dan siku dalam. Gunakan pelembab kulit (lotion tanpa aroma) sebelumnya karena kulit yang lembab menahan molekul wewangian lebih lama.',
    },
  ];

  const getActivityIcon = (title: string) => {
    switch (title) {
      case 'Kuliah / Sekolah':
        return <GraduationCap className="w-5 h-5 text-[#35473A]" />;
      case 'Kerja / Kantor':
        return <Briefcase className="w-5 h-5 text-[#35473A]" />;
      case 'Olahraga':
        return <Dumbbell className="w-5 h-5 text-[#35473A]" />;
      case 'Outdoor / Traveling':
        return <Compass className="w-5 h-5 text-[#35473A]" />;
      case 'Hangout':
        return <Smile className="w-5 h-5 text-[#35473A]" />;
      case 'Kencan':
        return <Heart className="w-5 h-5 text-[#35473A]" />;
      case 'Acara Formal':
        return <Sparkles className="w-5 h-5 text-[#35473A]" />;
      case 'Sehari-hari':
      default:
        return <Sun className="w-5 h-5 text-[#35473A]" />;
    }
  };

  const getAromaEmoji = (name: string) => {
    switch (name) {
      case 'Fruity':
        return '🍓';
      case 'Fresh / Citrus':
        return '🍋';
      case 'Woody':
        return '🪵';
      case 'Musk':
        return '☁️';
      case 'Gourmand':
        return '🍫';
      default:
        return '✨';
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#243328] tracking-tight">
            Kenali Jenis Aroma
          </h2>
          <p className="text-sm sm:text-base text-[#556658] mt-1 font-normal">
            Temukan karakter aroma yang sesuai dengan dirimu.
          </p>
        </div>

        {/* Two Column Layout matching Desktop_2b937708.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 5 Aroma Categories */}
          <div className="lg:col-span-5 space-y-3.5">
            {AROMA_TYPES_INFO.map((item) => (
              <div
                key={item.name}
                onClick={() => onSelectAromaFilter(item.tag as AromaCharacter)}
                className="group bg-white rounded-2xl p-4 border border-[#CCD8C8]/80 hover:border-[#35473A] transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex items-center gap-4"
              >
                {/* Round Icon with Emoji / Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EFF3EB] to-[#DCE4D8] border border-[#CCD8C8] flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span>{getAromaEmoji(item.name)}</span>
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-lg font-bold text-[#243328] group-hover:text-[#19261D] transition-colors">
                      {item.name}
                    </h4>
                    <span className="text-xs text-[#556658] font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                      Filter <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                  <p className="text-xs text-[#526356] leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Activities Recommendation & Tips */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Rekomendasi Berdasarkan Aktivitas */}
            <div className="bg-[#EFF3EB] border border-[#CCD8C8] rounded-3xl p-6 sm:p-8">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#243328] mb-1">
                Rekomendasi Parfum Berdasarkan Aktivitas
              </h3>
              <p className="text-xs sm:text-sm text-[#556658] mb-6">
                Setiap aktivitas membutuhkan aroma yang berbeda. Temukan rekomendasi parfum yang pas untuk setiap momen pentingmu.
              </p>

              {/* 8 Activities Grid matching design */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ACTIVITIES_RECOMMENDATION.map((act) => (
                  <button
                    key={act.title}
                    type="button"
                    onClick={() => onSelectActivityFilter(act.filterTag as ActivityNeed)}
                    className="bg-white/80 hover:bg-white border border-[#CBD7C6] hover:border-[#35473A] rounded-xl p-3 flex flex-col items-center text-center transition-all duration-200 group cursor-pointer shadow-xs"
                  >
                    <div className="mb-2 p-1.5 rounded-full bg-[#EFF3EB] group-hover:bg-[#E0E7DC] transition-colors">
                      {getActivityIcon(act.title)}
                    </div>
                    <span className="font-serif text-xs sm:text-sm font-bold text-[#243328] group-hover:text-[#1B291F]">
                      {act.title}
                    </span>
                    <span className="text-[11px] text-[#637567] mt-0.5">
                      {act.scentNotes}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tips Memilih Parfum */}
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#243328] mb-1">
                Tips Memilih Parfum
              </h3>
              <p className="text-xs sm:text-sm text-[#556658] mb-4">
                Agar parfum lebih cocok dan tahan lama, perhatikan hal berikut:
              </p>

              {/* Interactive Accordion for Tips */}
              <div className="space-y-2.5">
                {tips.map((tip, index) => {
                  const isOpen = activeTipIndex === index;

                  return (
                    <div
                      key={tip.title}
                      className="bg-white border border-[#CCD8C8] rounded-2xl overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveTipIndex(isOpen ? null : index)}
                        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-[#F9FAF7] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#35473A]" />
                          <span className="font-serif text-base font-bold text-[#243328]">
                            {tip.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-[#35473A] transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#4E6052] leading-relaxed border-t border-[#EAEFE6] bg-[#FAFBF9]">
                          {tip.content}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
