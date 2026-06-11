'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { parentVariants, childVariants } from '@/src/lib/design/variants';
import * as ty from '@/src/lib/design/typography';
import { ShopCollections } from '@/src/features/store';
import { ProductImageGallery, ProductInfoForm } from '@/src/features/products';

export default function Nofan15Page() {
  const [isExpanded, setIsExpanded] = useState(false);

  const PRODUCT_IMAGES = [
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png",
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,h=1920,fit=crop/Y4LDGNyengfoZkEX/scene_2_0-mnlJgb3qe6iDVo5r.png"
  ];

  return (
    <main className="bg-canvas text-primary w-full min-h-screen font-serif">
      
      {/* -------------------------------------------------------------
          SECTION 1: Product Gallery and Info Form
          ------------------------------------------------------------- */}
      <div className="w-full max-w-[3840px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 xl:gap-8 2xl:gap-10 px-6 lg:px-12 relative items-start pt-6 md:pt-10 lg:pt-8 pb-10 lg:pb-16">
        
        {/* Left Column: Image Gallery (Takes 8 cols on tablet/desktop) */}
        <ProductImageGallery images={PRODUCT_IMAGES} modelName="NOFAN 15cm" className="col-span-1 lg:col-span-7 xl:col-span-8" />

        {/* Right Column: Sticky Product Info Form (Takes 5 cols on lg, 4 cols on xl) */}
        <ProductInfoForm
          name="NOFAN 15CM"
          category="LINEFOLLOWER"
          categoryHref="/products/linefollower"
          price="THB 15,000"
          description="Engineered for precision and speed. The NOFAN 15cm is a high-performance line-following robot optimized for maximum agility. Built specifically to dominate in restricted-size competition categories (15x15 cm limits), it delivers flawless execution on the most complex trajectories."
          inStock={true}
        />
        
      </div>


      {/* -------------------------------------------------------------
          Phase 2 - Product Details Section (No Changes)
          ------------------------------------------------------------- */}
      <section id="product-details-section" className="pt-10 pb-12 lg:pt-16 lg:pb-12 px-6 lg:px-12 bg-canvas text-primary max-w-[1720px] mx-auto border-t border-hairline">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={childVariants}
          className={`${ty.displayLg} text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-center md:text-left`}
        >
          PRODUCT DETAILS
        </motion.h2>

        <div className="relative w-full">
          {/* Block 1 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[64px] items-center mb-16 md:mb-4 max-md:flex max-md:flex-col max-md:text-center max-md:items-center max-md:justify-center max-md:gap-y-2 max-md:mb-12"
          >
            <motion.div variants={childVariants} className="relative w-full aspect-[4/3] md:aspect-auto h-full min-h-[300px] max-md:min-h-0 max-md:my-0 max-md:mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=596,fit=crop/Y4LDGNyengfoZkEX/scene_4_0-dOqDnekDoDCWk3n8.png" alt="Revamped design" className="w-full h-full object-cover rounded-[0px] max-md:my-0" referrerPolicy="no-referrer" />
            </motion.div>
             <div className="md:pl-[36px] flex flex-col items-center md:items-start text-center md:text-left gap-y-3 max-md:gap-y-2 md:gap-y-0">
              <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl max-md:text-center max-md:mx-auto`}>
                Revamped design
              </motion.h3>
              <motion.p variants={childVariants} className={`${ty.bodyMd} mb-0 md:mb-[48px] max-md:text-center max-md:mx-auto`}>
                The architecture of the new ATLAS aims to improve rigidity, simplify assembly, and mitigate performance variations. It also gives it a modern and sophisticated look. Plastic straps and adhesive tape are now a thing of the past.
              </motion.p>
              <motion.div variants={childVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-[36px] w-full max-md:gap-y-2">
                <div className="flex flex-col md:flex-col items-center md:items-start justify-center gap-y-0.5 md:gap-y-0 text-center md:text-left">
                  <span className={`${ty.specValue} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                    110 g
                  </span>
                  <span className={`${ty.specLabel} md:mb-[12px] max-md:order-2`}>
                    Total weight (without battery)
                  </span>
                </div>
                <div className="flex flex-col md:flex-col items-center md:items-start justify-center gap-y-0.5 md:gap-y-0 text-center md:text-left">
                  <span className={`${ty.specValue} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                    17 x 24.5 x 4.5 cm
                  </span>
                  <span className={`${ty.specLabel} md:mb-[12px] max-md:order-2`}>
                    Robot dimensions
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Expandable Section Trigger with AnimatePresence for Button Fading */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div 
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.0, ease: [0.215, 0.610, 0.355, 1] }}
                className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-canvas via-canvas/80 to-transparent flex items-end justify-center z-20 pointer-events-none pb-0"
              >
                <button
                  onClick={() => setIsExpanded(true)}
                  className={`pointer-events-auto flex items-center gap-2 ${ty.ctaButton} px-8 py-3.5`}
                >
                  SEE MORE DETAILS
                  <ChevronDown className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Persistently mounted container with explicit height animation limits to prevent re-triggering entry animations */}
        <motion.div 
          initial={false}
          animate={{ 
            height: isExpanded ? "auto" : 0, 
            opacity: isExpanded ? 1 : 0,
            visibility: isExpanded ? "visible" : "hidden"
          }}
          transition={{ height: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }, opacity: { duration: 0.4 } }}
          className="overflow-hidden w-full"
        >
          {/* Block 2 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[64px] items-center mb-28 lg:mb-12 xl:mb-4 transition-all duration-1000 ease-out opacity-100 translate-y-0 max-md:flex max-md:flex-col max-md:items-center max-md:text-center max-md:gap-y-2 max-md:mb-24"
          >
            <motion.div variants={childVariants} className="md:order-last relative w-full aspect-[4/3] md:aspect-auto h-full min-h-[300px] max-md:order-2 max-md:min-h-0 max-md:my-0 max-md:mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=842,fit=crop/Y4LDGNyengfoZkEX/n60_0-Y4Lv94vekaiayzVp.png" alt="High-power N60 motors" className="w-full h-full object-cover rounded-[0px] max-md:my-0 my-4 md:my-6 lg:my-0 xl:-my-16" referrerPolicy="no-referrer" />
            </motion.div>
             <div className="md:pr-[36px] max-md:contents">
              <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl max-md:order-1 max-md:text-center max-md:mx-auto`}>
                High-power N60 motors
              </motion.h3>
              <motion.p variants={childVariants} className={`${ty.bodyMd} mb-0 md:mb-[48px] max-md:order-3 max-md:text-center max-md:mx-auto`}>
                With the new 12mm motors powered by 3S, it is possible to achieve higher torque and speed levels, resulting in greater consistency and stability even on the most complicated trajectories.
              </motion.p>
              <motion.div variants={childVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-[36px] max-md:order-4 w-full max-md:gap-y-2">
                <div className="flex flex-col md:flex-col items-center md:items-start justify-center gap-y-0.5 md:gap-y-0 text-center md:text-left">
                  <span className={`${ty.specValue} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                    3 V
                  </span>
                  <span className={`${ty.specLabel} md:mb-[12px] max-md:order-2`}>
                    Nominal Voltage
                  </span>
                </div>
                <div className="flex flex-col md:flex-col items-center md:items-start justify-center gap-y-0.5 md:gap-y-0 text-center md:text-left">
                  <span className={`${ty.specValue} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                    17 A
                  </span>
                  <span className={`${ty.specLabel} md:mb-[12px] max-md:order-2`}>
                    Stall current (3S)
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Block 3 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="mt-16 md:mt-4 lg:mt-12 xl:-mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[64px] items-center mb-28 lg:mb-12 xl:mb-0 transition-all duration-1000 ease-out opacity-100 translate-y-0 max-md:flex max-md:flex-col max-md:items-center max-md:text-center max-md:gap-y-2 max-md:mb-24"
          >
            <motion.div variants={childVariants} className="relative w-full aspect-[4/3] md:aspect-auto h-full min-h-[300px] max-md:order-2 max-md:min-h-0 max-md:my-0 max-md:mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=817,fit=crop/Y4LDGNyengfoZkEX/btn_0-ALpPMJZ5egtlp3QR.png" alt="Last-generation drivers" className="w-full h-full object-cover rounded-[0px] max-md:my-0 my-4 md:my-0 lg:my-0 xl:-my-16" referrerPolicy="no-referrer" />
            </motion.div>
            <div className="md:pl-[36px] max-md:contents">
              <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl max-md:order-1 max-md:text-center max-md:mx-auto`}>
                Last-generation drivers
              </motion.h3>
              <motion.p variants={childVariants} className={`${ty.bodyMd} mb-0 md:mb-[48px] max-md:order-3 max-md:text-center max-md:mx-auto`}>
                The new NOFAN incorporates four BTN9960LV half-bridge drivers from Infineon&apos;s new line, compact drivers measuring just 8x7mm that combine high quality and the capability to operate at high power levels, making them the ideal solution for such applications.
              </motion.p>
              <motion.div variants={childVariants} className="max-md:order-4 w-full flex flex-col md:flex-col items-center md:items-start justify-center gap-y-0.5 md:gap-y-0 text-center md:text-left">
                <span className={`${ty.specValue} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                  35 A Min.
                </span>
                <span className={`${ty.specLabel} md:mb-[12px] max-md:order-2`}>
                  Overcurrent limit
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Block 4 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="flex flex-col mt-4 md:mt-4 lg:mt-12 xl:-mt-16 mb-28 lg:mb-12 xl:mb-4 transition-all duration-1000 ease-out opacity-100 translate-y-0 max-md:items-center max-md:text-center max-md:gap-y-2 max-md:mb-24"
          >
            <div className="mb-0 max-md:mb-0 flex flex-col gap-y-3 max-md:gap-y-2 text-center md:text-left">
              <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl max-md:text-center max-md:mx-auto`}>
                Enhanced drivetrain system
              </motion.h3>
              <motion.p variants={childVariants} className={`${ty.bodyMd} max-w-4xl max-md:text-center max-md:mx-auto`}>
                With a 3mm shaft and a rougher PLA+ construction, it ensures exceptional rigidity and durability. In addition, the MR63ZZ bearings provide smoother and more efficient transmission even at high speeds.
              </motion.p>
            </div>
            <motion.img variants={childVariants} src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=423,fit=crop/Y4LDGNyengfoZkEX/gb_0-AzGNgggDlXuJ7zjZ.png" alt="Enhanced drivetrain system" className="w-full object-contain mb-0 mt-0 md:mb-4 md:mt-2 lg:my-0 xl:-mt-12 xl:-mb-8 max-md:my-0 max-md:mx-auto" referrerPolicy="no-referrer" />
            
            <motion.div variants={childVariants} className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16 md:gap-24 lg:gap-40 w-full max-md:gap-y-2">
              <div className="flex flex-col md:flex-col items-center justify-center text-center gap-y-0.5 md:gap-y-0">
                <span className={`${ty.specValue} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                  5:1
                </span>
                <span className={`${ty.specLabel} md:mb-[12px] max-md:order-2`}>
                  Gear ratio
                </span>
              </div>
              <div className="flex flex-col md:flex-col items-center justify-center text-center gap-y-0.5 md:gap-y-0">
                <span className={`${ty.specValue} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                  10,200 rpm
                </span>
                <span className={`${ty.specLabel} md:mb-[12px] max-md:order-2`}>
                  Max. RPM
                </span>
              </div>
              <div className="flex flex-col md:flex-col items-center justify-center text-center gap-y-0.5 md:gap-y-0">
                <span className={`${ty.specValue} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                  - - mNm
                </span>
                <span className={`${ty.specLabel} md:mb-[12px] max-md:order-2`}>
                  Stall torque
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Block 5 */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[64px] items-center mt-16 mb-28 lg:mb-12 transition-all duration-1000 ease-out opacity-100 translate-y-0 max-md:flex max-md:flex-col max-md:items-center max-md:text-center max-md:gap-y-2 max-md:mb-24"
          >
            <motion.div variants={childVariants} className="md:order-last relative w-full aspect-[4/3] md:aspect-auto h-full min-h-[300px] max-md:order-2 max-md:min-h-0 max-md:my-0 max-md:mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=767,fit=crop/Y4LDGNyengfoZkEX/tires_2-AVLa8ag5vOs5glQ8.png" alt="Rigid polyurethane wheels" className="w-[85%] md:w-[90%] lg:w-[80%] xl:w-[60%] mx-auto h-full object-contain rounded-[0px] max-md:my-0" referrerPolicy="no-referrer" />
            </motion.div>
            <div className="md:pr-[36px] max-md:contents">
              <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl max-md:order-1 max-md:text-center max-md:mx-auto`}>
                Rigid polyurethane wheels
              </motion.h3>
              <motion.p variants={childVariants} className={`${ty.bodyMd} mb-0 md:mb-[48px] max-md:order-3 max-md:text-center max-md:mx-auto`}>
                The high traction and hardness of these wheels allow for faster and more efficient motion transmission, resulting in greater reactive control and stability. Furthermore, as they were originally designed as printer rollers, their high quality and durability are guaranteed.
              </motion.p>
              <motion.div variants={childVariants} className="grid grid-cols-1 max-md:order-4 w-full flex flex-col md:flex-col items-center md:items-start justify-center gap-y-0.5 md:gap-y-0 text-center md:text-left">
                <span className={`${ty.specValue} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                  22 mm
                </span>
                <span className={`${ty.specLabel} md:mb-[12px] max-md:order-2`}>
                  Diameter
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Block 6 - Suction System */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center mb-28 lg:mb-28 transition-all duration-1000 ease-out opacity-100 translate-y-0 max-md:flex max-md:flex-col max-md:items-center max-md:text-center max-md:gap-y-2 max-md:mb-24"
          >
            <motion.div variants={childVariants} className="relative w-full aspect-[4/3] md:aspect-auto h-full min-h-[300px] max-md:order-2 max-md:min-h-0 max-md:my-0 max-md:mx-auto overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1024,h=794,fit=crop/Y4LDGNyengfoZkEX/skirt_4_faded-mp8JbqeRKxSv6joO.png" alt="Suction System" className="w-[80%] mx-auto h-full rounded-none object-contain max-md:my-0 my-4 md:my-0 lg:my-0 xl:-my-16 transform scale-[1.4] max-md:scale-[1.2] origin-center" referrerPolicy="no-referrer" />
            </motion.div>
            <div className="flex flex-col items-start gap-4 md:gap-6 md:pl-[36px] max-md:contents">
              <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl max-md:order-1 max-md:text-center max-md:mx-auto max-md:mb-0`}>
                Suction in just one piece. Failure-proof.
              </motion.h3>
              <motion.p variants={childVariants} className={`${ty.bodyMd} max-md:order-3 max-md:text-center max-md:mx-auto max-md:mb-0`}>
                The new suction system consists of a skirt made of Teflon fiber that is resistant to extreme temperatures. Its single-sheet construction provides greater resistance to road imperfections and makes it easier to manufacture. With a 32 mm centrifugal fan and a 1020 coreless motor, it is able to achieve high suction power with very low consumption.
              </motion.p>
              <motion.div variants={childVariants} className="flex flex-col gap-6 w-full pt-4 max-md:order-4 max-md:pt-0 max-md:gap-y-2">
                <div className="flex flex-col md:flex-col items-center md:items-start justify-center gap-y-0.5 md:gap-y-0 text-center md:text-left">
                  <span className={`${ty.specValue} text-3xl sm:text-4xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                    750 g
                  </span>
                  <span className={`${ty.specLabel} md:mb-[8px] max-md:order-2`}>
                    Maximum perpendicular force
                  </span>
                </div>
                <div className="flex flex-col md:flex-col items-center md:items-start justify-center gap-y-0.5 md:gap-y-0 text-center md:text-left">
                  <span className={`${ty.specValue} text-3xl sm:text-4xl md:text-4xl lg:text-3xl xl:text-5xl max-md:order-1`}>
                    2.4 A
                  </span>
                  <span className={`${ty.specLabel} md:mb-[8px] max-md:order-2`}>
                    Max. Continuous consumption (2S)
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Block 7 - VISION 2 Sensors */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="flex flex-col items-center text-center mb-16 md:mb-28 max-md:mb-24"
          >
            <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl max-w-4xl mb-4`}>
              Ultra-lightweight and compact VISION 2&copy; 16-sensors system
            </motion.h3>
            <motion.img variants={childVariants} src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=426,fit=crop/Y4LDGNyengfoZkEX/vision_2_1-YrDJgyyOvyHPM7G1.png" alt="Ultra-lightweight and compact VISION 2 16-sensors system" className="w-full max-w-5xl object-contain my-2 md:my-2 lg:my-0 xl:-my-4" referrerPolicy="no-referrer" />
            <motion.p variants={childVariants} className={`${ty.bodyMd} max-w-5xl mt-2 md:mt-4`}>
              VISION 2 line sensor series offers precise measurement in a range of 115 mm with only 3.3g of weight.
            </motion.p>
          </motion.div>

          {/* Block 8 - Uncomplicated Reading */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center mb-28 lg:mb-12 max-md:flex max-md:flex-col max-md:items-center max-md:text-center max-md:gap-y-2 max-md:mb-24"
          >
            <div className="md:pr-[36px] max-md:contents">
              <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl max-md:order-1 max-md:text-center max-md:mx-auto`}>
                Uncomplicated reading
              </motion.h3>
              <motion.p variants={childVariants} className={`${ty.bodyMd} mb-0 md:mb-0 max-md:order-3 max-md:text-center max-md:mx-auto`}>
                With its 16-channel CD74HC4067PW analog multiplexer, it is possible to get fast and reliable measurements using only 4 digital ports and one ADC channel for a complete reading. In addition, with a package size of only 7.8x6.4mm, it is one of the lightest and most versatile options available.
              </motion.p>
            </div>
            <motion.div variants={childVariants} className="relative w-full aspect-[4/3] md:aspect-auto h-full min-h-[300px] max-md:order-2 max-md:min-h-0 max-md:my-0 max-md:mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=596,fit=crop/Y4LDGNyengfoZkEX/vision_2_3-YbNJ784vlWhXnyw4.png" alt="Uncomplicated reading" className="w-full h-full object-contain rounded-[0px] max-md:my-0 my-4 md:my-0 lg:my-0 xl:-my-10" referrerPolicy="no-referrer" />
            </motion.div>
          </motion.div>

          {/* Block 9 - Ultra-practical sliders */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center mb-28 lg:mb-4 max-md:flex max-md:flex-col max-md:items-center max-md:text-center max-md:gap-y-2 max-md:mb-24"
          >
            <motion.div variants={childVariants} className="relative w-full aspect-[4/3] md:aspect-auto h-full min-h-[300px] max-md:order-2 max-md:min-h-0 max-md:my-0 max-md:mx-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=597,fit=crop/Y4LDGNyengfoZkEX/vision_2_2-AMq8QNqvwyTprPlJ.png" alt="Ultra-practical sliders" className="w-full h-full object-contain rounded-[0px] max-md:my-0 my-4 md:my-0 lg:my-0 xl:-my-12" referrerPolicy="no-referrer" />
            </motion.div>
            <div className="md:pl-[36px] max-md:contents">
              <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl max-md:order-1 max-md:text-center max-md:mx-auto`}>
                Ultra-practical sliders
              </motion.h3>
              <motion.p variants={childVariants} className={`${ty.bodyMd} mb-0 md:mb-0 max-md:order-3 max-md:text-center max-md:mx-auto`}>
                Using a clamp with an integrated slider printed in PLA+ guarantees extreme fixation to carbon fiber rods. It also simplifies manufacturing and opens up the possibility of adjusting its parameters in order to adapt to any competition environment.
              </motion.p>
            </div>
          </motion.div>

          {/* Block 10 - ATmega328P */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="flex flex-col items-center text-center mt-4 md:mt-4 lg:mt-12 xl:-mt-12 mb-28 md:mb-16 gap-y-3 max-md:gap-y-2 max-md:mb-24"
          >
            <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl mb-0 md:mb-8`}>
              ATmega328P keeps leading
            </motion.h3>
            <motion.img variants={childVariants} src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=768,fit=crop/Y4LDGNyengfoZkEX/atmega_0-m5KnGvo3aEHj0e52.png" alt="ATmega328P keeps leading" className="w-[80%] max-w-md object-contain my-0 md:my-0 lg:my-0 xl:-my-8 max-md:my-0" referrerPolicy="no-referrer" />
            <motion.p variants={childVariants} className={`${ty.bodyMd} max-w-5xl mx-auto mt-0 md:mt-8 max-md:mt-0`}>
              The legacy of ATmega328P is still alive. With its ease of implementation, wide range of peripherals, and an operating frequency of 16 MHz, makes it the definitive candidate for the ATLAS.
            </motion.p>
          </motion.div>

          {/* Block 11 - Video */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } }
            }}
            className="flex flex-col mb-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-4 md:mb-8">
              <motion.h3 variants={childVariants} className={`${ty.displayMd} text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-6xl text-center md:text-left`}>
                More powerful than ever
              </motion.h3>
              <motion.p variants={childVariants} className={`${ty.bodyMd} text-center md:text-left`}>
                ATLAS has set new standards in performance and stability. Not only has it achieved speeds never seen before, but it also improved its turning capabilities even at high levels of inertia.
              </motion.p>
            </div>
            <motion.div variants={childVariants} className="w-full max-w-5xl mx-auto aspect-video rounded-none overflow-hidden bg-surface-card border border-hairline">
              {isExpanded ? (
                <iframe 
                  src="https://www.youtube.com/embed/MgTHnjR4zoU" 
                  title="More powerful than ever"
                  className="w-full h-full border-0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              ) : null}
            </motion.div>
          </motion.div>

          {/* SEE LESS Trigger with Smooth Scroll Correction */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
            variants={childVariants}
            className="flex justify-center mt-12 pb-0"
          >
            <button
              onClick={() => {
                setIsExpanded(false);
                setTimeout(() => {
                  const section = document.getElementById('product-details-section');
                  if (section) {
                    const elementPosition = section.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - 80;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }, 50);
              }}
              className={`flex items-center gap-2 ${ty.ctaButton} px-8 py-3.5`}
            >
              SEE LESS DETAILS
              <ChevronUp className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* -------------------------------------------------------------
          Phase 3 - Customers Also Bought
          ------------------------------------------------------------- */}
      <ShopCollections title="CUSTOMERS ALSO BOUGHT" defaultFilter="LINEFOLLOWER" />


    </main>
  );
}