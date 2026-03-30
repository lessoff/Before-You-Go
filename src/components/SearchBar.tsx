"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (country: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) onSearch(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-lg">
      <div
        className="flex items-center gap-3 rounded-2xl p-1.5"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 40px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <span className="pl-3 text-white/30">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Country name, e.g. Japan..."
          disabled={isLoading}
          className="flex-1 bg-transparent py-3 text-base text-white outline-none placeholder:text-white/30"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            background: isLoading ? "rgba(99,102,241,0.6)" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 0 20px rgba(99,102,241,0.4)",
          }}
        >
          {isLoading ? (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            "Search"
          )}
        </button>
      </div>
    </form>
  );
}
