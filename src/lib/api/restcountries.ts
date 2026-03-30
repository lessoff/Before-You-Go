export interface CountryData {
  name: string;
  capital: string;
  region: string;
  flag: string;
  languages: { code: string; name: string }[];
  timezones: string[];
  cca2: string;
}

export async function fetchCountryData(
  country: string
): Promise<CountryData> {
  // Try exact match first, then partial
  let res = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`
  );

  if (!res.ok) {
    res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`
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

  return {
    name: c.name.common,
    capital: c.capital?.[0] ?? "Unknown",
    region: c.region ?? "Unknown",
    flag: c.flag ?? "",
    languages,
    timezones: c.timezones ?? [],
    cca2: c.cca2 ?? "",
  };
}
