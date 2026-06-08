/**
 * @file src/lib/index.ts
 * @description Single entry-point re-export for all IA DEVELOPIX
 *              design system utilities, data, and helper functions.
 *
 * Import everything from here:
 *   import { parentVariants, childVariants, displayXl } from '@/src/lib';
 *
 * Or import from specific modules for tree-shaking clarity:
 *   import { parentVariants } from '@/src/lib/design/variants';
 *   import { displayXl, buttonLabel } from '@/src/lib/design/typography';
 *   import { SHOP_MODELS, getProductPath } from '@/src/lib/data/products';
 *   import { cn } from '@/src/lib/utils/cn';
 */

// Animation variants & timing constants
export * from './design/variants';

// Typography class-string constants
export * as ty from './design/typography';
// Also export individually for convenient destructuring:
export * from './design/typography';

// Data layer
export * from './data/products';
export * from './data/achievements';
export * from './data/spare-parts';

// Utilities
export { cn } from './utils/cn';
