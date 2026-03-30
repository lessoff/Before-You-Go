"use client";

import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";

const ACCENT = "#06b6d4";

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
    <Section icon="🕐" title="Local Time & Timezone" accent={ACCENT} delay={delay}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-4xl font-bold tracking-tight text-white">{time.time}</p>
          <p className="mt-1 text-sm text-white/40">{time.date}</p>
        </div>
        <div
          className="rounded-xl px-4 py-2 text-sm font-medium"
          style={{ background: `${ACCENT}18`, color: ACCENT }}
        >
          {timezone}
        </div>
      </div>
    </Section>
  );
}
