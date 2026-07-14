"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { MAIN_NAVIGATION } from "@/src/constants";
import { useWindowSize, useScrollDetection } from "@/src/hooks";
import { useCart } from "@/src/context/cart-context";
import { CartDrawer } from "@/src/features/cart";

import { DesktopNav } from "./desktop-nav";
import { MobileDrawer } from "./mobile-drawer";
import { MobileBottomNav } from "./mobile-bottom-nav";

export function Navbar({
  isVisible = true,
  scrollDirection: _scrollDirection = "up",
}: {
  isVisible?: boolean;
  scrollDirection?: "up" | "down";
}) {
  // UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);
  const [isDesktopLangOpen, setIsDesktopLangOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Platform Hooks
  const { isMobile, isDesktop } = useWindowSize();
  const { scrollDirection, isAtBottom } = useScrollDetection();
  const { cartCount, setIsCartOpen, isCartOpen } = useCart();
  const pathname = usePathname();

  // Scroll Toggling Visibility Logic
  const [navVisible, setNavVisible] = useState({ top: true, bottom: false });
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY === lastScrollY.current) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setNavVisible({ top: false, bottom: true });
      } else {
        setNavVisible({ top: true, bottom: false });
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = () => {
    if (pathname === "/cart") {
      window.location.reload();
    } else {
      setIsCartOpen(true);
    }
  };

  const triggerScrollUpdate = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("scroll"));
    }
  };

  // Drag-to-Scroll refs for Mobile Drawer
  const menuRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [startYScroll, setStartYScroll] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Dynamically observe the height of the desktop navbar header to set the --navbar-height CSS variable.
  // This prevents layout collisions with the home hero section across all resolutions and wrapping states.
  const [isMultiRow, setIsMultiRow] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof window === "undefined" || !("ResizeObserver" in window)) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.target.getBoundingClientRect().height;
        document.documentElement.style.setProperty("--navbar-height", `${height}px`);
        // If height > 120px, it indicates the navigation links have wrapped into multiple rows
        setIsMultiRow(height > 120);
      }
    });

    resizeObserver.observe(header);

    // Perform an initial height measurement on mount
    const initialHeight = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--navbar-height", `${initialHeight}px`);
    setIsMultiRow(initialHeight > 120);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsLanguagePopupOpen(false);
    setActiveSubmenu(null);
  };

  // Scroll Grabbing Mechanics
  const handleScrollMouseDown = (e: React.MouseEvent) => {
    if (!menuRef.current) return;
    setIsGrabbing(true);
    setStartYScroll(e.pageY - menuRef.current.offsetTop);
    setScrollTop(menuRef.current.scrollTop);
    menuRef.current.style.cursor = "grabbing";
  };

  const handleScrollMouseLeave = () => {
    setIsGrabbing(false);
    if (menuRef.current) menuRef.current.style.cursor = "grab";
  };

  const handleScrollMouseUp = () => {
    setIsGrabbing(false);
    if (menuRef.current) menuRef.current.style.cursor = "grab";
  };

  const handleScrollMouseMove = (e: React.MouseEvent) => {
    if (!isGrabbing || !menuRef.current) return;
    e.preventDefault();
    const y = e.pageY - menuRef.current.offsetTop;
    const walk = (y - startYScroll) * 2;
    menuRef.current.scrollTop = scrollTop - walk;
  };

  // Outside Click triggers language popup closing
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLanguagePopupOpen(false);
      }
      if (desktopLangRef.current && !desktopLangRef.current.contains(event.target as Node)) {
        setIsDesktopLangOpen(false);
      }
    }
    if (isLanguagePopupOpen || isDesktopLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLanguagePopupOpen, isDesktopLangOpen]);

  // Lock body scroll on active mobile drawer layout overlay or cart drawer
  useEffect(() => {
    const isAnyOpen = isMobileMenuOpen || isCartOpen;

    if (isAnyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isCartOpen]);

  // Close Mobile Menu on Desktop Resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 950) closeMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeNavData = MAIN_NAVIGATION.find((item) => item.label === activeSubmenu);
  const activeSubpages = activeNavData?.subpages || [];

  return (
    <>
      <DesktopNav
        isMobileMenuOpen={isMobileMenuOpen}
        scrollDirection={scrollDirection}
        isAtBottom={isAtBottom}
        isVisible={navVisible.top}
        hoveredLink={hoveredLink}
        setHoveredLink={setHoveredLink}
        isDesktopLangOpen={isDesktopLangOpen}
        setIsDesktopLangOpen={setIsDesktopLangOpen}
        desktopLangRef={desktopLangRef}
        cartCount={cartCount}
        handleCartClick={handleCartClick}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        headerRef={headerRef}
        isMultiRow={isMultiRow}
      />

      {!isDesktop && (
        <>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[120] bg-canvas/40 backdrop-blur-sm"
              onClick={closeMenu}
            />
          )}

          <MobileDrawer
            isMobileMenuOpen={isMobileMenuOpen}
            closeMenu={closeMenu}
            isMobile={isMobile}
            triggerScrollUpdate={triggerScrollUpdate}
            menuRef={menuRef}
            handleScrollMouseDown={handleScrollMouseDown}
            handleScrollMouseLeave={handleScrollMouseLeave}
            handleScrollMouseUp={handleScrollMouseUp}
            handleScrollMouseMove={handleScrollMouseMove}
            activeSubmenu={activeSubmenu}
            setActiveSubmenu={setActiveSubmenu}
            activeSubpages={activeSubpages}
            isLanguagePopupOpen={isLanguagePopupOpen}
            setIsLanguagePopupOpen={setIsLanguagePopupOpen}
            langDropdownRef={langDropdownRef}
          />
        </>
      )}

      <MobileBottomNav
        scrollDirection={scrollDirection}
        isAtBottom={isAtBottom}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleCartClick={handleCartClick}
        cartCount={cartCount}
        isVisible={navVisible.bottom}
      />

      <CartDrawer />
    </>
  );
}
