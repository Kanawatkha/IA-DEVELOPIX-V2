# Project Context: IA DEVELOPIX (Frontend Integration Phase)

## 1. Project Overview & Boundaries
- **Project Name:** IA DEVELOPIX
- **Core Product:** Premium High-Performance Robotics (LineFollower, Mission, Gathering, Sumo)
- **Design Paradigm:** Bugatti Design System (Pure Cinematic Black `#000000`, Ultra-Premium Animation Framework)
- **Current Development Scope:** **FRONTEND ONLY (Static Sandbox Mode)**
- **CRITICAL ARCHITECTURAL CONSTRAINT:** Do not implement any direct database connectivity (Supabase/Prisma/PostgreSQL) or Server Actions in this phase. All data fetching and states must strictly interact with the client-side mock layers.

## 2. Active Tech Stack Specifications
- **Framework:** Next.js 15.x (App Router Ecosystem)
- **Language:** TypeScript 5.x (Strict Mode Enforced)
- **Styling:** Tailwind CSS (Modern Hybrid Utility Implementation)
- **Animation/3D:** Framer Motion 11.x & WebGL/Canvas Environment (`Three.js` / `React Three Fiber` context)

## 3. Directory & Architecture Mapping
You must adhere strictly to the following structural paths for all components and data modifications:
- `src/app/(storefront)/` : Core storefront routing layers, including deep paths for sub-models (e.g., `/products/linefollower/fanpull-15`).
- `src/components/canvas/` : Dedicated workspace for 3D graphic scenes and advanced animation wrappers (e.g., `placeholder-sphere.tsx`).
- `src/components/layout/` : Global layout foundations including `navbar.tsx` and `footer.tsx`.
- `src/features/products/` : Feature-based architectural directory isolating components, types, and domains for the robotics catalog.
- `src/lib/data/` : Single Source of Truth for local static datasets (`products.ts`, `achievements.ts`).
- `src/lib/design/` : Token controller definitions for global interface styling (`typography.ts`, `variants.ts`).
- `src/services/` : Client-side data access layer controllers (`mock-database.ts`) simulating system queries.

## 4. Data Layer Contract
All interface bindings must respect the model shape specified by the `Product` interface in `src/features/products/types/Product.ts`. Do not hallucinate or extend object properties beyond this contract. Product data must strictly display the defined engineering specs (e.g., motors, vacuum systems, controller boards).