"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";

interface ExchangeRateCardProps {
  currency: { code: string; name: string; symbol: string };
  exchangeRate: { from: string; to: string; rate: number };
  delay?: number;
}

export default function ExchangeRateCard({ currency, exchangeRate, delay }: ExchangeRateCardProps) {
  const [amount, setAmount] = useState("100");

  const parsed = parseFloat(amount);
  const converted = !isNaN(parsed) && parsed >= 0 ? parsed * exchangeRate.rate : null;

  const formattedConverted =
    converted !== null
      ? converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : "—";

  return (
    <Card icon="💱" title="Exchange Rate" delay={delay}>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          1 USD ={" "}
          <span className="font-semibold text-gray-900">
            {exchangeRate.rate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}{" "}
            {currency.code}
          </span>{" "}
          <span className="text-gray-400">({currency.name})</span>
        </p>

        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
            <span className="text-xs text-gray-400">USD $</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent text-right text-base font-bold text-gray-900 outline-none"
              placeholder="0"
            />
          </div>
          <span className="text-gray-400">→</span>
          <div className="flex flex-1 items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
            <span className="text-xs text-amber-500">{currency.code}</span>
            <span className="text-base font-bold text-amber-700">
              {currency.symbol}{formattedConverted}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
