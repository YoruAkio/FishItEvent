"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { useI18n } from "@/contexts/I18nContext";

// @note floating navbar component with blur effect
export function Navbar() {
  const { t } = useI18n();

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center justify-between gap-12 px-8 py-3 rounded-full border border-white/10 bg-zinc-900/70 backdrop-blur-md shadow-lg">
        <Link
          href="/"
          className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          <span className="hidden sm:inline">{t('navTitle')}</span>
          <span className="sm:hidden">F.I.E</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/why"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('navWhy')}
          </Link>
          <Link
            href="https://github.com/YoruAkio/FishItEvent"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <FaGithub className="h-4 w-4" />
            <span>{t('navSource')}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
