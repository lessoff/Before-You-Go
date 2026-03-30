"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

interface TimeCardProps {
  timezone: string;
  utcOffset: string;
  delay?: number;
}

export default function TimeCard({ timezone, utcOffset, delay }: TimeCardProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function updateTime() {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString("en-US", {
          timeZone: timezone.startsWith("UTC") ? undefined : timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setTime(formatted);
      } catch {
        setTime("--:--:--");
      }
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <Card icon="🕐" title="Local Time" delay={delay}>
      <div className="space-y-2">
        <p className="text-3xl font-bold text-gray-900">{time}</p>
        <p className="text-sm text-gray-500">
          Timezone: {timezone}
        </p>
        {utcOffset !== timezone && (
          <p className="text-sm text-gray-500">{utcOffset}</p>
        )}
      </div>
    </Card>
  );
}
