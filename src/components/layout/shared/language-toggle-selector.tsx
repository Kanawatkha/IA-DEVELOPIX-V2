"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";
import { LanguageSelector } from "@/src/components/layout/navbar/components/language-selector";
import { EASE } from "@/src/lib/design/variants";

interface LanguageToggleSelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  langDropdownRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function LanguageToggleSelector({
  isOpen,
  onToggle,
  onClose,
  langDropdownRef,
  className = "relative w-auto",
}: LanguageToggleSelectorProps) {
  return (
    <div className={className} ref={langDropdownRef as any}>
      <AnimatePresence>
        {isOpen && (
          <LanguageSelector
            isOpen={isOpen}
            onClose={onClose}
            isMobile={true}
          />
        )}
      </AnimatePresence>
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-auto border rounded-pill px-4 py-2 transition-all duration-300 group whitespace-nowrap space-x-3 cursor-pointer ${
          isOpen
            ? "border-primary bg-canvas text-primary"
            : "border-primary bg-primary text-canvas hover:bg-canvas hover:text-primary"
        }`}
      >
        <div className="flex items-center space-x-3">
          <Globe size={18} />
          <span className="text-xs whitespace-nowrap font-mono tracking-[2px]">EN - ENGLISH</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE.luxury }}
          className="flex items-center justify-center"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>
    </div>
  );
}
