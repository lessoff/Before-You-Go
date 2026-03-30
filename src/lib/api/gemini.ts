import { GoogleGenAI } from "@google/genai";
import type { GeminiResponse } from "../types";

export async function fetchAIContent(
  country: string,
  capital: string,
  apiKey: string
): Promise<GeminiResponse> {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are a travel expert. For the country "${country}" (capital: "${capital}"), provide travel briefing information in JSON format.

Return a JSON object with these exact fields:
1. "safety": { "level": one of "low"/"moderate"/"high"/"extreme", "summary": 2-3 sentence safety summary for tourists, "tips": array of exactly 3 practical safety tips }
2. "phrases": array of exactly 5 helpful travel phrases in the most widely spoken local language. Each object has: "english", "local", "pronunciation"
3. "customs": array of exactly 5 local customs or taboos. Each object has: "title", "description", "type": "do" or "dont"
4. "dishes": array of exactly 5 must-try local dishes. Each object has: "name", "description"
5. "transport": array of 3-5 popular transport apps or services. Each object has: "name", "description", "type": "rideshare"|"transit"|"bike"|"other"`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  const raw = response.text ?? "";

  // Extract JSON robustly — strips any surrounding markdown or thinking text
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Gemini returned no JSON object");
  }
  const jsonStr = raw.slice(start, end + 1);

  const parsed = JSON.parse(jsonStr) as GeminiResponse;
  return parsed;
}
