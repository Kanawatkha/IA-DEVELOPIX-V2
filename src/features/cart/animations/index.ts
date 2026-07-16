/**
 * @file index.ts
 * @description Framer Motion variants and transitions for the Cart components.
 */

import { type Variants } from "framer-motion";
import { drawerOpenTransition, drawerCloseTransition, EASE } from "@/src/lib/design/variants";

export const drawerVariants = {
  open: {
    x: 0,
    y: 0,
    transition: drawerOpenTransition,
  },
  closedRight: {
    x: "100%",
    y: 0,
    transition: drawerCloseTransition,
  },
  closedBottom: {
    x: 0,
    y: "100%",
    transition: drawerCloseTransition,
  },
};

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

export const footerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    transition: {
      duration: 0.2,
      ease: "easeIn" as const,
    },
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: EASE.luxury,
      staggerChildren: 0.05,
      delayChildren: 0.1,
      delay: 0.05,
    },
  },
};

export const cartItemVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    transition: {
      duration: 0.3,
      ease: "easeIn" as const,
    },
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: EASE.luxury,
    },
  },
};
