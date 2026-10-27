import React from 'react';
import { Perfume } from '../types/perfume';
import { X, ExternalLink, ShoppingBag, Clock, ShieldCheck, Heart } from 'lucide-react';

interface ProductDetailModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onOrderDirect: (perfume: Perfume) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onShowToast: (msg: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  perfume,
  onClose,
  onOrderDirect,
  isFavorite,
  onToggleFavorite,
  onShowToast,
}) => {
  if (!perfume) return null;

  const handleMarketplaceClick = (platform: string, url?: string) => {
    onShowToast(`Membuka toko resmi ${perfume.brand} di ${platform}...`);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container matching Frame 29 & Frame 37 aesthetic */}
      <div className="relative w-full max-w-4xl bg-[#EFF3EB] border-2 border-[#CCD8C8] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup Rincian Produk"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/80 border border-[#CCD8C8] text-[#35473A] hover:bg-white flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title matching Frame 29 / Frame 37 */}
        <div className="mb-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#243328] tracking-tight">
            Rincian Produk
          </h2>
        </div>

        {/* 3 Column Grid Layout matching the images */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image & Basic Info */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <div className="relative aspect-square w-full bg-white rounded-2xl p-4 border border-[#CCD8C8] shadow-sm flex items-center justify-center overflow-hidden">
              <img
                src={perfume.imageUrl}
                alt={`${perfume.brand} ${perfume.name}`}
                className="w-full h-full object-contain"
              />
              <button
                onClick={(e) => onToggleFavorite(perfume.id, e)}
                aria-label="Simpan ke favorit"
                className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                  isFavorite
                    ? 'bg-rose-50 text-rose-500'
                    : 'bg-black/5 text-[#556658] hover:bg-black/10'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-500' : ''}`} />
              </button>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-[#243328] leading-tight">
                {perfume.brand}
              </h3>
              <p className="text-sm font-semibold text-[#35473A] mt-0.5">
                {perfume.name}
              </p>
              <p className="text-xs text-[#5E6F62] mt-0.5">
                {perfume.characterNotes}
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-[#243328]">
                  {perfume.priceFormatted}
                </span>
                <span className="text-xs text-[#6E7F72]">/ Botol Resmi</span>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="bg-white/80 rounded-xl p-3 border border-[#CCD8C8] text-xs text-[#4F6052] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#718274]">Ketahanan:</span>
                <span className="font-semibold text-[#243328]">{perfume.longevityHours}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#718274]">Konsentrasi:</span>
                <span className="font-semibold text-[#243328]">{perfume.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#718274]">Karakter Aroma:</span>
                <span className="font-semibold text-[#243328]">{perfume.aromaCategory}</span>
              </div>
            </div>
          </div>

          {/* Middle Column: Detailed Description matching the frames */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#243328]">
              Deskripsi Produk
            </h4>

            <ul className="space-y-3 text-xs sm:text-sm text-[#465749] leading-relaxed list-disc list-outside pl-4">
              {perfume.descriptionBulletPoints.map((point, index) => (
                <li key={index} className="pl-1">
                  {point}
                </li>
              ))}
            </ul>

            {/* Olfactory pyramid notes */}
            {(perfume.topNotes || perfume.middleNotes || perfume.baseNotes) && (
              <div className="mt-6 pt-4 border-t border-[#CCD8C8] space-y-2 text-xs">
                <span className="font-serif font-bold text-sm text-[#243328] block">
                  Piramida Aroma (Notes)
                </span>
                {perfume.topNotes && (
                  <div>
                    <span className="font-semibold text-[#35473A]">Top: </span>
                    <span className="text-[#556658]">{perfume.topNotes}</span>
                  </div>
                )}
                {perfume.middleNotes && (
                  <div>
                    <span className="font-semibold text-[#35473A]">Heart: </span>
                    <span className="text-[#556658]">{perfume.middleNotes}</span>
                  </div>
                )}
                {perfume.baseNotes && (
                  <div>
                    <span className="font-semibold text-[#35473A]">Base: </span>
                    <span className="text-[#556658]">{perfume.baseNotes}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: 4 Marketplace Buttons exactly matching Frame 29 & Frame 37 */}
          <div className="md:col-span-3 flex flex-col space-y-3 pt-2">
            <button
              type="button"
              onClick={() => handleMarketplaceClick('Shopee', perfume.shopeeUrl)}
              className="w-full bg-[#35473A] hover:bg-[#253428] text-white py-3 px-4 rounded-xl font-serif text-sm font-semibold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Lihat Produk di Shopee</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" />
            </button>

            <button
              type="button"
              onClick={() => handleMarketplaceClick('Lazada', perfume.lazadaUrl)}
              className="w-full bg-[#35473A] hover:bg-[#253428] text-white py-3 px-4 rounded-xl font-serif text-sm font-semibold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Lihat Produk di Lazada</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" />
            </button>

            <button
              type="button"
              onClick={() => handleMarketplaceClick('Tokopedia', perfume.tokopediaUrl)}
              className="w-full bg-[#35473A] hover:bg-[#253428] text-white py-3 px-4 rounded-xl font-serif text-sm font-semibold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Lihat Produk di Tokopedia</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" />
            </button>

            <button
              type="button"
              onClick={() => handleMarketplaceClick('TikTok Shop', perfume.tiktokUrl)}
              className="w-full bg-[#35473A] hover:bg-[#253428] text-white py-3 px-4 rounded-xl font-serif text-sm font-semibold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Lihat Produk di Tiktok shop</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100" />
            </button>

            {/* Direct Order Button on AromaLokal */}
            <div className="pt-3 border-t border-[#CCD8C8]">
              <button
                type="button"
                onClick={() => onOrderDirect(perfume)}
                className="w-full bg-[#C0A062] hover:bg-[#AF8F51] text-white py-3 px-4 rounded-xl font-medium text-xs tracking-wide uppercase transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Pesan Langsung di Web</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
