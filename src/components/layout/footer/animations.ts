/**
 * @file src/components/layout/footer/animations.ts
 * @description Centralized Framer Motion animation configurations and variant constants for the Footer module.
 */

import { type Variants } from "framer-motion";

/**
 * Mobile banner carousel sliding transition variants.
 */
export const sliderVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? "50%" : "-50%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? "50%" : "-50%", opacity: 0 }),
};
