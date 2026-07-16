/**
 * @file src/components/layout/navbar/animations.ts
 * @description Centralized Framer Motion animations and variant definitions for the Navbar component and its sub-drawers.
 */

import { type Variants } from "framer-motion";
import { DURATION, EASE } from "@/src/lib/design/variants";

/**
 * Desktop submenu hover overlay dropdown panel animation variants.
 */
export const submenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -12,
    filter: "blur(8px)",
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Individual model menu item transition slide-in/blur variants.
 */
export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    filter: "blur(8px)",
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: DURATION.fast,
      ease: EASE.luxury,
    },
  },
};

/**
 * Mobile drawer item slide-in variants.
 */
export const drawerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
    filter: "blur(12px)",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: DURATION.fast,
      ease: EASE.luxury,
    },
  },
};

/**
 * Backdrop backdrop-blur drawer toggle animation variants.
 */
export const fadeBlurVariants: Variants = {
  closedBottom: {
    opacity: 0,
    filter: "blur(8px)",
  },
  closedLeft: {
    opacity: 0,
    filter: "blur(8px)",
  },
  open: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Language Selector desktop overlay panel variants.
 */
export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -12,
    filter: "blur(8px)",
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Language Selector mobile sliding panel variants.
 */
export const mobileContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(10px)",
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Individual language items slide and fade-in animations on mobile.
 */
export const languageItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(8px)",
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: DURATION.fast,
      ease: EASE.luxury,
    },
  },
};
