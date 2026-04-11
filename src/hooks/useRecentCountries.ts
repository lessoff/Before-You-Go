"use client";

import { useState, useEffect, useCallback } from "react";
import { countries, type CountryOption } from "@/lib/countries";

const STORAGE_KEY = "byg_recent_countries";
const MAX_RECENT = 7;

function findCountryOption(name: string): CountryOption | undefined {
  return countries.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

export function useRecentCountries() {
  const [recent, setRecent] = useState<CountryOption[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const names: string[] = JSON.parse(stored);
        const resolved = names
          .map(findCountryOption)
          .filter((c): c is CountryOption => c !== undefined);
        setRecent(resolved);
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const addRecent = useCallback((name: string) => {
    const country = findCountryOption(name);
    if (!country) return;

    setRecent((prev) => {
      const filtered = prev.filter((c) => c.name !== country.name);
      const updated = [country, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.map((c) => c.name)));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  }, []);

  return { recent, addRecent };
}
