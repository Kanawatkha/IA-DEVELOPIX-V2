/**
 * @file src/types/home.ts
 * @description Type definitions for the Home Page storefront layout and subcomponents.
 */

/**
 * Height/scale tiers for competition awards rendering.
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
