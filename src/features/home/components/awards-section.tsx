'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LaurelAward } from './laurel-award';
import { AWARDS_DATA } from '@/src/constants/home-data';
import {
  awardsParentVariants,
  awardsChildVariants,
  childVariants,
} from '@/src/lib/design/variants';
import { displayLg } from '@/src/lib/design/typography';

/**
 * Renders the competition achievements and track record section.
 * Filters awards into gold/silver for optimized mobile wrapping grid and
 * renders balanced rows of medals symmetrically for desktop viewports.
 */
export function AwardsSection() {
  const goldAwards = AWARDS_DATA.filter(award => award.isGold);
  const silverAwards = AWARDS_DATA.filter(award => !award.isGold);

  return (
    <section className="section-layout section-py section-px overflow-hidden bg-canvas">
      <motion.div 
        className="section-content-limit items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0, margin: "0px 0px -20% 0px" }}
        variants={awardsParentVariants}
      >
        <motion.div variants={awardsChildVariants}>
          <div className="inline-block border-b border-hairline pb-4 mb-6 lg:mb-8 min-[2000px]:pb-8 min-[2000px]:mb-20 min-[2000px]:border-b-4 text-center">
            {/* Medals and Achievements Section Title */}
            <h2 className={`${displayLg} text-[30px] sm:text-[42px] md:text-[50px] lg:text-[80px] text-primary min-[2000px]:text-[100px]`}>
              PROVEN ON THE TRACK
            </h2>
          </div>
        </motion.div>

        <div className="w-full flex flex-col items-center gap-4 lg:gap-6 xl:gap-8">
          
          {/* Desktop Symmetrical Double-Row Layout 
              To achieve visual balance and center gold medals, the dataset is sliced.
              Row 1 displays index 0-5 (silver and gold layout) and Row 2 displays index 5 onwards. */}
          <div className="hidden lg:flex flex-col w-full gap-4 lg:gap-6 xl:gap-8 min-[2000px]:gap-12">
            <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-4 min-[375px]:gap-6 sm:gap-8 md:gap-6 lg:gap-x-4 lg:gap-y-6 xl:gap-x-6 xl:gap-y-8 min-[2000px]:gap-x-12 w-full">
              {AWARDS_DATA.slice(0, 5).map((award, index) => (
                <motion.div 
                  key={`top-${index}`} 
                  className="flex justify-center items-center w-auto"
                  variants={awardsChildVariants}
                >
                  <LaurelAward award={award} />
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-3 min-[375px]:gap-4 sm:gap-6 md:gap-6 lg:gap-x-4 lg:gap-y-6 xl:gap-x-6 xl:gap-y-8 min-[2000px]:gap-x-12 w-full mt-4 lg:mt-0">
              {AWARDS_DATA.slice(5).map((award, index) => (
                <motion.div 
                  key={`bottom-${index}`} 
                  className="flex justify-center items-center w-auto"
                  variants={awardsChildVariants}
                >
                  <LaurelAward award={award} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile / Tablet Responsive Wrapping Grid 
              Groups gold medals at the top in a grid, and silver medals on a wrapping flexbox underneath. */}
          <div className="flex flex-col lg:hidden w-full gap-6 sm:gap-8 px-4 min-[375px]:px-6 overflow-hidden">
            <div className="grid grid-cols-1 min-[300px]:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 justify-items-center w-full max-w-[800px] mx-auto">
              {goldAwards.map((award, index) => (
                <motion.div 
                  key={`gold-${index}`} 
                  className={`flex justify-center items-center w-full ${index === 0 ? 'min-[300px]:col-span-2 md:col-span-1' : 'col-span-1'}`}
                  variants={childVariants}
                >
                  <LaurelAward award={award} />
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-x-2 min-[300px]:gap-x-3 md:gap-x-4 gap-y-4 md:gap-y-6 w-full">
              {silverAwards.map((award, index) => (
                <motion.div 
                  key={`silver-${index}`} 
                  className="flex justify-center items-center w-full max-[249px]:w-full min-[250px]:max-[299px]:w-[45%] min-[300px]:max-[767px]:w-[28%] md:w-[22%]"
                  variants={childVariants}
                >
                  <LaurelAward award={award} />
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
