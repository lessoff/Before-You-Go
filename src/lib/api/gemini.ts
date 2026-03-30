import Groq from "groq-sdk";
import type { GeminiResponse } from "../types";

export async function fetchAIContent(
  country: string,
  capital: string,
  apiKey: string
): Promise<GeminiResponse> {
  const groq = new Groq({ apiKey });

  const prompt = `You are a travel expert. For the country "${country}" (capital: "${capital}"), provide travel briefing information in JSON format.

Return a JSON object with these exact fields:
1. "bestMonths": array of 2-4 month names (e.g. ["June", "July", "August"]) that are the best months to visit this country based on weather, tourism season, and local events
2. "safety": { "level": one of "low"/"moderate"/"high"/"extreme", "summary": 2-3 sentence safety summary for tourists, "tips": array of exactly 3 practical safety tips }
3. "phrases": array of exactly 5 helpful travel phrases in the most widely spoken local language. Each object has: "english", "local", "pronunciation"
4. "customs": array of exactly 5 local customs or taboos. Each object has: "title", "description", "type": "do" or "dont"
5. "dishes": array of exactly 5 must-try local dishes. Each object has: "name", "description"
6. "transport": array of 3-5 popular transport apps or services. Each object has: "name", "description", "type": "rideshare"|"transit"|"bike"|"other"`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const raw = response.choices[0]?.message?.content ?? "";
  const parsed = JSON.parse(raw) as GeminiResponse;
  return parsed;
}
