"use client";

import { useState, useCallback } from "react";
import type { BriefingResponse } from "@/lib/types";

export function useBriefing() {
  const [data, setData] = useState<BriefingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBriefing = useCallback(async (country: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(
        `/api/briefing?country=${encodeURIComponent(country)}`
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body.error || `Failed to fetch briefing (${res.status})`
        );
      }

      const briefing: BriefingResponse = await res.json();
      setData(briefing);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchBriefing };
}
