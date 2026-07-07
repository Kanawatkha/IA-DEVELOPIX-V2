"use client";

import { motion, type Variants } from "framer-motion";
import { DURATION, EASE } from "@/src/lib/design/variants";
import { LANGUAGES } from "@/src/constants/navigation";

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const mobileContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
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

const languageItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
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

export function LanguageSelector({
  isOpen,
  onClose,
  isMobile = false,
  style,
  onMouseEnter,
  onMouseLeave,
}: LanguageSelectorProps) {
  return (
    <motion.div
      variants={isMobile ? mobileContainerVariants : containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={
        isMobile
          ? "absolute bottom-full mb-2 left-0 w-full bg-[#0d0d0d] border border-hairline rounded-2xl p-2 z-50 whitespace-nowrap"
          : "absolute top-full left-1/2 -translate-x-1/2 w-[150px] z-[110] hidden min-[950px]:block origin-top pt-2"
      }
    >
      <div className={isMobile ? "flex flex-col" : "bg-[#0d0d0d] border border-hairline rounded-2xl p-2 flex flex-col shadow-lg"}>
        <div className={isMobile ? "flex flex-col space-y-4" : "flex flex-col"}>
          {LANGUAGES.map((lang) => (
            <motion.button
              key={lang.code}
              variants={isMobile ? languageItemVariants : itemVariants}
              onClick={onClose}
              className="text-left font-mono text-xs uppercase tracking-[2px] text-primary hover:text-primary/70 hover:bg-primary/10 p-3 rounded-none transition-colors whitespace-nowrap cursor-pointer"
            >
              {lang.code} - {lang.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
