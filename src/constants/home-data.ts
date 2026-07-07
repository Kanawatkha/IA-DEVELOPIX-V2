/**
 * @file src/constants/home-data.ts
 * @description Static datasets and imagery URLs for the storefront Home Page.
 */

import { AwardData, TechItem } from '@/src/types/home';

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

/**
 * Array of software development tools and environments used in robotics engineering.
 */
export const TECH_ITEMS: readonly TechItem[] = [
  { 
    iconSrc: 'https://thesvg.org/icons/arduino/default.svg', 
    title: 'ARDUINO IDE', 
    id: 'arduino', 
    url: 'https://www.arduino.cc/' 
  },
  { 
    iconSrc: 'https://thesvg.org/icons/easyeda/default.svg', 
    title: 'EASY EDA', 
    id: 'easyeda', 
    url: 'https://easyeda.com/' 
  },
  { 
    iconSrc: 'https://thesvg.org/icons/fusion-360/default.svg', 
    title: 'FUSION 360', 
    id: 'fusion', 
    url: 'https://www.autodesk.com/mx/products/fusion-360/overview' 
  },
  { 
    iconSrc: 'https://thesvg.org/icons/visual-studio-code/default.svg', 
    title: 'VISUAL STUDIO', 
    id: 'vscode', 
    url: 'https://code.visualstudio.com/' 
  },
] as const;

/**
 * High-resolution viewport background images for the Hero Section layout.
 */
export const HERO_BG_IMAGES = {
  mobile: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_1-AR03811lQghk0N7O.png",
  desktop: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png",
} as const;
