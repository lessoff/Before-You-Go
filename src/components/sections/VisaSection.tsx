"use client";

import { useState, useRef, useEffect } from "react";
import Section from "@/components/ui/Section";
import { searchCountries, type CountryOption } from "@/lib/countries";

type VisaType = "visa_free" | "visa_on_arrival" | "e_visa" | "visa_required";

interface VisaResult {
  type: VisaType;
  duration: string | null;
  notes: string;
}

const visaConfig: Record<VisaType, { label: string; color: string }> = {
  visa_free:       { label: "Visa Free",       color: "var(--safe)" },
  visa_on_arrival: { label: "Visa on Arrival", color: "var(--warn)" },
  e_visa:          { label: "eVisa Required",  color: "var(--info)" },
  visa_required:   { label: "Visa Required",   color: "var(--danger)" },
};

interface VisaSectionProps {
  destinationCountry: string;
  delay?: number;
}

export default function VisaSection({ destinationCountry, delay }: VisaSectionProps) {
  const [passportCountry, setPassportCountry] = useState("");
  const [suggestions, setSuggestions] = useState<CountryOption[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [result, setResult] = useState<VisaResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const results = searchCountries(passportCountry);
    setSuggestions(results);
    setOpen(results.length > 0 && passportCountry.trim().length > 0);
    setHighlighted(-1);
  }, [passportCountry]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function runCheck(country: string) {
    const trimmed = country.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `/api/visa?from=${encodeURIComponent(trimmed)}&to=${encodeURIComponent(destinationCountry)}`
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
      setResult(body as VisaResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(country: CountryOption) {
    setPassportCountry(country.name);
    setOpen(false);
    runCheck(country.name);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (open) {
      if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted(h => Math.min(h + 1, suggestions.length - 1)); return; }
      if (e.key === "ArrowUp")   { e.preventDefault(); setHighlighted(h => Math.max(h - 1, -1)); return; }
      if (e.key === "Escape")    { setOpen(false); return; }
    }
    if (e.key === "Enter") {
      if (highlighted >= 0 && suggestions[highlighted]) {
        handleSelect(suggestions[highlighted]);
      } else {
        setOpen(false);
        runCheck(passportCountry);
      }
    }
  }

  function renderName(name: string) {
    const len = passportCountry.length;
    if (!len) return name;
    return (
      <>
        <span style={{ color: "var(--accent)" }}>{name.slice(0, len)}</span>
        <span style={{ color: "var(--text-secondary)" }}>{name.slice(len)}</span>
      </>
    );
  }

  const cfg = result ? visaConfig[result.type] : null;

  return (
    <Section title="Visa Requirements" delay={delay}>
      <div className="space-y-4">
        {/* Label */}
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--text-muted)" }}
        >
          Your passport country
        </p>

        {/* Input row */}
        <div ref={containerRef} className="relative flex gap-2">
          <input
            type="text"
            value={passportCountry}
            onChange={(e) => {
              setPassportCountry(e.target.value);
              setResult(null);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder="e.g. United States, Germany, Japan..."
            autoComplete="off"
            className="flex-1 rounded-lg px-4 py-2.5 text-sm outline-none"
            style={{
              background: "var(--bg-raised)",
              border: `1px solid ${open ? "var(--accent-border)" : "var(--border-mid)"}`,
              color: "var(--text-primary)",
            }}
          />
          <button
            onClick={() => { setOpen(false); runCheck(passportCountry); }}
            disabled={loading || !passportCountry.trim()}
            className="rounded-lg px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-opacity disabled:opacity-40"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            {loading ? "..." : "Check"}
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className="absolute left-0 top-full z-50 mt-1 overflow-hidden rounded-xl"
              style={{
                right: "calc(4rem + 0.5rem)",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {suggestions.map((country, i) => (
                <button
                  key={country.name}
                  type="button"
                  onMouseDown={() => handleSelect(country)}
                  onMouseEnter={() => setHighlighted(i)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{
                    background: i === highlighted ? "var(--bg-raised)" : "transparent",
                    borderLeft: i === highlighted ? "2px solid var(--accent)" : "2px solid transparent",
                  }}
                >
                  <span className="text-lg leading-none">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{renderName(country.name)}</p>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    {country.region}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm" style={{ color: "var(--danger)" }}>{error}</p>
        )}

        {/* Result */}
        {result && cfg && (
          <div
            className="rounded-lg p-4 space-y-2"
            style={{
              background: `color-mix(in srgb, ${cfg.color} 8%, transparent)`,
              border: `1px solid color-mix(in srgb, ${cfg.color} 20%, transparent)`,
            }}
          >
            <div className="flex items-start gap-3">
              <div>
                <p className="text-base font-semibold" style={{ color: cfg.color }}>
                  {cfg.label}
                </p>
                {result.duration && (
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Stay up to {result.duration}
                  </p>
                )}
              </div>
            </div>
            {result.notes && (
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {result.notes}
              </p>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
