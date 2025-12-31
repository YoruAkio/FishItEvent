"use client";

import Link from "next/link";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ArrowLeft } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

// @note why page explains the purpose of this website
export default function WhyPage() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* @note page title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t("whyTitle")}
        </h1>
        {/* @note language selector centered below title */}
        <div className="flex justify-center">
          <LanguageSelector />
        </div>
      </div>

      <div className="space-y-8 text-muted-foreground">
        {/* @note problem section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">
            {t("whyProblem")}
          </h2>
          <p className="leading-relaxed">
            {t("whyProblemText")}
          </p>
        </div>

        {/* @note solution section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">
            {t("whySolution")}
          </h2>
          <p className="leading-relaxed">
            {t("whySolutionText")}
          </p>
        </div>

        {/* @note features section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">
            {t("whyFeatures")}
          </h2>
          <ul className="space-y-1">
            <li>- {t("whyFeature1")}</li>
            <li>- {t("whyFeature2")}</li>
            <li>- {t("whyFeature3")}</li>
          </ul>
        </div>

        {/* @note bug report section */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">
            {t("whyBugs")}
          </h2>
          <p className="mb-3">
            {t("whyBugsText")}
          </p>
          <Link
            href="https://discord.com/users/919841186246692886"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-2">
              <FaDiscord className="h-4 w-4" />
              {t("whyContactDiscord")}
            </Button>
          </Link>
        </div>

        {/* @note back button */}
        <div className="flex justify-center pt-4">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("whyBackHome")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
