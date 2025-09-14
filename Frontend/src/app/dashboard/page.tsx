"use client";

import { useState, useEffect } from "react";
import { Bed, DollarSign, Calendar } from "lucide-react";

type Transaction = {
  id: string;
  method: string;
  amount: number;
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load transactions:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold">Hotel Owner Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-800 rounded-xl shadow-md flex items-center gap-4">
          <Bed className="w-8 h-8 text-blue-400" />
          <div>
            <p className="text-sm">Active Rooms</p>
            <p className="text-xl font-bold">24</p>
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl shadow-md flex items-center gap-4">
          <DollarSign className="w-8 h-8 text-green-400" />
          <div>
            <p className="text-sm">Total Revenue</p>
            <p className="text-xl font-bold">
              ₦
              {transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl shadow-md flex items-center gap-4">
          <Calendar className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="text-sm">Recent Bookings</p>
            <p className="text-xl font-bold">{transactions.length}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
        <div className="bg-gray-800 rounded-xl p-4 space-y-2">
          {loading ? (
            <p>Loading...</p>
          ) : transactions.length > 0 ? (
            transactions.map((t) => (
              <p key={t.id} className="flex justify-between">
                <span>{t.method}</span>
                <span>₦{t.amount.toLocaleString()}</span>
              </p>
            ))
          ) : (
            <p>No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
