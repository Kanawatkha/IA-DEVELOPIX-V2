'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import { displayXl, displayLg } from '@/src/lib/design/typography';
import { TECH_ITEMS } from '@/src/constants/home-data';

/**
 * Renders the development environments and engineering tech stack tools section.
 * Pulls static tools registry dynamically from the centralized constants store.
 */
export function TechStackSection() {
  return (
    <section className="section-layout section-py section-px bg-[#000000] overflow-hidden relative">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={parentVariants}
        className="section-content-limit items-center justify-center relative z-10"
      >
        {/* Header Block */}
        <motion.div variants={childVariants}>
          <div className="text-center mb-4 md:mb-5 min-[2000px]:mb-8">
            <h2 className={`${displayXl} text-[32px] sm:text-[46px] md:text-[55px] lg:text-[80px] text-primary mb-2 min-[2000px]:text-[100px] whitespace-nowrap`}>
              DISCOVER OUR
            </h2>
            <h2 className={`${displayLg} text-[22px] sm:text-[34px] md:text-[40px] lg:text-[50px] text-muted min-[2000px]:text-[60px] whitespace-nowrap lg:whitespace-normal`}>
              DEVELOPMENT ENVIRONMENTS
            </h2>
          </div>
        </motion.div>

        {/* Layout Horizontal Separator Divider */}
        <motion.div variants={childVariants}>
          <div className="h-[1px] w-full max-w-[300px] md:max-w-xl mx-auto bg-muted mb-6 md:mb-8 min-[2000px]:mb-12" />
        </motion.div>

        {/* Interactive Tools / Stack Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 min-[2000px]:gap-24 w-full max-w-5xl min-[2000px]:max-w-7xl"
          variants={parentVariants}
        >
          {TECH_ITEMS.map((tool) => (
            <motion.a 
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              key={tool.id}
              variants={childVariants}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group flex flex-col items-center justify-center gap-3 md:gap-4 min-[2000px]:gap-6 cursor-pointer"
            >
              <div className="relative tech-stack-icon flex justify-center items-center">
                <Image 
                  src={tool.iconSrc} 
                  alt={tool.title} 
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 192px"
                  className="object-contain" 
                />
              </div>
              <span className="font-mono tech-stack-text uppercase tracking-[2px] text-center text-muted transition-colors duration-500 ease-out group-hover:text-primary">
                {tool.title}
              </span>
            </motion.a>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
}
