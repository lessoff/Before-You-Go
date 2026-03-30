import { z } from "zod";

export const geminiResponseSchema = z.object({
  bestMonths: z.array(z.string()),
  safety: z.object({
    level: z.enum(["low", "moderate", "high", "extreme"]),
    summary: z.string(),
    tips: z.array(z.string()),
  }),
  phrases: z.array(
    z.object({
      english: z.string(),
      local: z.string(),
      pronunciation: z.string(),
    })
  ),
  customs: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      type: z.enum(["do", "dont"]),
    })
  ),
  dishes: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    })
  ),
  transport: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      type: z.enum(["rideshare", "transit", "bike", "other"]),
    })
  ),
});

export const weatherCurrentSchema = z.object({
  temp: z.number(),
  description: z.string(),
  icon: z.string(),
});

export const weatherForecastDaySchema = z.object({
  date: z.string(),
  tempMin: z.number(),
  tempMax: z.number(),
  description: z.string(),
  icon: z.string(),
});

export const currencySchema = z.object({
  code: z.string(),
  name: z.string(),
  symbol: z.string(),
});

export const exchangeRateSchema = z.object({
  from: z.string(),
  to: z.string(),
  rate: z.number(),
});

export const briefingResponseSchema = z.object({
  country: z.string(),
  capital: z.string(),
  region: z.string(),
  flag: z.string(),
  time: z.object({
    timezone: z.string(),
    utcOffset: z.string(),
  }),
  safety: z
    .object({
      level: z.enum(["low", "moderate", "high", "extreme"]),
      summary: z.string(),
      tips: z.array(z.string()),
    })
    .nullable(),
  weather: z
    .object({
      current: weatherCurrentSchema,
      forecast: z.array(weatherForecastDaySchema),
    })
    .nullable(),
  languages: z.array(z.object({ code: z.string(), name: z.string() })),
  phrases: z
    .array(
      z.object({
        english: z.string(),
        local: z.string(),
        pronunciation: z.string(),
      })
    )
    .nullable(),
  customs: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        type: z.enum(["do", "dont"]),
      })
    )
    .nullable(),
  dishes: z
    .array(z.object({ name: z.string(), description: z.string() }))
    .nullable(),
  currency: currencySchema.nullable(),
  exchangeRate: exchangeRateSchema.nullable(),
  power: z.object({
    plugTypes: z.array(z.string()),
    voltage: z.string(),
    frequency: z.string(),
  }),
  transport: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        type: z.enum(["rideshare", "transit", "bike", "other"]),
      })
    )
    .nullable(),
  bestMonths: z.array(z.string()).nullable(),
});
