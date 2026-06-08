/**
 * @file src/components/ui/deployment-gallery.tsx
 * @description Highly optimized full-width image slideshow component with swipe gesture capabilities.
 *              Built utilizing Framer Motion for high-fidelity hardware-accelerated transitions.
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKY_IMAGES } from '@/src/constants/home-data';

/**
 * Image gallery showing international field deployments of robotics platforms.
 * Supports fluid slides, automated progression, hovering pauses, and mobile touch swiping.
 */
export const DeploymentGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Minimum touch sweep range (pixels) required to trigger transition.
  const minSwipeDistance = 50;

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SKY_IMAGES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SKY_IMAGES.length) % SKY_IMAGES.length);
  }, []);

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
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // --- Auto-play Tick Sequence ---

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 4000);
  }, [handleNext]);

  useEffect(() => {
    if (!isHovered) {
      startTimer();
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, startTimer]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div 
      className="relative w-full h-[60vh] lg:h-[70vh] group overflow-hidden bg-[#000000] cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStartEvent}
      onTouchMove={onTouchMoveEvent}
      onTouchEnd={onTouchEndEvent}
    >
      <div className="relative w-full h-full pointer-events-none">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
            whileInView={{ scale: 1.08 }}
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
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isHovered && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handlePrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center text-white/80 hover:text-white transition-colors z-30 outline-none hidden md:flex drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              aria-label="Previous slide"
            >
              <ChevronLeft strokeWidth={1} className="w-12 h-12" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleNext}
              className="absolute right-4 md:left-auto md:right-8 top-1/2 -translate-y-1/2 flex items-center justify-center text-white/80 hover:text-white transition-colors z-30 outline-none hidden md:flex drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              aria-label="Next slide"
            >
              <ChevronRight strokeWidth={1} className="w-12 h-12" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-4">
        {SKY_IMAGES.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentIndex(idx)} 
            className={`w-[6px] h-[6px] rounded-[9999px] transition-colors duration-300 outline-none ${idx === currentIndex ? 'bg-[#ffffff]' : 'bg-[#444444]'}`} 
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
