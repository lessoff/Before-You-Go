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
            hour12: false,
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
      <div>
        <div className="flex items-baseline gap-2 whitespace-nowrap">
          <span
            className="font-display text-5xl font-bold leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            {time.time}
          </span>
        </div>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          {time.date}
        </p>
      </div>
    </Section>
  );
}
