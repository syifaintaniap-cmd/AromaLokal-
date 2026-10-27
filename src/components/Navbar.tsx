import React, { useState } from 'react';
import { Search, User, Menu, X, Heart, Sparkles } from 'lucide-react';
import { BrandLeafIcon } from './BrandLeafIcon';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenOrderForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  favoritesCount,
  onOpenFavorites,
  onOpenOrderForm,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F2]/95 backdrop-blur-md border-b border-[#E5E9E0] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-[#243328] group transition-transform active:scale-95"
        >
          <div className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 flex items-center justify-center">
            <BrandLeafIcon size={26} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#243328]">
              AromaLokal
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#5E6D62] -mt-1 font-sans">
              by Moneera
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#48574C]">
          <button
            onClick={() => handleNavClick('faq-section')}
            className="hover:text-[#243328] transition-colors py-1 relative group"
          >
            FAQ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#35473A] transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleNavClick('cari-parfum-section')}
            className="hover:text-[#243328] transition-colors py-1 relative group"
          >
            Cari Parfume
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#35473A] transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleNavClick('tentang-kami-section')}
            className="hover:text-[#243328] transition-colors py-1 relative group"
          >
            Tentang kami
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#35473A] transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => handleNavClick('order-section')}
            className="text-[#243328] hover:text-[#18231B] font-semibold py-1 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C0A062]" />
            Pesan Online
          </button>
        </nav>

        {/* Search Input & Action Icons */}
        <div className="flex items-center gap-3">
          {/* Quick Search Bar matching the design pill with border */}
          <div className="relative hidden sm:block w-52 md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari Parfume...."
              aria-label="Cari Parfum"
              className="w-full bg-[#FCFCFA] text-[#243328] placeholder-[#7E8B81] text-sm rounded-full pl-4 pr-10 py-2 border border-[#35473A]/40 focus:outline-none focus:border-[#35473A] focus:ring-1 focus:ring-[#35473A] transition-all font-serif"
            />
            <button
              onClick={() => handleNavClick('cari-parfum-section')}
              aria-label="Submit search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#35473A] hover:text-[#1F2C22] p-1 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            aria-label="Parfum Favorit Tersimpan"
            className="relative p-2 text-[#35473A] hover:bg-[#EAEFE6] rounded-full transition-colors"
            title="Daftar Favorit"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C0A062] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Profile / Account Icon matching design */}
          <button
            onClick={onOpenOrderForm}
            aria-label="Menu Akun & Pesanan"
            className="p-2 border border-[#35473A]/40 rounded-full text-[#35473A] hover:bg-[#EAEFE6] transition-colors"
            title="Formulir Pemesanan"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 text-[#35473A] hover:bg-[#EAEFE6] rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F4F6F1] border-b border-[#D8E0D4] px-4 pt-3 pb-5 space-y-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari Parfume...."
              className="w-full bg-white text-[#243328] placeholder-[#7E8B81] text-sm rounded-full pl-4 pr-10 py-2.5 border border-[#35473A]/40 focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#35473A] absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <div className="flex flex-col space-y-2 pt-2 text-[#35473A] font-medium text-sm">
            <button
              onClick={() => handleNavClick('cari-parfum-section')}
              className="text-left px-3 py-2 rounded-lg hover:bg-[#E3EAE0]"
            >
              Cari Parfume
            </button>
            <button
              onClick={() => handleNavClick('faq-section')}
              className="text-left px-3 py-2 rounded-lg hover:bg-[#E3EAE0]"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick('tentang-kami-section')}
              className="text-left px-3 py-2 rounded-lg hover:bg-[#E3EAE0]"
            >
              Tentang kami
            </button>
            <button
              onClick={() => handleNavClick('order-section')}
              className="text-left px-3 py-2 rounded-lg bg-[#35473A] text-white font-medium"
            >
              Formulir Pemesanan & Kontak
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
