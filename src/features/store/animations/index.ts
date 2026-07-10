/**
 * @file animations/index.ts
 * @description Local Framer Motion animation configurations and variant maps for the Store feature module.
 */

import { Variants } from 'framer-motion';

/** Background image zoom-in slide transition variants for StoreHero */
export const storeHeroBackgroundVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(15px)', scale: 1.12 },
  visible: (isComingSoon: boolean) => ({
    opacity: 0.85,
    filter: isComingSoon ? 'blur(8px)' : 'blur(0px)',
    scale: 1.0,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
  })
};

/** Stagger list container animation transition variants for ShopCollections activeFilter swaps */
export const collectionStaggerVariants = (hasInteracted: boolean): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: hasInteracted ? 0.05 : 0.15,
      delayChildren: hasInteracted ? 0 : 0.1,
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(12px)',
    transition: { duration: hasInteracted ? 0.2 : 0.3 },
  },
});

export const modelCardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)', pointerEvents: 'none' },
  visible: (hasInteracted: boolean) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    pointerEvents: 'auto',
    transition: {
      duration: hasInteracted ? 0.4 : 1.0,
      ease: [0.2, 0.8, 0.2, 1],
    },
  }),
  exit: (hasInteracted: boolean) => ({
    opacity: 0,
    filter: 'blur(4px)',
    pointerEvents: 'none',
    transition: { duration: hasInteracted ? 0.2 : 0.4 },
  }),
};
