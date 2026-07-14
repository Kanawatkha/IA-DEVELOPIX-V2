/**
 * @file variants.ts
 * @description Shared Framer Motion Variants & animation timing constants
 *              for the IA DEVELOPIX Bugatti Design System.
 *
 * -----------------------------------------------------------------------
 * USAGE
 * -----------------------------------------------------------------------
 *  import { parentVariants, childVariants } from '@/lib/design/variants';
 *
 *  <motion.div variants={parentVariants} initial="hidden" whileInView="visible">
 *    <motion.h1 variants={childVariants}>...</motion.h1>
 *  </motion.div>
 * -----------------------------------------------------------------------
 */

import type { Variants } from 'framer-motion';

// ============================================================
// TIMING CONSTANTS
// ============================================================

/**
 * Standard animation durations (in seconds).
 * - fast  : Quick transitions, small UI elements (badges, tags)
 * - base  : Default reveal for headings and sections
 * - slow  : Hero image load-in or large background transitions
 */
export const DURATION = {
  fast: 0.6,
  base: 1.0,
  slow: 1.4,
} as const;

/**
 * Named easing curves.
 * - luxury : The Bugatti signature ease — slow start, fast mid, slow end.
 *            Feels automotive, measured, and precise.
 */
export const EASE = {
  luxury: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
  customEaseOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  customEaseInOut: [0.42, 0, 0.58, 1] as [number, number, number, number],
} as const;

/**
 * Stagger delay presets for parent containers.
 * - base   : Standard content stagger (headings, cards)
 * - fast   : Tighter stagger (dense grids, icon lists)
 * - awards : Slightly slower stagger for award trophy rows
 */
export const STAGGER = {
  base: 0.15,
  fast: 0.08,
  awards: 0.12,
} as const;


// ============================================================
// SHARED VARIANTS
// ============================================================

/**
 * parentVariants
 * A stagger container — apply to a motion.div wrapping multiple children.
 * Does not animate itself; it only orchestrates children.
 *
 * Standard use: sections, hero content blocks, card grids.
 */
export const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.base,
      delayChildren: 0.1,
    },
  },
};

/**
 * fastParentVariants
 * Tighter stagger for denser grids or icon rows.
 */
export const fastParentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.fast,
      delayChildren: 0.05,
    },
  },
};

/**
 * awardsParentVariants
 * Stagger container for laurel award rows.
 */
export const awardsParentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.awards,
      delayChildren: 0.05,
    },
  },
};

/**
 * childVariants
 * The primary reveal animation: fade up + blur.
 * Used for headings, paragraphs, buttons, and most page elements.
 *
 * duration: DURATION.base (1.0s) — feels considered, not rushed.
 */
export const childVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.base,
      ease: EASE.luxury,
    },
  },
};

/**
 * fastChildVariants
 * Faster reveal for secondary elements (award items, icon badges).
 *
 * duration: DURATION.fast (0.6s)
 */
export const fastChildVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.fast,
      ease: EASE.luxury,
    },
  },
};

/**
 * awardsChildVariants — alias for fastChildVariants.
 * Named explicitly for use in the awards/laurel section.
 */
export const awardsChildVariants: Variants = fastChildVariants;

/**
 * imageRevealVariants
 * Blur-fade reveal for images (no y-translate, only opacity + blur).
 * Use on <motion.img> tags that load on page entry.
 */
export const imageRevealVariants: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: DURATION.base,
      ease: EASE.luxury,
    },
  },
};

/**
 * heroImageVariants
 * Combines blur + subtle scale for the full-screen hero background image.
 * Used on the initial page load (animate, not whileInView).
 */
export const heroImageVariants = {
  initial: { opacity: 0, filter: 'blur(15px)', scale: 1.1 },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1.0,
    transition: { duration: 2, ease: EASE.luxury },
  },
} as const;

/**
 * slideVariants (factory)
 * Horizontal slide variants for carousels and gallery sliders.
 * Takes a `direction` custom prop: positive = slide from right, negative = from left.
 *
 * @example
 * <AnimatePresence custom={direction}>
 *   <motion.img custom={direction} variants={slideVariants} ... />
 * </AnimatePresence>
 */
export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

/**
 * lineRevealVariants
 * Animated underline / border-bottom reveal.
 * Use on a 1px-high <motion.div> to animate a line extending from left to right.
 */
export const lineRevealVariants: Variants = {
  hidden: { width: 0 },
  visible: {
    width: '100%',
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
};

/**
 * scrollIndicatorVariants
 * Floating chevron bounce for scroll-down indicators.
 * Use on a motion.div with initial/animate/transition props directly.
 */
export const scrollIndicatorAnimate = {
  opacity: 1,
  filter: 'blur(0px)',
  y: [0, 10, 0] as number[],
};

export const scrollIndicatorInitial = {
  opacity: 0,
  y: 20,
  filter: 'blur(10px)',
};

export const scrollIndicatorTransition = {
  opacity:  { duration: 0.6, delay: 0.5 } as const,
  filter:   { duration: 0.6, delay: 0.5 } as const,
  y:        { duration: 2, delay: 1.1, repeat: Infinity, ease: 'easeInOut' as const },
};

/**
 * drawerOpenTransition
 * Motion configuration for entering sliding panels, drawers, and overlays.
 * Uses a snappy ease-out curve with rapid start and long cushioned deceleration.
 */
export const drawerOpenTransition = {
  type: "tween" as const,
  duration: 0.65,
  ease: EASE.customEaseOut,
} as const;

/**
 * drawerCloseTransition
 * Motion configuration for exiting sliding panels, drawers, and overlays.
 * Uses a smooth ease-in-out curve with a slightly faster duration.
 */
export const drawerCloseTransition = {
  type: "tween" as const,
  duration: 0.45,
  ease: EASE.customEaseInOut,
} as const;

export const drawerSurfaceClass =
  'bottom-0 left-0 w-full h-[100dvh] max-h-[90dvh] rounded-t-[2rem] border-t border-hairline md:top-0 md:bottom-auto md:w-[576px] md:h-[100dvh] md:max-h-[100dvh] md:border-t-0';

export const drawerGlowClass =
  'absolute inset-0 -z-10 rounded-[inherit] shadow-[0_0_60px_rgba(255,255,255,0.15)] pointer-events-none';
