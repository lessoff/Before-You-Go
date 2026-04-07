"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";

interface Holiday {
  date: string;
  name: string;
  localName: string;
}

interface HolidaysSectionProps {
  holidays: Holiday[];
  delay?: number;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(dateStr: string) {
  const [, m, d] = dateStr.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

export default function HolidaysSection({ holidays, delay }: HolidaysSectionProps) {
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");

  const filtered =
    from && until
      ? holidays.filter((h) => h.date >= from && h.date <= until)
      : [];

  const hasSearched = from && until;

  return (
    <Section title="Public Holidays" delay={delay}>
      <div className="space-y-4">
        {/* Date range inputs */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <label
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              From
            </label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm outline-none"
              style={{
                background: "var(--bg-raised)",
                border: `1px solid ${from ? "var(--accent-border)" : "var(--border-mid)"}`,
                color: "var(--text-primary)",
                colorScheme: "light",
              }}
            />
          </div>

          <span
            className="mt-5 shrink-0 text-sm select-none"
            style={{ color: "var(--text-muted)" }}
          >
            →
          </span>

          <div className="flex-1 flex flex-col gap-1">
            <label
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              Until
            </label>
            <input
              type="date"
              value={until}
              min={from || undefined}
              onChange={(e) => setUntil(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm outline-none"
              style={{
                background: "var(--bg-raised)",
                border: `1px solid ${until ? "var(--accent-border)" : "var(--border-mid)"}`,
                color: "var(--text-primary)",
                colorScheme: "light",
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: "var(--border-mid)" }} />

        {/* Results */}
        {!hasSearched && (
          <p
            className="text-center text-sm py-2"
            style={{ color: "var(--text-muted)" }}
          >
            Select your travel dates above
          </p>
        )}

        {hasSearched && filtered.length === 0 && (
          <div className="flex items-center gap-3 rounded-lg px-4 py-3"
            style={{ background: "var(--accent-dim)", border: "1px solid var(--accent-border)" }}
          >
            <span className="text-lg">✓</span>
            <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>
              No public holidays during your trip
            </p>
          </div>
        )}

        {hasSearched && filtered.length > 0 && (
          <div className="space-y-1.5">
            {filtered.map((h) => (
              <div
                key={h.date}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                style={{
                  background: "var(--bg-raised)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="shrink-0 font-mono text-xs font-semibold w-12"
                  style={{ color: "var(--accent)" }}
                >
                  {formatDate(h.date)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {h.name}
                  </p>
                  {h.localName !== h.name && (
                    <p className="truncate text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {h.localName}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
