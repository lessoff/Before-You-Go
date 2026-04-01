export interface CountryData {
  name: string;
  capital: string;
  region: string;
  flag: string;
  languages: { code: string; name: string }[];
  timezones: string[];
  cca2: string;
  currency: { code: string; name: string; symbol: string } | null;
}

export async function fetchCountryData(
  country: string
): Promise<CountryData> {
  // Try exact match first, then partial
  // Country metadata is stable — cache for 24 hours
  let res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`,
      { next: { revalidate: 86400 } }
    );
  }

  if (!res.ok) {
    throw new Error(`Country not found: ${country}`);
  }

  const data = await res.json();
  const c = data[0];

  const languages = c.languages
    ? Object.entries(c.languages).map(([code, name]) => ({
        code,
        name: name as string,
      }))
    : [];

  let currency: { code: string; name: string; symbol: string } | null = null;
  if (c.currencies) {
    const [code, info] = Object.entries(c.currencies)[0] as [string, { name: string; symbol: string }];
    currency = { code, name: info.name, symbol: info.symbol ?? code };
  }

  return {
    name: c.name.common,
    capital: c.capital?.[0] ?? "Unknown",
    region: c.region ?? "Unknown",
    flag: c.flag ?? "",
    languages,
    timezones: c.timezones ?? [],
    cca2: c.cca2 ?? "",
    currency,
  };
}
