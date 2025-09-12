"use client";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Bell, PlusCircle, Calendar, Home, DollarSign, Bed } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

type Transaction = {
  id: string;
  method: string;
  amount: number;
};

export default function HotelOwnerDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then(res => res.json())
      .then(data => setTransactions(data));
  }, []);

  // Paystack Payment
  const handlePaystack = () => {
    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
      email: "customer@email.com",
      amount: 5000 * 100,
      currency: "NGN",
      callback: function(response: any) {
        fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: response.reference, method: "Paystack", amount: 5000 })
        }).then(() =>
          setTransactions(prev => [...prev, { id: response.reference, method: "Paystack", amount: 5000 }])
        );
      }
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
          body: JSON.stringify({ id: data.transaction_id, method: "Flutterwave", amount: 5000 })
        }).then(() =>
          setTransactions(prev => [...prev, { id: data.transaction_id, method: "Flutterwave", amount: 5000 }])
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 space-y-6">
      {/* Dashboard content here */}
    </div>
  );
    }
