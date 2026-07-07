'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TOP_BANNERS } from "@/src/constants";
import { sliderVariants } from "../animations";

/**
 * Renders the top value proposition banners.
 * Handles responsive layout by presenting a grid columns layout on desktop
 * and an interactive carousel slider utilizing Framer Motion on mobile viewports.
 */
export function FooterBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const nextBanner = () => {
    setSlideDirection(1);
    setCurrentBanner((prev) => (prev + 1) % TOP_BANNERS.length);
  };

  const prevBanner = () => {
    setSlideDirection(-1);
    setCurrentBanner((prev) => (prev - 1 + TOP_BANNERS.length) % TOP_BANNERS.length);
  };

  const Icon0 = TOP_BANNERS[0].icon;
  const Icon1 = TOP_BANNERS[1].icon;
  const Icon2 = TOP_BANNERS[2].icon;

  return (
    <>
      {/* Desktop Banner Grid */}
      <div className="hidden md:flex flex-row justify-between w-full pt-12 min-[1920px]:pt-20 pb-4 min-[1920px]:pb-8">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 min-[1920px]:gap-16">
          {/* Column 1: CUSTOMER SERVICE */}
          <div className="flex flex-col items-start text-left pr-8">
            <div className="flex items-center space-x-4 mb-2 min-[1920px]:mb-6 w-full justify-start">
              <Icon0 className="w-6 h-6 min-[1920px]:w-10 min-[1920px]:h-10 text-primary" strokeWidth={1.5} />
              <h3 className="font-mono text-[11px] md:text-xs min-[1920px]:text-sm xl:text-base uppercase tracking-[2px] text-primary font-normal">
                {TOP_BANNERS[0].title}
              </h3>
            </div>
            <p className="font-serif text-[11px] md:text-xs min-[1920px]:text-[15px] text-body leading-relaxed w-full text-left pl-10 min-[1920px]:pl-14">
              {TOP_BANNERS[0].desc}
            </p>
          </div>

          {/* Column 2: FAST FREE SHIPPING */}
          <div className="flex flex-col items-start text-left pr-8">
            <div className="flex items-center space-x-4 mb-2 min-[1920px]:mb-6 w-full justify-start">
              <Icon1 className="w-6 h-6 min-[1920px]:w-10 min-[1920px]:h-10 text-primary" strokeWidth={1.5} />
              <h3 className="font-mono text-[11px] md:text-xs min-[1920px]:text-sm xl:text-base uppercase tracking-[2px] text-primary font-normal">
                {TOP_BANNERS[1].title}
              </h3>
            </div>
            <p className="font-serif text-[11px] md:text-xs min-[1920px]:text-[15px] text-body leading-relaxed w-full text-left pl-10 min-[1920px]:pl-14">
              {TOP_BANNERS[1].desc}
            </p>
          </div>
        </div>

        {/* Column 3: SECURE PAYMENT */}
        <div className="w-full md:w-[350px] lg:w-[450px] min-[1920px]:w-[700px] flex-shrink-0 flex flex-col items-start text-left pl-8 pr-0">
          <div className="flex items-center space-x-4 mb-2 min-[1920px]:mb-6 w-full justify-start">
            <Icon2 className="w-6 h-6 min-[1920px]:w-10 min-[1920px]:h-10 text-primary" strokeWidth={1.5} />
            <h3 className="font-mono text-[11px] md:text-xs min-[1920px]:text-sm xl:text-base uppercase tracking-[2px] text-primary font-normal">
              {TOP_BANNERS[2].title}
            </h3>
          </div>
          <p className="font-serif text-[11px] md:text-xs min-[1920px]:text-[15px] text-body leading-relaxed w-full text-left pl-10 min-[1920px]:pl-14">
            {TOP_BANNERS[2].desc}
          </p>
        </div>
      </div>

      {/* Mobile Interactive Slider */}
      <div className="md:hidden flex flex-col items-center justify-center py-4 px-2 h-auto overflow-hidden shrink-0 mt-4">
        <div className="flex items-center justify-between w-full mb-2 relative min-h-[90px]">
          <button
            onClick={prevBanner}
            className="p-2 text-muted hover:text-primary transition-colors outline-none z-10 absolute left-0 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft strokeWidth={1} size={28} />
          </button>

          <AnimatePresence mode="popLayout" custom={slideDirection}>
            <motion.div
              key={currentBanner}
              custom={slideDirection}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                const swipe = info.offset.x;
                const swipeThreshold = 50;
                if (swipe < -swipeThreshold) {
                  nextBanner();
                } else if (swipe > swipeThreshold) {
                  prevBanner();
                }
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col items-center text-center flex-1 px-10 absolute w-full cursor-grab active:cursor-grabbing"
            >
              {React.createElement(TOP_BANNERS[currentBanner].icon, {
                className: "w-7 h-7 text-primary mb-2 select-none pointer-events-none",
                strokeWidth: 1,
              })}
              <h3 className="font-mono text-xs uppercase tracking-[2px] text-primary font-normal mb-1 select-none">
                {TOP_BANNERS[currentBanner].title}
              </h3>
              <p className="font-serif text-xs text-body leading-tight select-none">
                {TOP_BANNERS[currentBanner].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={nextBanner}
            className="p-2 text-muted hover:text-primary transition-colors outline-none z-10 absolute right-0 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight strokeWidth={1} size={28} />
          </button>
        </div>

        {/* Paginated dots indicators */}
        <div className="flex space-x-2 mt-2">
          {TOP_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSlideDirection(idx > currentBanner ? 1 : -1);
                setCurrentBanner(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-colors cursor-pointer ${
                currentBanner === idx ? "bg-primary" : "bg-muted-soft"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
