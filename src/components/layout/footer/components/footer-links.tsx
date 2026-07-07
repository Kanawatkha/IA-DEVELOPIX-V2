"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";
import { FOOTER_LINKS } from "@/src/constants";
import { formatModelName } from "@/src/lib/data/products";

/**
 * Helper to render model labels.
 * Inspects if the label is flagged as "COMING SOON" and appends the standard label.
 * Delegates the baseline cm suffix styling to the single source of truth in products.ts.
 */
const renderFooterLinkLabel = (label: string) => {
  const isComingSoon =
    label.includes("GATHERING") ||
    label.includes("SUMO") ||
    label.includes("FANPULL 15cm") ||
    label.includes("FANPULL 18cm");

  if (isComingSoon) {
    return (
      <div className="flex flex-row items-center gap-1.5 whitespace-nowrap md:flex-col md:items-start md:gap-0 md:whitespace-normal lg:flex-row lg:items-center lg:gap-1.5 lg:whitespace-nowrap">
        <span className="leading-tight text-[13px]">{formatModelName(label)}</span>
        <span className="text-[13px] md:text-[9px] text-primary/40 tracking-widest font-normal">
          (COMING SOON)
        </span>
      </div>
    );
  }

  return formatModelName(label);
};

/**
 * Renders the links navigation grid and mailing list subscription form.
 * Supports mobile layout collapse via accordion dropdown states.
 */
export function FooterLinks() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center py-4 md:py-16 min-[1920px]:py-24 gap-y-10 md:gap-y-12">
      {/* Footer Navigation Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 min-[1920px]:gap-16">
        {/* Desktop View: Multi-column link layout */}
        <div className="hidden md:contents">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="flex flex-col space-y-6 min-[1920px]:space-y-10">
              <h4 className="font-mono text-xs min-[1920px]:text-sm font-normal text-primary tracking-[2px] uppercase">
                {col.title}
              </h4>
              <ul
                className={
                  col.title === "ROBOT MODELS"
                    ? "columns-1 min-[1025px]:columns-2 gap-x-6"
                    : "flex flex-col space-y-3 min-[1920px]:space-y-6"
                }
              >
                {col.links.map((link) => (
                  <li
                    key={link.label}
                    className={col.title === "ROBOT MODELS" ? "mb-1.5 break-inside-avoid" : ""}
                  >
                    <Link
                      href={link.href}
                      className="font-serif text-xs min-[1920px]:text-sm tracking-normal text-muted hover:text-primary transition-colors duration-300 block"
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
                  {col.title}
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
                    <ul
                      className={
                        col.title === "ROBOT MODELS"
                          ? "columns-1 min-[1025px]:columns-2 gap-x-4 pb-4 pl-2"
                          : "flex flex-col space-y-4 pb-4 pl-2"
                      }
                    >
                      {col.links.map((link) => (
                        <li
                          key={link.label}
                          className={col.title === "ROBOT MODELS" ? "mb-2 break-inside-avoid" : ""}
                        >
                          <Link
                            href={link.href}
                            className="font-serif text-xs tracking-normal text-muted hover:text-primary block py-1.5"
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
      <div className="w-full md:w-[350px] lg:w-[450px] min-[1920px]:w-[700px] flex flex-col space-y-4 md:space-y-6 min-[1920px]:space-y-12 shrink-0">
        <h2 className="font-display text-xl md:text-2xl min-[1920px]:text-4xl uppercase tracking-[2px] text-primary leading-tight font-normal">
          JOIN OUR MAILING LIST FOR EXCLUSIVE UPDATES
        </h2>
        <div className="flex items-center border-b border-hairline-strong pb-2 md:pb-3 min-[1920px]:pb-6 group hover:border-primary transition-colors">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="bg-transparent flex-1 outline-none font-serif text-xs md:text-sm min-[1920px]:text-lg text-primary placeholder:text-muted tracking-normal uppercase"
            aria-label="Email Address"
          />
          <button
            className="text-muted group-focus-within:text-primary hover:text-primary transition-colors pl-4 outline-none cursor-pointer"
            aria-label="Submit Email"
          >
            <ArrowRight strokeWidth={1.5} className="min-[1920px]:w-8 min-[1920px]:h-8" />
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6 min-[1920px]:space-x-10 pt-4 min-[1920px]:pt-8">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Profile"
          >
            <Facebook
              strokeWidth={1}
              className="w-5 h-5 min-[1920px]:w-8 min-[1920px]:h-8 text-muted hover:text-primary transition-colors cursor-pointer"
            />
          </a>
          <span className="font-display font-normal text-lg min-[1920px]:text-2xl text-muted hover:text-primary transition-colors cursor-pointer">
            X
          </span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
          >
            <Instagram
              strokeWidth={1}
              className="w-5 h-5 min-[1920px]:w-8 min-[1920px]:h-8 text-muted hover:text-primary transition-colors cursor-pointer"
            />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube Channel"
          >
            <Youtube
              strokeWidth={1}
              className="w-6 h-6 min-[1920px]:w-10 min-[1920px]:h-10 text-muted hover:text-primary transition-colors cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
