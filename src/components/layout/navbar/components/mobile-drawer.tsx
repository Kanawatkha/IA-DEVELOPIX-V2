"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants, useDragControls } from "framer-motion";
import { X, ChevronRight, ChevronLeft, ChevronDown, Globe, Instagram, Youtube, MessageCircle } from "lucide-react";
import { MAIN_NAVIGATION, getVariantHref } from "@/src/constants";
import { DURATION, EASE, fastParentVariants, drawerTransition } from "@/src/lib/design/variants";
import { LanguageSelector } from "./language-selector";
import { formatModelName, isModelComingSoon, getCategoryPath } from "@/src/lib/data/products";

interface MobileDrawerProps {
  isMobileMenuOpen: boolean;
  closeMenu: () => void;
  isMobile: boolean;
  triggerScrollUpdate: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  handleScrollMouseDown: (e: React.MouseEvent) => void;
  handleScrollMouseLeave: () => void;
  handleScrollMouseUp: () => void;
  handleScrollMouseMove: (e: React.MouseEvent) => void;
  activeSubmenu: string | null;
  setActiveSubmenu: (menu: string | null) => void;
  activeSubpages: string[];
  isLanguagePopupOpen: boolean;
  setIsLanguagePopupOpen: (open: boolean) => void;
  langDropdownRef: React.RefObject<HTMLDivElement | null>;
}

