"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";

const ACCENT = "#f59e0b";

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
      ? converted.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "—";

  return (
    <Section icon="💱" title="Currency & Exchange Rate" accent={ACCENT} delay={delay}>
      <div className="space-y-5">
        {/* Currency info */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black"
            style={{ background: `${ACCENT}22`, color: ACCENT }}
          >
            {currency.symbol}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{currency.code}</p>
            <p className="text-xs text-white/40">{currency.name}</p>
          </div>
          <div
            className="ml-auto rounded-lg px-3 py-1 text-xs font-semibold"
            style={{ background: `${ACCENT}18`, color: ACCENT }}
          >
            1 USD = {exchangeRate.rate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {currency.code}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

        {/* Calculator */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">
            Calculator
          </p>
          <div className="flex items-stretch gap-3">
            {/* USD input */}
            <div
              className="flex flex-1 items-center gap-2 rounded-xl px-4 py-3"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="text-sm font-semibold text-white/40">USD</span>
              <span className="text-white/20">$</span>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent text-right text-lg font-bold text-white outline-none placeholder:text-white/20"
                placeholder="0"
              />
            </div>

            {/* Arrow */}
            <div className="flex items-center text-white/20 text-lg select-none">→</div>

            {/* Result */}
            <div
              className="flex flex-1 items-center justify-between gap-2 rounded-xl px-4 py-3"
              style={{ background: `${ACCENT}12`, border: `1px solid ${ACCENT}30` }}
            >
              <span className="text-sm font-semibold" style={{ color: `${ACCENT}99` }}>
                {currency.code}
              </span>
              <span className="text-lg font-bold" style={{ color: ACCENT }}>
                {currency.symbol}{formattedConverted}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
