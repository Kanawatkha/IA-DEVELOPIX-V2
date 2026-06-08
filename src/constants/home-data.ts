/**
 * @file src/constants/home-data.ts
 * @description Static datasets and imagery URLs for the storefront Home Page.
 */

import { AwardData } from '@/src/types/home';

/**
 * Array of premium high-resolution background images for the deployment gallery slider.
 */
export const SKY_IMAGES: readonly string[] = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
] as const;

/**
 * Static registry of international participations and victories.
 * Categorized into top-tier (golden/significant) and general-tier awards.
 */
export const AWARDS_DATA: readonly AwardData[] = [
  // Top Tier (5 awards)
  { rank: 2, ordinal: 'nd', category: 'LINE FOLLOWER', event: 'ROBOCHALLENGE 16TH\nROMANIA', year: 2025, size: 'sm' }, 
  { rank: 1, ordinal: 'st', category: 'LINE FOLLOWER', event: 'ROBOCHALLENGE 16TH\nROMANIA', year: 2025, size: 'lg', isGold: true }, 
  { rank: 1, ordinal: 'st', category: 'LINE FOLLOWER TURBO', event: 'ROBOCHALLENGE 16TH\nROMANIA', year: 2025, size: 'lg', isGold: true }, 
  { rank: 1, ordinal: 'st', category: 'ROBOTRACER', event: 'ROBOCHALLENGE 16TH\nROMANIA', year: 2025, size: 'lg', isGold: true }, 
  { rank: 2, ordinal: 'nd', category: 'LINE FOLLOWER TURBO', event: 'ROBOCHALLENGE 16TH\nROMANIA', year: 2025, size: 'sm' }, 
  
  // General Tier (6 awards)
  { rank: 3, ordinal: 'rd', category: 'LINE FOLLOWER TURBO', event: 'ROBOCHALLENGE 14TH\nROMANIA', year: 2023, size: 'sm' },
  { rank: 2, ordinal: 'nd', category: 'LINE FOLLOWER TURBO', event: 'ROBOCHALLENGE 15TH\nROMANIA', year: 2024, size: 'sm' },
  { rank: 2, ordinal: 'nd', category: 'LINE FOLLOWER', event: 'ROBOCHALLENGE 15TH\nROMANIA', year: 2024, size: 'sm' },
  { rank: 2, ordinal: 'nd', category: 'ROBOTRACER', event: 'ROBOCHALLENGE 15TH\nROMANIA', year: 2024, size: 'sm' }, 
  { rank: 2, ordinal: 'nd', category: 'ROBOTRACER', event: 'ALL CHILE ROBOT\nCONTEST', year: 2025, size: 'sm' },
  { rank: 2, ordinal: 'nd', category: 'LINE FOLLOWER', event: 'XI RUNIBOT\nCOLOMBIA', year: 2025, size: 'sm' }, 
] as const;
