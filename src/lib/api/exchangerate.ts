// Uses frankfurter.app — free, no API key required
export async function fetchExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<number | null> {
  if (fromCurrency === toCurrency) return 1;

  try {
    // Exchange rates update once daily — cache for 1 hour
    const res = await fetch(
      `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data.rates as Record<string, number>)[toCurrency] ?? null;
  } catch {
    return null;
  }
}
