"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Facebook, Instagram, Youtube } from "lucide-react";
import { LANGUAGES } from "@/src/constants/navigation";

/**
 * Renders the bottom footer bar containing metadata, copyright notices,
 * mobile-only social icons, payment gateway badges, and the premium Language Selector.
 */
export function FooterBottom() {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full border-t border-hairline">
      <div className="px-6 md:px-12 min-[1920px]:px-24 py-4 md:py-6 min-[1920px]:py-10 flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 shrink-0">
        
        {/* Mobile View Social Icons */}
        <div className="flex md:hidden items-center space-x-8 w-full justify-center order-1">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook Profile">
            <Facebook strokeWidth={1} className="w-4 h-4 text-muted" />
          </a>
          <span className="font-display font-normal text-base text-muted">X</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile">
            <Instagram strokeWidth={1} className="w-4 h-4 text-muted" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel">
            <Youtube strokeWidth={1} className="w-5 h-5 text-muted" />
          </a>
        </div>

        {/* Copyright notice */}
        <p className="font-serif text-xs text-muted tracking-normal text-center md:text-left order-3 md:order-1 w-full md:w-auto mt-2 md:mt-0">
          © 2026 IA DEVELOPIX. ALL RIGHTS RESERVED.
        </p>

        {/* Premium Bottom Language Selector */}
        <div className="relative order-2 flex flex-col items-center w-[190px] md:w-auto md:min-w-[190px]" ref={langRef}>
          <AnimatePresence>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full mb-2 left-0 w-full bg-[#0d0d0d] border border-hairline rounded-2xl p-2 z-50 flex flex-col space-y-1 shadow-lg"
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setIsLangOpen(false)}
                    className="text-left font-mono text-xs text-primary uppercase tracking-[2px] hover:bg-primary/5 p-2.5 rounded-none transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {lang.code} - {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center justify-between w-full border border-primary bg-primary rounded-pill px-5 py-2 hover:bg-transparent transition-colors outline-none cursor-pointer group"
            aria-label="Toggle Language Options"
          >
            <Globe className="w-4 h-4 min-[1920px]:w-6 min-[1920px]:h-6 text-canvas group-hover:text-muted transition-colors" strokeWidth={1.5} />
            <span className="font-mono text-[10px] min-[1920px]:text-sm text-canvas group-hover:text-primary uppercase tracking-[2px] whitespace-nowrap mx-2 transition-colors">
              THAI / ENGLISH
            </span>
            <ChevronDown className="w-4 h-4 min-[1920px]:w-6 min-[1920px]:h-6 text-canvas group-hover:text-muted transition-colors" strokeWidth={1.5} />
          </button>
        </div>

        {/* Accepted Payment badges */}
        <div className="flex items-center justify-center space-x-3 md:space-x-4 min-[1920px]:space-x-6 order-4 md:order-3 w-full md:w-auto">
          <span className="font-mono text-[8px] md:text-[9px] min-[1920px]:text-xs text-muted tracking-widest uppercase">VISA</span>
          <span className="font-mono text-[8px] md:text-[9px] min-[1920px]:text-xs text-muted tracking-widest uppercase">MASTERCARD</span>
          <span className="font-mono text-[8px] md:text-[9px] min-[1920px]:text-xs text-muted tracking-widest uppercase">PROMPTPAY</span>
        </div>
      </div>
    </div>
  );
}
