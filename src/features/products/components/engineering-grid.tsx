'use client';

import { motion } from 'framer-motion';

export function EngineeringGrid({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <section className="w-full px-8 md:px-16 lg:px-24 py-32 relative">
      <div className="relative mb-16 pb-8 border-b border-transparent">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-normal text-4xl md:text-5xl lg:text-7xl tracking-[3px] mb-0 max-w-4xl uppercase break-words text-primary"
        >
          {title}
        </motion.h3>
        {/* Animated Bottom Border for the Title */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[1px] bg-hairline"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 bg-canvas relative">
        {/* Animated Top Border for the Grid */}
        <motion.div 
          className="absolute top-0 left-0 h-[1px] bg-hairline z-10"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        {children}
        {/* Animated Bottom Border for the Grid */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[1px] bg-hairline z-10"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
        />
      </div>
    </section>
  );
}

export function EngineeringFeature({ title, description, isLast = false, delayIndex = 0 }: { title: string, description: string, isLast?: boolean, delayIndex?: number }) {
  const lineDelay = 0.4 + (delayIndex * 0.2);
  const contentDelay = lineDelay + 0.5;

  return (
    <div className="p-8 md:p-12 flex flex-col justify-between min-h-[400px] hover:bg-[#080808] transition-colors relative group">
      
      {/* Right Border (drawn downwards) */}
      {!isLast && (
        <motion.div 
          className="hidden md:block absolute top-0 right-0 w-[1px] bg-hairline z-10"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: lineDelay }}
        />
      )}
      {/* Bottom Border on Mobile (drawn rightwards) */}
      {!isLast && (
        <motion.div 
          className="block md:hidden absolute bottom-0 left-0 h-[1px] bg-hairline z-10"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: lineDelay }}
        />
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: contentDelay }}
      >
        <h4 className="font-mono text-[14px] text-primary mb-8 pb-4 inline-block uppercase tracking-[2px] relative">
          {title}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-hairline"></div>
        </h4>
        <p className="font-serif text-xs text-[#cccccc] leading-[1.8] tracking-normal">
          {description}
        </p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: contentDelay + 0.2 }}
        className="mt-16 w-full h-[160px] border border-hairline bg-surface-soft flex items-center justify-center relative overflow-hidden group-hover:border-primary/50 transition-colors"
      >
        <span className="font-mono text-[10px] tracking-[1.4px] text-muted/50 uppercase border border-muted/10 p-2 z-10 mix-blend-difference">
          [ TECH GRAPHIC PLACEHOLDER ]
        </span>
        {/* Subtle grid pattern background to feel technical */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_30%,transparent_100%)]"></div>
        
        {/* Crosshairs */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-hairline opacity-30"></div>
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-hairline opacity-30"></div>
      </motion.div>
    </div>
  );
}
