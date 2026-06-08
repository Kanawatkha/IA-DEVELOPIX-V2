/**
 * @file src/features/products/types/Category.ts
 * @description Standardized type definitions and interfaces for IA DEVELOPIX
 *              product categories, performance stat matchups, and series catalog structures.
 */

export type CategoryKey = 'linefollower' | 'mission' | 'gathering' | 'sumo';

/**
 * Representation of a single performance metric.
 */
export interface PerformanceStat {
  label: string;
  percentage: number;
}

/**
 * Technical specification model structure for product cards in category portals.
 */
export interface CategoryModelItem {
  id: string;
  name: string;
  size: string;
  price: string;
  link: string;
  isComingSoon: boolean;
  showCmLabel: boolean;
}

/**
 * Series subdivision under a category (e.g. NOFAN or FANPULL series).
 */
export interface SeriesItem {
  id: string;
  name: string;
  isComingSoon: boolean;
  subtitle?: string;
  models: CategoryModelItem[];
}

/**
 * Parameters for a model's performance breakdown in comparison grids.
 */
export interface PerformanceComparison {
  name: string;
  imageUrl: string;
  stats: PerformanceStat[];
  description: string;
}

/**
 * Outer config structure driving a category landing portal.
 */
export interface CategoryConfig {
  id: CategoryKey;
  name: string;
  subtitle: string;
  isComingSoon: boolean;
  backgroundImageDesktop: string;
  backgroundImageMobile: string;
  series: SeriesItem[];
  performanceMatchup?: {
    title: string;
    comparisons: PerformanceComparison[];
  };
}
