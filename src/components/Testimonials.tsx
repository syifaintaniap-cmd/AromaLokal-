import React from 'react';
import { TESTIMONIALS_DATA } from '../data/perfumes';
import { Star, User } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF3EB] border border-[#CCD8C8] rounded-3xl p-6 sm:p-10 shadow-xs">
          {/* Header */}
          <div className="mb-8 text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#243328] tracking-tight">
              Apa Kata Mereka?
            </h2>
            <p className="text-sm sm:text-base text-[#556658] mt-1 font-normal">
              Ribuan pengguna sudah menemukan parfum lokal favoritnya bersama kami.
            </p>
          </div>

          {/* 4 Testimonial Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-[#CCD8C8]/70 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#E2E9DE] text-[#35473A] flex items-center justify-center font-bold text-sm overflow-hidden border border-[#CBD7C6]">
                      <User className="w-5 h-5 text-[#5A6C5F]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#243328] leading-tight">
                        {t.name}
                      </h4>
                      <p className="text-xs text-[#718274] font-medium">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 mb-3 text-[#D4AF37]">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-xs sm:text-sm text-[#4E6052] leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
