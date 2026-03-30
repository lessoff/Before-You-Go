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
    <div className="space-y-4">
      {/* Country header */}
      <div
        className="animate-fade-in-up mb-8 overflow-hidden rounded-3xl p-8 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))",
          border: "1px solid rgba(99,102,241,0.3)",
        }}
      >
        <p className="text-7xl">{data.flag}</p>
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
          {data.country}
        </h2>
        <p className="mt-2 text-sm font-medium text-white/40 uppercase tracking-widest">
          {data.capital} &nbsp;·&nbsp; {data.region}
        </p>
      </div>

      <TimeSection timezone={data.time.timezone} delay={0} />
      <VisaSection destinationCountry={data.country} delay={60} />
      {data.bestMonths && data.bestMonths.length > 0 && (
        <BestMonthsSection bestMonths={data.bestMonths} delay={60} />
      )}
      {data.currency && data.exchangeRate && (
        <ExchangeRateSection
          currency={data.currency}
          exchangeRate={data.exchangeRate}
          delay={120}
        />
      )}
      <SafetySection safety={data.safety} delay={180} />
      <WeatherSection weather={data.weather} delay={120} />
      <LanguagesSection languages={data.languages} delay={180} />
      <PhrasesSection phrases={data.phrases} delay={240} />
      <CustomsSection customs={data.customs} delay={300} />
      <DishesSection dishes={data.dishes} delay={360} />
      <PowerSection power={data.power} delay={420} />
      <TransportSection transport={data.transport} delay={480} />
    </div>
  );
}
