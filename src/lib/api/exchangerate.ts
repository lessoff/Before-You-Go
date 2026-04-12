// Uses fawazahmed0/currency-api via jsDelivr CDN — free, no API key, 295+ currencies
export async function fetchExchangeRate(
  fromCurrency: string,
  toCurrency: string
): Promise<number | null> {
  if (fromCurrency === toCurrency) return 1;

  const from = fromCurrency.toLowerCase();
  const to = toCurrency.toLowerCase();

  try {
    // Exchange rates update daily — cache for 6 hours
    const res = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.min.json`,
      { next: { revalidate: 21600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data[from] as Record<string, number>)[to] ?? null;
  } catch {
    return null;
  }
}
