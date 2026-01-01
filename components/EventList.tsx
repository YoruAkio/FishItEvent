"use client";

import { useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { useI18n } from "@/contexts/I18nContext";
import { EventCard } from "@/components/EventCard";
import { EventDisclaimer } from "@/components/EventDisclaimer";
import { TimezoneSelector } from "@/components/TimezoneSelector";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// @note EventList fetches and displays all events with loading and error states
export function EventList() {
  const { events, loading, error, refetch } = useEvents();
  const { t } = useI18n();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // @note handle refresh with timestamp update
  const handleRefresh = async () => {
    await refetch();
    setLastUpdated(new Date());
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">{t("eventsLoading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <AlertCircle className="h-8 w-8 text-red-400" />
        <p className="text-red-400">{t("eventsError")}</p>
        <Button variant="outline" onClick={handleRefresh} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          {t("eventsRetry")}
        </Button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-muted-foreground">{t("eventsEmpty")}</p>
        <Button variant="outline" onClick={handleRefresh} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          {t("eventsRefresh")}
        </Button>
      </div>
    );
  }

  // @note sort events: upcoming first, then active, then ended
  const now = new Date();
  const sortedEvents = [...events].sort((a, b) => {
    const aEnd = new Date(a.eventTime.endUtc);
    const bEnd = new Date(b.eventTime.endUtc);
    const aStart = new Date(a.eventTime.startUtc);
    const bStart = new Date(b.eventTime.startUtc);

    const aExpired = now > aEnd;
    const bExpired = now > bEnd;
    const aStarted = now >= aStart;
    const bStarted = now >= bStart;

    const aUpcoming = !aStarted && !aExpired;
    const bUpcoming = !bStarted && !bExpired;
    const aActive = aStarted && !aExpired;
    const bActive = bStarted && !bExpired;

    // @note upcoming events first
    if (aUpcoming && !bUpcoming) return -1;
    if (bUpcoming && !aUpcoming) return 1;
    if (aUpcoming && bUpcoming) return aStart.getTime() - bStart.getTime();

    // @note active events second
    if (aActive && !bActive) return -1;
    if (bActive && !aActive) return 1;
    if (aActive && bActive) return aEnd.getTime() - bEnd.getTime();

    // @note expired events last
    if (aExpired && bExpired) return bEnd.getTime() - aEnd.getTime();

    return 0;
  });

  return (
    <div className="space-y-8">
      {/* @note header with centered title and right-aligned refresh */}
      <div className="relative flex flex-col items-center gap-4">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {t("eventsTitle")}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t("eventsLastUpdated")}: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        
        {/* @note controls row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <LanguageSelector />
          <TimezoneSelector />
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{t("eventsRefresh")}</span>
          </Button>
        </div>
      </div>

      {/* @note single column layout for landscape cards */}
      <div className="flex flex-col gap-6">
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* @note separator */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-muted-foreground">{t("eventsNote")}</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* @note disclaimer about event time delays */}
      <EventDisclaimer />
    </div>
  );
}
