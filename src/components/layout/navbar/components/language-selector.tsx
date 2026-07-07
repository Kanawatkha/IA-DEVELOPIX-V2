'use client';

import React from "react";
import { motion } from "framer-motion";
import { LANGUAGES } from "@/src/constants/navigation";
import { LanguageSelectorProps } from "../types";
import {
  containerVariants,
  mobileContainerVariants,
  languageItemVariants,
  itemVariants,
} from "../animations";

/**
 * Premium Language selector dropdown.
 * Loops dynamically over available options and provides smooth springy transitions.
 */
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
