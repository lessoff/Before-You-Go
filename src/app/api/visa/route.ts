import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get("from");
  const to = request.nextUrl.searchParams.get("to");

  if (!from || !to) {
    return NextResponse.json({ error: "Missing from or to parameter" }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Groq API key not configured" }, { status: 500 });
  }

  const groq = new Groq({ apiKey });

  const prompt = `You are a travel visa expert. A citizen of "${from}" wants to visit "${to}".

Return a JSON object with these exact fields:
- "type": one of "visa_free" | "visa_on_arrival" | "e_visa" | "visa_required"
- "duration": the maximum stay allowed as a string (e.g. "90 days", "30 days") or null if visa is required and duration depends on visa type
- "notes": one concise sentence with any important condition (e.g. passport validity requirement, bilateral agreement note, or application link hint). Keep it under 100 characters.

Base your answer on well-known visa policies as of 2024. If the passport country is not recognized or the information is genuinely uncertain, set type to "visa_required" and explain briefly in notes.`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const raw = response.choices[0]?.message?.content ?? "";
    const result = JSON.parse(raw);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Groq request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
