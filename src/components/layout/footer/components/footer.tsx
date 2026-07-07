"use client";

import React from "react";
import { FooterBanner } from "./footer-banner";
import { FooterLinks } from "./footer-links";
import { FooterBottom } from "./footer-bottom";

/**
 * Main Footer layout coordinator.
 * Composes the split sub-sections (Banner, Links grid, and Bottom meta bar)
 * into a single unified HTML5 footer element with responsive padding constraints.
 */
export function Footer() {
  return (
    <footer className="w-full bg-canvas border-t border-hairline flex flex-col justify-between h-auto max-md:min-h-[100dvh] max-md:pb-[80px]">
      <div className="max-w-[1720px] min-[2000px]:max-w-[1920px] mx-auto w-full px-6 md:px-12">
        {/* Banner Section */}
        <FooterBanner />

        {/* Links Grid & Subscription Area */}
        <FooterLinks />
      </div>

      {/* Bottom bar & metadata copyright details */}
      <FooterBottom />
    </footer>
  );
}
