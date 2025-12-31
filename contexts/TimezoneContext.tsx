"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// @note common timezones list
export const TIMEZONES = [
  { value: "local", label: "Local Time" },
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Sao_Paulo", label: "Brasília Time (BRT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Central European (CET)" },
  { value: "Europe/Moscow", label: "Moscow (MSK)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Asia/Bangkok", label: "Bangkok (ICT)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Seoul", label: "Seoul (KST)" },
  { value: "Asia/Shanghai", label: "China (CST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST)" },
  { value: "Pacific/Auckland", label: "Auckland (NZST)" },
] as const;

interface TimezoneContextType {
  timezone: string;
  setTimezone: (tz: string) => void;
  formatDate: (dateStr: string) => string;
  getTimezoneLabel: () => string;
}

const TimezoneContext = createContext<TimezoneContextType | null>(null);

// @note get user's local timezone
function getLocalTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}

// @note TimezoneProvider manages global timezone state
export function TimezoneProvider({ children }: { children: ReactNode }) {
  const [timezone, setTimezone] = useState<string>("local");
  const [localTz, setLocalTz] = useState<string>("UTC");

  useEffect(() => {
    // @note detect user's local timezone on mount
    setLocalTz(getLocalTimezone());
  }, []);

  // @note get actual timezone string (resolve "local" to actual timezone)
  const getActualTimezone = (): string => {
    return timezone === "local" ? localTz : timezone;
  };

  // @note format date string to selected timezone
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const tz = getActualTimezone();
    
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: tz,
    });
  };

  // @note get human readable timezone label
  const getTimezoneLabel = (): string => {
    if (timezone === "local") {
      const found = TIMEZONES.find((tz) => tz.value === localTz);
      return found ? `${found.label} (Local)` : localTz;
    }
    const found = TIMEZONES.find((tz) => tz.value === timezone);
    return found ? found.label : timezone;
  };

  return (
    <TimezoneContext.Provider
      value={{ timezone, setTimezone, formatDate, getTimezoneLabel }}
    >
      {children}
    </TimezoneContext.Provider>
  );
}

// @note hook to access timezone context
export function useTimezone(): TimezoneContextType {
  const context = useContext(TimezoneContext);
  if (!context) {
    throw new Error("useTimezone must be used within TimezoneProvider");
  }
  return context;
}
