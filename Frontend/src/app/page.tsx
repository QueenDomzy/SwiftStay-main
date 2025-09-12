// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Bell } from "lucide-react";

type Transaction = {
  id: string;
  method: string;
  amount: number;
};

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  // Paystack Payment
  const handlePaystack = () => {
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
      email: "customer@email.com",
      amount: 5000 * 100,
      currency: "NGN",
      callback: function (response: any) {
        fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: response.reference, method: "Paystack", amount: 5000 }),
        }).then(() =>
          setTransactions((prev) => [...prev, { id: response.reference, method: "Paystack", amount: 5000 }])
        );
      },
    });
    handler.openIframe();
  };

  // Flutterwave Payment
  const handleFlutterwave = () => {
    (window as any).FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY,
      tx_ref: Date.now(),
      amount: 5000,
      currency: "NGN",
      payment_options: "card,mobilemoney,ussd",
      customer: { email: "customer@email.com", name: "John Doe" },
      callback: (data: any) => {
        fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: data.transaction_id, method: "Flutterwave", amount: 5000 }),
        }).then(() =>
          setTransactions((prev) => [...prev, { id: data.transaction_id, method: "Flutterwave", amount: 5000 }])
        );
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gold">SwiftStay Dashboard</h1>
        <Button className="bg-[#141820] text-gold">
          <Bell />
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Bookings", value: "128" },
          { label: "Occupancy", value: "87%" },
          { label: "Revenue", value: "₦540k" },
          { label: "Pending Payouts", value: "₦72k" },
        ].map((kpi, idx) => (
          <Card key={idx} className="bg-[#141820] shadow-lg rounded-2xl">
            <CardContent>
              <p className="text-gray-400 text-sm">{kpi.label}</p>
              <h2 className="text-2xl font-bold text-gold">{kpi.value}</h2>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Buttons */}
      <div className="flex gap-4">
        <Button onClick={handlePaystack} className="flex-1 bg-green-600 text-white rounded-2xl shadow-lg">
          Pay with Paystack
        </Button>
        <Button onClick={handleFlutterwave} className="flex-1 bg-blue-600 text-white rounded-2xl shadow-lg">
          Pay with Flutterwave
        </Button>
      </div>

      {/* Transactions History */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-2">Transactions History</h2>
          {transactions.length === 0 ? (
            <p className="text-gray-400">No transactions yet.</p>
          ) : (
            <ul className="space-y-2">
              {transactions.map((txn, idx) => (
                <li key={idx} className="border p-2 rounded flex justify-between">
                  <span>{txn.method}</span>
                  <span>₦{txn.amount}</span>
                  <span className="text-xs text-gray-300">{txn.id}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
