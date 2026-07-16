'use client';

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FOOTER_LINKS } from "@/src/constants";
import { renderFooterLinkLabel } from "../utils/index";
import { NewsletterForm } from "./newsletter-form";
import { navigationContent } from "@/src/content";

/**
 * Renders the links navigation grid and mailing list subscription form.
 * Supports mobile layout collapse via accordion dropdown states.
 */
export function FooterLinks() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  const getLocalizedTitle = (title: string) => {
    if (title === "ROBOTICS FLEET") return navigationContent.footer.fleet;
    if (title === "ROBOT MODELS") return navigationContent.footer.models;
    return title;
  };

  return (
    <div className="flex flex-col md:flex-row justify-center py-4 md:py-16 min-[1920px]:py-24 gap-y-10 md:gap-y-12">
      {/* Footer Navigation Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 min-[1920px]:gap-16">
        {/* Desktop View: Multi-column link layout */}
        <div className="hidden md:contents">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="flex flex-col space-y-6 min-[1920px]:space-y-10">
              <h4 className="font-mono text-[11px] md:text-xs min-[1920px]:text-sm xl:text-base font-normal text-primary tracking-[2px] uppercase">
                {getLocalizedTitle(col.title)}
              </h4>
              <ul className="flex flex-col space-y-3 min-[1920px]:space-y-6">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-serif text-xs min-[1920px]:text-sm tracking-normal text-primary hover:text-primary transition-colors duration-300 block"
                    >
                      {renderFooterLinkLabel(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile View: Accordion component layout */}
        <div className="flex flex-col md:hidden w-full border-t border-hairline">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="w-full border-b border-hairline">
              <button
                onClick={() => toggleAccordion(col.title)}
                className="flex items-center justify-between w-full py-3 text-left outline-none cursor-pointer"
              >
                <span className="font-mono text-xs font-normal text-primary tracking-[2px] uppercase">
                  {getLocalizedTitle(col.title)}
                </span>
                <motion.div animate={{ rotate: openAccordion === col.title ? 180 : 0 }}>
                  <ChevronDown size={16} className="text-muted" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openAccordion === col.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className="flex flex-col space-y-1.5 pb-4 pl-2 pt-2">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="font-serif text-xs tracking-normal text-primary hover:text-primary block py-1"
                          >
                            {renderFooterLinkLabel(link.label)}
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

      {/* Mailing List Input Form & Social Link Integrations */}
      <NewsletterForm />
    </div>
  );
}
