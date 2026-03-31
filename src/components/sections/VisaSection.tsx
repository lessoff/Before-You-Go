"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";

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
      setResult(body as VisaResult);
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
            placeholder="e.g. United States, Germany, Japan..."
            className="flex-1 rounded-lg px-4 py-2.5 text-sm outline-none"
            style={{
              background: "var(--bg-raised)",
              border: "1px solid var(--border-mid)",
              color: "var(--text-primary)",
            }}
          />
          <button
            onClick={handleCheck}
            disabled={loading || !passportCountry.trim()}
            className="rounded-lg px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-opacity disabled:opacity-40"
            style={{ background: "var(--accent)", color: "#0c0b08" }}
          >
            {loading ? "..." : "Check"}
          </button>
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
