'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import * as ty from '@/src/lib/design/typography';
import { ShopCollections } from '@/src/features/products';

export default function Fanpull15Page() {
  return (
    <main className="w-full bg-[#000000] min-h-screen text-[#ffffff] overflow-hidden font-body">

      {/* ===================================== */}
      {/* SECTION 1: COMING SOON BANNER         */}
      {/* ===================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={parentVariants}
        className="w-full min-h-[50vh] md:min-h-[60vh] flex justify-center items-center py-16 md:py-24"
      >
        <motion.div
          variants={childVariants}
          className="w-full max-w-[1920px] mx-auto px-6 md:px-12 2xl:px-24 flex justify-center items-center"
        >
          <div className="w-full border border-hairline bg-transparent py-12 px-10 md:py-32 md:px-32 flex justify-center items-center">
            <h2 className={`${ty.displayXl} text-2xl sm:text-3xl md:text-5xl lg:text-7xl 2xl:text-[6rem] text-white text-center whitespace-nowrap`}>
              COMING SOON
            </h2>
          </div>
        </motion.div>
      </motion.section>

      {/* ===================================== */}
      {/* SECTION 2: CUSTOMERS ALSO BOUGHT      */}
      {/* ===================================== */}
      <ShopCollections title="CUSTOMERS ALSO BOUGHT" defaultFilter="LINEFOLLOWER" />

    </main>
  );
}
