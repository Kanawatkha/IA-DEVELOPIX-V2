"use client";

// ==========================================
// 1. IMPORTS
// ==========================================
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Globe, User, ShoppingCart, Menu, X, ChevronRight, ChevronLeft, ChevronDown,
  Home, Settings, Compass, Box, Code, Info, Instagram, Youtube, MessageCircle, ShoppingBag 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "@/src/components/ui/nav-link";

// Phase 1 imports: Shared Types, Constants, and Hooks
import { NavItem } from "@/src/types";
import { MAIN_NAVIGATION, getVariantHref } from "@/src/constants";
import { useWindowSize, useScrollDetection } from "@/src/hooks";


// ==========================================
// 2. LOGIC HELPERS
// ==========================================
const formatModelName = (name: string) => {
  const parts = name.split("cm");
  return parts.length > 1 ? (
    <>
      {parts[0]}<span className="lowercase text-[0.75em] opacity-60">cm</span>{parts[1]}
    </>
  ) : name;
};


// ==========================================
// 3. MAIN COMPONENT: Navbar
// ==========================================
export function Navbar({ isVisible = true, scrollDirection = 'up' }: { isVisible?: boolean, scrollDirection?: 'up' | 'down' }) {
  
  // --- 3.1 State & Hooks Integration ---
  // UI States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);
  const [isDesktopLangOpen, setIsDesktopLangOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  // Integrate custom platform hooks (Phase 1)
  const { isMobile } = useWindowSize();
  const { isAtBottom } = useScrollDetection();

  // Reference hooks & Scroll handlers
  const triggerScrollUpdate = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("scroll"));
    }
  };

  // Grab-to-Scroll States (for Drawer content)
  const menuRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [startYScroll, setStartYScroll] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // --- 3.2 Handlers & Functions ---
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsLanguagePopupOpen(false);
    setTimeout(() => {
      setActiveSubmenu(null);
    }, 200);
  };

  const handleScrollMouseDown = (e: React.MouseEvent) => {
    if (!menuRef.current) return;
    setIsGrabbing(true);
    setStartYScroll(e.pageY - menuRef.current.offsetTop);
    setScrollTop(menuRef.current.scrollTop);
    menuRef.current.style.cursor = 'grabbing';
  };

  const handleScrollMouseLeave = () => {
    setIsGrabbing(false);
    if (menuRef.current) menuRef.current.style.cursor = 'grab';
  };

  const handleScrollMouseUp = () => {
    setIsGrabbing(false);
    if (menuRef.current) menuRef.current.style.cursor = 'grab';
  };

  const handleScrollMouseMove = (e: React.MouseEvent) => {
    if (!isGrabbing || !menuRef.current) return;
    e.preventDefault();
    const y = e.pageY - menuRef.current.offsetTop;
    const walk = (y - startYScroll) * 2;
    menuRef.current.scrollTop = scrollTop - walk;
  };


  // --- 3.3 Effects (Hooks) ---
  // Close Language dropdown overlay upon clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLanguagePopupOpen(false);
      }
      if (desktopLangRef.current && !desktopLangRef.current.contains(event.target as Node)) {
        setIsDesktopLangOpen(false);
      }
    }
    if (isLanguagePopupOpen || isDesktopLangOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLanguagePopupOpen, isDesktopLangOpen]);

  // Lock parent layout body scroll when mobile interactive drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  // Handle automatic drawer close operation when parent viewport expands
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1025) closeMenu();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Retrieve active subpages options for current submenu state
  const activeNavData = MAIN_NAVIGATION.find(item => item.label === activeSubmenu);
  const activeSubpages = activeNavData?.subpages || [];


  return (
    <>
      {/* ========================================== */}
      {/* 4.1 Section: Desktop Navbar (Main Header)  */}
      {/* ========================================== */}
      <header className={`fixed top-0 left-0 w-full z-[100] transform-gpu will-change-transform transition-transform duration-500 ease-in-out bg-canvas/80 backdrop-blur-md border-b border-hairline ${
        isMobileMenuOpen 
          ? '-translate-y-full' 
          : `${(scrollDirection === 'down' || isAtBottom) ? 'max-md:-translate-y-full' : 'max-md:translate-y-0'} ${isVisible ? 'md:translate-y-0' : 'md:-translate-y-full'}`
      }`}>
        {/* 4K Support Integration: min-[2000px]:py-8 min-[2000px]:px-24 */}
        <div className="relative flex min-h-[80px] items-center justify-between px-6 md:px-12 py-4 min-[2000px]:px-24 min-[2000px]:py-8">
          
          {/* Mobile: Hamburger (Left) */}
          <div className="block min-[1025px]:hidden items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-[#ffffff] transition-opacity hover:opacity-70" 
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          {/* Logo */}
          {/* Positional alignment: centered on mobile, absolute-left on desktop via top-1/2 for precise layout height parity. */}
          <div className="flex items-center flex-shrink-0 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 min-[1025px]:left-12 min-[1025px]:translate-x-0 min-[2000px]:left-24">
            {/* 4K Support Integration: min-[2000px]:text-6xl */}
            <Link
              href="/"
              className="font-display text-2xl sm:text-4xl tracking-[3px] text-[#ffffff] transition-opacity hover:opacity-70 whitespace-nowrap min-[2000px]:text-6xl"
            >
              IA DEVELOPIX
            </Link>
          </div>

          {/* Desktop/Tablet: Center Links */}
          {/* 4K Support Integration: min-[2000px]:gap-x-10 */}
          {/* Max-width limits constraint values prevent collision with left/right absolute coordinates, allowing flex-wrap to operate natively. */}
          <nav className="hidden min-[1025px]:flex flex-wrap justify-center items-center gap-x-1 gap-y-2 mx-auto px-4 relative h-full w-full max-w-[55%] xl:max-w-[65%] min-[2000px]:gap-x-10">
            {MAIN_NAVIGATION.map((link) => {
              const isHovered = hoveredLink === link.label;
              const hasSub = link.hasSubmenu;
              
              return (
                <div 
                  key={link.label}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <div className="relative flex items-center justify-center py-2 px-4">
                    {hasSub ? (
                      <motion.div 
                        className="absolute inset-0 bg-[#ffffff] rounded-full z-0"
                        initial={false}
                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.95 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
                      />
                    ) : (
                      <motion.div 
                        className="absolute bottom-1 left-4 right-4 h-[1px] bg-[#ffffff] z-0"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
                      />
                    )}

                    {/* 4K Support Integration: min-[2000px]:text-sm */}
                    <Link
                      href={link.href}
                      className={`
                        relative z-10 font-mono text-xs font-normal uppercase tracking-[2px] whitespace-nowrap transition-colors duration-300 min-[2000px]:text-sm
                        ${isHovered && hasSub ? 'text-[#000000]' : isHovered ? 'text-[#ffffff]' : 'text-[#999999]'}
                      `}
                    >
                      {link.label}
                      {link.isComingSoon && <span className="text-[9px] text-white/40 ml-2 tracking-widest font-normal">(COMING SOON)</span>}
                    </Link>
                  </div>

                  {/* Desktop Hover Submenu */}
                  <AnimatePresence>
                    {isHovered && hasSub && (
                      <motion.div 
                        className="absolute top-full left-0 min-w-full w-max whitespace-nowrap bg-canvas/95 backdrop-blur-xl border-x border-b border-hairline rounded-none shadow-none z-[60] hidden min-[1025px]:block origin-top min-[2000px]:mt-4"
                        initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                        animate={{ 
                          height: 'auto', opacity: 1,
                          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as any, staggerChildren: 0.1, delayChildren: 0.05 } 
                        }}
                        exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as any } }}
                      >
                        <div className="flex flex-col items-start text-left pl-6 pr-8 py-6 min-[2000px]:py-10 min-[2000px]:px-12">
                           {link.subpages?.map((sub) => (
                            <motion.div key={sub} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                              <Link
                                href={getVariantHref(link.label, sub)}
                                className="block px-4 py-4 text-xs font-normal uppercase tracking-[2px] text-[#999999] hover:text-[#ffffff] hover:bg-white/5 rounded-none transition-all duration-300 group/sub min-[2000px]:text-sm min-[2000px]:py-6"
                              >
                                {sub.includes('FANPULL') ? (
                                  <>
                                    {formatModelName(sub)}
                                    <div className="text-[9px] text-white/40 mt-1 tracking-widest">(COMING SOON)</div>
                                  </>
                                ) : (
                                  formatModelName(sub)
                                )}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Icons Group */}
          {/* 4K Support Integration: min-[2000px]:space-x-10 scaling icons to w-8 h-8 */}
          {/* Absolute aligned on desktop to preserve perfect screen centering for wrapped relative nav items. */}
          <div className="flex items-center space-x-4 sm:space-x-6 flex-shrink-0 min-[1025px]:absolute min-[1025px]:right-12 min-[1025px]:top-1/2 min-[1025px]:-translate-y-1/2 min-[2000px]:right-24 min-[2000px]:space-x-10">
            <div className="hidden min-[1025px]:flex relative" ref={desktopLangRef}>
              <button onClick={() => setIsDesktopLangOpen(!isDesktopLangOpen)} className="text-[#ffffff] transition-opacity hover:opacity-70" aria-label="Language">
                <Globe className="h-5 w-5 min-[2000px]:h-8 min-[2000px]:w-8" strokeWidth={1.5} />
              </button>
              
              <AnimatePresence>
                {isDesktopLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[180px] bg-canvas border border-hairline rounded-none p-2 z-[60] flex flex-col shadow-none"
                  >
                    <button onClick={() => setIsDesktopLangOpen(false)} className="text-left font-mono text-xs uppercase tracking-[2px] text-[#999999] hover:text-[#ffffff] hover:bg-white/10 p-3 rounded-none transition-colors whitespace-nowrap">
                      EN - ENGLISH
                    </button>
                    <button onClick={() => setIsDesktopLangOpen(false)} className="text-left font-mono text-xs uppercase tracking-[2px] text-[#999999] hover:text-[#ffffff] hover:bg-white/10 p-3 rounded-none transition-colors whitespace-nowrap">
                      TH - THAI
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="hidden min-[1025px]:flex text-[#ffffff] transition-opacity hover:opacity-70" aria-label="User Account">
              <User className="h-5 w-5 min-[2000px]:h-8 min-[2000px]:w-8" strokeWidth={1.5} />
            </button>
            <button className="text-[#ffffff] transition-opacity hover:opacity-70" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5 md:h-5 md:w-5 min-[2000px]:h-8 min-[2000px]:w-8" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 4.2 Section: Mobile Drawer Overlay         */}
      {/* ========================================== */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-canvas/80 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* ========================================== */}
      {/* 4.3 Section: Mobile Drawer (Slide Menu)    */}
      {/* ========================================== */}
      <motion.div 
        drag={isMobile ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.7 }}
        dragMomentum={true}
        onDragEnd={(e, info) => {
          // Check momentum trajectory (projected final position after inertia)
          const projectedY = info.offset.y + info.velocity.y * 0.2;
          if (info.offset.y > 150 || projectedY > 150) {
            closeMenu();
          }
        }}
        variants={{
          open: { 
            y: 0, 
            x: 0,
            transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
          },
          closedBottom: {
            y: "100%",
            x: 0,
            transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
          },
          closedLeft: {
            x: "-100%",
            y: 0,
            transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
          }
        }}
        initial={false}
        animate={isMobileMenuOpen ? "open" : (isMobile ? "closedBottom" : "closedLeft")}
        onAnimationComplete={(variant) => {
          if (variant === "closedBottom" || variant === "closedLeft") {
            setTimeout(triggerScrollUpdate, 50);
          }
        }}
        className={`fixed z-[120] flex flex-col bg-canvas transform-gpu will-change-transform
          bottom-0 left-0 w-full h-[100dvh] max-h-[85dvh] rounded-none border-t border-hairline shadow-none
          max-md:landscape:top-0 max-md:landscape:bottom-auto max-md:landscape:w-[350px] max-md:landscape:h-[100dvh] max-md:landscape:max-h-[100dvh] max-md:landscape:rounded-none max-md:landscape:border-t-0 max-md:landscape:border-r max-md:landscape:border-hairline max-md:landscape:shadow-none
          md:top-0 md:bottom-auto md:w-[550px] md:h-[100dvh] md:rounded-none md:border-r md:border-hairline md:shadow-none md:max-h-[100dvh] md:border-t-0
          [@media(max-height:500px)]:w-[480px]
        `}
      >
        {/* Drawer Header & Handle */}
        <div className="shrink-0">
          <div 
            className="w-full block md:hidden pt-4 pb-2 cursor-grab active:cursor-grabbing shrink-0"
          >
            <div className="w-12 h-1.5 bg-[#ffffff]/30 rounded-full mx-auto" />
          </div>
          <div className="flex items-center justify-between px-6 pb-6 pt-2 md:pt-6 border-b border-hairline shrink-0">
            <span className="font-display text-2xl text-[#ffffff] md:text-3xl tracking-[3px]">MENU</span>
            <button 
              onClick={closeMenu}
              className="flex items-center justify-center h-10 w-10 text-[#ffffff] hover:bg-white/10 transition-colors md:scale-150"
              aria-label="Close Menu"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Scrollable Links Area */}
        <div 
          ref={menuRef}
          onMouseDown={handleScrollMouseDown}
          onMouseLeave={handleScrollMouseLeave}
          onMouseUp={handleScrollMouseUp}
          onMouseMove={handleScrollMouseMove}
          className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto min-h-0 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:transition-colors"
        >
          <div className="relative flex flex-col pt-0 max-[950px]:landscape:pt-0">
            <AnimatePresence initial={false} mode="wait">
              {!activeSubmenu ? (
                  <motion.nav 
                  key="main"
                  initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="px-8 space-y-4"
                >
                  <div key="HOMENAV">
                    <Link
                      href="/"
                      onClick={closeMenu}
                      className="block py-2 text-[18px] md:text-[20px] font-normal uppercase tracking-[2px] leading-none text-[#999999] hover:text-[#ffffff] transition-colors text-left"
                    >
                      HOME
                    </Link>
                  </div>
                  {MAIN_NAVIGATION.map((link) => (
                    <div key={link.label}>
                      {link.hasSubmenu ? (
                        <button
                          onClick={() => setActiveSubmenu(link.label)}
                          className="flex items-center justify-between w-full py-2 text-[18px] md:text-[20px] font-normal uppercase tracking-[2px] leading-none text-[#999999] hover:text-[#ffffff] transition-colors text-left group"
                        >
                          <span>
                            {link.label}
                            {link.isComingSoon && <span className="text-[10px] text-white/40 ml-2 tracking-widest font-normal">(COMING SOON)</span>}
                          </span>
                          <ChevronRight className="text-gray-600 group-hover:text-[#ffffff] transition-colors md:scale-125 md:origin-center md:ml-4" size={18} />
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="block py-2 text-[18px] md:text-[20px] font-normal uppercase tracking-[2px] leading-none text-[#999999] hover:text-[#ffffff] transition-colors text-left"
                        >
                          {link.label}
                          {link.isComingSoon && <span className="text-[10px] text-white/40 ml-2 tracking-widest font-normal">(COMING SOON)</span>}
                        </Link>
                      )}
                    </div>
                  ))}
                </motion.nav>
              ) : (
                <motion.nav 
                  key="submenu"
                  initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="px-8"
                >
                  <button 
                    onClick={() => setActiveSubmenu(null)}
                    className="flex items-center gap-3 text-[#999999] uppercase font-normal text-xs tracking-[2px] mb-6 hover:text-[#ffffff] transition-colors"
                  >
                    <ChevronLeft size={24} /> BACK
                  </button>
                  <div className="flex flex-col space-y-2">
                    <Link
                      href={`/products/${activeSubmenu.toLowerCase()}`}
                      onClick={closeMenu}
                      className="block py-2 text-[18px] md:text-[20px] font-normal uppercase tracking-[2px] leading-none text-[#ffffff] transition-colors text-left border-b border-hairline"
                    >
                      ALL {activeSubmenu}
                    </Link>
                    {activeSubpages.map((subpage) => (
                      <Link
                        key={subpage}
                        href={getVariantHref(activeSubmenu, subpage)}
                        onClick={closeMenu}
                        className="block py-2 text-[18px] md:text-[20px] font-normal uppercase tracking-[2px] leading-none text-[#999999] hover:text-[#ffffff] transition-colors text-left"
                      >
                        {subpage.includes('FANPULL') ? (
                          <>{formatModelName(subpage)} <span className="text-[10px] text-white/40 block tracking-widest">(COMING SOON)</span></>
                        ) : (
                          formatModelName(subpage)
                        )}
                      </Link>
                    ))}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Drawer Footer (Lang, Login, Socials) */}
        <div className="flex flex-wrap items-center w-full px-6 pb-6 pt-6 border-t border-hairline mb-safe md:mb-0 md:shrink-0 md:mt-auto gap-y-6 [@media(max-height:500px)]:flex-nowrap [@media(max-height:500px)]:gap-y-0 [@media(max-height:500px)]:px-4 [@media(max-height:500px)]:justify-between">
          <div className="relative w-full order-1 [@media(max-height:500px)]:w-auto [@media(max-height:500px)]:order-2 [@media(max-height:500px)]:mx-2" ref={langDropdownRef}>
            <AnimatePresence>
              {isLanguagePopupOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-2 left-0 w-full mb-2 bg-canvas border border-hairline rounded-none p-4 z-50 whitespace-nowrap"
                >
                  <div className="flex flex-col space-y-4">
                    <button className="text-left font-mono text-xs text-[#ffffff] py-2 hover:bg-white/5 px-3 rounded-none transition-colors whitespace-nowrap">EN - ENGLISH</button>
                    <button className="text-left font-mono text-xs text-[#999999] py-2 hover:bg-white/5 px-3 rounded-none transition-colors whitespace-nowrap">TH - THAI</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsLanguagePopupOpen(!isLanguagePopupOpen)}
              className="flex items-center justify-between w-full border border-hairline bg-canvas rounded-pill px-5 py-3 hover:bg-white/5 transition-colors group whitespace-nowrap"
            >
              <div className="flex items-center space-x-3">
                <Globe size={18} className="text-[#999999]" />
                <span className="text-xs text-[#ffffff] whitespace-nowrap font-mono tracking-[2px]">THAI / ENGLISH</span>
              </div>
              <ChevronDown size={16} className="text-[#999999]" />
            </button>
          </div>

          <button className="bg-transparent border border-white text-white text-xs font-normal tracking-[2.5px] uppercase rounded-pill px-8 py-3 hover:bg-white hover:text-black transition-colors w-auto order-2 [@media(max-height:500px)]:order-1 [@media(max-height:500px)]:scale-90 [@media(max-height:500px)]:origin-left md:transform md:scale-110 md:origin-left">
            LOGIN
          </button>
          
          <div className="flex items-center space-x-5 w-auto order-3 ml-auto [@media(max-height:500px)]:ml-0 [@media(max-height:500px)]:scale-90 [@media(max-height:500px)]:origin-right md:transform md:scale-110 md:origin-right">
            <Instagram size={24} className="text-[#999999] hover:text-[#ffffff] transition-colors cursor-pointer" />
            <Youtube size={24} className="text-[#999999] hover:text-[#ffffff] transition-colors cursor-pointer" />
            <MessageCircle size={24} className="text-[#999999] hover:text-[#ffffff] transition-colors cursor-pointer" />
          </div>
        </div>
      </motion.div>

      {/* ========================================== */}
      {/* 4.4 Section: Mobile Bottom Navigation      */}
      {/* ========================================== */}
      <nav className={`flex md:hidden fixed bottom-0 left-0 right-0 w-full max-w-[100%] z-[60] bg-canvas border-t border-hairline pb-safe transition-transform duration-300 ease-in-out ${(scrollDirection === 'down' || isAtBottom) ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-around items-center w-full px-2 py-3">
          <button className="flex flex-col items-center justify-center text-[#999999] hover:text-[#ffffff] transition-colors w-16">
            <Home size={24} strokeWidth={1} />
            <span className="text-[10px] uppercase mt-1 font-mono tracking-[2px] whitespace-nowrap text-[#999999]">HOME</span>
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center justify-center text-[#999999] hover:text-[#ffffff] transition-colors w-16">
            <Menu size={24} strokeWidth={1} />
            <span className="text-[10px] uppercase mt-1 font-mono tracking-[2px] whitespace-nowrap text-[#999999]">MENU</span>
          </button>
          <Link href="/store" className="flex flex-col items-center justify-center text-[#999999] hover:text-[#ffffff] transition-colors w-16">
            <ShoppingBag size={24} strokeWidth={1} />
            <span className="text-[10px] uppercase mt-1 font-mono tracking-[2px] whitespace-nowrap text-[#999999]">STORE</span>
          </Link>
          <button className="flex flex-col items-center justify-center text-[#999999] hover:text-[#ffffff] transition-colors w-16">
            <ShoppingCart size={24} strokeWidth={1} />
            <span className="text-[10px] uppercase mt-1 font-mono tracking-[2px] whitespace-nowrap text-[#999999]">CART</span>
          </button>
          <button className="flex flex-col items-center justify-center text-[#999999] hover:text-[#ffffff] transition-colors w-16">
            <User size={24} strokeWidth={1} />
            <span className="text-[10px] uppercase mt-1 font-mono tracking-[2px] whitespace-nowrap text-[#999999]">ACCOUNT</span>
          </button>
        </div>
      </nav>
    </>
  );
}
