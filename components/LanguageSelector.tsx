"use client";

import { useI18n, Locale } from "@/contexts/I18nContext";
import { Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "id", label: "Indonesia" },
] as const;

// @note LanguageSelector dropdown for choosing display language
export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  const handleChange = (value: string | null) => {
    if (value) {
      setLocale(value as Locale);
    }
  };

  const currentLabel = LANGUAGES.find((l) => l.value === locale)?.label || "English";

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" />
      <Select value={locale} onValueChange={handleChange}>
        <SelectTrigger className="w-[130px] h-9 bg-zinc-900/50 border-white/10">
          <SelectValue>{currentLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-white/10">
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
