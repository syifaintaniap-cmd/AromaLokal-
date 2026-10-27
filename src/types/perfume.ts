export type AromaCharacter =
  | 'Semua Aroma'
  | 'Fruity'
  | 'Fresh/citrus'
  | 'Musk'
  | 'Gourmand'
  | 'Woody';

export type ActivityNeed =
  | 'Semua Kebutuhan'
  | 'Sekolah'
  | 'Kerja'
  | 'Olahraga'
  | 'Daily'
  | 'Hangout'
  | 'Kencan'
  | 'Outdoor'
  | 'Formal';

export type PriceRange =
  | 'Semua Harga'
  | 'Rp50.000 – Rp100.000'
  | 'Rp100.000 – Rp250.000'
  | 'Rp250.000 – Rp500.000'
  | 'Di atas Rp500.000';

export interface Perfume {
  id: string;
  brand: string;
  name: string;
  type: string; // e.g. "Extrait de Parfum", "Eau de Parfum", "Eau De Toilette"
  characterNotes: string; // e.g. "Tea - Floral Musk"
  aromaCategory: 'Fruity' | 'Fresh/citrus' | 'Musk' | 'Gourmand' | 'Woody';
  activities: ('Sekolah' | 'Kerja' | 'Olahraga' | 'Daily' | 'Hangout' | 'Kencan' | 'Outdoor' | 'Formal')[];
  price: number; // numeric in IDR
  priceFormatted: string; // e.g. "Rp98.000"
  badge?: 'Terlaris' | 'Best Value' | 'Premium' | 'Favorite' | 'Pilihan Editor';
  imageUrl: string;
  descriptionBulletPoints: string[];
  topNotes?: string;
  middleNotes?: string;
  baseNotes?: string;
  longevityHours: string; // e.g. "8-12 Jam"
  projection: string; // e.g. "2 Meter"
  gender: 'Unisex' | 'Pria' | 'Wanita';
  rating: number;
  reviewCount: number;
  shopeeUrl?: string;
  tokopediaUrl?: string;
  lazadaUrl?: string;
  tiktokUrl?: string;
}

export interface FilterCriteria {
  priceRange: PriceRange;
  aroma: AromaCharacter;
  activity: ActivityNeed;
  searchQuery: string;
}

export interface OrderItem {
  perfumeId: string;
  perfumeName: string;
  brand: string;
  price: number;
  quantity: number;
}

export interface OrderFormSubmission {
  fullName: string;
  email: string;
  phone: string;
  perfumeId: string;
  quantity: number;
  notes: string;
}
