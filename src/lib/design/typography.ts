/**
 * @file typography.ts
 * @description Shared Tailwind CSS class-string constants for all typography
 *              roles defined in the Bugatti Design System (DESIGN-bugatti.md).
 *
 * -----------------------------------------------------------------------
 * DESIGN PRINCIPLE
 * -----------------------------------------------------------------------
 * The Bugatti system uses THREE font families in strict roles:
 *   font-display  → Saira Condensed  (all display headings, wordmark)
 *   font-serif    → EB Garamond      (all body/running text)
 *   font-mono     → Space Mono       (buttons, captions, nav, labels)
 *
 * Visual hierarchy comes from SIZE + TRACKING + CASE — never from weight.
 * Every token is font-normal (weight 400). Bold is a brand violation.
 *
 * -----------------------------------------------------------------------
 * USAGE STRATEGY — "Base + Responsive Size" pattern
 * -----------------------------------------------------------------------
 * These constants export only the INVARIANT part of each typography role:
 *   - font family
 *   - font weight (always font-normal)
 *   - letter-spacing
 *   - line-height
 *   - text-transform (uppercase or not)
 *
 * The RESPONSIVE font-size is intentionally left OUT because it differs
 * per page and breakpoint. Add it directly on the element:
 *
 *   <h1 className={`${ty.displayXl} text-[14.5vw] md:text-[110px] xl:text-[140px]`}>
 *
 * This keeps constants DRY while giving each page full sizing freedom.
 * -----------------------------------------------------------------------
 */

// ============================================================
// DISPLAY SCALE  (font-display → Saira Condensed)
// ============================================================

/**
 * display-xl  —  Hero h1.
 * "PRECISION ROBOTICS", "NOFAN 15cm" product hero.
 * Font size: 64px (base). Common responsive: text-[14.5vw] md:text-[110px] xl:text-[140px]
 */
export const displayXl =
  'font-display font-normal uppercase text-display-xl' as const;

/**
 * display-lg  —  Section headings.
 * "OUR ROBOTICS FLEET", "INTERNATIONAL PARTICIPATIONS".
 * Font size: 48px (base). Common responsive: text-[50px] md:text-[80px]
 */
export const displayLg =
  'font-display font-normal uppercase text-display-lg' as const;

/**
 * display-md  —  Sub-section heads, model names inside cards.
 * Font size: 32px (base). Common responsive: text-3xl md:text-4xl
 */
export const displayMd =
  'font-display font-normal uppercase text-display-md' as const;

/**
 * display-sm  —  Card titles, smaller headings.
 * Font size: 24px (base). Common: text-2xl
 */
export const displaySm =
  'font-display font-normal uppercase text-display-sm' as const;

/**
 * wordmark  —  The "IA DEVELOPIX" brand wordmark in the navbar.
 * The widest tracking in the system (6px). Always uppercase.
 * Font size: 14px — do not scale up.
 */
export const wordmark =
  'font-display font-normal uppercase text-wordmark' as const;


// ============================================================
// TITLE SCALE  (font-display — mid-tier)
// ============================================================

/**
 * titleMd  —  Career listing titles, intro paragraph headings.
 * Font size: 20px.
 */
export const titleMd =
  'font-display font-normal uppercase text-title-md' as const;

/**
 * titleSm  —  Mid-tier headlines, callout card titles.
 * Font size: 16px.
 */
export const titleSm =
  'font-display font-normal uppercase text-title-sm' as const;


// ============================================================
// BODY SCALE  (font-serif → EB Garamond)
// ============================================================

/**
 * bodyMd  —  Default running body text, product descriptions.
 * Sentence-case, no letter-spacing, natural serif flow.
 * Font size: 16px base.
 */
export const bodyMd =
  'font-serif font-normal text-body-md tracking-normal text-body' as const;

/**
 * bodyMdStrong  —  Lead paragraphs, emphasized body.
 * Same as bodyMd but slightly brighter text.
 */
export const bodyMdStrong =
  'font-serif font-normal text-body-md tracking-normal text-body-strong' as const;

/**
 * bodySm  —  Footer body, fine-print legal, secondary metadata.
 * Font size: 14px.
 */
export const bodySm =
  'font-serif font-normal text-body-sm tracking-normal text-muted' as const;


// ============================================================
// MONOSPACE / CAPTION SCALE  (font-mono → Space Mono)
// ============================================================

/**
 * captionUpper  —  Photo captions, metadata, all uppercase micro-labels.
 * "EXPLORE SERIES", "LINEFOLLOWER", date stamps.
 * Font size: 11px.
 */
export const captionUpper =
  'font-mono font-normal text-caption uppercase' as const;

/**
 * buttonLabel  —  All CTA and action button text.
 * "DISCOVER THE FLEET", "ORDER NOW", "SEE MORE DETAILS".
 * Font size: 14px, 2.5px tracking — the widest mono use outside wordmark.
 */
export const buttonLabel =
  'font-mono font-normal text-button uppercase' as const;

/**
 * navLink  —  Top navigation menu items.
 * "MENU", "STORE", language switcher labels.
 * Font size: 12px.
 */
export const navLink =
  'font-mono font-normal text-nav uppercase' as const;


// ============================================================
// COMPONENT SHORTHAND PRESETS
// ============================================================

/**
 * ctaButton  —  Full className string for a standard primary CTA button.
 * Transparent background, white border, pill shape.
 * Combine with size, color, and hover utilities as needed.
 *
 * @example
 * <Link className={`${ty.ctaButton} px-8 py-3.5 hover:bg-white hover:text-black`}>
 */
export const ctaButton =
  'inline-flex min-h-11 items-center justify-center border border-primary rounded-pill bg-transparent text-primary font-mono font-normal text-button uppercase transition-colors duration-300' as const;

/**
 * specValue  —  The large number/value in a spec cell (e.g. "15", "18W").
 * Uses display-md sizing.
 */
export const specValue =
  'font-display font-normal uppercase tracking-[2px] leading-[1.2] text-white' as const;

/**
 * specLabel  —  The small label below a spec value (e.g. "cm", "WATTS").
 * Uses caption-upper sizing.
 */
export const specLabel =
  'font-mono font-normal text-caption uppercase text-muted' as const;
