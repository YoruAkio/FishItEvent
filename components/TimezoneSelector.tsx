"use client";

import { useTimezone, TIMEZONES } from "@/contexts/TimezoneContext";
import { useI18n } from "@/contexts/I18nContext";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// @note TimezoneSelector dropdown for choosing display timezone
export function TimezoneSelector() {
  const { timezone, setTimezone, getTimezoneLabel } = useTimezone();
  const { t } = useI18n();

  // @note handle value change from base-ui select
  const handleChange = (value: string | null) => {
    if (value) {
      setTimezone(value);
    }
  };

  // @note get display label, translating "Local Time" if needed
  const getDisplayLabel = (tz: typeof TIMEZONES[number]) => {
    if (tz.value === "local") {
      return t("timezoneLocal");
    }
    return tz.label;
  };

  // @note get trigger display value with translation
  const getTriggerLabel = () => {
    const label = getTimezoneLabel();
    // @note replace "Local Time" part if present
    if (label.includes("Local Time")) {
      return label.replace("Local Time", t("timezoneLocal"));
    }
    if (label.includes("(Local)")) {
      return label.replace("(Local)", `(${t("timezoneLocal")})`);
    }
    return label;
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={timezone} onValueChange={handleChange}>
        <SelectTrigger className="w-[200px] h-9 bg-zinc-900/50 border-white/10">
          <SelectValue>{getTriggerLabel()}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 border-white/10">
          {TIMEZONES.map((tz) => (
            <SelectItem key={tz.value} value={tz.value}>
              {getDisplayLabel(tz)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
