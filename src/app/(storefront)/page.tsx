'use client';

// ==========================================
// 1. IMPORTS
// ==========================================
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Terminal, Box, Cpu, Code, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { LaurelAward, DeploymentGallery } from '@/src/components/ui';
import { AWARDS_DATA } from '@/src/constants/home-data';
import {
  parentVariants,
  awardsParentVariants,
  childVariants,
  awardsChildVariants,
  scrollIndicatorInitial,
  scrollIndicatorAnimate,
  scrollIndicatorTransition,
} from '@/src/lib/design/variants';
import {
  displayXl,
  displayLg,
  displayMd,
  captionUpper,
  bodyMd,
  ctaButton,
} from '@/src/lib/design/typography';


// ==========================================
// 2. MAIN PAGE COMPONENT
// ==========================================
export default function HomePage() {
  const goldAwards = AWARDS_DATA.filter(award => award.isGold);
  const silverAwards = AWARDS_DATA.filter(award => !award.isGold);

  return (
    <div className="w-full flex flex-col bg-canvas text-primary">
      
      {/* ========================================== */}
      {/* Section: Hero */}
      {/* ========================================== */}
      <section 
        className="relative w-full overflow-hidden border-b border-hairline flex flex-col justify-center max-[950px]:landscape:min-h-[750px] max-[950px]:landscape:h-auto"
        style={{ height: "calc(100dvh - var(--navbar-height, 80px))" }}
      >
        {/* Background Image Layer */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.0 }}
          transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0 w-full h-full z-0 min-[1025px]:hidden"
        >
          <Image
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_1-AR03811lQghk0N7O.png"
            alt="Precision Robotics Mobile"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDAwMDAwIi8+PC9zdmc+"
            fill
            sizes="100vw"
            priority
            referrerPolicy="no-referrer"
            className="object-cover object-bottom pointer-events-none"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.0 }}
          transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0 w-full h-full z-0 hidden min-[1025px]:block"
        >
          <Image
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/Y4LDGNyengfoZkEX/scene_3_0-YBgb9j1lxpUrKbOK.png"
            alt="Precision Robotics Desktop"
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
        <div className="relative z-10 w-full h-full max-w-[1720px] mx-auto px-6 lg:px-12 flex flex-col justify-start pt-20 items-center text-center min-[1025px]:justify-center min-[1025px]:items-start min-[1025px]:text-left min-[1025px]:pt-0 min-[1025px]:px-20 min-[2000px]:max-w-[2400px]">
          <div className="max-w-full min-[1025px]:max-w-[50%] flex flex-col items-center min-[1025px]:items-start translate-y-[-20px] min-[1025px]:translate-y-0 min-[2000px]:gap-12 min-[2000px]:ml-[10%]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={parentVariants}
              className="flex flex-col items-center min-[1025px]:items-start w-full"
            >
              <motion.h1 
                variants={childVariants}
                className={`${displayXl} text-[38px] sm:text-[52px] md:text-[68px] lg:text-[100px] xl:text-[140px] whitespace-nowrap lg:whitespace-normal mb-4 md:mb-8 mt-[-2vw] max-w-2xl md:max-w-none lg:max-w-2xl min-[2000px]:text-[130px] min-[2000px]:leading-[0.9]`}
              >
                PRECISION <br className="hidden lg:block" /> ROBOTICS
              </motion.h1>
              <motion.p 
                variants={childVariants}
                className={`${bodyMd} md:text-[20px] mb-12 max-w-lg min-[2000px]:text-[24px] min-[2000px]:max-w-[700px]`}
              >
                High-performance robotics engineered for the next era of automation. Precision, power, and flawless execution.
              </motion.p>
              
              <motion.div variants={childVariants}>
                <Link
                  href="/store"
                  className={`${ctaButton} px-8 py-3.5 hover:bg-white hover:text-black w-max min-[2000px]:text-lg min-[2000px]:px-10 min-[2000px]:py-4`}
                >
                  DISCOVER THE FLEET
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div
            initial={scrollIndicatorInitial}
            animate={scrollIndicatorAnimate}
            transition={scrollIndicatorTransition}
            className="flex flex-col items-center text-[#999999]"
          >
            <ChevronDown strokeWidth={1} className="w-8 h-8 opacity-70 text-muted" />
          </motion.div>
        </div>
      </section>

      {/* ========================================== */}
      {/* Section: Robotics Fleet (Product Categories) */}
      {/* ========================================== */}
      <section className="w-full pt-12 lg:pt-16 pb-8 md:pb-12 px-6 md:px-12 border-b border-hairline">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={parentVariants}
          className="max-w-[1720px] min-[2000px]:max-w-[2400px] mx-auto flex flex-col"
        >
          <motion.div variants={childVariants}>
            {/* Fleet Section heading */}
             <h2 className={`${displayLg} text-[30px] sm:text-[42px] md:text-[50px] lg:text-[80px] mb-4 min-[2000px]:text-[100px] min-[2000px]:leading-tight whitespace-nowrap lg:whitespace-normal`}>
              OUR ROBOTICS FLEET
            </h2>
          </motion.div>
          <motion.div variants={childVariants}>
            <div className="h-[1px] w-full max-w-xl bg-hairline mb-12" />
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
                    <span className={`${captionUpper} text-body border-b border-primary/40 pb-1 group-hover:text-primary transition-colors`}>
                      EXPLORE SERIES
                    </span>
                  </div>
                </Link>
              </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================== */}
      {/* Section: International Participations (Awards) */}
      {/* ========================================== */}
      <section className="w-full mt-0 pt-8 md:pt-12 pb-12 max-[1024px]:pb-8 px-6 md:px-12 border-b border-hairline overflow-hidden min-[2000px]:py-24">
        <motion.div 
          className="max-w-[1440px] 2xl:max-w-none min-[2000px]:max-w-[2400px] mx-auto flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0, margin: "0px 0px -20% 0px" }}
          variants={awardsParentVariants}
        >
          <motion.div variants={awardsChildVariants}>
            <div className="inline-block border-b border-primary/20 pb-4 mb-6 lg:mb-8 min-[2000px]:pb-8 min-[2000px]:mb-20 min-[2000px]:border-b-4 text-center">
              {/* Awards Section heading */}
              <h2 className={`${displayLg} text-[20px] sm:text-[28px] md:text-[45px] lg:text-[60px] text-primary min-[2000px]:text-[100px]`}>
                INTERNATIONAL PARTICIPATIONS & VICTORIES
              </h2>
            </div>
          </motion.div>

          <div className="w-full flex flex-col items-center gap-4 lg:gap-6 xl:gap-8">
            
            {/* Desktop Tier */}
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

            {/* Mobile / Tablet Tier */}
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

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
            opacity: 0;
          }
        `}} />
      </section>

      {/* ========================================== */}
      {/* Section: Deployment Gallery (Image Slider) */}
      {/* ========================================== */}
      <section className="w-full border-b border-hairline bg-[#000000]">
        <DeploymentGallery />
      </section>

      {/* ========================================== */}
      {/* Section: Development Environments (Tech Stack) */}
      {/* ========================================== */}
      <section className="relative w-full pt-16 pb-16 px-6 md:px-12 bg-[#000000] overflow-hidden min-[2000px]:py-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={parentVariants}
          className="max-w-7xl min-[2000px]:max-w-[2400px] mx-auto flex flex-col items-center justify-center relative z-10"
        >
          
          {/* 1. Header Section */}
          <motion.div variants={childVariants}>
            <div className="text-center mb-6 min-[2000px]:mb-10">
              <h2 className={`${displayXl} text-[32px] sm:text-[46px] md:text-[55px] lg:text-[80px] text-primary mb-2 min-[2000px]:text-[100px] whitespace-nowrap`}>
                DISCOVER OUR
              </h2>
              <h2 className={`${displayLg} text-[22px] sm:text-[34px] md:text-[40px] lg:text-[50px] text-muted min-[2000px]:text-[60px] whitespace-nowrap lg:whitespace-normal`}>
                DEVELOPMENT ENVIRONMENTS
              </h2>
            </div>
          </motion.div>

          {/* 2. Divider Segment */}
          <motion.div variants={childVariants}>
            <div className="h-[1px] w-full max-w-[300px] md:max-w-xl mx-auto bg-muted mb-12 min-[2000px]:mb-20" />
          </motion.div>

          {/* 3. Tools Grid Section */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 w-full max-w-5xl min-[2000px]:max-w-7xl min-[2000px]:gap-12"
            variants={parentVariants}
          >
            {/* [
              { icon: Terminal, title: 'ARDUINO IDE', id: 'arduino' },
              { icon: Box, title: 'EASY EDA', id: 'easyeda' },
              { icon: Cpu, title: 'FUSION 360', id: 'fusion' },
              { icon: Code, title: 'VISUAL STUDIO', id: 'vscode' },
            ].map((tool) => ( */}
            {[
              { icon: Terminal, title: 'ARDUINO IDE', id: 'arduino' },
              { icon: Box, title: 'EASY EDA', id: 'easyeda' },
              { icon: Cpu, title: 'FUSION 360', id: 'fusion' },
              { icon: Code, title: 'VISUAL STUDIO', id: 'vscode' },
            ].map((tool) => (
              <motion.div 
                key={tool.id}
                variants={childVariants}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                <div className="flex flex-col items-center p-4 md:p-8 rounded-none bg-surface-card border border-hairline hover:bg-surface-elevated transition-all duration-500 ease-out aspect-square md:aspect-auto overflow-hidden min-[2000px]:p-12">
                  <div className="mb-2 md:mb-6 min-[2000px]:mb-10">
                    <tool.icon className="w-8 h-8 md:w-12 md:h-12 min-[2000px]:w-20 min-[2000px]:h-20 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className={`${captionUpper} text-center mt-4 text-muted transition-colors duration-500 ease-out group-hover:text-primary min-[2000px]:text-lg`}>
                    {tool.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </section>

    </div>
  );
}