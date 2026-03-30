"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";

const ACCENT = "#818cf8";

type VisaType = "visa_free" | "visa_on_arrival" | "e_visa" | "visa_required";

interface VisaResult {
  type: VisaType;
  duration: string | null;
  notes: string;
}

const visaConfig: Record<VisaType, { label: string; color: string; icon: string }> = {
  visa_free:        { label: "Visa Free",        color: "#22c55e", icon: "✓" },
  visa_on_arrival:  { label: "Visa on Arrival",  color: "#f59e0b", icon: "🛬" },
  e_visa:           { label: "eVisa Required",   color: "#38bdf8", icon: "💻" },
  visa_required:    { label: "Visa Required",    color: "#f43f5e", icon: "✗" },
};

interface VisaSectionProps {
  destinationCountry: string;
  delay?: number;
}

export default function VisaSection({ destinationCountry, delay }: VisaSectionProps) {
  const [passportCountry, setPassportCountry] = useState("");
  const [result, setResult] = useState<VisaResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheck() {
    const trimmed = passportCountry.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(
        `/api/visa?from=${encodeURIComponent(trimmed)}&to=${encodeURIComponent(destinationCountry)}`
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      const data: VisaResult = body as VisaResult;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleCheck();
  }

  const cfg = result ? visaConfig[result.type] : null;

  return (
    <Section icon="🛂" title="Visa Requirements" accent={ACCENT} delay={delay}>
      <div className="space-y-4">
        {/* Input row */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/55">
            Your passport country
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={passportCountry}
              onChange={(e) => {
                setPassportCountry(e.target.value);
                setResult(null);
                setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="e.g. United States, Germany, Japan…"
              className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:ring-1"
              style={{ border: "1px solid rgba(255,255,255,0.1)", focusRingColor: ACCENT }}
            />
            <button
              onClick={handleCheck}
              disabled={loading || !passportCountry.trim()}
              className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity disabled:opacity-40"
              style={{ background: ACCENT, color: "#000" }}
            >
              {loading ? "…" : "Check"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-rose-400">{error}</p>
        )}

        {/* Result */}
        {result && cfg && (
          <div
            className="rounded-xl p-4 space-y-2"
            style={{ background: `${cfg.color}10`, border: `1px solid ${cfg.color}30` }}
          >
            {/* Status badge */}
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-base font-bold flex-shrink-0"
                style={{ background: `${cfg.color}22`, color: cfg.color }}
              >
                {cfg.icon}
              </span>
              <div>
                <p className="text-base font-bold" style={{ color: cfg.color }}>
                  {cfg.label}
                </p>
                {result.duration && (
                  <p className="text-sm text-white/65">Stay up to {result.duration}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            {result.notes && (
              <p className="text-sm text-white/65 leading-relaxed pl-12">{result.notes}</p>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
