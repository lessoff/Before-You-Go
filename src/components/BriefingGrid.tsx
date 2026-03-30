import type { BriefingResponse } from "@/lib/types";
import TimeCard from "@/components/cards/TimeCard";
import SafetyCard from "@/components/cards/SafetyCard";
import WeatherCard from "@/components/cards/WeatherCard";
import LanguagesCard from "@/components/cards/LanguagesCard";
import PhrasesCard from "@/components/cards/PhrasesCard";
import CustomsCard from "@/components/cards/CustomsCard";
import DishesCard from "@/components/cards/DishesCard";
import PowerCard from "@/components/cards/PowerCard";
import TransportCard from "@/components/cards/TransportCard";
import BestMonthsCard from "@/components/cards/BestMonthsCard";
import ExchangeRateCard from "@/components/cards/ExchangeRateCard";

interface BriefingGridProps {
  data: BriefingResponse;
}

export default function BriefingGrid({ data }: BriefingGridProps) {
  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {data.flag} {data.country}
        </h2>
        <p className="mt-1 text-gray-500">
          {data.capital} · {data.region}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <TimeCard
          timezone={data.time.timezone}
          utcOffset={data.time.utcOffset}
          delay={0}
        />
        {data.bestMonths && data.bestMonths.length > 0 && (
          <BestMonthsCard bestMonths={data.bestMonths} delay={50} />
        )}
        {data.currency && data.exchangeRate && (
          <ExchangeRateCard
            currency={data.currency}
            exchangeRate={data.exchangeRate}
            delay={100}
          />
        )}
        <SafetyCard safety={data.safety} delay={150} />
        <WeatherCard weather={data.weather} delay={100} />
        <LanguagesCard languages={data.languages} delay={150} />
        <PhrasesCard phrases={data.phrases} delay={200} />
        <CustomsCard customs={data.customs} delay={250} />
        <DishesCard dishes={data.dishes} delay={300} />
        <PowerCard power={data.power} delay={350} />
        <TransportCard transport={data.transport} delay={400} />
      </div>
    </div>
  );
}
