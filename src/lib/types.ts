import { z } from "zod";
import {
  briefingResponseSchema,
  geminiResponseSchema,
} from "./schemas";

export type BriefingResponse = z.infer<typeof briefingResponseSchema>;
export type GeminiResponse = z.infer<typeof geminiResponseSchema>;
