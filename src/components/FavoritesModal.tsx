import React from 'react';
import { Perfume } from '../types/perfume';
import { X, Trash2, ShoppingBag } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  perfumes: Perfume[];
  onSelectPerfume: (perfume: Perfume) => void;
  onRemoveFavorite: (id: string) => void;
  onOrderDirect: (perfume: Perfume) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  perfumes,
  onSelectPerfume,
  onRemoveFavorite,
  onOrderDirect,
}) => {
  if (!isOpen) return null;

  const favList = perfumes.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#FAFBF9] border border-[#CCD8C8] rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#CCD8C8]">
          <div className="flex items-center gap-2">
            <span className="text-xl">❤️</span>
            <h3 className="font-serif text-xl font-bold text-[#243328]">
              Parfum Favorit Saya ({favList.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup daftar favorit"
            className="p-1.5 rounded-full hover:bg-[#EAEFE6] text-[#35473A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {favList.length === 0 ? (
            <div className="text-center py-12 text-[#657667]">
              <p className="font-serif text-lg font-bold text-[#243328]">
                Belum Ada Parfum Favorit
              </p>
              <p className="text-xs mt-1">
                Klik ikon hati pada parfum untuk menyimpannya ke daftar ini.
              </p>
            </div>
          ) : (
            favList.map((perfume) => (
              <div
                key={perfume.id}
                className="bg-white rounded-xl p-3 border border-[#CCD8C8] flex items-center justify-between gap-3 shadow-2xs hover:border-[#35473A] transition-all"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  onClick={() => {
                    onClose();
                    onSelectPerfume(perfume);
                  }}
                >
                  <img
                    src={perfume.imageUrl}
                    alt={perfume.name}
                    className="w-14 h-14 object-contain rounded-lg bg-[#F8F7F2] p-1 border border-[#E5ECE0]"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif text-sm font-bold text-[#243328] truncate">
                      {perfume.brand}
                    </h4>
                    <p className="text-xs text-[#526356] truncate">
                      {perfume.name}
                    </p>
                    <span className="text-xs font-bold text-[#35473A]">
                      {perfume.priceFormatted}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onClose();
                      onOrderDirect(perfume);
                    }}
                    title="Pesan Parfum Ini"
                    className="p-2 bg-[#35473A] text-white hover:bg-[#253428] rounded-lg transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveFavorite(perfume.id)}
                    title="Hapus dari Favorit"
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
