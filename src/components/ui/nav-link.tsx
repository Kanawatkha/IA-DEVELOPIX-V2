'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function NavLink({ href, children }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center p-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        className={`font-mono text-sm uppercase tracking-[1.4px] relative z-10 transition-opacity duration-300 ${
          isHovered ? 'text-primary/70' : 'text-primary'
        }`}
      >
        {children}
      </Link>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px] bg-primary origin-center"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
}
