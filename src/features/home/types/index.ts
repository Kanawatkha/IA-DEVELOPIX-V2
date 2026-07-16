/**
 * @file src/features/home/types/index.ts
 * @description Centralized prop interfaces and types for the Home feature module.
 */

export type AwardSize = 'sm' | 'md' | 'lg';

/**
 * Representation of an international/national robotics competition award.
 */
export interface AwardData {
  rank: number;
  ordinal: string;
  category: string;
  event: string;
  year: number;
  size: AwardSize;
  isGold?: boolean;
}

/**
 * Representation of a software tool / environment in the development tech stack.
 */
export interface TechItem {
  iconSrc: string;
  title: string;
  id: string;
  url?: string;
}

/**
 * Prop interface for rendering individual laurel award medallions.
 */
export interface LaurelAwardProps {
  award: AwardData;
}
