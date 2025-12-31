"use client";

import { useState, useEffect, useCallback } from "react";

interface UseTimeSyncResult {
  now: Date;
  getTimeUntil: (targetDate: string | Date) => TimeRemaining;
  getTimeSince: (targetDate: string | Date) => TimeRemaining;
  isExpired: (endDate: string | Date) => boolean;
  isStarted: (startDate: string | Date) => boolean;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  formatted: string;
}

// @note calculates time difference and returns formatted object
function calculateTimeDiff(target: Date, now: Date): TimeRemaining {
  const diff = target.getTime() - now.getTime();
  const total = Math.max(0, diff);

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return {
    days,
    hours,
    minutes,
    seconds,
    total,
    formatted: parts.join(" "),
  };
}

// @note hook for time synchronization with 1 second interval
export function useTimeSync(): UseTimeSyncResult {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeUntil = useCallback(
    (targetDate: string | Date): TimeRemaining => {
      const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
      return calculateTimeDiff(target, now);
    },
    [now]
  );

  const getTimeSince = useCallback(
    (targetDate: string | Date): TimeRemaining => {
      const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
      return calculateTimeDiff(now, target);
    },
    [now]
  );

  const isExpired = useCallback(
    (endDate: string | Date): boolean => {
      const end = typeof endDate === "string" ? new Date(endDate) : endDate;
      return now > end;
    },
    [now]
  );

  const isStarted = useCallback(
    (startDate: string | Date): boolean => {
      const start = typeof startDate === "string" ? new Date(startDate) : startDate;
      return now >= start;
    },
    [now]
  );

  return { now, getTimeUntil, getTimeSince, isExpired, isStarted };
}
