/**
 * @file newsletter-form.tsx
 * @description Subcomponent for newsletter subscription email form and social media page links in Footer.
 */

import React from "react";
import { ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";
import { navigationContent } from "@/src/content";

export function NewsletterForm() {
  return (
    <div className="w-full md:w-[350px] lg:w-[450px] min-[1920px]:w-[700px] flex flex-col space-y-4 md:space-y-6 min-[1920px]:space-y-12 shrink-0">
      <h2 className="font-display text-xl md:text-2xl min-[1920px]:text-4xl uppercase tracking-[2px] text-primary leading-tight font-normal">
        {navigationContent.footer.newsletter.title}
      </h2>
      <div className="flex items-center border-b border-hairline-strong pb-2 md:pb-3 min-[1920px]:pb-6 group hover:border-primary transition-colors">
        <input
          type="email"
          placeholder={navigationContent.footer.newsletter.placeholder}
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
  );
}
