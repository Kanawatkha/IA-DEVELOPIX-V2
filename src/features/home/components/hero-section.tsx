'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollIndicator } from '@/src/components/ui';
import {
  parentVariants,
  childVariants,
  heroImageVariants,
} from '@/src/lib/design/variants';
import {
  displayXl,
  bodyMd,
  ctaButton,
} from '@/src/lib/design/typography';
import { HERO_BG_IMAGES } from '@/src/constants/home-data';

/**
 * Landing page top Hero showcase component.
 * Features full-bleed cinematic imagery and wide-tracked letter-spaced typography.
 * Resolves static background imagery dynamically from central constants registry.
 */
export function HeroSection() {
  return (
    <section 
      className="relative w-full overflow-hidden border-b border-hairline flex flex-col justify-center max-[950px]:landscape:min-h-[750px] max-[950px]:landscape:h-auto"
      style={{ height: "calc(100dvh - var(--navbar-height, 80px))" }}
    >
      {/* Background Mobile Image Layer */}
      <motion.div
        variants={heroImageVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 w-full h-full z-0 min-[1025px]:hidden"
      >
        <Image
          src={HERO_BG_IMAGES.mobile}
          alt="Precision Robotics Mobile View"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+"
          fill
          sizes="100vw"
          priority
          referrerPolicy="no-referrer"
          className="object-cover object-bottom pointer-events-none"
        />
      </motion.div>
      
      {/* Background Desktop Image Layer */}
      <motion.div
        variants={heroImageVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 w-full h-full z-0 hidden min-[1025px]:block"
      >
        <Image
          src={HERO_BG_IMAGES.desktop}
          alt="Precision Robotics Desktop View"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+"
          fill
          sizes="100vw"
          priority
          referrerPolicy="no-referrer"
          className="object-cover object-center pointer-events-none"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none min-[1025px]:block hidden" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/80 via-black/20 to-black/60 pointer-events-none min-[1025px]:hidden" />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full section-content-limit section-px flex flex-col justify-start pt-20 items-center text-center min-[1025px]:justify-center min-[1025px]:items-start min-[1025px]:text-left min-[1025px]:pt-0">
        <div className="w-full min-w-0 min-[1025px]:w-1/2 max-w-[44rem] flex flex-col items-center min-[1025px]:items-start translate-y-[-20px] min-[1025px]:translate-y-0 min-[2000px]:gap-12 min-[2000px]:ml-[10%]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={parentVariants}
            className="flex flex-col items-center min-[1025px]:items-start w-full"
          >
            <motion.h1 
              variants={childVariants}
              className={`${displayXl} text-[8.2vw] sm:text-[52px] md:text-[68px] lg:text-[100px] xl:text-[140px] whitespace-nowrap lg:whitespace-normal mb-4 md:mb-8 mt-[-2vw] max-w-2xl md:max-w-none lg:max-w-2xl min-[2000px]:text-[130px] min-[2000px]:leading-[0.9]`}
            >
              AUTONOMOUS <br className="hidden lg:block" /> ROBOTICS
            </motion.h1>
            <motion.p 
              variants={childVariants}
              className={`${bodyMd} w-full min-w-0 md:text-[20px] mb-12 max-w-lg min-[2000px]:text-[24px] min-[2000px]:max-w-[700px]`}
            >
              High-speed line followers, mission-based robots, and elite competition hardware. From advanced sensors to specialized mechanical parts — everything you need to win.
            </motion.p>
            
            <motion.div variants={childVariants}>
              <Link
                href="/store"
                className={`${ctaButton} px-8 py-3.5 hover:bg-white hover:text-black w-max min-[2000px]:text-lg min-[2000px]:px-10 min-[2000px]:py-4`}
              >
                ENTER THE STORE
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Reusable Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
