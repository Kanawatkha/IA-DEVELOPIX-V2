/**
 * @file src/features/home/components/deployment-gallery.tsx
 * @description Highly optimized full-width image slideshow component with swipe gesture capabilities.
 *              Built utilizing Framer Motion for high-fidelity hardware-accelerated transitions.
 */

'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { SKY_IMAGES } from '@/src/constants/home-data';
import { galleryVariants } from '../animations';
import { useSwipe, useTabVisibility, useAutoplay } from '../hooks';

/**
 * Autoplay slide interval duration (in milliseconds) used to cycle graphics.
 */
const GALLERY_AUTOPLAY_INTERVAL = 4000;

/**
 * Image gallery showing international field deployments of robotics platforms.
 * Supports fluid slides, automated progression, hovering pauses, and mobile touch swiping.
 */
export const DeploymentGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); 

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px" });

  const triggerNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SKY_IMAGES.length);
  }, []);

  const triggerPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SKY_IMAGES.length) % SKY_IMAGES.length);
  }, []);

  const onNextClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    triggerNext();
    resetAutoplay();
    setTimeout(() => setIsAnimating(false), 800);
  };

  const onPrevClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    triggerPrev();
    resetAutoplay();
    setTimeout(() => setIsAnimating(false), 800);
  };

  const onDotClick = (idx: number) => {
    if (isAnimating || idx === currentIndex) return;
    setIsAnimating(true);
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    resetAutoplay();
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Custom hook to observe page tab focus state.
  const isTabVisible = useTabVisibility();

  // Custom hook to coordinate touch swipe drag coordinates.
  const swipeHandlers = useSwipe({
    onSwipeLeft: onNextClick,
    onSwipeRight: onPrevClick,
    onTouchStartTrigger: () => setIsHovered(true),
    onTouchEndTrigger: () => setIsHovered(false),
  });

  // Custom hook to coordinate requestAnimationFrame slide progression timers.
  const { elapsedTime, resetAutoplay } = useAutoplay({
    interval: GALLERY_AUTOPLAY_INTERVAL,
    isActive: !isHovered && isTabVisible && isInView,
    onIntervalComplete: triggerNext,
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[60vh] lg:h-[70vh] group overflow-hidden bg-[#000000] cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={swipeHandlers.onTouchStart}
      onTouchMove={swipeHandlers.onTouchMove}
      onTouchEnd={swipeHandlers.onTouchEnd}
    >
      <motion.div
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute inset-0 bg-[#000000] z-50 origin-right pointer-events-none"
      />

      <div className="relative w-full h-full pointer-events-none">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={galleryVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <motion.div
              key={`zoom-${currentIndex}`}
              initial={{ scale: 1.03 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 4.5, ease: 'linear' }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={`${SKY_IMAGES[currentIndex]}?q=80&w=2000&auto=format&fit=crop`}
                alt={`Sky Deployment ${currentIndex + 1}`}
                fill
                sizes="100vw"
                referrerPolicy="no-referrer"
                className="object-cover"
                priority={currentIndex === 0}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isHovered && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onPrevClick}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center text-white/80 hover:text-white transition-colors z-30 outline-none hidden md:flex drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft strokeWidth={1} className="w-12 h-12" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onNextClick}
              className="absolute right-4 md:left-auto md:right-8 top-1/2 -translate-y-1/2 flex items-center justify-center text-white/80 hover:text-white transition-colors z-30 outline-none hidden md:flex drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight strokeWidth={1} className="w-12 h-12" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-4" 
        style={{ flexDirection: 'row', direction: 'ltr' }}
      >
        {SKY_IMAGES.map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button 
              key={idx} 
              onClick={() => onDotClick(idx)} 
              className="w-12 h-1 bg-[#444444]/60 relative overflow-hidden outline-none cursor-pointer rounded-full" 
              aria-label={`Go to slide ${idx + 1}`}
            >
              {isActive && (
                <div
                  style={{ width: `${(elapsedTime / GALLERY_AUTOPLAY_INTERVAL) * 100}%` }}
                  className="absolute top-0 left-0 h-full bg-[#ffffff]"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
