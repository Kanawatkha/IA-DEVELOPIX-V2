# PHASE.md

## Current Status
Building out the frontend — all pages, components, and the Messenger checkout / image export flow — using mock catalog data. No real database connection exists yet, and no product's Catalog Data currently comes from Neon.tech.

Specific task-level scope (which pages, which components, what to build right now) will be given directly in the Codex chat session — do not assume scope from this file alone, as it changes often.

## In Scope
- Project setup (tooling, configs, folder scaffolding)
- Building all frontend pages using mock data: home, store, category pages, product detail, cart
- Building the full Messenger checkout / image export system (this is frontend-only work and does not require a real database)

## Out of Scope (do not touch unless explicitly instructed)
- Prisma schema changes or database migrations
- Connecting to a real database (Neon.tech)
- Setting up Incremental Static Regeneration
- Setting up Dynamic Open Graph image generation
- CI/CD pipeline setup (GitHub Actions, Husky)
- Testing setup (Vitest, Playwright)

Also permanently out of scope regardless of status (see `CONTEXT.md`): authentication, online payment integration, a full admin dashboard.

If a task appears to require any of the above, stop and ask before proceeding, even if it seems like a small or convenient addition.

## Definition of Done (for current work)
A task is considered complete when:
- The UI is fully responsive across mobile, tablet, and desktop
- All styling follows `DESIGN-bugatti.md` — no ad hoc colors, spacing, or typography
- Code passes `npm run lint` with no errors
- No hardcoded values that should be config-driven (see `SKILL.md`)
- No leftover TODOs or placeholder content unless explicitly agreed on

## Not Yet Started (for context only — not in scope yet)
Once the frontend is complete, the next stage of work will connect the site to a real database: defining the Prisma schema for products, connecting Neon.tech, wiring up Cloudinary for images, and replacing mock data with real Route Handler calls. This is why database-related work is excluded from the current stage — the frontend should be built so that swapping mock data for real data later is straightforward, without requiring major rework.