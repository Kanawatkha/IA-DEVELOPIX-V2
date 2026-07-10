# SKILL.md

Coding standards for this project. All code must follow these conventions consistently, regardless of which phase or session it was written in.

## 1. Naming Conventions
- **Component files:** PascalCase — `ProductCard.tsx`, `CartDrawer.tsx`
- **Route/folder names:** kebab-case — `product-showcase/`, `image-export/`
- **Variables/functions:** camelCase — `getFeaturedProducts`, `isInCart`
- **Booleans:** prefix with `is`, `has`, `should` — `isExporting`, `hasVideo`, `shouldAnimate`
- **Types/interfaces:** PascalCase, no `I` prefix — `interface ProductData`, not `IProductData`

## 2. Component Patterns
- Server Components by default. Only add `"use client"` when the component genuinely needs browser APIs, React hooks (`useState`, `useEffect`, etc.), or event handlers.
- Push Client Components as far down the tree as possible — keep layouts, static content, and structure on the server; only interactive leaves (cart drawer, image export dialog, etc.) become client components.
- File structure inside a component file, top to bottom: types → component logic → export.
- If a component file exceeds roughly 150 lines, split it into smaller components or extract logic into a hook/service.

## 3. TypeScript Rules
- Strict mode always enabled.
- Never use `any`. Use `unknown` and narrow the type properly instead.
- Use `interface` for object shapes and component props as the project-wide default.
- **Exception:** for data validated by a Zod schema (e.g. cart items), derive the type directly from the schema with `z.infer<typeof SchemaName>` — do not write a separate `interface` that duplicates the schema shape. This keeps validation and typing in sync from a single source of truth.

## 4. Styling Rules
- Use Tailwind utility classes directly; use a `cn()` helper for conditional class merging.
- Avoid inline styles except for genuinely dynamic values computed at runtime.
- All colors, spacing, typography, and animation durations must come from Tailwind theme tokens defined in `tailwind.config.ts` (synced with `DESIGN-bugatti.md`) — never hardcode raw hex codes, pixel values, or ms durations directly in component files.
- If a new design value is needed, add it to `tailwind.config.ts` first, then reference it — don't inline it ad hoc.

## 5. Data Fetching & State Pattern
- **Catalog data (products):** during the mock-data stage, use mock files structured to closely resemble the eventual Prisma shape, so swapping to real data later requires minimal rework.
- **Cart data:** always managed via Zustand with Persist Middleware, stored in the browser's LocalStorage. This is a permanent architectural choice, not a temporary mock stage — cart data is never intended to move to the database.
- Use local `useState` when state is only relevant to a single component or its direct children.
- Use Zustand only when state needs to be shared across unrelated components or routes.

## 6. Comment & Documentation Style
- Comments should explain *why*, not *what* — the code itself should be clear enough to show what it does.
- Add JSDoc comments to any function exported and used across files (e.g. anything in a feature's `services/` or a shared `lib/` utility).

## 7. Import Order Convention
Use absolute imports (`@/...`) as the default for anything outside the current folder. Use relative imports (`./`) only for files in the same folder or immediate feature subfolder.

Import order, top to bottom:
- React / Next.js core
- Third-party libraries (framer-motion, zustand, zod, html-to-image, ...)
- Internal absolute imports (@/features, @/components, @/lib, @/hooks)
- Relative imports (./ — same folder only)
- Type-only imports (import type { ... })
- Styles (if any CSS module is used)

## 8. Folder Structure & Separation of Concerns (Feature-based Module Encapsulation)
- Each feature under `features/` is self-contained: it owns its own `components/`, `hooks/`, `services/`, `constants/`, `types/`, and `store/` (as applicable) — do not pull these from a global folder for feature-specific logic.
- Each feature exposes a single `index.ts` as its public API. Other features (or `app/`) must only import from `@/features/<feature-name>` — never reach into a feature's internal files directly.
- **Rule of Three:** write logic locally inside the feature first. Only extract it to a shared top-level folder (`hooks/`, `lib/`, `services/`, `types/` at the `src/` root) once it is genuinely reused by three or more features.
- Shared top-level folders must only contain code that is truly cross-feature. If something in there is only used by one feature, move it into that feature.
- Dependency direction flows one way: `app/ → features/ → shared (components/hooks/lib/services)`. Shared folders must never import from `features/`.

## 9. Configuration-Driven Logic (No Hardcoding, DRY)
- Any constant, threshold, or business rule that is reused or may change over time must live in `constants/` or a `config/` file — never hardcoded inline in logic.
- No magic numbers or magic strings embedded directly in code (e.g. max cart quantity, image export pixel ratio, debounce delay) — name them as constants with clear intent.
- If the same logic appears in more than two places, extract it into a shared function in the relevant feature's `services/` or a shared `lib/` utility.
- Category-to-value mappings (e.g. product category → icon/color, category → route path) must be defined as a single lookup object/map, not repeated `if/else` or `switch` blocks scattered across files.

## 10. Error Handling
- Every route segment that can fail should have proper `error.tsx` and `not-found.tsx` handling — never let an error surface as a blank or broken page.
- Handle empty/missing data states explicitly (e.g. product image failed to load, image export failed) with a designed fallback, not a silent failure.

## 11. Performance Optimization
- Use `useMemo`/`useCallback` only when there is a measurable reason — do not apply them by default to every function or value.
- Use `next/image` for all images, with `priority` reserved only for above-the-fold images (e.g. the main product photo).
- Use `next/dynamic` to lazy-load heavy or rarely-used components (e.g. the image export dialog, which only needs to load once triggered).

## 12. Accessibility
- Every interactive element (button, link) must have an accessible label — icon-only buttons (e.g. cart icon, share button) need `aria-label`.
- Every image must have a meaningful `alt` attribute — never leave it empty or use the filename.
- Text/background color combinations must meet WCAG AA contrast requirements; verify against `DESIGN-bugatti.md` color choices, especially light text on the black theme background.

## 13. Git Commit Convention
Follow Conventional Commits format:
- feat: add product detail page for sumo category
- fix: correct cart total calculation on quantity update
- refactor: extract image export logic into shared hook
- chore: update tailwind config with new design tokens

## 14. Catalog Data vs. Story Content Boundary
This project splits product page content into two distinct layers — this rule governs how to work with each correctly.

- **Catalog Data** (from the database via Prisma): product name, slug, price, category, main image, short description, video URL, related products. Used for the store page, category pages, and any place products are listed or queried.
- **Story Content** (hand-written components): the detailed, narrative section of a product page (motor specs, design highlights, etc.). One file per product, located at `features/products/detail-content/<product-slug>.tsx`.
- Story Content components must be presentation-only: they receive props (e.g. images, a product slug) and render — they must never fetch data or contain business logic themselves.
- The connection between Catalog Data and Story Content happens in exactly one place: `products/[slug]/page.tsx`, which selects the correct Story Content component based on the product's slug (e.g. via a mapping object or dynamic import).
- If a product does not yet have a Story Content file, fall back to showing only the Catalog Data (price, images, basic description) — do not throw an error or block the page.
- Never attempt to move Story Content into the database or force it into a shared schema — this would work against the intended design, where each product's detailed presentation is custom-built.