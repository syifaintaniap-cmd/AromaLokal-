import React from 'react';
import { BrandLeafIcon } from './BrandLeafIcon';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#27372B] text-white pt-16 pb-12 border-t border-[#3B4D3F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-12 border-b border-white/10">
          {/* Left Brand info matching design */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2">
              <BrandLeafIcon size={26} variant="white" />
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                AromaLokal by Moneera
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A8BDB0] font-normal">
              Local Scent, Greater Story.
            </p>
          </div>

          {/* Center Links matching design */}
          <div className="md:col-span-7 flex flex-wrap items-center justify-start md:justify-end gap-6 sm:gap-8 text-sm font-medium text-[#C2D4C8]">
            <button
              onClick={() => scrollTo('root')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollTo('cari-parfum-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cari Parfum
            </button>
            <button
              onClick={() => scrollTo('tentang-kami-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Tentang Kami
            </button>
            <button
              onClick={() => scrollTo('faq-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollTo('order-section')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pemesanan
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8DA092]">
          {/* Copyright matching desktop design */}
          <p>© 2026 AromaLokal. All Right Reserved.</p>

          {/* Social Icons matching design (Instagram, TikTok, YouTube, X) */}
          <div className="flex items-center gap-4 text-lg">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram AromaLokal"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok AromaLokal"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.5 6.3 6.3 0 0 0 1.86-4.49V8.84a8.21 8.21 0 0 0 4.91 1.62v-3.4a4.85 4.85 0 0 1-1-.37z" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube AromaLokal"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X Twitter AromaLokal"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
