"use client";

import Link from "next/link";

export default function StorefrontError() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-canvas px-6 text-center text-primary">
      <p className="font-mono text-caption uppercase text-muted">STORE ERROR</p>
      <h1 className="mt-4 font-display text-display-lg uppercase">Unable to load this page</h1>
      <Link href="/store" className="mt-8 min-h-11 rounded-pill border border-primary px-8 py-3 font-mono text-button uppercase text-primary">
        Return to store
      </Link>
    </main>
  );
}
