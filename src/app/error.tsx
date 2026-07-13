"use client";

import Link from "next/link";
import { commonContent } from "@/src/content";

export default function GlobalErrorState() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center text-primary">
      <p className="font-mono text-caption uppercase text-muted">SYSTEM ERROR</p>
      <h1 className="mt-4 font-display text-display-lg uppercase">Something went wrong</h1>
      <p className="mt-6 max-w-md font-serif text-body-md text-body">Please return to the storefront and try again.</p>
      <Link href="/" className="mt-8 min-h-11 rounded-pill border border-primary px-8 py-3 font-mono text-button uppercase text-primary">
        {commonContent.actions.exploreStore}
      </Link>
    </main>
  );
}
