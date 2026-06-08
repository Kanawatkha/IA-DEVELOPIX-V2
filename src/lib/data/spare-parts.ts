/**
 * @file src/lib/data/spare-parts.ts
 * @description Spare parts catalog data for the Store page.
 *              Extracted from store/page.tsx to keep the page file clean.
 */

// ============================================================
// TYPES
// ============================================================

export interface SparePart {
  id: number;
  name: string;
  cat: 'MOTORS' | 'SENSORS' | 'GEARS' | 'WHEELS';
  price: string;
  isComingSoon: boolean;
  image: string;
}

// ============================================================
// DATA
// ============================================================

const PART_IMG = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_1-AR03811lQghk0N7O.png';

export const SPARE_PARTS: SparePart[] = [
  { id: 1,  name: 'MOTOR V1',      cat: 'MOTORS',  price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 2,  name: 'MOTOR V2',      cat: 'MOTORS',  price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 3,  name: 'MOTOR V3',      cat: 'MOTORS',  price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 4,  name: 'MOTOR PRO',     cat: 'MOTORS',  price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 5,  name: 'SENSOR IR',     cat: 'SENSORS', price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 6,  name: 'SENSOR TOF',    cat: 'SENSORS', price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 7,  name: 'SENSOR ULTRA',  cat: 'SENSORS', price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 8,  name: 'SENSOR COLOR',  cat: 'SENSORS', price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 9,  name: 'GEAR SET A',    cat: 'GEARS',   price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 10, name: 'GEAR SET B',    cat: 'GEARS',   price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 11, name: 'GEAR PRO',      cat: 'GEARS',   price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 12, name: 'GEAR LITE',     cat: 'GEARS',   price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 13, name: 'WHEELS V1',     cat: 'WHEELS',  price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 14, name: 'WHEELS V2',     cat: 'WHEELS',  price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 15, name: 'WHEELS DRIFT',  cat: 'WHEELS',  price: 'TBA', isComingSoon: true, image: PART_IMG },
  { id: 16, name: 'WHEELS GRIP',   cat: 'WHEELS',  price: 'TBA', isComingSoon: true, image: PART_IMG },
];

export const PART_FILTERS = ['ALL', 'MOTORS', 'SENSORS', 'GEARS', 'WHEELS'] as const;

export type PartFilterValue = (typeof PART_FILTERS)[number];
