/**
 * @file store-intro.tsx
 * @description Philosophy and intro block for the Store page, fully aligned with Bugatti Design System guidelines.
 */

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as ty from "@/src/lib/design/typography";
import { parentVariants, childVariants } from "@/src/lib/design/variants";

export function StoreIntro() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
      variants={parentVariants}
      className="w-full section-py px-6 md:px-12 flex justify-center items-center bg-canvas"
    >
      <div className="max-w-[1000px] min-[2000px]:max-w-[1200px] mx-auto text-center flex flex-col items-center">
        <motion.h2
          variants={childVariants}
          className={`${ty.displayLg} text-3xl sm:text-4xl md:text-[50px] lg:text-[60px] min-[2000px]:text-[100px] text-primary mb-8 md:mb-12`}
        >
          ENGINEERED FOR THE PINNACLE OF ROBOTICS
        </motion.h2>
        <motion.p
          variants={childVariants}
          className={`${ty.bodyMd} text-[16px] md:text-[20px] min-[2000px]:text-2xl text-muted mb-12 md:mb-16 max-w-[800px] min-[2000px]:max-w-[1100px]`}
        >
          Every platform we build is rooted in our core philosophy of uncompromising performance.
          From micro-controllers to chassis architecture, every element is designed to push the boundaries
          of what is possible in autonomous tactical mobility.
        </motion.p>
        <motion.div variants={childVariants}>
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center justify-center border border-primary rounded-pill bg-primary text-canvas font-mono font-normal text-button uppercase transition-colors duration-300 text-[14px] min-[2000px]:text-lg px-[24px] py-[12px] min-[2000px]:px-10 min-[2000px]:py-4 hover:bg-transparent hover:text-primary"
          >
            DISCOVER MORE
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
