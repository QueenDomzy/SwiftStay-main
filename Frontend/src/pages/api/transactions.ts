import type { NextApiRequest, NextApiResponse } from "next";

type Transaction = {
  id: string;
  method: string;
  amount: number;
};

let transactions: Transaction[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(transactions);
  } else if (req.method === "POST") {
    const { id, method, amount } = req.body;
    if (!id || !method || !amount) {
      return res.status(400).json({ error: "Missing fields" });
    }
    transactions.push({ id, method, amount });
    res.status(201).json({ message: "Transaction added" });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
