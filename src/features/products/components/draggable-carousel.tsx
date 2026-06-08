'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DraggableCarouselProps {
  children: React.ReactNode;
}

export function DraggableCarousel({ children }: DraggableCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [constraintLeft, setConstraintLeft] = useState(0);

  useEffect(() => {
    const updateConstraints = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const offsetWidth = carouselRef.current.offsetWidth;
        setConstraintLeft(Math.max(0, scrollWidth - offsetWidth));
      }
    };

    updateConstraints();
    
    // Check constraints after images/fonts might have loaded
    const timeout = setTimeout(updateConstraints, 500);
    window.addEventListener('resize', updateConstraints);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateConstraints);
    };
  }, [children]);

  return (
    <motion.div ref={carouselRef} className="overflow-hidden w-full cursor-grab active:cursor-grabbing">
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -constraintLeft }}
        dragElastic={0.1}
        className="flex gap-12 md:gap-24 w-max pb-12"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
