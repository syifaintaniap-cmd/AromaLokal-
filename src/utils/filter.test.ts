import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesPriceRange, matchesAroma, matchesActivity, filterPerfumes, formatRupiah } from './filter';
import { Perfume } from '../types/perfume';

const samplePerfumes: Perfume[] = [
  {
    id: 'scarlett-dreamy',
    brand: 'Scarlett Whitening',
    name: 'Dreamy au de Parfum',
    type: 'Eau de Parfum',
    characterNotes: 'White floral - gourmand',
    aromaCategory: 'Gourmand',
    activities: ['Kerja', 'Kencan', 'Daily'],
    price: 65000,
    priceFormatted: 'Rp65.000',
    badge: 'Terlaris',
    imageUrl: '/assets/aistudio/Frame_29_579244e7.png',
    descriptionBulletPoints: ['Menciptakan kesan maskulin dan elegan'],
    longevityHours: '6-8 Jam',
    projection: '1.5 Meter',
    gender: 'Wanita',
    rating: 4.9,
    reviewCount: 1420,
  },
  {
    id: 'kahf-silverwood',
    brand: 'Kahf',
    name: 'Silverwood Extrait de Parfum',
    type: 'Extrait de Parfum',
    characterNotes: 'Citrus-Floral-Fresh-Fruity-Woody',
    aromaCategory: 'Woody',
    activities: ['Kerja', 'Formal'],
    price: 323230,
    priceFormatted: 'Rp323.230',
    badge: 'Pilihan Editor',
    imageUrl: '/assets/aistudio/Frame_37_74a8b669.png',
    descriptionBulletPoints: ['Menciptakan kesan maskulin, modern, dan elegan'],
    longevityHours: '10-14 Jam',
    projection: '2 Meter',
    gender: 'Pria',
    rating: 4.95,
    reviewCount: 890,
  },
  {
    id: 'heura-morning',
    brand: 'Heura',
    name: 'Your Morning Ritual',
    type: 'Extrait de Parfum',
    characterNotes: 'Tea - Floral Musk',
    aromaCategory: 'Musk',
    activities: ['Sekolah', 'Daily', 'Hangout'],
    price: 98000,
    priceFormatted: 'Rp98.000',
    badge: 'Best Value',
    imageUrl: '/assets/aistudio/Frame_34_e4b0b95d.png',
    descriptionBulletPoints: ['Menciptakan kesan segar, clean, dan menenangkan'],
    longevityHours: '8-10 Jam',
    projection: '1.5 Meter',
    gender: 'Unisex',
    rating: 4.88,
    reviewCount: 650,
  },
];

test('matchesPriceRange filters by budget brackets', () => {
  assert.equal(matchesPriceRange(65000, 'Rp50.000 – Rp100.000'), true);
  assert.equal(matchesPriceRange(323230, 'Rp50.000 – Rp100.000'), false);
  assert.equal(matchesPriceRange(323230, 'Rp250.000 – Rp500.000'), true);
  assert.equal(matchesPriceRange(600000, 'Di atas Rp500.000'), true);
  assert.equal(matchesPriceRange(65000, 'Semua Harga'), true);
});

test('matchesAroma identifies perfume category and character', () => {
  assert.equal(matchesAroma(samplePerfumes[0], 'Gourmand'), true);
  assert.equal(matchesAroma(samplePerfumes[1], 'Woody'), true);
  assert.equal(matchesAroma(samplePerfumes[2], 'Musk'), true);
  assert.equal(matchesAroma(samplePerfumes[0], 'Woody'), false);
  assert.equal(matchesAroma(samplePerfumes[0], 'Semua Aroma'), true);
});

test('matchesActivity matches occasion', () => {
  assert.equal(matchesActivity(samplePerfumes[0], 'Kerja'), true);
  assert.equal(matchesActivity(samplePerfumes[1], 'Formal'), true);
  assert.equal(matchesActivity(samplePerfumes[2], 'Sekolah'), true);
  assert.equal(matchesActivity(samplePerfumes[1], 'Sekolah'), false);
  assert.equal(matchesActivity(samplePerfumes[0], 'Semua Kebutuhan'), true);
});

test('filterPerfumes handles full search query and criteria', () => {
  const resultKahf = filterPerfumes(samplePerfumes, {
    priceRange: 'Semua Harga',
    aroma: 'Semua Aroma',
    activity: 'Semua Kebutuhan',
    searchQuery: 'Kahf',
  });
  assert.equal(resultKahf.length, 1);
  assert.equal(resultKahf[0].brand, 'Kahf');

  const resultSekolahBudget = filterPerfumes(samplePerfumes, {
    priceRange: 'Rp50.000 – Rp100.000',
    aroma: 'Semua Aroma',
    activity: 'Sekolah',
    searchQuery: '',
  });
  assert.equal(resultSekolahBudget.length, 1);
  assert.equal(resultSekolahBudget[0].name, 'Your Morning Ritual');
});

test('formatRupiah formats numbers cleanly', () => {
  const formatted = formatRupiah(98000);
  assert.ok(formatted.includes('98.000') || formatted.includes('98,000'));
});
