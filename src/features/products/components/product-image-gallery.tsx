'use client';

/**
 * @file product-image-gallery.tsx
 * @description Responsive multi-layout product image gallery with Lightbox.
 *
 * Handles three layout modes:
 *  - Mobile (<1024px): horizontal snap carousel with pagination dots
 *  - Tablet (1024-1279px): 2-column grid
 *  - Desktop (≥1280px): sticky large left image + 4-image right column
 *
 * Also provides a full-screen Lightbox with:
 *  - Pinch/click to zoom (3.5× scale)
 *  - Drag to pan when zoomed
 *  - Swipe left/right to navigate
 *  - Swipe down to close
 *  - Double-click/tap to toggle zoom
 *
 * Used in:
 *  - products/linefollower/nofan-15/page.tsx
 *  - products/linefollower/nofan-18/page.tsx
 *  - products/mission/go/page.tsx
 *  - products/mission/pro/page.tsx
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { childVariants, parentVariants } from '@/src/lib/design/variants';

interface ProductImageGalleryProps {
  images: string[];
  modelName: string;
  className?: string;
}

const ZOOM_SCALE = 3.5;

export function ProductImageGallery({ images, modelName, className = '' }: ProductImageGalleryProps) {
  // Mobile gallery state
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const innerBoxRef = useRef<HTMLDivElement>(null);
  const preventClickRef = useRef(false);
  const dragAxisRef = useRef<'x' | 'y' | null>(null);
  const isAnimatingRef = useRef(false);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxOpen]);

  // ── Lightbox controls ────────────────────────────────────────────
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setShowUI(true);
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
    setDragStart(null);
    preventClickRef.current = false;
    dragAxisRef.current = null;
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
    setIsDragging(false);
    setDragStart(null);
    preventClickRef.current = false;
    dragAxisRef.current = null;
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
  };

  // ── Lightbox pointer drag ────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isAnimatingRef.current) return;
    e.preventDefault();
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(false);
    dragAxisRef.current = null;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isAnimatingRef.current || !dragStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    const isNowDragging = isDragging || Math.abs(dx) > 5 || Math.abs(dy) > 5;

    if (!isDragging && isNowDragging) {
      setIsDragging(true);
      if (!isZoomed && !dragAxisRef.current) {
        dragAxisRef.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }
    }

    if (isNowDragging) {
      if (!isZoomed) {
        if (dragAxisRef.current === 'x') {
          setPan((prev) => ({ x: prev.x + dx, y: 0 }));
        } else if (dragAxisRef.current === 'y') {
          setPan((prev) => ({ x: 0, y: prev.y + dy }));
        } else {
          setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        }
      } else {
        setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      }
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragStart) return;

    if (isDragging) {
      if (!isZoomed) {
        const totalDx = pan.x;
        const totalDy = pan.y;
        if (Math.abs(totalDy) > 150) {
          closeLightbox();
        } else if (totalDx > 100) {
          isAnimatingRef.current = true;
          const offset = window.innerWidth >= 1280 ? window.innerWidth : window.innerWidth + 32;
          setPan({ x: offset, y: 0 });
          setTimeout(() => {
            if (innerBoxRef.current) innerBoxRef.current.style.transition = 'none';
            prevImage();
            setPan({ x: 0, y: 0 });
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (innerBoxRef.current) innerBoxRef.current.style.transition = '';
                isAnimatingRef.current = false;
              });
            });
          }, 300);
        } else if (totalDx < -100) {
          isAnimatingRef.current = true;
          const offset = window.innerWidth >= 1280 ? window.innerWidth : window.innerWidth + 32;
          setPan({ x: -offset, y: 0 });
          setTimeout(() => {
            if (innerBoxRef.current) innerBoxRef.current.style.transition = 'none';
            nextImage();
            setPan({ x: 0, y: 0 });
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (innerBoxRef.current) innerBoxRef.current.style.transition = '';
                isAnimatingRef.current = false;
              });
            });
          }, 300);
        } else {
          setPan({ x: 0, y: 0 });
        }
      } else {
        if (innerBoxRef.current) {
          const vw = window.innerWidth;
          const vh = window.innerHeight;
          const w = innerBoxRef.current.offsetWidth;
          const h = innerBoxRef.current.offsetHeight;
          const maxPanX = Math.max(0, (w * ZOOM_SCALE - vw) / 2);
          const maxPanY = Math.max(0, (h * ZOOM_SCALE - vh) / 2);
          setPan((prev) => ({
            x: Math.max(-maxPanX, Math.min(maxPanX, prev.x)),
            y: Math.max(-maxPanY, Math.min(maxPanY, prev.y)),
          }));
        }
      }
      preventClickRef.current = true;
      setTimeout(() => { preventClickRef.current = false; }, 100);
      setIsDragging(false);
    }

    setDragStart(null);
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    if (preventClickRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    const toggleZoom = () => {
      if (!isZoomed) {
        const offsetX = clientX - window.innerWidth / 2;
        const offsetY = clientY - window.innerHeight / 2;
        let targetX = -offsetX * ZOOM_SCALE;
        let targetY = -offsetY * ZOOM_SCALE;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const w = innerBoxRef.current ? innerBoxRef.current.offsetWidth : vw;
        const h = innerBoxRef.current ? innerBoxRef.current.offsetHeight : vh;
        const maxPanX = Math.max(0, (w * ZOOM_SCALE - vw) / 2);
        const maxPanY = Math.max(0, (h * ZOOM_SCALE - vh) / 2);
        const clampedX = Math.max(-maxPanX, Math.min(maxPanX, targetX));
        const clampedY = Math.max(-maxPanY, Math.min(maxPanY, targetY));
        setIsZoomed(true);
        setPan({ x: clampedX, y: clampedY });
      } else {
        setIsZoomed(false);
        setPan({ x: 0, y: 0 });
      }
    };

    if (window.innerWidth >= 1024) {
      toggleZoom();
    } else {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
        toggleZoom();
      } else {
        clickTimeoutRef.current = setTimeout(() => {
          setShowUI((prev) => !prev);
          clickTimeoutRef.current = null;
        }, 300);
      }
    }
  };

  // ── Mobile gallery scroll tracking ──────────────────────────────
  const handleGalleryScroll = () => {
    if (!galleryRef.current) return;
    const { scrollLeft } = galleryRef.current;
    const itemElement = galleryRef.current.children[0] as HTMLElement;
    if (!itemElement) return;
    const itemWidth = itemElement.offsetWidth;
    const gap = typeof window !== 'undefined' && window.innerWidth >= 640 ? 24 : 16;
    const index = Math.round(scrollLeft / (itemWidth + gap));
    setActiveIndex(Math.min(index, images.length - 1));
  };

  const scrollToIndex = (idx: number) => {
    if (!galleryRef.current) return;
    const item = galleryRef.current.children[idx] as HTMLElement;
    if (item) {
      galleryRef.current.scrollTo({
        left: item.offsetLeft - (galleryRef.current.clientWidth - item.offsetWidth) / 2,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* ── MOBILE CAROUSEL (<1024px) ─────────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={childVariants}
        className={`flex flex-col lg:hidden w-full order-1 gap-4 ${className}`}
      >
        <div
          ref={galleryRef}
          onScroll={handleGalleryScroll}
          onMouseDown={(e) => {
            isDownRef.current = true;
            startXRef.current = e.pageX - galleryRef.current!.offsetLeft;
            scrollLeftRef.current = galleryRef.current!.scrollLeft;
          }}
          onMouseLeave={() => { isDownRef.current = false; }}
          onMouseUp={() => { isDownRef.current = false; }}
          onMouseMove={(e) => {
            if (!isDownRef.current) return;
            e.preventDefault();
            const x = e.pageX - galleryRef.current!.offsetLeft;
            const walk = (x - startXRef.current) * 1.5;
            galleryRef.current!.scrollLeft = scrollLeftRef.current - walk;
          }}
          className="flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full gap-4 sm:gap-6"
        >
          {images.map((src, idx) => (
            <div
              key={idx}
              className={`relative snap-always shrink-0 w-[90%] sm:w-[85%] aspect-square object-contain bg-[#f5f5f7] rounded-none p-4 sm:p-8 ${
                idx === 0 ? 'snap-start' : idx === images.length - 1 ? 'snap-end' : 'snap-center'
              }`}
            >
              <button
                onClick={(e) => { e.stopPropagation(); openLightbox(idx); }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#111111]/80 backdrop-blur-md border border-[#333333] text-white flex items-center justify-center hover:bg-[#222222] transition-colors z-10"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${modelName} view ${idx + 1}`}
                className="w-full h-full object-contain mix-blend-multiply pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          <div className="shrink-0 w-[5%] sm:w-[7.5%]" />
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-2 mt-1 w-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-4 bg-[#ffffff]' : 'w-1.5 bg-[#444444]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* ── TABLET GRID (1024px–1279px) ───────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
        className="hidden lg:grid xl:hidden col-span-7 grid-cols-2 gap-4 md:gap-6 xl:gap-8 2xl:gap-10 order-none"
      >
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            variants={childVariants}
            onClick={() => openLightbox(idx)}
            className={`${idx === 0 ? 'col-span-1' : 'col-span-1'} aspect-square rounded-none overflow-hidden bg-[#f5f5f7] p-4 lg:p-6 flex items-center justify-center cursor-pointer`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${modelName} view ${idx + 1}`}
              className="w-full h-full object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ── DESKTOP: sticky left image (≥1280px) ─────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={childVariants}
        className="hidden xl:block col-span-5 sticky top-[90px] xl:top-[110px] h-[calc(100vh-110px)] xl:h-[calc(100vh-140px)] order-none"
      >
        <div
          onClick={() => openLightbox(0)}
          className="w-full h-full rounded-none overflow-hidden bg-[#f5f5f7] p-4 lg:p-8 flex items-center justify-center cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[0]}
            alt={`${modelName} main`}
            className="w-full h-full object-contain mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {/* ── DESKTOP: right thumbnail column (≥1280px) ────────────── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
        className="hidden xl:flex flex-col col-span-3 gap-4 md:gap-6 xl:gap-8 2xl:gap-10 order-none"
      >
        {images.slice(1).map((src, idx) => (
          <motion.div
            key={idx + 1}
            variants={childVariants}
            onClick={() => openLightbox(idx + 1)}
            className="relative w-full aspect-square rounded-none overflow-hidden bg-[#f5f5f7] p-4 lg:p-6 flex items-center justify-center cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${modelName} view ${idx + 2}`}
              className="w-full h-full object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* ── LIGHTBOX ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClick={handleImageClick}
            style={{ cursor: isZoomed ? 'zoom-out' : isDragging ? 'grabbing' : 'zoom-in', touchAction: 'none' }}
          >
            {/* Image */}
            <div
              ref={innerBoxRef}
              className="w-full h-full xl:max-w-[80vw] xl:max-h-[90vh] flex items-center justify-center"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${isZoomed ? ZOOM_SCALE : 1})`,
                transition: isDragging ? 'none' : 'transform 0.3s ease',
                willChange: 'transform',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[lightboxIndex]}
                alt={`${modelName} view ${lightboxIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain mix-blend-normal select-none pointer-events-none"
                draggable={false}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* UI overlay (conditionally visible) */}
            <AnimatePresence>
              {showUI && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* Close button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10 pointer-events-auto"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Prev button */}
                  {images.length > 1 && (
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors pointer-events-auto"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  )}

                  {/* Next button */}
                  {images.length > 1 && (
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors pointer-events-auto"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}

                  {/* Counter */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[2px] text-white/60 uppercase pointer-events-none">
                    {lightboxIndex + 1} / {images.length}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
