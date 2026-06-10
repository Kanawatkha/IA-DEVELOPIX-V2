"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  MessageCircle, Truck, ShieldCheck, 
  ChevronRight, ChevronLeft, ChevronDown, 
  ArrowRight, Facebook, Instagram, Youtube, Globe 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Phase 1 imports: Shared Constants
import { TOP_BANNERS, FOOTER_LINKS } from "@/src/constants";

const formatModelName = (name: string) => {
  const parts = name.split("cm");
  
  if (name.includes('GATHERING') || name.includes('SUMO')) {
      return (
          <div className="flex flex-row items-center gap-1.5 whitespace-nowrap md:flex-col md:items-start md:gap-0 md:whitespace-normal lg:flex-row lg:items-center lg:gap-1.5 lg:whitespace-nowrap">
             <span className="leading-tight text-[13px]">{name}</span>
             <span className="text-[13px] md:text-[9px] text-primary/40 tracking-widest font-normal">(COMING SOON)</span>
          </div>
      )
  }
  
  if (name.includes('FANPULL 15cm') || name.includes('FANPULL 18cm')) {
      const formatted = parts.length > 1 ? (
        <>
          {parts[0]}<span className="lowercase text-[0.75em] opacity-60">cm</span>{parts[1]}
        </>
      ) : name;
      return (
          <div className="flex flex-row items-center gap-1.5 whitespace-nowrap md:flex-col md:items-start md:gap-0 md:whitespace-normal lg:flex-row lg:items-center lg:gap-1.5 lg:whitespace-nowrap">
             <span className="leading-tight text-[13px]">{formatted}</span>
             <span className="text-[13px] md:text-[9px] text-primary/40 tracking-widest font-normal">(COMING SOON)</span>
          </div>
      )
  }

  return parts.length > 1 ? (
    <>
      {parts[0]}<span className="lowercase text-[0.75em] opacity-60">cm</span>{parts[1]}
    </>
  ) : name;
};


