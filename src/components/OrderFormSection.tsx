import React, { useState, useEffect } from 'react';
import { Perfume, OrderFormSubmission } from '../types/perfume';
import { formatRupiah } from '../utils/filter';
import { Send, CheckCircle2, MessageSquare, ShoppingBag, Sparkles, Copy, Check } from 'lucide-react';

interface OrderFormSectionProps {
  perfumes: Perfume[];
  selectedPerfumeId?: string;
  onShowToast: (msg: string) => void;
}

export const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  perfumes,
  selectedPerfumeId,
  onShowToast,
}) => {
  const [formData, setFormData] = useState<OrderFormSubmission>({
    fullName: '',
    email: '',
    phone: '',
    perfumeId: selectedPerfumeId || perfumes[0]?.id || '',
    quantity: 1,
    notes: '',
  });

  const [submittedOrder, setSubmittedOrder] = useState<{
    orderId: string;
    details: OrderFormSubmission;
    perfume: Perfume;
    totalPrice: number;
    timestamp: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  // Sync if selectedPerfumeId changed externally
  useEffect(() => {
    if (selectedPerfumeId) {
      setFormData((prev) => ({ ...prev, perfumeId: selectedPerfumeId }));
    }
  }, [selectedPerfumeId]);

  const currentPerfume =
    perfumes.find((p) => p.id === formData.perfumeId) || perfumes[0];
  const totalPrice = currentPerfume ? currentPerfume.price * formData.quantity : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      onShowToast('Mohon lengkapi Nama, Email, dan Nomor Telepon.');
      return;
    }

    const orderId = `AL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSubmission = {
      orderId,
      details: { ...formData },
      perfume: currentPerfume,
      totalPrice,
      timestamp: new Date().toLocaleString('id-ID'),
    };

    setSubmittedOrder(newSubmission);
    onShowToast(`Pesanan #${orderId} berhasil dibuat!`);
  };

  const handleCopyOrder = () => {
    if (!submittedOrder) return;
    const text = `*PESANAN AROMALOKAL BY MONEERA*\nID: ${submittedOrder.orderId}\nNama: ${submittedOrder.details.fullName}\nNo HP: ${submittedOrder.details.phone}\nProduk: ${submittedOrder.perfume.brand} - ${submittedOrder.perfume.name}\nJumlah: ${submittedOrder.details.quantity} botol\nTotal: ${formatRupiah(submittedOrder.totalPrice)}\nCatatan: ${submittedOrder.details.notes || '-'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    onShowToast('Ringkasan pesanan disalin ke clipboard!');
  };

  const handleWhatsAppRedirect = () => {
    if (!submittedOrder) return;
    const message = encodeURIComponent(
      `Halo Tim AromaLokal by Moneera, saya ingin konfirmasi pesanan:\n\n*ID Pesanan:* ${submittedOrder.orderId}\n*Nama:* ${submittedOrder.details.fullName}\n*Parfum:* ${submittedOrder.perfume.brand} - ${submittedOrder.perfume.name}\n*Jumlah:* ${submittedOrder.details.quantity} botol\n*Total:* ${formatRupiah(submittedOrder.totalPrice)}\n*Catatan:* ${submittedOrder.details.notes || '-'}`
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  };

  return (
    <section id="order-section" className="py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFF3EB] border border-[#CCD8C8] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#CBD7C6] text-xs font-semibold text-[#35473A] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C0A062]" />
                <span>Layanan Kurasi & Pemesanan Resmi</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#243328] tracking-tight">
                Formulir Kontak & Pemesanan Parfum
              </h2>
              <p className="text-sm sm:text-base text-[#556658] mt-2 max-w-xl mx-auto">
                Pesan langsung koleksi parfum kurasi kami atau ajukan pertanyaan khusus seputar aroma yang cocok untukmu.
              </p>
            </div>

            {submittedOrder ? (
              /* Success State / Invoice Preview */
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CCD8C8] shadow-md animate-in fade-in zoom-in-95 duration-300">
                <div className="flex flex-col items-center text-center pb-6 border-b border-[#E1E7DC]">
                  <div className="w-14 h-14 rounded-full bg-[#E5ECE0] text-[#35473A] flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#243328]">
                    Pesanan Berhasil Dicatat!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6D5E] mt-1">
                    Nomor Referensi:{' '}
                    <span className="font-mono font-bold text-[#243328]">
                      {submittedOrder.orderId}
                    </span>
                  </p>
                </div>

                {/* Order Summary Details */}
                <div className="py-6 space-y-3 text-sm text-[#3E5042]">
                  <div className="flex justify-between py-1 border-b border-[#EFF3EB]">
                    <span className="text-[#6C7D6F]">Pemesan:</span>
                    <span className="font-semibold text-[#243328]">
                      {submittedOrder.details.fullName} ({submittedOrder.details.phone})
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EFF3EB]">
                    <span className="text-[#6C7D6F]">Email:</span>
                    <span className="font-semibold text-[#243328]">
                      {submittedOrder.details.email}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EFF3EB]">
                    <span className="text-[#6C7D6F]">Parfum Pilihan:</span>
                    <span className="font-semibold text-[#243328]">
                      {submittedOrder.perfume.brand} - {submittedOrder.perfume.name}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#EFF3EB]">
                    <span className="text-[#6C7D6F]">Kuantitas:</span>
                    <span className="font-semibold text-[#243328]">
                      {submittedOrder.details.quantity} Botol
                    </span>
                  </div>
                  {submittedOrder.details.notes && (
                    <div className="flex justify-between py-1 border-b border-[#EFF3EB]">
                      <span className="text-[#6C7D6F]">Catatan:</span>
                      <span className="font-medium text-[#243328] max-w-xs text-right">
                        {submittedOrder.details.notes}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 text-base">
                    <span className="font-bold text-[#243328]">Total Perkiraan:</span>
                    <span className="font-serif text-xl font-bold text-[#243328]">
                      {formatRupiah(submittedOrder.totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="flex-1 bg-[#25D366] hover:bg-[#20BA59] text-white py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Konfirmasi via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyOrder}
                    className="border border-[#CCD8C8] hover:bg-[#F2F5F0] text-[#243328] py-3.5 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Tersalin!' : 'Salin Pesanan'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedOrder(null)}
                    className="border border-[#CCD8C8] hover:bg-[#F2F5F0] text-[#556658] py-3.5 px-4 rounded-xl font-medium text-sm transition-all cursor-pointer"
                  >
                    Buat Pesanan Baru
                  </button>
                </div>
              </div>
            ) : (
              /* Order Form matching design rules */
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#CCD8C8] shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nama Lengkap */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold text-[#243328] uppercase tracking-wider mb-1.5"
                    >
                      Nama Lengkap *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Contoh: Alya Putri"
                      className="w-full bg-[#FAFBF9] border border-[#CCD8C8] rounded-xl px-4 py-3 text-sm text-[#243328] placeholder-[#87968B] focus:outline-none focus:border-[#35473A] focus:ring-1 focus:ring-[#35473A]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-[#243328] uppercase tracking-wider mb-1.5"
                    >
                      Alamat Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full bg-[#FAFBF9] border border-[#CCD8C8] rounded-xl px-4 py-3 text-sm text-[#243328] placeholder-[#87968B] focus:outline-none focus:border-[#35473A] focus:ring-1 focus:ring-[#35473A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Nomor WhatsApp / Telepon */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold text-[#243328] uppercase tracking-wider mb-1.5"
                    >
                      Nomor WhatsApp / Telepon *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="081234567890"
                      className="w-full bg-[#FAFBF9] border border-[#CCD8C8] rounded-xl px-4 py-3 text-sm text-[#243328] placeholder-[#87968B] focus:outline-none focus:border-[#35473A] focus:ring-1 focus:ring-[#35473A]"
                    />
                  </div>

                  {/* Pilihan Parfum */}
                  <div>
                    <label
                      htmlFor="perfumeSelect"
                      className="block text-xs font-bold text-[#243328] uppercase tracking-wider mb-1.5"
                    >
                      Pilihan Parfum *
                    </label>
                    <select
                      id="perfumeSelect"
                      value={formData.perfumeId}
                      onChange={(e) => setFormData({ ...formData, perfumeId: e.target.value })}
                      className="w-full bg-[#FAFBF9] border border-[#CCD8C8] rounded-xl px-4 py-3 text-sm text-[#243328] focus:outline-none focus:border-[#35473A] focus:ring-1 focus:ring-[#35473A]"
                    >
                      {perfumes.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.brand} - {p.name} ({p.priceFormatted})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Jumlah & Total Live Preview */}
                <div className="bg-[#EFF3EB] rounded-2xl p-4 border border-[#CCD8C8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#35473A] uppercase tracking-wider">
                      Jumlah Botol:
                    </span>
                    <div className="flex items-center bg-white rounded-lg border border-[#CCD8C8]">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            quantity: Math.max(1, formData.quantity - 1),
                          })
                        }
                        className="px-3 py-1 text-sm font-bold text-[#35473A] hover:bg-[#F2F5F0] rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-bold text-[#243328] min-w-8 text-center">
                        {formData.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            quantity: formData.quantity + 1,
                          })
                        }
                        className="px-3 py-1 text-sm font-bold text-[#35473A] hover:bg-[#F2F5F0] rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-xs text-[#627365] block">Estimasi Total:</span>
                    <span className="font-serif text-xl font-bold text-[#243328]">
                      {formatRupiah(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Catatan / Catatan Pemesanan */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-xs font-bold text-[#243328] uppercase tracking-wider mb-1.5"
                  >
                    Catatan Pemesanan / Pertanyaan Aroma
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Contoh: Tolong sertakan tester aroma woody, atau request bungkus kado untuk ulang tahun..."
                    className="w-full bg-[#FAFBF9] border border-[#CCD8C8] rounded-xl px-4 py-3 text-sm text-[#243328] placeholder-[#87968B] focus:outline-none focus:border-[#35473A] focus:ring-1 focus:ring-[#35473A]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#35473A] hover:bg-[#253428] text-white py-4 rounded-full font-serif text-base font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span>Kirim Pesanan Sekarang</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
