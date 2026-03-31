"use client";

import { useState, useRef, useEffect } from "react";
import { searchCountries, type CountryOption } from "@/lib/countries";

interface SearchBarProps {
  onSearch: (country: string) => void;
  isLoading: boolean;
}

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

  function renderName(name: string) {
    const len = query.length;
    if (!len) return name;
    return (
      <>
        <span style={{ color: "var(--accent)" }}>{name.slice(0, len)}</span>
        <span style={{ color: "var(--text-secondary)" }}>{name.slice(len)}</span>
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-lg">
      <form onSubmit={handleSubmit}>
        <div
          className="flex items-center gap-0 overflow-hidden rounded-xl transition-all"
          style={{
            background: "var(--bg-card)",
            border: `1px solid ${open ? "var(--accent-border)" : "var(--border)"}`,
          }}
        >
          {/* Search icon — typographic */}
          <span
            className="shrink-0 pl-4 text-sm font-light select-none"
            style={{ color: "var(--text-muted)" }}
          >
            ↗
          </span>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder="Enter a country name..."
            disabled={isLoading}
            autoComplete="off"
            className="flex-1 bg-transparent px-3 py-3.5 text-sm outline-none"
            style={{
              color: "var(--text-primary)",
            }}
          />

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="shrink-0 rounded-none px-6 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all disabled:cursor-not-allowed"
            style={{
              background: "var(--accent)",
              color: "#0c0b08",
              opacity: isLoading || !query.trim() ? 0.4 : 1,
              borderLeft: "1px solid var(--accent-border)",
            }}
          >
            {isLoading ? (
              <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border border-current border-t-transparent" />
            ) : (
              "Go"
            )}
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }}
        >
          {suggestions.map((country, i) => {
            const isActive = i === highlighted;
            return (
              <button
                key={country.name}
                type="button"
                onMouseDown={() => handleSelect(country)}
                onMouseEnter={() => setHighlighted(i)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors"
                style={{
                  background: isActive ? "var(--bg-raised)" : "transparent",
                  borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                }}
              >
                <span className="text-xl leading-none">{country.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{renderName(country.name)}</p>
                </div>
                <span
                  className="shrink-0 text-[10px] font-medium uppercase tracking-wider"
                  style={{ color: "var(--text-muted)" }}
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
