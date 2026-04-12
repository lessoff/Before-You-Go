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

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDate(dateStr: string) {
  const [, m, d] = dateStr.split("-").map(Number);
  return `${MONTHS[m - 1].slice(0, 3)} ${d}`;
}

interface MonthDayPickerProps {
  label: string;
  month: number | null;
  day: number | null;
  onMonthChange: (m: number | null) => void;
  onDayChange: (d: number | null) => void;
}

function MonthDayPicker({ label, month, day, onMonthChange, onDayChange }: MonthDayPickerProps) {
  const maxDays = month !== null ? DAYS_IN_MONTH[month - 1] : 31;

  const selectStyle = {
    background: "var(--bg-raised)",
    border: "1px solid var(--border-mid)",
    color: "var(--text-primary)",
  };

  const activeSelectStyle = {
    background: "var(--bg-raised)",
    border: "1px solid var(--accent-border)",
    color: "var(--text-primary)",
  };

  return (
    <div className="flex-1 flex flex-col gap-1">
      <label
        className="text-[10px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      <div className="flex gap-1.5">
        {/* Month select */}
        <select
          value={month ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onMonthChange(val ? Number(val) : null);
            onDayChange(null);
          }}
          className="flex-1 min-w-0 rounded-lg px-2 py-2 text-sm outline-none appearance-none cursor-pointer"
          style={month !== null ? activeSelectStyle : selectStyle}
        >
          <option value="">Month</option>
          {MONTHS.map((name, i) => (
            <option key={name} value={i + 1}>{name}</option>
          ))}
        </select>

        {/* Day select */}
        <select
          value={day ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            onDayChange(val ? Number(val) : null);
          }}
          disabled={month === null}
          className="w-20 shrink-0 rounded-lg px-2 py-2 text-sm outline-none appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          style={day !== null ? activeSelectStyle : selectStyle}
        >
          <option value="">Day</option>
          {Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function HolidaysSection({ holidays, delay }: HolidaysSectionProps) {
  const [fromMonth, setFromMonth] = useState<number | null>(null);
  const [fromDay, setFromDay] = useState<number | null>(null);
  const [untilMonth, setUntilMonth] = useState<number | null>(null);
  const [untilDay, setUntilDay] = useState<number | null>(null);

  const fromMD = fromMonth !== null && fromDay !== null
    ? `${pad(fromMonth)}-${pad(fromDay)}`
    : null;
  const untilMD = untilMonth !== null && untilDay !== null
    ? `${pad(untilMonth)}-${pad(untilDay)}`
    : null;

  const hasSearched = fromMD !== null && untilMD !== null;

  const filtered = hasSearched
    ? holidays.filter((h) => {
        const hMD = h.date.slice(5); // "MM-DD"
        return hMD >= fromMD! && hMD <= untilMD!;
      })
    : [];

  return (
    <Section title="Public Holidays" delay={delay}>
      <div className="space-y-4">
        {/* Month + Day pickers */}
        <div className="flex items-end gap-2">
          <MonthDayPicker
            label="From"
            month={fromMonth}
            day={fromDay}
            onMonthChange={setFromMonth}
            onDayChange={setFromDay}
          />

          <span
            className="mb-2 shrink-0 text-sm select-none"
            style={{ color: "var(--text-muted)" }}
          >
            →
          </span>

          <MonthDayPicker
            label="Until"
            month={untilMonth}
            day={untilDay}
            onMonthChange={setUntilMonth}
            onDayChange={setUntilDay}
          />
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
          <div
            className="flex items-center gap-3 rounded-lg px-4 py-3"
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
