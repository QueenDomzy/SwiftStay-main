import type { NextApiRequest, NextApiResponse } from "next";
import { openai } from "../../lib/ai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userPreferences } = req.body;

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a travel assistant." },
      { role: "user", content: `Suggest hotels based on these preferences: ${userPreferences}` }
    ],
  });

  res.status(200).json({ recommendations: response.data.choices[0].message?.content });
}
