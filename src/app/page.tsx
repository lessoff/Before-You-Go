"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import BriefingList from "@/components/BriefingList";
import SectionSkeleton from "@/components/ui/SectionSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useBriefing } from "@/hooks/useBriefing";
import { useRecentCountries } from "@/hooks/useRecentCountries";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, loading, error, fetchBriefing } = useBriefing();
  const { recent, addRecent } = useRecentCountries();
  const lastQuery = useRef("");
  const [heroCollapsed, setHeroCollapsed] = useState(false);
  const initializedFromUrl = useRef(false);

  // On mount, load country from URL param
  useEffect(() => {
    if (initializedFromUrl.current) return;
    initializedFromUrl.current = true;
    const countryParam = searchParams.get("country");
    if (countryParam) {
      lastQuery.current = countryParam;
      fetchBriefing(countryParam);
      setHeroCollapsed(true);
    }
  }, [searchParams, fetchBriefing]);

  function handleSearch(country: string) {
    lastQuery.current = country;
    fetchBriefing(country);
    addRecent(country);
    if (!heroCollapsed) setHeroCollapsed(true);
    router.replace(`/?country=${encodeURIComponent(country)}`, { scroll: false });
  }

  function handleRetry() {
    if (lastQuery.current) fetchBriefing(lastQuery.current);
  }

  const initialCountry = searchParams.get("country") ?? undefined;

  return (
    <main className="min-h-screen">
      <ThemeToggle />

      {/* ── Hero / Search header ── */}
      <div
        style={{
          position: heroCollapsed ? "sticky" : "relative",
          top: "0px",
          zIndex: 30,
          borderBottom: heroCollapsed ? "1px solid var(--border)" : "none",
          backdropFilter: heroCollapsed ? "blur(16px)" : "none",
          background: heroCollapsed
            ? "var(--bg-header)"
            : "transparent",
          transition: "background 0.5s ease",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: heroCollapsed ? "0px" : "100vh",
          paddingBottom: heroCollapsed ? "0px" : "14vh",
        }}
      >
        <div className="mx-auto w-full max-w-2xl px-6">

          {/* Collapsing text block */}
          <div
            style={{
              maxHeight: heroCollapsed ? "0px" : "420px",
              opacity: heroCollapsed ? 0 : 1,
              overflow: "hidden",
              marginBottom: heroCollapsed ? "0" : "2.5rem",
              pointerEvents: heroCollapsed ? "none" : undefined,
              transition: [
                "max-height 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                "opacity 0.3s ease",
                "margin-bottom 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
              ].join(", "),
            }}
          >
            <p
              className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em]"
              style={{ color: "var(--accent)" }}
            >
              Travel Intelligence
            </p>
            <h1
              className="font-display text-5xl font-bold leading-none tracking-tight sm:text-7xl whitespace-nowrap"
              style={{ color: "var(--text-primary)" }}
            >
              Before You Go
            </h1>
            <p
              className="mt-5 text-lg font-light sm:text-xl"
              style={{ color: "var(--text-secondary)" }}
            >
              Stop Asking AI Many Questions.{" "}
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                Enter Your Destination Once.
              </span>
            </p>
            <p
              className="mt-3 text-[11px] tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Time &nbsp;·&nbsp; Visa &nbsp;·&nbsp; Safety &nbsp;·&nbsp; Weather
              &nbsp;·&nbsp; Phrases &nbsp;·&nbsp; Customs &nbsp;·&nbsp; Food &nbsp;·&nbsp; Power
            </p>
          </div>

          {/* Search bar — always visible */}
          <div
            style={{
              paddingTop: heroCollapsed ? "0.75rem" : "0",
              paddingBottom: heroCollapsed ? "0.75rem" : "0",
              transition: "padding 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <SearchBar onSearch={handleSearch} isLoading={loading} initialValue={initialCountry} recentCountries={recent} />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {loading && <SectionSkeleton />}

        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {data && !loading && <BriefingList data={data} />}

        {!data && !loading && !error && (
          <div className="mt-24 text-center">
            <div
              className="mx-auto mb-5 h-px w-12"
              style={{ background: "var(--accent)" }}
            />
            <p
              className="font-display text-xl font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Enter a destination above
            </p>
          </div>
        )}
      </div>

      <footer
        className="py-8 text-center text-[10px] tracking-widest uppercase"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}
      >
        REST Countries &nbsp;·&nbsp; OpenWeatherMap &nbsp;·&nbsp; Groq &nbsp;·&nbsp; Frankfurter
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
