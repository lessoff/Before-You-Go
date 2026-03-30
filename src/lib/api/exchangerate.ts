// Uses frankfurter.app — free, no API key required
export async function fetchExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<number | null> {
  if (fromCurrency === toCurrency) return 1;

  try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data.rates as Record<string, number>)[toCurrency] ?? null;
  } catch {
    return null;
  }
}
