'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import { displayLg, displayMd, captionUpper } from '@/src/lib/design/typography';

export function FleetSection() {
  return (
    <section className="section-layout section-py section-px bg-canvas">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={parentVariants}
        className="section-content-limit"
      >
        <motion.div variants={childVariants} className="mb-12">
          {/* Fleet Section heading */}
          <div className="inline-block border-b border-hairline pb-4">
            <h2 className={`${displayLg} text-[30px] sm:text-[42px] md:text-[50px] lg:text-[80px] min-[2000px]:text-[100px] min-[2000px]:leading-tight whitespace-nowrap lg:whitespace-normal`}>
              OUR ROBOTICS FLEET
            </h2>
          </div>
        </motion.div>

        {/* Floating Cards Grid */}
        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={parentVariants}
        >
          {['LINEFOLLOWER', 'MISSION', 'GATHERING', 'SUMO'].map((category) => {
            const isComingSoon = ['GATHERING', 'SUMO'].includes(category);
            
            return (
              <motion.div
                key={category}
                variants={childVariants}
                className="w-full h-full"
              >
                <Link 
                  href={`/products/${category.toLowerCase()}`} 
                  className="relative group block w-full overflow-hidden aspect-square md:aspect-auto md:min-h-[450px] min-[1025px]:aspect-video min-[1025px]:min-h-0 min-[1025px]:h-[450px] bg-black"
                >
                  <Image 
                    src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png" 
                    alt={category} 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none ${isComingSoon ? 'blur-md opacity-60' : 'group-hover:scale-105'}`} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />

                  {isComingSoon && (
                    <div className="absolute inset-0 z-30 flex items-center justify-center">
                      <span className="text-white font-normal text-base sm:text-xl md:text-2xl lg:text-3xl tracking-widest border border-white/20 px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 bg-black/20 backdrop-blur-sm">COMING SOON</span>
                    </div>
                  )}

                  <div className="absolute top-6 left-0 right-0 text-center z-20 px-4">
                    <h3 className={`${displayMd} text-[1.5rem] sm:text-2xl md:text-3xl lg:text-4xl text-primary text-center`}>
                      {category}
                    </h3>
                  </div>

                  <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
                    <span className={`${captionUpper} text-body hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] relative pb-1 transition-all duration-300 group/text cursor-pointer`}>
                      EXPLORE SERIES
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/40 group-hover/text:bg-white group-hover/text:-translate-y-[2px] transition-all duration-300 ease-out" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
