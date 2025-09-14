// src/lib/ai.ts
import { api } from "./api";

export interface AIResponse {
  message: string;
}

export async function askAI(prompt: string): Promise<AIResponse> {
  const res = await api.post<AIResponse>("/ai/ask", { prompt });
  return res.data;
}
