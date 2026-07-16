"use client";

import React from "react";
import { motion } from "framer-motion";

import { CartDrawer } from "@/src/features/cart";
import { useNavbar } from "../hooks/use-navbar";
import { DesktopNav } from "./desktop-nav";
import { MobileDrawer } from "./mobile-drawer";
import { MobileBottomNav } from "./mobile-bottom-nav";

export function Navbar({
  isVisible: _isVisible,
  scrollDirection: _scrollDirection,
}: {
  isVisible?: boolean;
  scrollDirection?: "up" | "down";
} = {}) {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    activeSubmenu,
    setActiveSubmenu,
    isLanguagePopupOpen,
    setIsLanguagePopupOpen,
    isDesktopLangOpen,
    setIsDesktopLangOpen,
    hoveredLink,
    setHoveredLink,
    isMobile,
    isDesktop,
    scrollDirection,
    isAtBottom,
    cartCount,
    navVisible,
    handleCartClick,
    triggerScrollUpdate,
    menuRef,
    langDropdownRef,
    desktopLangRef,
    headerRef,
    isMultiRow,
    closeMenu,
    handleScrollMouseDown,
    handleScrollMouseLeave,
    handleScrollMouseUp,
    handleScrollMouseMove,
    activeSubpages,
  } = useNavbar();

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
