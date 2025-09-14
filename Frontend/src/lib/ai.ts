import axios from "axios";

interface AIResponse {
  answer: string;
}

export async function askAI(prompt: string): Promise<AIResponse> {
  // Create an Axios instance or use directly
  const res = await axios.post("/ai/ask", { prompt });
  return res.data;
}
