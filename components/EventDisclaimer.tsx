"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { useI18n } from "@/contexts/I18nContext";

// @note disclaimer banner about potential event delays
export function EventDisclaimer() {
  const { t } = useI18n();

  return (
    <div className="flex items-start gap-4 p-5 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
      <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
      <div className="space-y-2">
        <p className="text-base font-medium text-yellow-500">{t("disclaimerTitle")}</p>
        <p className="text-sm text-yellow-500/80">
          {t("disclaimerText")}
        </p>
        <p className="text-sm text-yellow-500/80 flex items-center gap-2 flex-wrap">
          <span>{t("disclaimerDiscord")}</span>
          <Link
            href="https://discord.gg/fishit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
          >
            <FaDiscord className="h-4 w-4" />
            <span>{t("disclaimerDiscordServer")}</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
