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

1. "safety": An object with:
   - "level": one of "low", "moderate", "high", "extreme" (risk level for tourists)
   - "summary": 2-3 sentence safety summary for tourists
   - "tips": array of exactly 3 practical safety tips

2. "phrases": Array of exactly 5 helpful travel phrases in the most widely spoken local language. Each object has:
   - "english": the English phrase
   - "local": the translation in the local language
   - "pronunciation": phonetic pronunciation guide

3. "customs": Array of exactly 5 important local customs or taboos. Each object has:
   - "title": short title
   - "description": one sentence description
   - "type": either "do" (positive custom to follow) or "dont" (taboo to avoid)

4. "dishes": Array of exactly 5 must-try local dishes. Each object has:
   - "name": dish name
   - "description": one sentence description

5. "transport": Array of 3-5 popular transport apps/services used locally. Each object has:
   - "name": app or service name
   - "description": short description
   - "type": one of "rideshare", "transit", "bike", "other"`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  const parsed = JSON.parse(text) as GeminiResponse;
  return parsed;
}
