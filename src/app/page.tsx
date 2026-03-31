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
      <div
        className="relative pb-16 pt-20 text-center"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <p
            className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            Travel Intelligence
          </p>
          <h1
            className="font-display text-6xl font-semibold leading-none tracking-tight sm:text-8xl"
            style={{ color: "var(--text-primary)" }}
          >
            Before You Go
          </h1>
          <p
            className="mt-5 text-lg font-light sm:text-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Stop Asking AI Many Questions. Enter Your Destination Once.
          </p>
          <p
            className="mt-2 text-xs tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Time &nbsp;·&nbsp; Visa &nbsp;·&nbsp; Safety &nbsp;·&nbsp; Weather &nbsp;·&nbsp; Phrases &nbsp;·&nbsp; Customs &nbsp;·&nbsp; Food &nbsp;·&nbsp; Power
          </p>
          <div className="mt-10">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        {loading && <SectionSkeleton />}

        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {data && !loading && <BriefingList data={data} />}

        {!data && !loading && !error && (
          <div className="mt-24 text-center">
            <div
              className="mx-auto mb-6 h-px w-16"
              style={{ background: "var(--accent)" }}
            />
            <p
              className="font-display text-2xl font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Enter a destination above
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Your full travel briefing appears here
            </p>
          </div>
        )}
      </div>

      <footer
        className="py-8 text-center text-xs tracking-widest uppercase"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}
      >
        REST Countries &nbsp;·&nbsp; OpenWeatherMap &nbsp;·&nbsp; Groq &nbsp;·&nbsp; Frankfurter
      </footer>
    </main>
  );
}
