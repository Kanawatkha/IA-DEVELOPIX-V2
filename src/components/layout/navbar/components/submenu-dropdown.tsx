/**
 * @file submenu-dropdown.tsx
 * @description Dropdown submenu panel for robot model subpages in desktop viewports.
 */

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getVariantHref } from "@/src/constants";
import { formatModelName, isModelComingSoon } from "@/src/lib/data/products";
import { navigationContent } from "@/src/content";
import { submenuVariants, itemVariants } from "../animations/index";

interface SubmenuDropdownProps {
  label: string;
  subpages: string[];
  isMultiRow: boolean;
}

export function SubmenuDropdown({ label, subpages, isMultiRow }: SubmenuDropdownProps) {
  if (isMultiRow) return null;

  return (
    <motion.div
      key={label}
      className={`absolute top-full left-1/2 -translate-x-1/2 z-[110] hidden min-[950px]:block origin-top mt-0 pt-2 ${
        label === "LINEFOLLOWER"
          ? "w-[190px] min-[2000px]:w-[240px]"
          : label === "MISSION"
          ? "w-[190px] min-[2000px]:w-[210px]"
          : "w-[200px] min-[2000px]:w-[230px]"
      }`}
      variants={submenuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="bg-[#0d0d0d] border border-hairline rounded-2xl shadow-lg">
        <div className="flex flex-col items-start text-left p-2 min-[2000px]:p-3 w-full">
          {subpages.map((sub) => (
            <motion.div key={sub} variants={itemVariants} className="w-full">
              <Link
                href={getVariantHref(label, sub)}
                className="block px-4 py-2.5 text-xs font-normal uppercase tracking-[2px] text-primary hover:text-primary/70 hover:bg-primary/10 rounded-xl transition-all duration-300 group/sub min-[2000px]:text-sm min-[2000px]:py-3.5 w-full text-left whitespace-nowrap"
              >
                {isModelComingSoon(sub) ? (
                  <>
                    {formatModelName(sub)}
                    <div className="text-[9px] text-primary/40 mt-1 tracking-widest">
                      ({navigationContent.comingSoon})
                    </div>
                  </>
                ) : (
                  formatModelName(sub)
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
