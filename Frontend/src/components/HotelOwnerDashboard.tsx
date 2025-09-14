"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { DollarSign, Bed, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function HotelOwnerDashboard() {
  const [activeRooms, setActiveRooms] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bookings, setBookings] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
  const [bookingTrend, setBookingTrend] = useState<any[]>([]);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsData, revenueData, bookingsData, transactionsData] = await Promise.all([
          fetch(`${API_BASE}/api/dashboard/active-rooms`).then(res => res.json()),
          fetch(`${API_BASE}/api/dashboard/revenue`).then(res => res.json()),
          fetch(`${API_BASE}/api/dashboard/bookings`).then(res => res.json()),
          fetch(`${API_BASE}/api/dashboard/transactions`).then(res => res.json())
        ]);

        setActiveRooms(roomsData.activeRooms);
        setTotalRevenue(revenueData.totalRevenue);
        setBookings(bookingsData.bookings);
        setTransactions(transactionsData.transactions);

        // Generate trend data (last 7 days)
        const today = new Date();
        const past7Days = Array.from({ length: 7 }).map((_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          return d;
        }).reverse();

        const revenueTrendData = past7Days.map(d => {
          const dayRevenue = transactionsData.transactions
            .filter(t => new Date(t.createdAt).toDateString() === d.toDateString())
            .reduce((sum, t) => sum + t.amount, 0);
          return { date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), revenue: dayRevenue };
        });

        const bookingTrendData = past7Days.map(d => {
          const dayBookings = bookingsData.bookings.filter(b => new Date(b.createdAt).toDateString() === d.toDateString()).length;
          return { date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), bookings: dayBookings };
        });

        setRevenueTrend(revenueTrendData);
        setBookingTrend(bookingTrendData);

      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 space-y-6">
      {/* Top summary cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-gray-800">
          <CardContent className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">Active Rooms</h2>
              <p className="text-2xl font-bold">{activeRooms}</p>
            </div>
            <Bed size={32} />
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardContent className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">Total Revenue</h2>
              <p className="text-2xl font-bold">₦{totalRevenue}</p>
            </div>
            <DollarSign size={32} />
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardContent className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">Recent Bookings</h2>
              <p className="text-2xl font-bold">{bookings.length}</p>
            </div>
            <Calendar size={32} />
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend */}
      <Card className="bg-gray-800 p-4">
        <h3 className="text-lg font-semibold mb-2">Revenue (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444"/>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Bookings Trend */}
      <Card className="bg-gray-800 p-4">
        <h3 className="text-lg font-semibold mb-2">Bookings (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={bookingTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444"/>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
    }
