"use client";

import SearchBar from "@/components/SearchBar";
import BriefingList from "@/components/BriefingList";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useBriefing } from "@/hooks/useBriefing";
import { useRef } from "react";

export default function Home() {
  const { data, loading, error, fetchBriefing } = useBriefing();
  const lastQuery = useRef("");

  function handleSearch(country: string) {
    lastQuery.current = country;
    fetchBriefing(country);
  }

  function handleRetry() {
    if (lastQuery.current) fetchBriefing(lastQuery.current);
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="relative border-b border-white/5 pb-12 pt-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm">
            ✈️ &nbsp; Your travel briefing, instantly
          </div>
          <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            Before You Go
          </h1>
          <p className="mt-4 text-xl font-semibold text-white/80 sm:text-2xl">
            Stop Asking AI Many Questions.{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #6366f1, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Enter Your Destination Once.
            </span>
          </p>
          <p className="mt-3 text-sm text-white/30">
            Local time · Safety · Weather · Phrases · Customs · Food · Power · Transport
          </p>
          <div className="mt-10">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        {loading && <SectionSkeleton />}

        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {data && !loading && <BriefingList data={data} />}

        {!data && !loading && !error && (
          <div className="mt-20 text-center">
            <p className="text-7xl opacity-20">🌍</p>
            <p className="mt-5 text-base text-white/30">
              Enter a country above to see your full travel briefing
            </p>
          </div>
        )}
      </div>

      <footer className="border-t border-white/5 py-6 text-center text-xs text-white/20">
        Powered by REST Countries · OpenWeatherMap · Google Gemini
      </footer>
    </main>
  );
}
