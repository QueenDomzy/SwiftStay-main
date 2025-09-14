import { api } from "./api";

export async function askAI(prompt: string): Promise<AIResponse> {
  const res = await api.post("/ai/ask", { prompt });
  return res.data;
}
