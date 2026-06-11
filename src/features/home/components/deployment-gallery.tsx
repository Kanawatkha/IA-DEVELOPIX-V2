/**
 * @file src/components/ui/deployment-gallery.tsx
 * @description Highly optimized full-width image slideshow component with swipe gesture capabilities.
 *              Built utilizing Framer Motion for high-fidelity hardware-accelerated transitions.
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { SKY_IMAGES } from '@/src/constants/home-data';

// Custom adjacent slide transition variants
const galleryVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    x: '0%',
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
  }),
};

/**
 * Image gallery showing international field deployments of robotics platforms.
 * Supports fluid slides, automated progression, hovering pauses, and mobile touch swiping.
 */
export const DeploymentGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0); // Accumulated milliseconds for the active slide duration
  const [isAnimating, setIsAnimating] = useState(false); // Throttle flag to lock navigation during slide transitions
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px" });
  
  // Minimum touch sweep range (pixels) required to trigger transition.
  const minSwipeDistance = 50;

  const triggerNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SKY_IMAGES.length);
    setElapsedTime(0);
  }, []);

  const triggerPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SKY_IMAGES.length) % SKY_IMAGES.length);
    setElapsedTime(0);
  }, []);

  // --- Click / Navigation Handlers (with 800ms animation lock) ---

  const onNextClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    triggerNext();
    setTimeout(() => setIsAnimating(false), 800);
  };

  const onPrevClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    triggerPrev();
    setTimeout(() => setIsAnimating(false), 800);
  };

  const onDotClick = (idx: number) => {
    if (isAnimating || idx === currentIndex) return;
    setIsAnimating(true);
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    setElapsedTime(0);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // --- Mobile Touch Gestures Mapping ---

  const onTouchStartEvent = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsHovered(true); // Temporarily halt auto playback cycle
  };

  const onTouchMoveEvent = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndEvent = () => {
    setIsHovered(false); // Resume playback once user releases touch
    if (!touchStart || !touchEnd || isAnimating) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setIsAnimating(true);
      triggerNext();
      setTimeout(() => setIsAnimating(false), 800);
    } else if (isRightSwipe) {
      setIsAnimating(true);
      triggerPrev();
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  // --- Browser Tab Visibility tracking ---

  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // --- Frame Tick Loop (Autoplay Timer) ---

  useEffect(() => {
    const isPaused = isHovered || !isTabVisible || !isInView;
    if (isPaused) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      setElapsedTime((prev) => {
        const next = prev + delta;
        return next >= 4000 ? 4000 : next;
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isTabVisible, isInView]);

  // --- Active Slide Progression Trigger ---

  useEffect(() => {
    if (elapsedTime >= 4000) {
      triggerNext();
    }
  }, [elapsedTime, triggerNext]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[60vh] lg:h-[70vh] group overflow-hidden bg-[#000000] cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStartEvent}
      onTouchMove={onTouchMoveEvent}
      onTouchEnd={onTouchEndEvent}
    >
      {/* Scroll Reveal Mask */}
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
            {/* Ken Burns zoom animation container */}
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

      {/* Dynamic progress bar navigation indicators */}
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
                  style={{ width: `${(elapsedTime / 4000) * 100}%` }}
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
