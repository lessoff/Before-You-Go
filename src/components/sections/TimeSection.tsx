"use client";

import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";

interface TimeSectionProps {
  timezone: string;
  delay?: number;
}

export default function TimeSection({ timezone, delay }: TimeSectionProps) {
  const [time, setTime] = useState({ time: "", date: "" });

  useEffect(() => {
    function update() {
      try {
        const tz = timezone.startsWith("UTC") ? undefined : timezone;
        const now = new Date();
        setTime({
          time: now.toLocaleTimeString("en-US", {
            timeZone: tz,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }),
          date: now.toLocaleDateString("en-US", {
            timeZone: tz,
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      } catch {
        setTime({ time: "--:--:--", date: "" });
      }
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <Section title="Local Time" delay={delay}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2 whitespace-nowrap">
            <span
              className="font-display text-5xl font-bold leading-none"
              style={{ color: "var(--text-primary)" }}
            >
              {time.time.replace(/\s*(AM|PM)$/i, "")}
            </span>
            <span
              className="font-display text-lg font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              {time.time.match(/(AM|PM)$/i)?.[0] ?? ""}
            </span>
          </div>
          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
            {time.date}
          </p>
        </div>
        <div
          className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium tracking-wide"
          style={{
            background: "var(--accent-dim)",
            color: "var(--accent)",
            border: "1px solid var(--accent-border)",
          }}
        >
          {timezone}
        </div>
      </div>
    </Section>
  );
}
