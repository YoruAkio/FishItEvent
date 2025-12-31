"use client";

import Link from "next/link";

// @note footer component with credits and source link
export function Footer() {
  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <span>&copy; 2026</span>
        <span>made with &lt;3 by</span>
        <Link
          href="https://github.com/YoruAkio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-colors"
        >
          YoruAkio
        </Link>
      </div>
    </footer>
  );
}
