import { Perfume, FilterCriteria, PriceRange } from '../types/perfume';

export function matchesPriceRange(price: number, range: PriceRange): boolean {
  switch (range) {
    case 'Rp50.000 – Rp100.000':
      return price >= 50000 && price <= 100000;
    case 'Rp100.000 – Rp250.000':
      return price > 100000 && price <= 250000;
    case 'Rp250.000 – Rp500.000':
      return price > 250000 && price <= 500000;
    case 'Di atas Rp500.000':
      return price > 500000;
    case 'Semua Harga':
    default:
      return true;
  }
}

export function matchesAroma(perfume: Perfume, aroma: string): boolean {
  if (!aroma || aroma === 'Semua Aroma') return true;

  const normalizedAroma = aroma.toLowerCase().trim();
  const perfCategory = perfume.aromaCategory.toLowerCase();
  const notes = perfume.characterNotes.toLowerCase();

  if (normalizedAroma.includes('fruit') || normalizedAroma === 'fruty') {
    return perfCategory === 'fruity' || notes.includes('fruit');
  }
  if (normalizedAroma.includes('fresh') || normalizedAroma.includes('citrus')) {
    return (
      perfCategory === 'fresh/citrus' ||
      notes.includes('citrus') ||
      notes.includes('fresh') ||
      notes.includes('aquatic') ||
      notes.includes('tea')
    );
  }
  if (normalizedAroma.includes('musk')) {
    return perfCategory === 'musk' || notes.includes('musk');
  }
  if (normalizedAroma.includes('gourmand')) {
    return perfCategory === 'gourmand' || notes.includes('gourmand') || notes.includes('vanilla') || notes.includes('sweet');
  }
  if (normalizedAroma.includes('woody')) {
    return perfCategory === 'woody' || notes.includes('wood') || notes.includes('oud');
  }

  return perfCategory.includes(normalizedAroma) || notes.includes(normalizedAroma);
}

export function matchesActivity(perfume: Perfume, activity: string): boolean {
  if (!activity || activity === 'Semua Kebutuhan') return true;
  return perfume.activities.some(
    (act) => act.toLowerCase() === activity.toLowerCase()
  );
}

export function filterPerfumes(perfumes: Perfume[], criteria: FilterCriteria): Perfume[] {
  return perfumes.filter((item) => {
    // Search query check
    if (criteria.searchQuery.trim()) {
      const q = criteria.searchQuery.toLowerCase().trim();
      const combined = `${item.brand} ${item.name} ${item.type} ${item.characterNotes} ${item.descriptionBulletPoints.join(' ')}`.toLowerCase();
      if (!combined.includes(q)) {
        return false;
      }
    }

    // Price range check
    if (!matchesPriceRange(item.price, criteria.priceRange)) {
      return false;
    }

    // Aroma check
    if (!matchesAroma(item, criteria.aroma)) {
      return false;
    }

    // Activity check
    if (!matchesActivity(item, criteria.activity)) {
      return false;
    }

    return true;
  });
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace(/\s/g, '');
}
