# AGENTS.md

## Project Snapshot
IA DEVELOPIX is a premium robotics storefront (LineFollower, Mission, Gathering, Sumo). It is a catalog-style e-commerce site with no online payment system — all sales close through direct conversation with the shop owner via Facebook Messenger. See CONTEXT.md for full details.

## Required Reading (read before writing any code)
Before starting any task, read these files in order:
1. `CONTEXT.md` — Full project overview: purpose, Tech Stack (all 12 categories), product content architecture, checkout flow, folder structure, and current scope boundaries.
2. `DESIGN-bugatti.md` — Visual design system (colors, typography, spacing, components). All UI must follow this file exactly — do not invent colors, spacing, or component styles outside of it.
3. `SKILL.md` — Coding standards: file naming, folder placement, TypeScript conventions, component patterns, and rules for catalog data vs. hand-written product content.
4. `PHASE.md` — What phase the project is currently in, and what is in/out of scope right now.

## Current Phase
Always check `PHASE.md` before doing any work. It tells you what phase we're in and what you're allowed to touch. Do not jump ahead to a later phase's tasks without being told explicitly, even if you can see the full plan in CONTEXT.md.

## Working Rules
- You may install new npm packages, adjust configs, and restructure files as needed to get the task done well.
- All UI must reference `DESIGN-bugatti.md` for colors, typography, and spacing — never guess or default to generic styles.
- Follow the folder structure and coding conventions in `SKILL.md` consistently across all files you create.
- Stay within the boundaries set in `PHASE.md`. If a task seems to require work outside the current phase, stop and ask instead of proceeding.
- **Never add, scaffold, or suggest implementing any payment system (Stripe, Omise, PromptPay, or similar) without being explicitly asked.** This project intentionally has no payment gateway — checkout happens entirely through Facebook Messenger. You may discuss or explain payment options if directly asked about them, but do not write code for one or treat its absence as something to "fix."
- If instructions conflict with each other, or a requirement is unclear, ask before making assumptions.

## Useful Commands
- `npm run dev` — start local development server
- `npm run lint` — check code style and standards
- `npm run build` — verify production build succeeds

Run `lint` and `build` before considering a task complete.

## When to Stop and Ask
- Task requires work outside the current phase (per `PHASE.md`)
- Conflicting instructions between files
- Ambiguous requirements that could lead to significantly different implementations
- Any task involving adding a new product's Story Content — confirm the layout/section plan with the user before writing the component, since this is custom design work, not routine data entry