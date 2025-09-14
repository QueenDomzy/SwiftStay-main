import { api } from "./api";

interface AIResponse {
  answer: string;
}

export async function askAI(prompt: string): Promise<AIResponse> {
  const res = await api.post<AIResponse>("/ai/ask", { prompt });
  return res.data;
}
