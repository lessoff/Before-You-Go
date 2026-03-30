"use client";

import { useState, useRef, useEffect } from "react";
import { searchCountries, type CountryOption } from "@/lib/countries";

interface SearchBarProps {
  onSearch: (country: string) => void;
  isLoading: boolean;
}

const regionColors: Record<string, string> = {
  Europe: "#818cf8",
  Asia: "#34d399",
  Africa: "#fbbf24",
  Americas: "#f97316",
  Oceania: "#38bdf8",
};

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<CountryOption[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const results = searchCountries(query);
    setSuggestions(results);
    setOpen(results.length > 0 && query.trim().length > 0);
    setHighlighted(-1);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSelect(country: CountryOption) {
    setQuery(country.name);
    setOpen(false);
    onSearch(country.name);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setOpen(false);
    if (highlighted >= 0 && suggestions[highlighted]) {
      handleSelect(suggestions[highlighted]);
    } else {
      onSearch(trimmed);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  // Highlight matching prefix in country name
  function renderName(name: string) {
    const len = query.length;
    if (!len) return name;
    return (
      <>
        <span className="font-bold text-white">{name.slice(0, len)}</span>
        <span className="text-white/50">{name.slice(len)}</span>
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-lg">
      <form onSubmit={handleSubmit}>
        <div
          className="flex items-center gap-3 rounded-2xl p-1.5 transition-all"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${open ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.12)"}`,
            boxShadow: open
              ? "0 0 40px rgba(99,102,241,0.25), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "0 0 40px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <span className="pl-3 text-white/30">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder="Country name, e.g. Japan..."
            disabled={isLoading}
            autoComplete="off"
            className="flex-1 bg-transparent py-3 text-base text-white outline-none placeholder:text-white/30"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
            }}
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl py-1"
          style={{
            background: "#111827",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {suggestions.map((country, i) => {
            const regionColor = regionColors[country.region] ?? "#a1a1aa";
            const isActive = i === highlighted;
            return (
              <button
                key={country.name}
                type="button"
                onMouseDown={() => handleSelect(country)}
                onMouseEnter={() => setHighlighted(i)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors"
                style={{
                  background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                  borderLeft: isActive ? "2px solid #6366f1" : "2px solid transparent",
                }}
              >
                <span className="text-2xl leading-none">{country.flag}</span>
                <div className="flex-1">
                  <p className="text-sm leading-tight">{renderName(country.name)}</p>
                </div>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{ color: regionColor, background: `${regionColor}18` }}
                >
                  {country.region}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
