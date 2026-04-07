"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";

interface ExchangeRateSectionProps {
  currency: { code: string; name: string; symbol: string };
  exchangeRate: { from: string; to: string; rate: number };
  delay?: number;
}

export default function ExchangeRateSection({
  currency,
  exchangeRate,
  delay,
}: ExchangeRateSectionProps) {
  const [amount, setAmount] = useState("100");

  const parsed = parseFloat(amount);
  const converted = !isNaN(parsed) && parsed >= 0 ? parsed * exchangeRate.rate : null;

  const formattedConverted =
    converted !== null
      ? converted >= 10000
        ? converted.toLocaleString("en-US", { maximumFractionDigits: 0 })
        : converted >= 100
        ? converted.toLocaleString("en-US", { maximumFractionDigits: 1 })
        : converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : "—";

  return (
    <Section title="Exchange Rate" delay={delay}>
      <div className="space-y-5">
        {/* Currency info row */}
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              {currency.code} · {currency.name}
            </p>
          </div>
          <div
            className="self-start rounded-lg px-3 py-1.5 text-xs font-medium"
            style={{
              background: "var(--accent-dim)",
              color: "var(--accent)",
              border: "1px solid var(--accent-border)",
            }}
          >
            1 USD = {exchangeRate.rate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {currency.code}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: "var(--border-mid)" }} />

        {/* Calculator */}
        <div>
          <p
            className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--text-muted)" }}
          >
            Calculator
          </p>
          <div className="flex items-stretch gap-2">
            <div
              className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-lg px-3 py-3"
              style={{
                background: "var(--bg-raised)",
                border: "1px solid var(--border-mid)",
              }}
            >
              <span className="shrink-0 text-xs font-medium" style={{ color: "var(--text-muted)" }}>USD</span>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-right text-base font-semibold outline-none"
                style={{ color: "var(--text-primary)" }}
                placeholder="0"
              />
            </div>

            <div
              className="flex shrink-0 items-center text-sm select-none"
              style={{ color: "var(--text-muted)" }}
            >
              →
            </div>

            <div
              className="flex min-w-0 flex-1 flex-col gap-0.5 overflow-hidden rounded-lg px-3 py-3"
              style={{
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-border)",
              }}
            >
              <span className="shrink-0 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                {currency.code}
              </span>
              <span className="w-full truncate text-sm font-semibold" style={{ color: "var(--accent)" }}>
                {currency.symbol}{formattedConverted}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
