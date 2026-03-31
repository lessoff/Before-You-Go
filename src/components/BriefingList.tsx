import type { BriefingResponse } from "@/lib/types";
import TimeSection from "@/components/sections/TimeSection";
import SafetySection from "@/components/sections/SafetySection";
import WeatherSection from "@/components/sections/WeatherSection";
import LanguagesSection from "@/components/sections/LanguagesSection";
import PhrasesSection from "@/components/sections/PhrasesSection";
import CustomsSection from "@/components/sections/CustomsSection";
import DishesSection from "@/components/sections/DishesSection";
import PowerSection from "@/components/sections/PowerSection";
import TransportSection from "@/components/sections/TransportSection";
import BestMonthsSection from "@/components/sections/BestMonthsSection";
import ExchangeRateSection from "@/components/sections/ExchangeRateSection";
import VisaSection from "@/components/sections/VisaSection";

interface BriefingListProps {
  data: BriefingResponse;
}

export default function BriefingList({ data }: BriefingListProps) {
  const hasBestMonths = data.bestMonths && data.bestMonths.length > 0;
  const hasExchange = data.currency && data.exchangeRate;

  return (
    <div className="space-y-4">
      {/* Country header */}
      <div className="animate-fade-in-up pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-6">
          <span className="text-6xl leading-none">{data.flag}</span>
          <div>
            <h2
              className="font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl"
              style={{ color: "var(--text-primary)" }}
            >
              {data.country}
            </h2>
            <p
              className="mt-2 text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              {data.capital} &nbsp;·&nbsp; {data.region}
            </p>
          </div>
        </div>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

        {/* Row 1: Time (1) + Visa (2) + Exchange (1) */}
        <div className="lg:col-span-1">
          <TimeSection timezone={data.time.timezone} delay={0} />
        </div>
        <div className="lg:col-span-2">
          <VisaSection destinationCountry={data.country} delay={60} />
        </div>
        {hasExchange ? (
          <div className="lg:col-span-1">
            <ExchangeRateSection
              currency={data.currency!}
              exchangeRate={data.exchangeRate!}
              delay={120}
            />
          </div>
        ) : (
          <div className="hidden lg:block lg:col-span-1" />
        )}

        {/* Row 2: Languages (1) + Safety (2) + BestMonths (1) */}
        <div className="lg:col-span-1">
          <LanguagesSection languages={data.languages} delay={180} />
        </div>
        <div className="lg:col-span-2">
          <SafetySection safety={data.safety} delay={240} />
        </div>
        {hasBestMonths ? (
          <div className="lg:col-span-1">
            <BestMonthsSection bestMonths={data.bestMonths!} delay={300} />
          </div>
        ) : (
          <div className="hidden lg:block lg:col-span-1" />
        )}

        {/* Row 3: Weather (full width) */}
        <div className="lg:col-span-4">
          <WeatherSection weather={data.weather} delay={360} />
        </div>

        {/* Row 4: Phrases (2) + Transport (2) */}
        <div className="lg:col-span-2">
          <PhrasesSection phrases={data.phrases} delay={420} />
        </div>
        <div className="lg:col-span-2">
          <TransportSection transport={data.transport} delay={480} />
        </div>

        {/* Row 5: Customs (full width) */}
        <div className="lg:col-span-4">
          <CustomsSection customs={data.customs} delay={540} />
        </div>

        {/* Row 6: Dishes (3) + Power (1) */}
        <div className="lg:col-span-3">
          <DishesSection dishes={data.dishes} delay={600} />
        </div>
        <div className="lg:col-span-1">
          <PowerSection power={data.power} delay={660} />
        </div>

      </div>
    </div>
  );
}
