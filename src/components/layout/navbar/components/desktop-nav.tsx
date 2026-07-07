"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Globe, User, ShoppingCart, Menu, ShoppingBag } from "lucide-react";
import { MAIN_NAVIGATION, getVariantHref } from "@/src/constants";
import { DURATION, EASE } from "@/src/lib/design/variants";
import { LanguageSelector } from "./language-selector";
import { formatModelName, isModelComingSoon } from "@/src/lib/data/products";

const submenuVariants: Variants = {
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

interface DesktopNavProps {
  isMobileMenuOpen: boolean;
  scrollDirection: "up" | "down";
  isAtBottom: boolean;
  isVisible: boolean;
  hoveredLink: string | null;
  setHoveredLink: (link: string | null) => void;
  isDesktopLangOpen: boolean;
  setIsDesktopLangOpen: (open: boolean) => void;
  desktopLangRef: React.RefObject<HTMLDivElement | null>;
  cartCount: number;
  handleCartClick: () => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  headerRef?: React.RefObject<HTMLElement | null>;
  isMultiRow?: boolean;
}

export function DesktopNav({
  isMobileMenuOpen,
  scrollDirection,
  isAtBottom,
  isVisible,
  hoveredLink,
  setHoveredLink,
  isDesktopLangOpen,
  setIsDesktopLangOpen,
  desktopLangRef,
  cartCount,
  handleCartClick,
  setIsMobileMenuOpen,
  headerRef,
  isMultiRow = false,
}: DesktopNavProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <motion.header
        ref={headerRef as any}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 w-full z-[100] bg-canvas/80 backdrop-blur-md border-b border-hairline ${
          isMounted ? "transition-[top] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" : ""
        } ${isVisible ? "top-0" : "-top-[120px] md:top-0"}`}
      >
        <div className="relative flex min-h-[92px] items-center justify-between px-6 md:px-12 py-6 min-[2000px]:px-24 min-[2000px]:py-8 min-[950px]:grid min-[950px]:grid-cols-[1fr_auto_1fr] min-[950px]:gap-x-4">
          {/* Mobile: Hamburger (Left) */}
          <div className="block min-[950px]:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-primary transition-opacity hover:opacity-70"
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center flex-shrink-0 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 min-[950px]:static min-[950px]:translate-x-0 min-[950px]:translate-y-0 min-[950px]:justify-self-start">
            <Link
              href="/"
              className="font-display text-2xl sm:text-4xl tracking-[3px] text-primary transition-opacity hover:opacity-70 whitespace-nowrap min-[2000px]:text-7xl"
            >
              IA DEVELOPIX
            </Link>
          </div>

          {/* Desktop/Tablet: Center Links */}
          <nav className="hidden min-[950px]:flex flex-wrap justify-center items-center gap-x-1 gap-y-2 w-full min-[950px]:justify-self-center min-[2000px]:gap-x-10">
            {MAIN_NAVIGATION.map((link) => {
              const isHovered = hoveredLink === link.label;

              return (
                <div
                  key={link.label}
                  data-nav-label={link.label}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link
                    href={link.href}
                    className="relative flex items-center justify-center py-2 px-3 min-[1340px]:px-4 group/btn outline-none"
                  >
                    {link.hasSubmenu ? (
                      <motion.div
                        className="absolute inset-0 bg-primary rounded-full z-0"
                        initial={false}
                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.95 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
                      />
                    ) : (
                      <motion.div
                        className="absolute bottom-1 left-4 right-4 h-[1px] bg-primary z-0"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
                      />
                    )}

                    <span
                      className={`
                        relative z-10 font-mono text-sm min-[1340px]:text-[15px] 2xl:text-base font-normal uppercase tracking-[2px] whitespace-nowrap transition-colors duration-300 min-[2000px]:text-2xl
                        ${isHovered && link.hasSubmenu ? "text-canvas" : "text-primary"}
                      `}
                    >
                      {link.label}
                      {link.isComingSoon && (
                        <span className="text-[9px] text-primary/40 ml-2 tracking-widest font-normal">
                          (COMING SOON)
                        </span>
                      )}
                    </span>
                  </Link>

                  <AnimatePresence>
                    {isHovered && link.hasSubmenu && !isMultiRow && (
                      <motion.div
                        key={link.label}
                        className={`absolute top-full left-1/2 -translate-x-1/2 z-[110] hidden min-[950px]:block origin-top mt-0 pt-2 ${
                          link.label === "LINEFOLLOWER"
                            ? "w-[190px] min-[2000px]:w-[240px]"
                            : link.label === "MISSION"
                            ? "w-[190px] min-[2000px]:w-[210px]"
                            : "w-[200px] min-[2000px]:w-[230px]"
                        }`}
                        variants={submenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onMouseEnter={() => setHoveredLink(link.label)}
                        onMouseLeave={() => setHoveredLink(null)}
                      >
                        <div className="bg-[#0d0d0d] border border-hairline rounded-2xl shadow-lg">
                          <div className="flex flex-col items-start text-left p-2 min-[2000px]:p-3 w-full">
                            {link.subpages?.map((sub) => (
                              <motion.div key={sub} variants={itemVariants} className="w-full">
                                <Link
                                  href={getVariantHref(link.label, sub)}
                                  className="block px-4 py-2.5 text-xs font-normal uppercase tracking-[2px] text-primary hover:opacity-70 hover:bg-primary/5 rounded-none transition-all duration-300 group/sub min-[2000px]:text-sm min-[2000px]:py-3.5 w-full text-left whitespace-nowrap"
                                >
                                  {isModelComingSoon(sub) ? (
                                    <>
                                      {formatModelName(sub)}
                                      <div className="text-[9px] text-primary/40 mt-1 tracking-widest">
                                        (COMING SOON)
                                      </div>
                                    </>
                                  ) : (
                                    formatModelName(sub)
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Icons Group */}
          <div className="flex items-center space-x-4 sm:space-x-6 flex-shrink-0 min-[950px]:static min-[950px]:translate-y-0 min-[950px]:justify-self-end min-[2000px]:space-x-10">
            <div 
              className="hidden min-[950px]:flex relative cursor-pointer" 
              ref={desktopLangRef as any}
              data-nav-lang="true"
              onMouseEnter={() => setIsDesktopLangOpen(true)}
              onMouseLeave={() => setIsDesktopLangOpen(false)}
            >
              <button
                onClick={() => setIsDesktopLangOpen(!isDesktopLangOpen)}
                className="text-primary transition-opacity hover:opacity-70 p-2 relative flex items-center justify-center outline-none cursor-pointer"
                aria-label="Language"
              >
                <Globe className="h-6 w-6 min-[2000px]:h-8 min-[2000px]:w-8" strokeWidth={1.5} />
              </button>
              <AnimatePresence>
                {isDesktopLangOpen && (
                  <LanguageSelector
                    isOpen={isDesktopLangOpen}
                    onClose={() => setIsDesktopLangOpen(false)}
                    isMobile={false}
                    onMouseEnter={() => setIsDesktopLangOpen(true)}
                    onMouseLeave={() => setIsDesktopLangOpen(false)}
                  />
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={handleCartClick}
              className="text-primary transition-opacity hover:opacity-70 relative flex items-center justify-center p-1 outline-none cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6 min-[2000px]:h-8 min-[2000px]:w-8" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1 font-mono font-bold text-[10px] text-primary leading-none">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>
    </>
  );
}
