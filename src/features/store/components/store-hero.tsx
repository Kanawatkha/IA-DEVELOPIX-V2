/**
 * @file store-hero.tsx
 * @description Cinema-scale categories carousel for the StorePage, fully aligned
 *              with the Bugatti Design System tokens and principles.
 */

'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import * as ty from '@/src/lib/design/typography';
import { parentVariants, childVariants } from '@/src/lib/design/variants';

export interface HeroCategory {
  id: number;
  name: string;
  isComingSoon: boolean;
  image: string;
}

interface StoreHeroProps {
  categories: HeroCategory[];
}

export function StoreHero({ categories }: StoreHeroProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Extend elements to simulate infinite scrolling loop gently without overpopulating the DOM
  const extendedCategories = useMemo(() => {
    if (categories.length === 0) return [];
    // Repeat categories 5 times to provide a smooth horizontal roll-over buffer
    return Array(5).fill(categories).flat();
  }, [categories]);

  const scrollTo = useCallback((index: number) => {
    if (scrollRef.current && scrollRef.current.children[index]) {
      const child = scrollRef.current.children[index] as HTMLElement;
      const containerWidth = scrollRef.current.clientWidth;
      const childLeft = child.offsetLeft;
      const childWidth = child.clientWidth;
      const scrollPos = childLeft - (containerWidth / 2) + (childWidth / 2);

      scrollRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth',
      });
    }
  }, []);

  // Synchronize active index with the centered element during scroll
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    if (children.length === 0) return;

    const containerCenter = scrollLeft + (scrollRef.current.clientWidth / 2);
    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + (child.clientWidth / 2);
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (activeIndex !== closestIndex) {
      setActiveIndex(closestIndex);
    }
  }, [activeIndex]);

  // Set initial scroll centering onto the middle loop segment to achieve infinite illusion
  useEffect(() => {
    if (scrollRef.current && extendedCategories.length > 0) {
      const startIdx = Math.floor(extendedCategories.length / 2);
      const child = scrollRef.current.children[startIdx] as HTMLElement;
      if (child) {
        const containerWidth = scrollRef.current.clientWidth;
        const scrollPos = child.offsetLeft - (containerWidth / 2) + (child.clientWidth / 2);
        
        // Instant non-animated placement on mount
        scrollRef.current.scrollTo({ left: scrollPos, behavior: 'auto' });
        setActiveIndex(startIdx);
      }
    }

    const slider = scrollRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        slider.removeEventListener('scroll', handleScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extendedCategories.length]);

  // Automatically adjust alignment on window resize events to keep active element perfectly centered
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        scrollTo(activeIndex);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [activeIndex, scrollTo]);

  const nextSlide = useCallback(() => {
    if (extendedCategories.length === 0) return;
    setActiveIndex((prev) => {
      const next = (prev + 1) % extendedCategories.length;
      scrollTo(next);
      return next;
    });
  }, [extendedCategories.length, scrollTo]);

  const prevSlide = useCallback(() => {
    if (extendedCategories.length === 0) return;
    setActiveIndex((prev) => {
      const prevIdx = (prev - 1 + extendedCategories.length) % extendedCategories.length;
      scrollTo(prevIdx);
      return prevIdx;
    });
  }, [extendedCategories.length, scrollTo]);

  const handleDotClick = useCallback((targetOriginalIndex: number) => {
    if (categories.length === 0 || extendedCategories.length === 0) return;
    setActiveIndex((prev) => {
      const currentOriginalIndex = prev % categories.length;
      let diff = targetOriginalIndex - currentOriginalIndex;

      // Calculate path wrapping
      if (diff < -Math.floor(categories.length / 2)) diff += categories.length;
      if (diff > Math.floor(categories.length / 2)) diff -= categories.length;

      const next = (prev + diff + extendedCategories.length) % extendedCategories.length;
      scrollTo(next);
      return next;
    });
  }, [categories.length, extendedCategories.length, scrollTo]);

  // Managed interval auto-play loop
  const autoRotateInterval = useRef<NodeJS.Timeout | null>(null);

  const resetInterval = useCallback(() => {
    if (autoRotateInterval.current) {
      clearInterval(autoRotateInterval.current);
    }
    autoRotateInterval.current = setInterval(() => {
      if (document.hidden || isHovered) {
        return;
      }
      nextSlide();
    }, 6000);
  }, [isHovered, nextSlide]);

  useEffect(() => {
    resetInterval();
    const handleVisibilityChange = () => {
      if (!document.hidden) resetInterval();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      if (autoRotateInterval.current) {
        clearInterval(autoRotateInterval.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [resetInterval]);

  const handleNextSlide = useCallback(() => {
    nextSlide();
    resetInterval();
  }, [nextSlide, resetInterval]);

  const handlePrevSlide = useCallback(() => {
    prevSlide();
    resetInterval();
  }, [prevSlide, resetInterval]);

  const handleDotClickWrapper = (idx: number) => {
    handleDotClick(idx);
    resetInterval();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsHovered(false);
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNextSlide();
    } else if (diff < -50) {
      handlePrevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="store-hero-carousel"
      className="relative w-full border-b border-hairline bg-canvas overflow-hidden flex flex-col min-h-[500px] h-[60dvh] md:h-[600px] lg:h-[700px] xl:h-[calc(100dvh-90px)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scrollable track frame */}
      <div
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full h-full flex-1 flex overflow-x-auto snap-x snap-mandatory gap-2 md:gap-4 items-stretch [&::-webkit-scrollbar]:hidden px-[2.5vw] lg:px-[10vw]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {extendedCategories.map((cat, idx) => (
          <div
            key={`${cat.id}-${idx}`}
            className="relative w-[85vw] md:w-[84vw] min-[1025px]:w-[82vw] h-full shrink-0 snap-center snap-always bg-surface-soft overflow-hidden flex flex-col justify-end rounded-none border-x border-hairline/30"
          >
            {/* Cinematic background photograph, utilizing individual category-specific images */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(15px)', scale: 1.12 }}
              whileInView={{ opacity: 0.85, filter: cat.isComingSoon ? 'blur(8px)' : 'blur(0px)', scale: 1.0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${cat.isComingSoon ? 'grayscale-[0.4]' : ''}`}
              style={{
                backgroundImage: `url('${cat.image}')`,
              }}
            >
              {/* Pure dark bottom overlay fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-canvas/10 to-transparent pointer-events-none" />
            </motion.div>

            {/* Structured slide header copy overlay */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={parentVariants}
              className="relative z-10 p-6 md:p-12 pb-24 md:pb-32 min-[2000px]:p-20 min-[2000px]:pb-40 flex flex-col items-start w-full"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4 md:mb-6">
                <motion.h2
                  variants={childVariants}
                  className={`${ty.displayXl} text-5xl md:text-[80px] min-[2000px]:text-[120px] text-primary`}
                >
                  {cat.name}
                </motion.h2>
                {cat.isComingSoon && (
                  <motion.span
                    variants={childVariants}
                    className={`${ty.captionUpper} text-[10px] md:text-xs text-muted border border-hairline px-3 py-1 rounded-none self-start md:self-auto translate-y-2 lg:translate-y-4`}
                  >
                    (COMING SOON)
                  </motion.span>
                )}
              </div>

              <motion.div variants={childVariants}>
                <Link
                  href={cat.isComingSoon ? '#' : `/products/${cat.name.toLowerCase()}`}
                  className={`${ty.ctaButton} text-[10px] sm:text-[12px] md:text-[14px] px-5 py-2 sm:px-6 sm:py-2.5 md:px-[24px] md:py-[12px] hover:bg-primary hover:text-canvas transition-all`}
                  onClick={(e) => cat.isComingSoon && e.preventDefault()}
                >
                  DISCOVER {cat.name}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Control console wrapper */}
      <div className="absolute bottom-8 md:bottom-10 left-0 right-0 z-20 px-[7.5vw] md:px-[8vw] min-[1025px]:px-[9vw] lg:px-[10vw] flex justify-between items-center pointer-events-none">
        <motion.button
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={handlePrevSlide}
          className="p-2 md:p-4 text-muted hover:text-primary transition-colors outline-none pointer-events-auto border border-hairline rounded-full bg-canvas/40 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 pointer-events-auto"
        >
          {categories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClickWrapper(idx)}
              className={`transition-all duration-300 rounded-full outline-none focus:ring-1 focus:ring-primary ${
                activeIndex % categories.length === idx
                  ? 'w-10 h-1.5 bg-primary'
                  : 'w-2 h-1.5 bg-muted-soft hover:bg-muted'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleNextSlide}
          className="p-2 md:p-4 text-muted hover:text-primary transition-colors outline-none pointer-events-auto border border-hairline rounded-full bg-canvas/40 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
        </motion.button>
      </div>

      {/* Floating scroll icon indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: [0, 8, 0], filter: 'blur(0px)' }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 },
            filter: { duration: 0.6, delay: 0.5 },
            y: { duration: 2, delay: 1.0, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="flex flex-col items-center text-muted"
        >
          <ChevronDown className="w-6 h-6 opacity-60 text-muted" strokeWidth={1} />
        </motion.div>
      </div>
    </section>
  );
}