export function Footer() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const nextBanner = () => {
    setSlideDirection(1);
    setCurrentBanner((prev) => (prev + 1) % TOP_BANNERS.length);
  };
  
  const prevBanner = () => {
    setSlideDirection(-1);
    setCurrentBanner((prev) => (prev - 1 + TOP_BANNERS.length) % TOP_BANNERS.length);
  };

  const toggleAccordion = (title: string) => setOpenAccordion(openAccordion === title ? null : title);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sliderVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? "50%" : "-50%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? "50%" : "-50%", opacity: 0 })
  };

  return (
    <footer className="w-full bg-canvas border-t border-hairline flex flex-col justify-between h-auto max-md:min-h-[100dvh] max-md:pb-[80px]">
      <div className="max-w-[1720px] min-[2000px]:max-w-[1920px] mx-auto w-full px-6 md:px-12">
        {/* ============================== */}
        {/* 4.1 Top Banner */}
        {/* ============================== */}
        <div className="hidden md:grid grid-cols-3 pt-12 min-[1920px]:pt-20 pb-4 min-[1920px]:pb-8">
          {TOP_BANNERS.map((banner, idx) => (
            <div key={idx} className="flex flex-col items-start pr-8">
              <div className="flex items-center space-x-4 mb-2 min-[1920px]:mb-6">
                <banner.icon className="w-6 h-6 min-[1920px]:w-10 min-[1920px]:h-10 text-primary" strokeWidth={1.5} />
                <h3 className="font-mono text-xs min-[1920px]:text-sm uppercase tracking-[2px] text-primary font-normal">
                  {banner.title}
                </h3>
              </div>
              <p className="font-serif text-xs min-[1920px]:text-sm text-body pl-10 min-[1920px]:pl-14 leading-relaxed">
                {banner.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="md:hidden flex flex-col items-center justify-center py-4 px-2 h-auto overflow-hidden shrink-0 mt-4">
          <div className="flex items-center justify-between w-full mb-2 relative min-h-[90px]">
            <button onClick={prevBanner} className="p-2 text-muted hover:text-primary transition-colors outline-none z-10 absolute left-0">
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
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col items-center text-center flex-1 px-10 absolute w-full"
              >
                {React.createElement(TOP_BANNERS[currentBanner].icon, { className: "w-7 h-7 text-primary mb-2", strokeWidth: 1 })}
                <h3 className="font-mono text-xs uppercase tracking-[2px] text-primary font-normal mb-1">
                  {TOP_BANNERS[currentBanner].title}
                </h3>
                <p className="font-serif text-xs text-body leading-tight">
                  {TOP_BANNERS[currentBanner].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            <button onClick={nextBanner} className="p-2 text-muted hover:text-primary transition-colors outline-none z-10 absolute right-0">
              <ChevronRight strokeWidth={1} size={28} />
            </button>
          </div>
          <div className="flex space-x-2 mt-2">
            {TOP_BANNERS.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  setSlideDirection(idx > currentBanner ? 1 : -1);
                  setCurrentBanner(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${currentBanner === idx ? 'bg-primary' : 'bg-muted-soft'}`}
              />
            ))}
          </div>
        </div>

        {/* ============================== */}
        {/* 4.2 Links & Newsletter */}
        {/* ============================== */}
        <div className="flex flex-col md:flex-row justify-center py-4 md:py-16 min-[1920px]:py-24 gap-y-10 md:gap-y-12">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 min-[1920px]:gap-16">
            
            <div className="hidden md:contents">
              {FOOTER_LINKS.map((col) => (
                <div key={col.title} className="flex flex-col space-y-6 min-[1920px]:space-y-10">
                  <h4 className="font-mono text-xs min-[1920px]:text-sm font-normal text-primary tracking-[2px] uppercase">
                    {col.title}
                  </h4>
                  <ul className={col.title === 'ROBOT MODELS' ? 'columns-1 min-[1025px]:columns-2 gap-x-6' : 'flex flex-col space-y-3 min-[1920px]:space-y-6'}>
                    {col.links.map((link) => (
                      <li key={link.label} className={col.title === 'ROBOT MODELS' ? 'mb-1.5 break-inside-avoid' : ''}>
                        <Link href={link.href} className="font-serif text-xs min-[1920px]:text-sm tracking-normal text-muted hover:text-primary transition-colors duration-300 block">
                          {formatModelName(link.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:hidden w-full border-t border-hairline">
              {FOOTER_LINKS.map((col) => (
                <div key={col.title} className="w-full border-b border-hairline">
                  <button onClick={() => toggleAccordion(col.title)} className="flex items-center justify-between w-full py-3 text-left outline-none">
                    <span className="font-mono text-xs font-normal text-primary tracking-[2px] uppercase">{col.title}</span>
                    <motion.div animate={{ rotate: openAccordion === col.title ? 180 : 0 }}>
                      <ChevronDown size={16} className="text-muted" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openAccordion === col.title && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <ul className={col.title === 'ROBOT MODELS' ? 'columns-1 min-[1025px]:columns-2 gap-x-4 pb-4 pl-2' : 'flex flex-col space-y-4 pb-4 pl-2'}>
                          {col.links.map((link) => (
                            <li key={link.label} className={col.title === 'ROBOT MODELS' ? 'mb-2 break-inside-avoid' : ''}>
                              <Link href={link.href} className="font-serif text-xs tracking-normal text-muted hover:text-primary block py-1.5">
                                {formatModelName(link.label)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[350px] lg:w-[450px] min-[1920px]:w-[700px] flex flex-col space-y-4 md:space-y-6 min-[1920px]:space-y-12 shrink-0">
            <h2 className="font-display text-xl md:text-2xl min-[1920px]:text-4xl uppercase tracking-[2px] text-primary leading-tight font-normal">
              JOIN OUR MAILING LIST FOR EXCLUSIVE UPDATES
            </h2>
            <div className="flex items-center border-b border-hairline-strong pb-2 md:pb-3 min-[1920px]:pb-6 group hover:border-primary transition-colors">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="bg-transparent flex-1 outline-none font-serif text-xs md:text-sm min-[1920px]:text-lg text-primary placeholder:text-muted tracking-normal"
              />
              <button className="text-muted group-focus-within:text-primary hover:text-primary transition-colors pl-4 outline-none">
                <ArrowRight strokeWidth={1.5} className="min-[1920px]:w-8 min-[1920px]:h-8" />
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 min-[1920px]:space-x-10 pt-4 min-[1920px]:pt-8">
              <Facebook strokeWidth={1} className="w-5 h-5 min-[1920px]:w-8 min-[1920px]:h-8 text-muted hover:text-primary transition-colors cursor-pointer" />
              <span className="font-display font-normal text-lg min-[1920px]:text-2xl text-muted hover:text-primary transition-colors cursor-pointer">X</span>
              <Instagram strokeWidth={1} className="w-5 h-5 min-[1920px]:w-8 min-[1920px]:h-8 text-muted hover:text-primary transition-colors cursor-pointer" />
              <Youtube strokeWidth={1} className="w-6 h-6 min-[1920px]:w-10 min-[1920px]:h-10 text-muted hover:text-primary transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* 4.3 Bottom Bar */}
      {/* ============================== */}
      <div className="w-full border-t border-hairline">
        <div className="px-6 md:px-12 min-[1920px]:px-24 py-4 md:py-6 min-[1920px]:py-10 flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 shrink-0">
          
          <div className="flex md:hidden items-center space-x-8 w-full justify-center order-1">
            <Facebook strokeWidth={1} className="w-4 h-4 text-muted" />
            <span className="font-display font-normal text-base text-muted">X</span>
            <Instagram strokeWidth={1} className="w-4 h-4 text-muted" />
            <Youtube strokeWidth={1} className="w-5 h-5 text-muted" />
          </div>

          <p className="font-serif text-xs text-muted tracking-normal text-center md:text-left order-3 md:order-1 w-full md:w-auto mt-2 md:mt-0">
            © 2026 IA DEVELOPIX. ALL RIGHTS RESERVED.
          </p>

          <div className="relative order-2 flex flex-col items-center w-[190px] md:w-auto md:min-w-[190px]" ref={langRef}>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-2 left-0 w-full bg-canvas border border-hairline rounded-none p-2 z-50 flex flex-col space-y-1 shadow-none"
                >
                  <button 
                    onClick={() => setIsLangOpen(false)} 
                    className="text-left font-mono text-xs text-primary uppercase tracking-[2px] hover:bg-primary/5 p-2.5 rounded-none transition-colors whitespace-nowrap"
                  >
                    EN - ENGLISH
                  </button>
                  <button 
                    onClick={() => setIsLangOpen(false)} 
                    className="text-left font-mono text-xs text-muted uppercase tracking-[2px] hover:text-primary hover:bg-primary/5 p-2.5 rounded-none transition-colors whitespace-nowrap"
                  >
                    TH - THAI
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setIsLangOpen(!isLangOpen)} 
              className="flex items-center justify-between w-full border border-hairline rounded-pill px-5 py-2 hover:bg-primary/5 transition-colors outline-none"
            >
              <Globe className="w-4 h-4 min-[1920px]:w-6 min-[1920px]:h-6 text-muted" strokeWidth={1.5} />
              <span className="font-mono text-[10px] min-[1920px]:text-sm text-primary uppercase tracking-[2px] whitespace-nowrap mx-2">
                THAI / ENGLISH
              </span>
              <ChevronDown className="w-4 h-4 min-[1920px]:w-6 min-[1920px]:h-6 text-muted" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-3 md:space-x-4 min-[1920px]:space-x-6 order-4 md:order-3 w-full md:w-auto">
            <span className="font-mono text-[8px] md:text-[9px] min-[1920px]:text-xs text-muted tracking-widest uppercase">VISA</span>
            <span className="font-mono text-[8px] md:text-[9px] min-[1920px]:text-xs text-muted tracking-widest uppercase">MASTERCARD</span>
            <span className="font-mono text-[8px] md:text-[9px] min-[1920px]:text-xs text-muted tracking-widest uppercase">PROMPTPAY</span>
          </div>
        </div>
      </div>
      
    </footer>
  );
}