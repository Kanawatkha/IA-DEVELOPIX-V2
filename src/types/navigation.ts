import { ComponentType } from "react";

/**
 * Interface representing a main navigation menu item.
 */
export interface NavItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
  subpages?: string[];
  isComingSoon?: boolean;
}

/**
 * Interface representing a simple icon-labeled item for general informational banners.
 */
export interface InfoBannerItem {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
}

/**
 * Interface representing links grouped within a specific footer column.
 */
export interface FooterLinkItem {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}
