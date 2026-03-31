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
  return (
    <div className="space-y-8">
      {/* Country header */}
      <div className="animate-fade-in-up pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
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

      <TimeSection timezone={data.time.timezone} delay={0} />
      <VisaSection destinationCountry={data.country} delay={60} />
      {data.bestMonths && data.bestMonths.length > 0 && (
        <BestMonthsSection bestMonths={data.bestMonths} delay={120} />
      )}
      {data.currency && data.exchangeRate && (
        <ExchangeRateSection
          currency={data.currency}
          exchangeRate={data.exchangeRate}
          delay={180}
        />
      )}
      <SafetySection safety={data.safety} delay={240} />
      <WeatherSection weather={data.weather} delay={300} />
      <LanguagesSection languages={data.languages} delay={360} />
      <PhrasesSection phrases={data.phrases} delay={420} />
      <TransportSection transport={data.transport} delay={480} />
      <CustomsSection customs={data.customs} delay={540} />
      <DishesSection dishes={data.dishes} delay={600} />
      <PowerSection power={data.power} delay={660} />
    </div>
  );
}
