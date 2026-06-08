'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CATEGORIES = ['LINEFOLLOWER', 'MISSION', 'GATHERING', 'SUMO'];

export function CategoryHub() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-4 border-b border-hairline">
      {CATEGORIES.map((cat, i) => {
        const isHovered = hoveredIndex === i;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;
        
        return (
          <Link key={cat} href={`/products/${cat.toLowerCase()}`}>
            <motion.div
               onHoverStart={() => setHoveredIndex(i)}
               onHoverEnd={() => setHoveredIndex(null)}
               animate={{ opacity: isOtherHovered ? 0.3 : 1 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className={`group relative h-[400px] md:h-[600px] flex items-end p-8 border-b md:border-b-0 md:border-r border-hairline bg-[#000000] ${i === 3 ? 'md:border-r-0' : ''}`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20 transition-opacity group-hover:opacity-40 pointer-events-none">
                <span className="font-mono text-xs tracking-[2px] text-muted uppercase border border-hairline p-2">[ CATEGORY PLACEHOLDER ]</span>
              </div>
              <h2 className="relative z-10 font-mono text-sm tracking-[2px] uppercase text-muted group-hover:text-white transition-colors">
                {cat}
              </h2>
            </motion.div>
          </Link>
        )
      })}
    </section>
  );
}
