"use client";

import { useState, useEffect, useCallback } from "react";
import type { EventsResponse, VirtualEvent } from "@/types/event";

// @note use local API route to proxy Roblox API (cached for 5 min)
const EVENTS_API_URL = "/api/events";

interface UseEventsResult {
  events: VirtualEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// @note hook to fetch events from Roblox API client-side
export function useEvents(): UseEventsResult {
  const [events, setEvents] = useState<VirtualEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(EVENTS_API_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }

      const data: EventsResponse = await response.json();
      setEvents(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
}
