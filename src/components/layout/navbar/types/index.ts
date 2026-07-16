/**
 * @file index.ts
 * @description Centralized TypeScript prop interfaces and types for the Navbar layout module.
 */

import React from "react";

/**
 * Prop interface for the desktop-only top navigation component.
 */
export interface DesktopNavProps {
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

/**
 * Prop interface for the sliding mobile navigation drawer component.
 */
export interface MobileDrawerProps {
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

/**
 * Prop interface for the sticky mobile-only bottom navigator bar.
 */
export interface MobileBottomNavProps {
  scrollDirection: "up" | "down";
  isAtBottom: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  handleCartClick: () => void;
  cartCount: number;
  isVisible: boolean;
}

/**
 * Prop interface for the premium multilingual selector overlay dropdown.
 */
export interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
