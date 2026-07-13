import { MessageCircle, Truck, ShieldCheck } from "lucide-react";
import { NavItem, InfoBannerItem, FooterColumn } from "../types/navigation";
import { navigationContent } from "@/src/content";

/**
 * Main application navigation items for the header and mobile drawer.
 * Defines hierarchy, links, accessibility flags, and upcoming features.
 */
export const MAIN_NAVIGATION: NavItem[] = [
  { label: navigationContent.store, href: "/store" },
  { 
    label: navigationContent.linefollower,
    href: "/products/linefollower",
    hasSubmenu: true,
    subpages: ["NOFAN 15cm", "NOFAN 18cm", "FANPULL 15cm", "FANPULL 18cm"]
  },
  { 
    label: navigationContent.mission,
    href: "/products/mission",
    hasSubmenu: true,
    subpages: ["MISSION GO", "MISSION PRO"]
  },
  { label: navigationContent.gathering, href: "/products/gathering", isComingSoon: true },
  { label: navigationContent.sumo, href: "/products/sumo", isComingSoon: true },
  { label: navigationContent.about, href: "/about" },
];

/**
 * Promotional value-prop banners displayed in the desktop footer grid
 * and paginated on mobile layouts.
 */
export const TOP_BANNERS: InfoBannerItem[] = [
  { 
    icon: MessageCircle, 
    title: navigationContent.banners.customerService.title,
    desc: "Reach out to our team if you need any help." 
  },
  { 
    icon: Truck, 
    title: navigationContent.banners.shipping.title,
    desc: "Free shipping on orders above ฿5,000." 
  },
  { 
    icon: ShieldCheck, 
    title: navigationContent.banners.orderSupport.title,
    desc: "Your payment information is processed securely." 
  }
];

/**
 * Organizes columns and hyper-links for footer navigation.
 */
export const FOOTER_LINKS: FooterColumn[] = [
  {
    title: "ROBOTICS FLEET",
    links: [
      { label: "LINEFOLLOWER", href: "/products/linefollower" },
      { label: "MISSION", href: "/products/mission" },
      { label: "GATHERING", href: "/products/gathering" },
      { label: "SUMO", href: "/products/sumo" },
    ]
  },
  {
    title: "ROBOT MODELS",
    links: [
      { label: "NOFAN 15cm", href: "/products/linefollower/nofan-15" },
      { label: "NOFAN 18cm", href: "/products/linefollower/nofan-18" },
      { label: "MISSION GO", href: "/products/mission/go" },
      { label: "MISSION PRO", href: "/products/mission/pro" },
      { label: "FANPULL 15cm", href: "/products/linefollower/fanpull-15" },
      { label: "FANPULL 18cm", href: "/products/linefollower/fanpull-18" },
    ]
  }
];

/**
 * Dynamic resolution mapper of user-friendly names to actual dynamic route specs.
 * Consolidates path definitions to prevent hardcoding duplication across layout layers.
 */
export const getVariantHref = (main: string, sub: string): string => {
  const map: Record<string, string> = {
    "NOFAN 15cm": "/products/linefollower/nofan-15",
    "NOFAN 18cm": "/products/linefollower/nofan-18",
    "FANPULL 15cm": "/products/linefollower/fanpull-15",
    "FANPULL 18cm": "/products/linefollower/fanpull-18",
    "MISSION GO": "/products/mission/go",
    "MISSION PRO": "/products/mission/pro",
  };
  return map[sub] || `/products/${main.toLowerCase()}/${sub.toLowerCase().replace(" ", "-")}`;
};

export interface LanguageOption {
  code: string;
  label: string;
}

/**
 * Centrally registered language options for Navbar & Footer bottom dropdowns.
 */
export const LANGUAGES: readonly LanguageOption[] = [
  { code: "EN", label: "ENGLISH" },
  { code: "TH", label: "THAI" },
] as const;
