export interface PublicHoliday {
  date: string;
  name: string;
  localName: string;
}

const cache = new Map<string, { value: PublicHoliday[]; expiresAt: number }>();
const TTL = 24 * 60 * 60 * 1000;

export async function fetchPublicHolidays(
  cca2: string,
  year: number
): Promise<PublicHoliday[]> {
  if (!cca2) return [];
  const key = `${cca2.toUpperCase()}-${year}`;
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expiresAt) return cached.value;

  const res = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/${cca2.toUpperCase()}`
  );
  if (!res.ok) return [];

  const data = (await res.json()) as Array<{
    date: string;
    name: string;
    localName: string;
  }>;

  const holidays: PublicHoliday[] = data.map((h) => ({
    date: h.date,
    name: h.name,
    localName: h.localName,
  }));

  cache.set(key, { value: holidays, expiresAt: Date.now() + TTL });
  return holidays;
}
