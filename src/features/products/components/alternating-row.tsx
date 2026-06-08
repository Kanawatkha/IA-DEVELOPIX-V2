'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AlternatingRowProps {
  children: ReactNode;
  isReversed?: boolean;
}

export function AlternatingRow({ children, isReversed = false }: AlternatingRowProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center w-full ${isReversed ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}
    >
      {children}
    </motion.div>
  );
}

export function AlternatingRowContent({ title, description, label }: { title: string, description: string, label?: string }) {
  return (
    <div className="flex flex-col space-y-8 py-8">
      {label && (
        <span className="font-mono text-[10px] tracking-[2px] text-muted border border-hairline px-3 py-1 inline-block w-max">
          {label}
        </span>
      )}
      <h2 className="font-display font-normal text-5xl md:text-6xl lg:text-[80px] leading-[1.0] tracking-[3px] uppercase text-primary break-words">
        {title}
      </h2>
      <p className="font-serif text-xs md:text-sm text-muted leading-[1.8] tracking-normal max-w-xl">
        {description}
      </p>
    </div>
  );
}

export function AlternatingRowGraphic({ label }: { label: string }) {
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-auto lg:h-[700px] border border-hairline bg-surface-soft overflow-hidden flex items-center justify-center p-8 group">
      <div className="absolute inset-0 pointer-events-none group-hover:bg-white/5 transition-colors duration-500"></div>
      <div className="w-full h-full border border-hairline/50 relative">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-hairline/50 rounded-full animate-[spin_60s_linear_infinite]"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] border border-hairline/80 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
      </div>
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
        <span className="font-mono text-[10px] tracking-[2px] text-muted uppercase bg-black/80 px-4 py-2 backdrop-blur-md border border-hairline">
          [ {label} ]
        </span>
      </div>
    </div>
  );
}
