/**
 * @file src/features/home/components/deployment-gallery.tsx
 * @description Full-width deployment slideshow with the original adjacent-slide
 *              transition, autoplay, touch swipe, reveal mask, and zoom effect.
 */

'use client';

import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { SKY_IMAGES } from '@/src/constants/home-data';
import { galleryVariants } from '../animations';
import { useSwipe, useTabVisibility, useAutoplay } from '../hooks';

const GALLERY_AUTOPLAY_INTERVAL = 4000;
const GALLERY_ANIMATION_LOCK_MS = 800;
const GALLERY_TRANSITION_SECONDS = 1.4;
const GALLERY_ZOOM_SECONDS = 4.5;

/**
 * Image gallery showing international field deployments of robotics platforms.
 * Preserves the original Home Gallery interaction model from Git history.
 */
export const DeploymentGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInView = useInView(containerRef, { margin: '200px 0px' });

  const triggerNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((previousIndex) => (previousIndex + 1) % SKY_IMAGES.length);
  }, []);

  const triggerPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((previousIndex) => (previousIndex - 1 + SKY_IMAGES.length) % SKY_IMAGES.length);
  }, []);

  const isTabVisible = useTabVisibility();
  const { elapsedTime, resetAutoplay } = useAutoplay({
    interval: GALLERY_AUTOPLAY_INTERVAL,
    isActive: !isHovered && isTabVisible && isInView,
    onIntervalComplete: triggerNext,
  });

  const unlockAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, GALLERY_ANIMATION_LOCK_MS);
  };

  const onNextClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    triggerNext();
    resetAutoplay();
    unlockAnimation();
  };

  const onPrevClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    triggerPrev();
    resetAutoplay();
    unlockAnimation();
  };

  const onDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetAutoplay();
    unlockAnimation();
  };

  const swipeHandlers = useSwipe({
    onSwipeLeft: onNextClick,
    onSwipeRight: onPrevClick,
    onTouchStartTrigger: () => setIsHovered(true),
    onTouchEndTrigger: () => setIsHovered(false),
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] lg:h-[70vh] group overflow-hidden bg-canvas cursor-default"
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
        transition={{ duration: GALLERY_TRANSITION_SECONDS, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute inset-0 bg-canvas z-50 origin-right pointer-events-none"
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
            transition={{ duration: GALLERY_TRANSITION_SECONDS, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <motion.div
              key={`zoom-${currentIndex}`}
              initial={{ scale: 1.03 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: GALLERY_ZOOM_SECONDS, ease: 'linear' }}
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
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 flex items-center justify-center text-primary/80 hover:text-primary transition-colors z-30 outline-none hidden md:flex drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft strokeWidth={1} className="w-12 h-12" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onNextClick}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex items-center justify-center text-primary/80 hover:text-primary transition-colors z-30 outline-none hidden md:flex drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight strokeWidth={1} className="w-12 h-12" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4">
        {SKY_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`relative h-1.5 overflow-hidden rounded-full outline-none cursor-pointer transition-[width,background-color] duration-300 ${
              index === currentIndex
                ? 'w-10 bg-primary'
                : 'w-2 bg-muted-soft hover:bg-muted'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <div
                style={{ width: `${(elapsedTime / GALLERY_AUTOPLAY_INTERVAL) * 100}%` }}
                className="absolute top-0 left-0 h-full bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Background image preloader to avoid black screen flashing during slide transitions */}
      <div className="hidden" aria-hidden="true">
        {SKY_IMAGES.map((src, index) => (
          <Image
            key={`preload-${index}`}
            src={`${src}?q=80&w=2000&auto=format&fit=crop`}
            alt="preload"
            width={10}
            height={10}
            priority
          />
        ))}
      </div>
    </div>
  );
};
