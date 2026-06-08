'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useAnimation, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { ACHIEVEMENTS, type Achievement } from '@/src/lib/data/achievements';
import { parentVariants, childVariants, fastChildVariants } from '@/src/lib/design/variants';
import * as ty from '@/src/lib/design/typography';

// Standalone component rendering the timeline segment, declared outside major render scope to keep React performance native and avoid state resets on tickers
const TimelineGroup = ({ 
  achievements, 
  onCardClick 
}: { 
  achievements: Achievement[]; 
  onCardClick?: (item: Achievement) => void;
}) => (
  <div className="flex items-center gap-16 select-none shrink-0 text-left">
    {/* Head Node (Before Card 1) */}
    <div className="flex items-center gap-12 pl-16 shrink-0">
      <div className="w-auto h-auto relative overflow-hidden bg-surface-card/60 backdrop-blur-sm border border-hairline p-4 rounded-none flex items-center justify-center">
        <span className={`${ty.captionUpper} text-[11px] text-muted whitespace-nowrap`}>
          START 2024
        </span>
      </div>
      <div className="h-[1px] bg-hairline w-64 shrink-0" />
    </div>

    {/* Cards Render Block */}
    {achievements.map((item, idx) => (
      <div 
         key={idx}
        onClick={() => onCardClick?.(item)}
        className="w-[290px] sm:w-[390px] md:w-[500px] h-[340px] shrink-0 border border-hairline bg-surface-card/60 backdrop-blur-sm p-6 relative overflow-hidden rounded-none flex flex-col justify-between animate-fade-in cursor-pointer hover:border-hairline-strong transition-all duration-300"
      >
        {/* Background Image Wrapper */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 brightness-50 pointer-events-none select-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80')` }}
        />
        
        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-start text-left w-full h-full justify-between pointer-events-none select-none">
          {/* Top Metadata */}
          <div className="w-full">
            <div className="flex justify-between items-center w-full mb-3">
              <span className={`${ty.captionUpper} text-[11px] text-primary`}>
                {item.date}
              </span>
              <span className={`${ty.captionUpper} text-[11px] text-muted`}>
                ACHIEVEMENT
              </span>
            </div>
            
            <h3 className={`${ty.titleMd} leading-tight text-primary mb-4 whitespace-normal`}>
              {item.eventName}
            </h3>
          </div>

          {/* Hairline sub-divider */}
          <div className="w-full border-t border-hairline-strong pt-4 mt-auto">
            <div className="grid grid-cols-2 gap-2 text-left mb-3">
              <div>
                <span className="font-mono font-normal text-[9px] tracking-[2px] text-muted uppercase block mb-0.5">CAT.</span>
                <span className={`${ty.captionUpper} text-[11px] text-primary block truncate`}>{item.category}</span>
              </div>
              <div>
                <span className="font-mono font-normal text-[9px] tracking-[2px] text-muted uppercase block mb-0.5">SYS.</span>
                <span className={`${ty.captionUpper} text-[11px] text-primary block truncate`}>{item.model}</span>
              </div>
            </div>

            <div className="border-t border-hairline pt-2 flex flex-col items-start">
              <span className="font-mono font-normal text-[9px] tracking-[2px] text-muted uppercase mb-1">RANK / TIER</span>
              <span className={`${ty.titleSm} text-primary truncate w-full text-left`}>
                {item.rank}{" / "}{item.tier}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}

    {/* Tail Node (After last card) */}
    <div className="flex items-center gap-12 pr-16 shrink-0">
      <div className="h-[1px] bg-hairline w-64 shrink-0" />
      <div className="w-auto h-auto relative overflow-hidden bg-surface-card/60 backdrop-blur-sm border border-hairline p-4 rounded-none flex items-center justify-center">
        <span className={`${ty.captionUpper} text-[11px] text-primary whitespace-nowrap`}>
          PRESENT
        </span>
      </div>
    </div>
  </div>
);

export default function AboutPage() {
  const outerX = useMotionValue(0);
  const innerX = useMotionValue(0);
  const controls = useAnimation();
  const movingRowRef = React.useRef<HTMLDivElement>(null);
  const [halfWidth, setHalfWidth] = React.useState(27000); // realistic initial fallback corresponding to 50 cards
  const [isHovered, setIsHovered] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const [activeAchievement, setActiveAchievement] = React.useState<Achievement | null>(null);
  const activeAchievementRef = React.useRef<Achievement | null>(null);

  React.useEffect(() => {
    activeAchievementRef.current = activeAchievement;

    const header = document.querySelector('header');
    if (activeAchievement !== null) {
      document.body.style.overflow = 'hidden';
      if (header) {
        header.style.setProperty('transform', 'translateY(-100%)', 'important');
        header.style.setProperty('transition', 'transform 300ms ease', 'important');
      }
    } else {
      document.body.style.overflow = 'unset';
      if (header) {
        header.style.removeProperty('transform');
        header.style.removeProperty('transition');
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (header) {
        header.style.removeProperty('transform');
        header.style.removeProperty('transition');
      }
    };
  }, [activeAchievement]);

  // States for 3-axis filtering
  const [selectedYears, setSelectedYears] = React.useState<string[]>([]);
  const [selectedTiers, setSelectedTiers] = React.useState<string[]>([]);
  const [selectedRanks, setSelectedRanks] = React.useState<string[]>([]);
  const [expandedDrawer, setExpandedDrawer] = React.useState<'period' | 'tier' | 'rank' | null>(null);

  const toggleDrawer = (drawer: 'period' | 'tier' | 'rank') => {
    setExpandedDrawer(prev => prev === drawer ? null : drawer);
  };

  const isHoveredRef = React.useRef(false);
  const isDraggingRef = React.useRef(false);

  React.useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  React.useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 1500);
  };

  // Perform multi-criteria matrix intersection filtering
  const filteredAchievements = React.useMemo(() => {
    return ACHIEVEMENTS.filter((item) => {
      const yearMatch = selectedYears.length === 0 || selectedYears.includes(item.year);
      const tierMatch = selectedTiers.length === 0 || selectedTiers.includes(item.tier);
      const rankMatch = selectedRanks.length === 0 || selectedRanks.includes(item.rank);
      return yearMatch && tierMatch && rankMatch;
    });
  }, [selectedYears, selectedTiers, selectedRanks]);

  const displayAchievements = React.useMemo(() => {
    if (filteredAchievements.length === 0) return [];
    let padded = [...filteredAchievements];
    // Keep duplicating until we have at least 15 items
    while (padded.length < 15) {
      padded = [...padded, ...filteredAchievements];
    }
    return padded;
  }, [filteredAchievements]);

  // Measuring target container width precisely with a ResizeObserver to maintain accurate loop points
  React.useEffect(() => {
    if (!movingRowRef.current) return;
    const updateSize = () => {
      if (movingRowRef.current) {
        setHalfWidth(movingRowRef.current.scrollWidth / 2);
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(movingRowRef.current);
    return () => observer.disconnect();
  }, [displayAchievements]);

  const runTicker = React.useCallback((startX: number) => {
    if (!halfWidth) return;

    // Enforce a fixed linear velocity calculation:
    // This allows the speed to remain absolutely constant and uniform regardless of filtering counts or halfWidth sizes.
    const speed = 225; 
    const remainingDistance = startX - (-halfWidth);
    const duration = remainingDistance / speed;

    controls.start({
      x: -halfWidth,
      transition: {
        ease: "linear",
        duration: duration > 0 ? duration : 0.1,
      }
    }).then(() => {
      if (!isHoveredRef.current && !isDraggingRef.current && activeAchievementRef.current === null) {
        outerX.set(0);
        controls.set({ x: 0 });
        controls.start({
          x: -halfWidth,
          transition: {
            ease: "linear",
            duration: halfWidth / speed,
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      }
    });
  }, [halfWidth, controls, outerX]);

  const prevCountRef = React.useRef(filteredAchievements.length);

  React.useEffect(() => {
    const prevCount = prevCountRef.current;
    const currentCount = filteredAchievements.length;
    prevCountRef.current = currentCount;

    if (prevCount === 0 && currentCount > 0) {
      outerX.set(0);
      innerX.set(0);
      controls.set({ x: 0 });
      if (halfWidth) {
        const speed = 225;
        controls.start({
          x: -halfWidth,
          transition: {
            ease: "linear",
            duration: halfWidth / speed,
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      }
    }
  }, [filteredAchievements.length, halfWidth, controls, outerX, innerX]);

  React.useEffect(() => {
    if (!halfWidth) return;

    if (!isHovered && !isDragging && activeAchievement === null) {
      const current = outerX.get();
      const wrapped = ((current % halfWidth) + halfWidth) % halfWidth - halfWidth;
      outerX.set(wrapped);
      runTicker(wrapped);
    } else {
      controls.stop();
    }

    return () => {
      controls.stop();
    };
  }, [halfWidth, isHovered, isDragging, runTicker, outerX, controls, filteredAchievements.length, activeAchievement]);

  // Real-time boundary monitoring check for seamless teleportation loop
  React.useEffect(() => {
    const unsubscribe = innerX.on("change", (latest) => {
      if (!halfWidth) return;
      if (latest < -halfWidth) {
        innerX.set(latest + halfWidth);
      } else if (latest > 0) {
        innerX.set(latest - halfWidth);
      }
    });
    return () => unsubscribe();
  }, [halfWidth, innerX]);

  // Handle toggle logic for Years
  const toggleYear = (year: string) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter((y) => y !== year));
    } else {
      setSelectedYears([...selectedYears, year]);
    }
  };

  // Handle toggle logic for Tiers
  const toggleTier = (tier: string) => {
    if (selectedTiers.includes(tier)) {
      setSelectedTiers(selectedTiers.filter((t) => t !== tier));
    } else {
      setSelectedTiers([...selectedTiers, tier]);
    }
  };

  // Handle toggle logic for Ranks
  const toggleRank = (rank: string) => {
    if (selectedRanks.includes(rank)) {
      setSelectedRanks(selectedRanks.filter((r) => r !== rank));
    } else {
      setSelectedRanks([...selectedRanks, rank]);
    }
  };

  // Clear all filters back to "ALL"
  const clearAllFilters = () => {
    setSelectedYears([]);
    setSelectedTiers([]);
    setSelectedRanks([]);
    setExpandedDrawer(null);
  };

  return (
    <main className="w-full min-h-screen bg-canvas text-primary overflow-hidden font-serif">
      {/* ===================================== */}
      {/* SECTION 1: IDENTITY & VISION         */}
      {/* ===================================== */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 min-[1025px]:h-[calc(100vh-80px)] min-[1025px]:min-h-[calc(100vh-80px)] min-[1025px]:max-h-[calc(100vh-80px)] max-[1024px]:h-auto max-[1024px]:min-h-auto max-[767px]:py-12 min-[768px]:max-[1024px]:py-16 min-[1025px]:py-0 flex items-center">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center w-full">
          
          {/* LEFT COLUMN: 1:1 Logo Block */}
          <div className="w-full md:w-1/2 aspect-square relative flex items-center justify-center border border-hairline p-8 max-h-[65vh] md:max-h-[calc(100vh-200px)] mx-auto order-1 rounded-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://i.postimg.cc/C5NnVVq0/i-A-Developix.jpg"
              alt="IA DEVELOPER Logo"
              referrerPolicy="no-referrer"
              className="object-contain w-full h-full select-none"
            />
          </div>

          {/* RIGHT COLUMN: Text Architecture Override */}
          <div className="text-left flex flex-col justify-center w-full md:w-1/2 order-2">
            {/* Eyebrow Label */}
            <span className={`${ty.captionUpper} text-xs text-muted mb-4`}>
              ABOUT US
            </span>

            {/* Main Headline */}
            <h1 className={`${ty.displayXl} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.0] lg:leading-[1.0] text-primary mb-6`}>
              ENGINEERING THE ULTIMATE SPEED
            </h1>

            {/* Vision Paragraph */}
            <p className={`${ty.bodyMd} text-[16px] lg:text-[18px] text-muted max-w-xl`}>
              IA DEVELOPER was founded by a synergy of robotics engineers dedicated to rewriting the physics of autonomous racing. From precise hardware mechanics to cutting-edge AI software algorithms, we build high-speed systems you can rely on.
            </p>
          </div>

        </div>
      </section>

      {/* ===================================== */}
      {/* SECTION 2: FOUNDERS                  */}
      {/* ===================================== */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-8 pb-16 border-t border-hairline">
        {/* Section Heading */}
        <h2 className={`${ty.displayLg} text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.0] text-primary text-left mb-6`}>
          FOUNDERS
        </h2>

        {/* Founders Grid - restricted card blocks max-width & center-aligned */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 justify-center justify-items-center max-w-[900px] mx-auto">
          
          {/* Founder 1 */}
          <div className="flex flex-col items-start w-full max-w-[420px] rounded-none">
            {/* Image Wrapper */}
            <div className="w-full aspect-[4/5] relative overflow-hidden bg-canvas border border-hairline rounded-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.postimg.cc/5ywT4s4v/My-Picture-1.jpg"
                alt="Kanawat Khamkongchai - Founder & Hardware Engineer"
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full select-none transition-transform duration-300 ease-out hover:scale-105"
              />
            </div>
            
            {/* Name and Title Metadata */}
            <h3 className={`${ty.navLink} text-xs text-primary mt-4 text-left`}>
              KANAWAT KHAMKONGCHAI
            </h3>
            <span className={`${ty.captionUpper} text-[11px] text-muted mb-4 block text-left`}>
              FOUNDER & HARDWARE ENGINEER
            </span>

            {/* Contact Telemetry Stack (3-Row Vertical Stack) */}
            <div className="flex flex-col items-start w-full mt-2 space-y-3 font-mono font-normal">
              <div className="flex items-center">
                <Link
                  href="https://github.com/kanawat-kh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ty.captionUpper} text-[11px] text-primary block relative pb-0.5 after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
                >
                  GITHUB: github.com/kanawat-kh
                </Link>
                <button
                  type="button"
                  onClick={() => handleCopy("github.com/kanawat-kh", "f1-github")}
                  className={`ml-4 text-muted hover:text-primary transition-colors duration-200 cursor-pointer ${ty.captionUpper} text-[11px] bg-transparent border-none`}
                >
                  {copiedText === "f1-github" ? "[COPIED]" : "[COPY]"}
                </button>
              </div>

              <div className="flex items-center">
                <Link
                  href="https://linkedin.com/in/kanawat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ty.captionUpper} text-[11px] text-primary block relative pb-0.5 after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
                >
                  LINKEDIN: linkedin.com/in/kanawat
                </Link>
                <button
                  type="button"
                  onClick={() => handleCopy("linkedin.com/in/kanawat", "f1-linkedin")}
                  className={`ml-4 text-muted hover:text-primary transition-colors duration-200 cursor-pointer ${ty.captionUpper} text-[11px] bg-transparent border-none`}
                >
                  {copiedText === "f1-linkedin" ? "[COPIED]" : "[COPY]"}
                </button>
              </div>

              <div className="flex items-center">
                <Link
                  href="mailto:kanawat@iadeveloper.co.th"
                  className={`${ty.captionUpper} text-[11px] text-primary block relative pb-0.5 after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
                >
                  EMAIL: kanawat@iadeveloper.co.th
                </Link>
                <button
                  type="button"
                  onClick={() => handleCopy("kanawat@iadeveloper.co.th", "f1-email")}
                  className={`ml-4 text-muted hover:text-primary transition-colors duration-200 cursor-pointer ${ty.captionUpper} text-[11px] bg-transparent border-none`}
                >
                  {copiedText === "f1-email" ? "[COPIED]" : "[COPY]"}
                </button>
              </div>
            </div>
          </div>

          {/* Founder 2 */}
          <div className="flex flex-col items-start w-full max-w-[420px] rounded-none">
            {/* Image Wrapper */}
            <div className="w-full aspect-[4/5] relative overflow-hidden bg-canvas border border-hairline rounded-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.postimg.cc/5ywT4s4v/My-Picture-1.jpg"
                alt="Co-Founder & Software Architect"
                referrerPolicy="no-referrer"
                className="object-cover w-full h-full select-none transition-transform duration-300 ease-out hover:scale-105"
              />
            </div>
            
            {/* Name and Title Metadata */}
            <h3 className={`${ty.navLink} text-xs text-primary mt-4 text-left`}>
              PHASSAPON CHALERMSANG
            </h3>
            <span className={`${ty.captionUpper} text-[11px] text-muted mb-4 block text-left`}>
              CO-FOUNDER & SOFTWARE ARCHITECT
            </span>

            {/* Contact Telemetry Stack (3-Row Vertical Stack) */}
            <div className="flex flex-col items-start w-full mt-2 space-y-3 font-mono font-normal">
              <div className="flex items-center">
                <Link
                  href="https://github.com/phassapon-ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ty.captionUpper} text-[11px] text-primary block relative pb-0.5 after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
                >
                  GITHUB: github.com/phassapon-ch
                </Link>
                <button
                  type="button"
                  onClick={() => handleCopy("github.com/phassapon-ch", "f2-github")}
                  className={`ml-4 text-muted hover:text-primary transition-colors duration-200 cursor-pointer ${ty.captionUpper} text-[11px] bg-transparent border-none`}
                >
                  {copiedText === "f2-github" ? "[COPIED]" : "[COPY]"}
                </button>
              </div>

              <div className="flex items-center">
                <Link
                  href="https://linkedin.com/in/phassapon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ty.captionUpper} text-[11px] text-primary block relative pb-0.5 after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
                >
                  LINKEDIN: linkedin.com/in/phassapon
                </Link>
                <button
                  type="button"
                  onClick={() => handleCopy("linkedin.com/in/phassapon", "f2-linkedin")}
                  className={`ml-4 text-muted hover:text-primary transition-colors duration-200 cursor-pointer ${ty.captionUpper} text-[11px] bg-transparent border-none`}
                >
                  {copiedText === "f2-linkedin" ? "[COPIED]" : "[COPY]"}
                </button>
              </div>

              <div className="flex items-center">
                <Link
                  href="mailto:phassapon@iadeveloper.co.th"
                  className={`${ty.captionUpper} text-[11px] text-primary block relative pb-0.5 after:content-[''] after:absolute after:w-full after:h-[1px] after:bottom-0 after:left-0 after:bg-current after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100`}
                >
                  EMAIL: phassapon@iadeveloper.co.th
                </Link>
                <button
                  type="button"
                  onClick={() => handleCopy("phassapon@iadeveloper.co.th", "f2-email")}
                  className={`ml-4 text-muted hover:text-primary transition-colors duration-200 cursor-pointer ${ty.captionUpper} text-[11px] bg-transparent border-none`}
                >
                  {copiedText === "f2-email" ? "[COPIED]" : "[COPY]"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===================================== */}
      {/* SECTION 3: TRACK RECORD TICKER       */}
      {/* ===================================== */}
      <section 
        className="w-full bg-canvas pt-8 pb-16 border-t border-hairline overflow-hidden"
      >
        {/* For Handheld Viewports (1024px and below) Heading + Clear Reset Icon Top-Row Consolidation */}
        <div className="min-[1025px]:hidden w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-6 select-none flex items-center justify-between">
          <h2 className={`${ty.displayLg} text-2xl sm:text-3xl leading-[1.0] text-primary uppercase text-left`}>
            TRACK RECORD
          </h2>
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-muted hover:text-primary transition-colors duration-200 cursor-pointer p-2 flex items-center justify-center border border-hairline hover:border-hairline-strong rounded-none bg-transparent"
            aria-label="Clear all filters"
            title="Clear all filters"
          >
            <SlidersHorizontal size={14} />
          </button>
        </div>

        {/* For Desktop Viewports (1025px and above) Heading */}
        <div className="hidden min-[1025px]:block w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-6 select-none">
          <h2 className={`${ty.displayLg} text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.0] text-primary uppercase text-left`}>
            TRACK RECORD
          </h2>
        </div>
        
        {/* Mobile/Tablet Custom Drawer Control Panel Subsystem (1024px and below) */}
        <div className="min-[1025px]:hidden w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-12 select-none animate-fade-in flex flex-col">
          {/* Drawer 1: PERIOD */}
          <div className="w-full flex flex-col mb-3">
            <div 
              onClick={() => toggleDrawer('period')}
              className="w-full border border-hairline p-4 bg-transparent rounded-none cursor-pointer flex items-center justify-between text-left font-mono text-xs uppercase hover:border-hairline-strong transition-colors duration-200"
            >
              <span className="text-muted font-normal">PERIOD</span>
              <span className="text-primary truncate whitespace-nowrap block max-w-[140px] sm:max-w-[240px] font-normal">
                {selectedYears.length === 0 ? "ALL" : selectedYears.join(", ")}
              </span>
            </div>
            
            <AnimatePresence initial={false}>
              {expandedDrawer === 'period' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-x border-b border-hairline bg-transparent"
                >
                  <div className="flex flex-wrap gap-x-3 gap-y-2.5 items-center p-4">
                    <button
                      type="button"
                      onClick={() => setSelectedYears([])}
                      className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                        selectedYears.length === 0
                          ? "bg-transparent text-primary border-primary"
                          : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                      }`}
                    >
                      ALL
                    </button>
                    {["2024", "2025", "2026"].map((year) => {
                      const active = selectedYears.includes(year);
                      return (
                        <button
                          key={year}
                          type="button"
                          onClick={() => toggleYear(year)}
                          className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                            active
                              ? "bg-transparent text-primary border-primary"
                              : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                          }`}
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Drawer 2: COMPETITION TIER */}
          <div className="w-full flex flex-col mb-3">
            <div 
              onClick={() => toggleDrawer('tier')}
              className="w-full border border-hairline p-4 bg-transparent rounded-none cursor-pointer flex items-center justify-between text-left font-mono text-xs uppercase hover:border-hairline-strong transition-colors duration-200"
            >
              <span className="text-muted font-normal">COMPETITION TIER</span>
              <span className="text-primary truncate whitespace-nowrap block max-w-[140px] sm:max-w-[240px] font-normal">
                {selectedTiers.length === 0 ? "ALL" : selectedTiers.join(", ")}
              </span>
            </div>
            
            <AnimatePresence initial={false}>
              {expandedDrawer === 'tier' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-x border-b border-hairline bg-transparent"
                >
                  <div className="flex flex-wrap gap-x-3 gap-y-2.5 items-center p-4">
                    <button
                      type="button"
                      onClick={() => setSelectedTiers([])}
                      className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                        selectedTiers.length === 0
                          ? "bg-transparent text-primary border-primary"
                          : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                      }`}
                    >
                      ALL
                    </button>
                    {["INTERNATIONAL", "NATIONAL", "REGIONAL", "PROVINCIAL"].map((tier) => {
                      const active = selectedTiers.includes(tier);
                      return (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => toggleTier(tier)}
                          className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                            active
                              ? "bg-transparent text-primary border-primary"
                              : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                          }`}
                        >
                          {tier}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Drawer 3: ACHIEVEMENT RANK */}
          <div className="w-full flex flex-col mb-3">
            <div 
              onClick={() => toggleDrawer('rank')}
              className="w-full border border-hairline p-4 bg-transparent rounded-none cursor-pointer flex items-center justify-between text-left font-mono text-xs uppercase hover:border-hairline-strong transition-colors duration-200"
            >
              <span className="text-muted font-normal">ACHIEVEMENT RANK</span>
              <span className="text-primary truncate whitespace-nowrap block max-w-[140px] sm:max-w-[240px] font-normal">
                {selectedRanks.length === 0 ? "ALL" : selectedRanks.join(", ")}
              </span>
            </div>
            
            <AnimatePresence initial={false}>
              {expandedDrawer === 'rank' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-x border-b border-hairline bg-transparent"
                >
                  <div className="flex flex-wrap gap-x-3 gap-y-2.5 items-center p-4">
                    <button
                      type="button"
                      onClick={() => setSelectedRanks([])}
                      className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                        selectedRanks.length === 0
                          ? "bg-transparent text-primary border-primary"
                          : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                      }`}
                    >
                      ALL
                    </button>
                    {[
                      "GOLD MEDALIST",
                      "SILVER MEDALIST",
                      "BRONZE MEDALIST",
                      "4TH PLACE WINNER",
                      "COMPETITOR PARTICIPANT"
                    ].map((rank) => {
                      const active = selectedRanks.includes(rank);
                      return (
                        <button
                          key={rank}
                          type="button"
                          onClick={() => toggleRank(rank)}
                          className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                            active
                              ? "bg-transparent text-primary border-primary"
                              : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                          }`}
                        >
                          {rank}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Viewports Control Panel (Exactly 1025px and above) */}
        <div className="hidden min-[1025px]:block w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 select-none animate-fade-in mb-12">
          <div className="flex flex-row items-start justify-between w-full gap-6 bg-transparent">
            {/* 3-row vertical stack */}
            <div className="flex flex-col gap-y-5 items-start text-left bg-transparent w-full">
              
              {/* Row 1: PERIOD */}
              <div className="flex flex-row items-start gap-x-3 w-full">
                <span className={`w-[180px] shrink-0 pointer-events-none rounded-none border border-hairline text-muted px-4 py-2 text-center ${ty.captionUpper} text-[11px]`}>
                  PERIOD
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-2.5 items-center flex-1 text-left">
                  <button
                    type="button"
                    onClick={() => setSelectedYears([])}
                    className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                      selectedYears.length === 0
                        ? "bg-transparent text-primary border-primary"
                        : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                    }`}
                  >
                    ALL
                  </button>
                  {["2024", "2025", "2026"].map((year) => {
                    const active = selectedYears.includes(year);
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => toggleYear(year)}
                        className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                          active
                            ? "bg-transparent text-primary border-primary"
                            : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: COMPETITION TIER */}
              <div className="flex flex-row items-start gap-x-3 w-full">
                <span className={`w-[180px] shrink-0 pointer-events-none rounded-none border border-hairline text-muted px-4 py-2 text-center ${ty.captionUpper} text-[11px]`}>
                  COMPETITION TIER
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-2.5 items-center flex-1 text-left">
                  <button
                    type="button"
                    onClick={() => setSelectedTiers([])}
                    className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                      selectedTiers.length === 0
                        ? "bg-transparent text-primary border-primary"
                        : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                    }`}
                  >
                    ALL
                  </button>
                  {["INTERNATIONAL", "NATIONAL", "REGIONAL", "PROVINCIAL"].map((tier) => {
                    const active = selectedTiers.includes(tier);
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => toggleTier(tier)}
                        className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                          active
                            ? "bg-transparent text-primary border-primary"
                            : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                        }`}
                      >
                        {tier}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: ACHIEVEMENT RANK */}
              <div className="flex flex-row items-start gap-x-3 w-full">
                <span className={`w-[180px] shrink-0 pointer-events-none rounded-none border border-hairline text-muted px-4 py-2 text-center ${ty.captionUpper} text-[11px]`}>
                  ACHIEVEMENT RANK
                </span>
                <div className="flex flex-wrap gap-x-3 gap-y-2.5 items-center flex-1 text-left">
                  <button
                    type="button"
                    onClick={() => setSelectedRanks([])}
                    className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                      selectedRanks.length === 0
                        ? "bg-transparent text-primary border-primary"
                        : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                    }`}
                  >
                    ALL
                  </button>
                  {[
                    "GOLD MEDALIST",
                    "SILVER MEDALIST",
                    "BRONZE MEDALIST",
                    "4TH PLACE WINNER",
                    "COMPETITOR PARTICIPANT"
                  ].map((rank) => {
                    const active = selectedRanks.includes(rank);
                    return (
                      <button
                        key={rank}
                        type="button"
                        onClick={() => toggleRank(rank)}
                        className={`font-mono text-xs tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 rounded-pill cursor-pointer font-normal ${
                          active
                            ? "bg-transparent text-primary border-primary"
                            : "border-hairline text-muted bg-transparent hover:text-primary hover:border-hairline-strong"
                        }`}
                      >
                        {rank}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Clear Action icon on far right */}
            <div className="shrink-0 flex items-start pt-1 self-start">
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-muted hover:text-primary transition-colors duration-200 cursor-pointer p-2 flex items-center justify-center border border-hairline hover:border-hairline-strong rounded-none bg-transparent"
                aria-label="Clear all filters"
                title="Clear all filters"
              >
                <SlidersHorizontal size={14} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Infinite Ticker Container with Isolation Double-Wrapper Pattern / Fallback Empty Grid */}
        {filteredAchievements.length === 0 ? (
          <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 mb-6">
            <div className="w-full border border-hairline bg-transparent py-20 rounded-none flex flex-col items-center justify-center text-center gap-y-6 animate-fade-in">
              <span className={`${ty.captionUpper} text-xs text-muted`}>
                STATUS // NO ALIGNED DATA DETECTED
              </span>
              <span className={`${ty.captionUpper} text-xs text-primary`}>
                ALTER MATRIX FILTER CONFIGURATION
              </span>
              <button
                type="button"
                onClick={clearAllFilters}
                className={`font-mono text-xs text-primary bg-transparent border border-hairline px-6 py-2.5 rounded-none uppercase transition-all duration-200 hover:border-primary cursor-pointer font-normal`}
              >
                [ RESET FILTERS ]
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex overflow-hidden select-none relative z-0 touch-none">
            {/* THE OUTER AUTOMATION FRAME (Handles Loop & Pause Only) */}
            <motion.div 
              animate={controls}
              style={{ x: outerX, width: "fit-content" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-fit flex text-left"
            >
              {/* THE INNER PHYSICS TRACK (Handles Drag, Inertia, and Momentum Only) */}
              <motion.div
                ref={movingRowRef}
                drag="x"
                dragMomentum={true}
                dragTransition={{ power: 0.4, timeConstant: 250 }}
                dragElastic={0.1}
                dragConstraints={{ left: -halfWidth - 2000, right: 2000 }}
                style={{ x: innerX }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                className="flex items-center text-left"
              >
                {/* Twin identical stacks of the timeline dataset to ensure flawless loop teleportation */}
                <TimelineGroup 
                  achievements={displayAchievements} 
                  onCardClick={(item) => {
                    if (!isDraggingRef.current) {
                      setActiveAchievement(item);
                    }
                  }} 
                />
                <TimelineGroup 
                  achievements={displayAchievements} 
                  onCardClick={(item) => {
                    if (!isDraggingRef.current) {
                      setActiveAchievement(item);
                    }
                  }} 
                />
              </motion.div>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {activeAchievement && (
            <>
              {/* Ambient Blur Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveAchievement(null)}
                className="fixed inset-0 bg-[#000000]/75 backdrop-blur-md z-50 cursor-pointer"
              />

              {/* Viewport-Centered Overlay Details Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                className="w-[94%] sm:w-[85%] md:w-full max-w-[850px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-card border border-hairline p-5 sm:p-8 pt-20 z-[55] rounded-none max-h-[90vh] overflow-y-auto text-left"
              >
                {/* Close Button Inside the Corner */}
                <div className="absolute top-4 right-4 z-10 animate-fade-in">
                  <button
                    type="button"
                    onClick={() => setActiveAchievement(null)}
                    className="border border-hairline text-muted bg-transparent rounded-none p-2 transition-all duration-200 hover:border-hairline-strong hover:text-primary cursor-pointer flex items-center justify-center outline-none focus:border-white"
                    aria-label="Close details"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Image Block Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 w-full">
                  {/* Left Image Slot */}
                  <div className="w-full aspect-[4/3] relative overflow-hidden border border-hairline rounded-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"
                      alt={`${activeAchievement.eventName} Award Presentation`}
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full select-none"
                    />
                    <div className="absolute bottom-2 left-2 bg-canvas/60 px-2 py-1 border border-hairline rounded-none">
                      <span className={`${ty.captionUpper} text-[9px] text-muted`}>
                        AWARD PRESENTATION PHOTO
                      </span>
                    </div>
                  </div>

                  {/* Right Image Slot */}
                  <div className="w-full aspect-[4/3] relative overflow-hidden border border-hairline rounded-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
                      alt={`${activeAchievement.eventName} Official Certificate`}
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full select-none"
                    />
                    <div className="absolute bottom-2 left-2 bg-canvas/60 px-2 py-1 border border-hairline rounded-none">
                      <span className={`${ty.captionUpper} text-[9px] text-muted`}>
                        COMPETITION CERTIFICATE
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Specification Stack */}
                <div className="text-left w-full animate-fade-in">
                  <h3 className={`${ty.displayMd} text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primary mb-4 leading-[1.0] break-words`}>
                    {activeAchievement.eventName}
                  </h3>
                  
                  <div className={`space-y-2 text-muted ${ty.captionUpper} text-[10px] sm:text-xs`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-muted sm:w-[140px] shrink-0 font-normal">CATEGORY</span>
                      <span className="text-primary break-all sm:break-normal font-normal">{activeAchievement.category}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-muted sm:w-[140px] shrink-0 font-normal">SYSTEM MODEL</span>
                      <span className="text-primary font-normal">{activeAchievement.model}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-muted sm:w-[140px] shrink-0 font-normal">DATE RECORDED</span>
                      <span className="text-primary font-normal">{activeAchievement.date}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-muted sm:w-[140px] shrink-0 font-normal">TIER / RANK</span>
                      <span className="text-primary font-normal">{activeAchievement.tier}{" / "}{activeAchievement.rank}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                      <span className="text-muted sm:w-[140px] shrink-0 font-normal">STATUS ATTAINED</span>
                      <span className="text-primary bg-surface-soft px-2 py-0.5 border border-hairline inline-block font-normal">
                        {activeAchievement.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* ===================================== */}
      {/* SECTION 4: STORE GATEWAY CTA         */}
      {/* ===================================== */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-32 md:py-40 border-t border-hairline">
        <div className="text-center flex flex-col items-center justify-center w-full">
          {/* Eyebrow */}
          <span className={`${ty.captionUpper} text-xs text-muted mb-4 block`}>
            READY TO EXPERIENCE
          </span>
          
          {/* Title */}
          <h2 className={`${ty.displayLg} text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.0] text-primary mb-8`}>
            DISCOVER OUR FULL LINEUP
          </h2>

          <Link 
            href="/store"
            className={`${ty.ctaButton} px-8 py-4 text-sm hover:bg-primary hover:text-canvas`}
          >
            EXPLORE STORE
          </Link>
        </div>
      </section>
    </main>
  );
}