const drawerItemVariants: Variants = {
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

const fadeBlurVariants: Variants = {
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

export function MobileDrawer({
  isMobileMenuOpen,
  closeMenu,
  isMobile,
  triggerScrollUpdate,
  menuRef,
  handleScrollMouseDown,
  handleScrollMouseLeave,
  handleScrollMouseUp,
  handleScrollMouseMove,
  activeSubmenu,
  setActiveSubmenu,
  activeSubpages,
  isLanguagePopupOpen,
  setIsLanguagePopupOpen,
  langDropdownRef,
}: MobileDrawerProps) {
  const dragControls = useDragControls();
  
  return (
    <motion.div
      drag={isMobile ? "y" : false}
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.7 }}
      dragMomentum={true}
      onDragEnd={(e, info) => {
        const projectedY = info.offset.y + info.velocity.y * 0.2;
        if (info.offset.y > 250 || projectedY > 250) {
          closeMenu();
        }
      }}
      variants={{
        open: {
          y: 0,
          x: 0,
          transition: drawerTransition,
        },
        closedBottom: {
          y: "100%",
          x: 0,
          transition: drawerTransition,
        },
        closedLeft: {
          x: "-100%",
          y: 0,
          transition: drawerTransition,
        },
      }}
      initial={false}
      animate={isMobileMenuOpen ? "open" : isMobile ? "closedBottom" : "closedLeft"}
      onAnimationComplete={(variant) => {
        if (variant === "closedBottom" || variant === "closedLeft") {
          setTimeout(triggerScrollUpdate, 50);
        }
      }}
      className={`fixed z-[120] flex flex-col bg-canvas transform-gpu will-change-transform overflow-visible
        bottom-0 left-0 w-full h-[100dvh] max-h-[90dvh] rounded-t-[2rem] border-t border-hairline shadow-none
        max-md:landscape:top-0 max-md:landscape:bottom-auto max-md:landscape:w-[350px] max-md:landscape:h-[100dvh] max-md:landscape:max-h-[100dvh] max-md:landscape:rounded-r-[2rem] max-md:landscape:rounded-l-none max-md:landscape:border-t-0 max-md:landscape:border-r max-md:landscape:border-hairline max-md:landscape:shadow-none
        md:top-0 md:bottom-auto md:w-[576px] md:h-[100dvh] md:rounded-r-[2rem] md:rounded-l-none md:border-r md:border-hairline md:shadow-none md:max-h-[100dvh] md:border-t-0
        [@media(max-height:500px)]:w-[480px]
      `}
    >
      {/* Subtle White Glow Shadow Layer (Fade-In) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute inset-0 -z-10 rounded-[inherit] shadow-[0_0_60px_rgba(255,255,255,0.15)] pointer-events-none"
      />

      <div className="w-full h-full flex flex-col relative overflow-hidden rounded-[inherit] bg-canvas">
        {/* Absolute Close Button */}
        <motion.button
          variants={fadeBlurVariants}
          onClick={closeMenu}
          className="absolute top-6 right-6 z-50 flex items-center justify-center h-9 w-9 text-primary hover:bg-primary hover:text-canvas transition-all duration-300 ease-in-out rounded-full cursor-pointer"
          aria-label="Close Menu"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </motion.button>

      {/* Drawer Handle for Mobile Swipe-down */}
      <div 
        className="shrink-0 w-full block md:hidden pt-4 pb-2 cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => dragControls.start(e)}
        style={{ touchAction: "none" }}
      >
        <div className="w-12 h-1.5 bg-primary/30 rounded-full mx-auto" />
      </div>

      {/* Scrollable Links Area */}
      <div
        ref={menuRef as any}
        onMouseDown={handleScrollMouseDown}
        onMouseLeave={handleScrollMouseLeave}
        onMouseUp={handleScrollMouseUp}
        onMouseMove={handleScrollMouseMove}
        className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto min-h-0 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/40 [&::-webkit-scrollbar-thumb]:transition-colors"
      >
        <div className="relative flex flex-col pt-16 md:pt-24 max-[950px]:landscape:pt-12">
          <AnimatePresence initial={false} mode="wait">
            {!activeSubmenu ? (
              <motion.nav
                key="main"
                initial="hidden"
                animate={isMobileMenuOpen ? "visible" : "hidden"}
                exit="hidden"
                variants={fastParentVariants}
                className="px-8 space-y-4"
              >
                <motion.div key="HOMENAV" variants={drawerItemVariants}>
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="block py-2 text-[18px] md:text-[20px] font-normal uppercase tracking-[2px] leading-none text-primary hover:opacity-70 transition-all text-left cursor-pointer"
                  >
                    HOME
                  </Link>
                </motion.div>
                {MAIN_NAVIGATION.map((link) => (
                  <motion.div key={link.label} variants={drawerItemVariants}>
                    {link.hasSubmenu ? (
                      <button
                        onClick={() => setActiveSubmenu(link.label)}
                        className="flex items-center justify-between w-full py-2 text-[18px] md:text-[20px] font-normal uppercase tracking-[2px] leading-none text-primary hover:opacity-70 transition-all text-left group cursor-pointer"
                      >
                        <span>
                          {link.label}
                          {link.isComingSoon && (
                            <span className="text-[10px] text-primary/40 ml-2 tracking-widest font-normal">(COMING SOON)</span>
                          )}
                        </span>
                        <ChevronRight className="text-primary/70 group-hover:text-primary transition-colors md:scale-125 md:origin-center md:ml-4" size={18} />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="block py-2 text-[18px] md:text-[20px] font-normal uppercase tracking-[2px] leading-none text-primary hover:opacity-70 transition-all text-left cursor-pointer"
                      >
                        {link.label}
                        {link.isComingSoon && (
                          <span className="text-[10px] text-primary/40 ml-2 tracking-widest font-normal">(COMING SOON)</span>
                        )}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.nav>
            ) : (
              <motion.nav
                key="submenu"
                initial="hidden"
                animate={isMobileMenuOpen ? "visible" : "hidden"}
                exit="hidden"
                variants={fastParentVariants}
                className="px-8 space-y-2"
              >
                <motion.div variants={drawerItemVariants} className="mb-6">
                  <button
                    onClick={() => setActiveSubmenu(null)}
                    className="flex items-center gap-3 text-primary uppercase font-normal text-sm tracking-[2px] hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    <ChevronLeft size={24} /> BACK
                  </button>
                </motion.div>
                <motion.div variants={drawerItemVariants}>
                  <Link
                    href={getCategoryPath(activeSubmenu)}
                    onClick={closeMenu}
                    className="block py-2 text-[18px] md:text-[20px] font-normal uppercase tracking-[2px] leading-none text-primary hover:opacity-70 transition-colors text-left border-b border-hairline mb-2 cursor-pointer"
                  >
                    ALL {activeSubmenu}
                  </Link>
                </motion.div>
                {activeSubpages.map((subpage) => (
                  <motion.div key={subpage} variants={drawerItemVariants}>
                    <Link
                      href={getVariantHref(activeSubmenu, subpage)}
                      onClick={closeMenu}
                      className="block py-2 text-[18px] md:text-[20px] font-normal uppercase tracking-[2px] leading-none text-primary hover:opacity-70 transition-all text-left cursor-pointer"
                    >
                      {isModelComingSoon(subpage) ? (
                        <>
                          {formatModelName(subpage)}{" "}
                          <span className="text-[10px] text-primary/40 block tracking-widest">(COMING SOON)</span>
                        </>
                      ) : (
                        formatModelName(subpage)
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Drawer Footer (Lang, Socials in Single Row) */}
      <motion.div
        variants={fadeBlurVariants}
        className="flex items-center justify-between w-full px-6 pb-6 pt-6 border-t border-hairline mb-safe md:mb-0 md:shrink-0 md:mt-auto"
      >
        <div className="relative w-auto" ref={langDropdownRef as any}>
          <AnimatePresence>
            {isLanguagePopupOpen && (
              <LanguageSelector
                isOpen={isLanguagePopupOpen}
                onClose={() => setIsLanguagePopupOpen(false)}
                isMobile={true}
              />
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsLanguagePopupOpen(!isLanguagePopupOpen)}
            className="flex items-center justify-between w-auto border border-hairline bg-canvas rounded-pill px-4 py-2 hover:bg-primary/5 transition-colors group whitespace-nowrap space-x-3 cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <Globe size={18} className="text-muted" />
              <span className="text-xs text-primary whitespace-nowrap font-mono tracking-[2px]">EN - ENGLISH</span>
            </div>
            <motion.div
              animate={{ rotate: isLanguagePopupOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: EASE.luxury }}
              className="flex items-center justify-center"
            >
              <ChevronDown size={16} className="text-muted" />
            </motion.div>
          </button>
        </div>

        <div className="flex items-center space-x-5 w-auto [@media(max-height:500px)]:scale-90 [@media(max-height:500px)]:origin-right md:transform md:scale-110 md:origin-right">
          <Instagram size={24} className="text-muted hover:text-primary transition-colors cursor-pointer" />
          <Youtube size={24} className="text-muted hover:text-primary transition-colors cursor-pointer" />
          <MessageCircle size={24} className="text-muted hover:text-primary transition-colors cursor-pointer" />
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
}
