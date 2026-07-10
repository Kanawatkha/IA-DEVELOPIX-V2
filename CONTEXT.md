# CONTEXT.md

## Project Identity
- **Name:** IA DEVELOPIX
- **Purpose:** A storefront website for premium robotics products across four categories — LineFollower, Mission, Gathering, and Sumo. The site lets customers browse a full catalog with detailed technical specs, then close the sale through direct conversation with the shop owner.
- **Audience:** Customers interested in competitive/hobbyist robotics who want to review detailed specs before purchasing.
- **Important:** This site has **no login system and no online payment system, by design.** All purchases are finalized through Facebook Messenger conversation with the shop owner — this is intentional, not a missing feature, because robotics buyers typically want to discuss technical details and customization before committing to a purchase.
- **Design direction:** See `DESIGN-bugatti.md` for the full visual system (Bugatti-inspired, cinematic black theme). Always follow it for any UI work.

## Tech Stack (Full)

### 1. Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide Icons
- Framer Motion (animation)
- Zustand + Persist Middleware (cart state, stored in localStorage)
- html-to-image (DOM-to-image export for order summaries)

### 2. Backend
- Next.js Route Handlers (read-only product data API — no tRPC, no complex mutation layer needed)
- Prisma ORM
- Zod (validation, primarily for cart data structure)

### 3. Database & Storage
- PostgreSQL via Neon.tech (no auto-pause)
- Cloudinary (high-resolution product images)

### 4. Hosting / Deployment
- Vercel (Hobby Plan)
- Vercel Preview Deployments

### 5. CI/CD
- GitHub Actions
- Vercel Git Integration
- Husky + lint-staged

### 6. Code Quality & Testing
- ESLint
- Prettier
- Vitest (unit testing)
- Playwright (E2E testing)

### 7. Monitoring / Analytics
- None. Intentionally excluded — considered unnecessary for this project's scale.

### 8. Project Structure & Architecture
- Feature-based folder structure
- Each feature is self-contained with its own components/hooks/services
- Domain-driven data layer, separated clearly from UI

### 9. SEO & Discoverability
- Next.js Metadata API
- Dynamic Open Graph Image generation per product (via `next/og`)
- JSON-LD Structured Data (Product schema — includes price and availability)
- sitemap.xml / robots.txt
- Google Search Console

### 10. Accessibility & i18n
- eslint-plugin-jsx-a11y
- Lighthouse Accessibility Audit
- next-intl (Thai/English language switch)

### 11. Performance & Security Basics
- next/image (paired with Cloudinary)
- Incremental Static Regeneration (ISR) for product detail pages
- Environment Variables (`.env.local` + Vercel Environment Variables)

### 12. Messenger Checkout & Image Export System
- html-to-image — converts an order summary or cart summary into an image file
- Web Share API (`navigator.share`) — opens the native share sheet on mobile so the user can attach the summary image directly to Messenger
- Messenger link generator — builds the link to the shop's Facebook Page inbox

## Product Content Architecture
Product detail pages combine two distinct layers of content — this is a deliberate architectural choice, not an inconsistency:

1. **Catalog Data** (stored in the database via Prisma): name, slug, price, category, main image, short description, video URL, and manually-curated related products (used for the "Customers Also Bought" section). This data is reused across the store page, category pages, and related-product sections, and must remain queryable.
2. **Story Content** (hand-written Frontend components, one file per product): the detailed storytelling section of the product page (e.g. motor specs, drivetrain, design highlights) — each product has its own layout and does not follow a single shared template. This is intentional: new products are added infrequently, and each one deserves a custom-designed presentation rather than being forced into a generic template.

When working on product pages, do not attempt to move Story Content into the database or force it into a repeatable schema — that would work against the intended design.

## Checkout Flow Summary
The site replaces a traditional payment system with an image-export-to-Messenger flow:
- **Buy Now:** user views a product, triggers an order summary preview, exports it as an image, and is directed to the shop's Facebook Messenger to complete the purchase.
- **Cart Checkout:** user adds multiple items to a persistent cart, then exports a cart summary image before being directed to Messenger.
- **Mobile:** uses the Web Share API to let users share the exported image directly to Messenger in one step, with image download as the fallback on desktop.

This flow is core to the site's purpose — do not suggest replacing it with an online payment system.

## Folder Structure Convention
The current top-level structure under `src/` (`components/`, `constants/`, `context/`, `features/`, `hooks/`, `lib/`, `services/`, `types/`) is the established convention for this project and should be followed as-is where it already fits. New folders or files may be added when a modern, standard pattern calls for it (e.g. a new shared utility category, a new feature module) — there's no need to force everything into the existing folders if a clearer structure is warranted, but avoid restructuring what's already working without good reason.

## Current Scope — Out of Bounds

**Permanently out of scope (not planned, ever):**
- User authentication / login system
- Online payment gateway integration
- A full-featured admin dashboard with authentication

**Not yet implemented (planned for a later phase):**
- Real database connection (Neon.tech / Prisma migrations)
- Incremental Static Regeneration setup
- Dynamic Open Graph image generation

Check `PHASE.md` for what is currently in scope. This file describes the full end-state architecture, not what to build right now.