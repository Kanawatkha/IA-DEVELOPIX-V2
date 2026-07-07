/**
 * @file src/features/home/animations/index.ts
 * @description Decoupled Framer Motion variant and transition configurations for the Home page.
 */

import { type Variants } from "framer-motion";

/**
 * Enterprise deployment gallery transition variants.
 */
export const galleryVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    x: '0%',
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
  }),
};
