import React, { useState, useEffect, useMemo } from 'react';
import { PERFUMES_DATA } from './data/perfumes';
import { Perfume, FilterCriteria, AromaCharacter, ActivityNeed } from './types/perfume';
import { filterPerfumes } from './utils/filter';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { FeaturedSection } from './components/FeaturedSection';
import { FilterSection } from './components/FilterSection';
import { Testimonials } from './components/Testimonials';
import { AromaGuide } from './components/AromaGuide';
import { FaqSection } from './components/FaqSection';
import { AboutSection } from './components/AboutSection';
import { OrderFormSection } from './components/OrderFormSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FavoritesModal } from './components/FavoritesModal';
import { Toast } from './components/Toast';

export default function App() {
  // State for search query and filtering
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({
    priceRange: 'Semua Harga',
    aroma: 'Semua Aroma',
    activity: 'Semua Kebutuhan',
    searchQuery: '',
  });

  // Modal and Interactive States
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [orderPerfumeId, setOrderPerfumeId] = useState<string>('scarlett-dreamy');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aromalokal_favs');
      return saved ? JSON.parse(saved) : ['scarlett-dreamy', 'hmns-orgms'];
    } catch {
      return ['scarlett-dreamy', 'hmns-orgms'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aromalokal_favs', JSON.stringify(favorites));
    } catch {
      // ignore in iframe
    }
  }, [favorites]);

  // Toast handler with timer
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Filtered perfumes calculation
  const filteredPerfumes = useMemo(() => {
    return filterPerfumes(PERFUMES_DATA, filterCriteria);
  }, [filterCriteria]);

  // Toggle favorite
  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
      showToast('Dihapus dari daftar favorit');
    } else {
      setFavorites([...favorites, id]);
      showToast('Disimpan ke daftar favorit ❤️');
    }
  };

  // Direct order flow from modal
  const handleOrderDirect = (perfume: Perfume) => {
    setSelectedPerfume(null);
    setOrderPerfumeId(perfume.id);
    const element = document.getElementById('order-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`${perfume.name} dipilih untuk pemesanan.`);
  };

  // Scroll to filter section
  const handleStartSearch = () => {
    const el = document.getElementById('cari-parfum-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to about section
  const handleLearnMore = () => {
    const el = document.getElementById('tentang-kami-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick aroma filter
  const handleSelectAromaFilter = (aroma: AromaCharacter) => {
    setFilterCriteria((prev) => ({ ...prev, aroma }));
    handleStartSearch();
    showToast(`Filter aroma diubah ke: ${aroma}`);
  };

  // Quick activity filter
  const handleSelectActivityFilter = (activity: ActivityNeed) => {
    setFilterCriteria((prev) => ({ ...prev, activity }));
    handleStartSearch();
    showToast(`Filter aktivitas diubah ke: ${activity}`);
  };



  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#243328] flex flex-col font-sans selection:bg-[#35473A] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar
        searchQuery={filterCriteria.searchQuery}
        onSearchChange={(q) =>
          setFilterCriteria((prev) => ({ ...prev, searchQuery: q }))
        }
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenOrderForm={() => {
          const el = document.getElementById('order-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections matching Desktop_2b937708.png */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onStartSearch={handleStartSearch}
          onLearnMore={handleLearnMore}
        />

        {/* 3. Value Proposition: Kenapa AromaLokal? */}
        <WhyUs />

        {/* 4. Rekomendasi Parfum Lokal (4 Featured Cards) */}
        <FeaturedSection
          perfumes={PERFUMES_DATA}
          onSelectPerfume={(perfume) => setSelectedPerfume(perfume)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* 5. Cari Parfum yang Cocok untukmu (Frame 32 Filters & Frame 34/35 Results) */}
        <FilterSection
          perfumes={PERFUMES_DATA}
          filteredPerfumes={filteredPerfumes}
          criteria={filterCriteria}
          onFilterChange={setFilterCriteria}
          onSelectPerfume={(perfume) => setSelectedPerfume(perfume)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* 6. Apa Kata Mereka? (Testimonials) */}
        <Testimonials />

        {/* 8. Kenali Jenis Aroma, Aktivitas & Tips */}
        <AromaGuide
          onSelectAromaFilter={handleSelectAromaFilter}
          onSelectActivityFilter={handleSelectActivityFilter}
        />

        {/* 9. Pertanyaan yang Sering Diajukan (FAQ Accordion) */}
        <FaqSection onStartSearch={handleStartSearch} />

        {/* 10. Tentang AromaLokal by Moneera */}
        <AboutSection onStartSearch={handleStartSearch} />

        {/* 11. Formulir Kontak / Pembelian (Contact & Order Form) */}
        <OrderFormSection
          perfumes={PERFUMES_DATA}
          selectedPerfumeId={orderPerfumeId}
          onShowToast={showToast}
        />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* 13. Rincian Produk Modal (Frame 29 & Frame 37) */}
      <ProductDetailModal
        perfume={selectedPerfume}
        onClose={() => setSelectedPerfume(null)}
        onOrderDirect={handleOrderDirect}
        isFavorite={selectedPerfume ? favorites.includes(selectedPerfume.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onShowToast={showToast}
      />

      {/* 14. Favorites List Drawer / Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        perfumes={PERFUMES_DATA}
        onSelectPerfume={(p) => setSelectedPerfume(p)}
        onRemoveFavorite={(id) => {
          setFavorites(favorites.filter((favId) => favId !== id));
          showToast('Dihapus dari favorit');
        }}
        onOrderDirect={handleOrderDirect}
      />

      {/* 15. Toast Feedback Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
