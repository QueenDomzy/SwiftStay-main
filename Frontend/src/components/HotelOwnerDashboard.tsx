"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { DollarSign, Bed, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { saveAs } from "file-saver";
import { Parser } from "json2csv";

export default function HotelOwnerDashboard() {
  const [activeRooms, setActiveRooms] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [bookings, setBookings] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
  const [bookingTrend, setBookingTrend] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomsData, revenueData, bookingsData, transactionsData] =
          await Promise.all([
            fetch(`${API_BASE}/api/dashboard/active-rooms`).then(res => res.json()),
            fetch(`${API_BASE}/api/dashboard/revenue`).then(res => res.json()),
            fetch(`${API_BASE}/api/dashboard/bookings`).then(res => res.json()),
            fetch(`${API_BASE}/api/dashboard/transactions`).then(res => res.json())
          ]);

        setActiveRooms(roomsData.activeRooms);
        setTotalRevenue(revenueData.totalRevenue);
        setBookings(bookingsData.bookings);
        setTransactions(transactionsData.transactions);

        // Generate last 7 days trend
        const today = new Date();
        const past7Days = Array.from({ length: 7 }).map((_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          return d;
        }).reverse();

        const revenueTrendData = past7Days.map(d => ({
          date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          revenue: transactionsData.transactions
            .filter(t => new Date(t.createdAt).toDateString() === d.toDateString())
            .reduce((sum, t) => sum + t.amount, 0)
        }));

        const bookingTrendData = past7Days.map(d => ({
          date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          bookings: bookingsData.bookings
            .filter(b => new Date(b.createdAt).toDateString() === d.toDateString())
            .length
        }));

        setRevenueTrend(revenueTrendData);
        setBookingTrend(bookingTrendData);

      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const filterByDateRange = (data: any[]) => {
    if (!startDate || !endDate) return data;
    const start = new Date(startDate);
    const end = new Date(endDate);
    return data.filter(d => {
      const created = new Date(d.createdAt);
      return created >= start && created <= end;
    });
  };

  const exportBookingsCSV = () => {
    const filtered = filterByDateRange(bookings);
    if (!filtered.length) return;
    const parser = new Parser({ fields: ["id", "customerName", "room", "amount", "createdAt"] });
    const csv = parser.parse(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `bookings_${Date.now()}.csv`);
  };

  const exportTransactionsCSV = () => {
    const filtered = filterByDateRange(transactions);
    if (!filtered.length) return;
    const parser = new Parser({ fields: ["id", "method", "amount", "createdAt"] });
    const csv = parser.parse(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `transactions_${Date.now()}.csv`);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white p-6 space-y-6">
      {/* Top summary cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
          <CardContent className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">Active Rooms</h2>
              <p className="text-2xl font-bold">{activeRooms}</p>
            </div>
            <Bed size={32} />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
          <CardContent className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">Total Revenue</h2>
              <p className="text-2xl font-bold">₦{totalRevenue}</p>
            </div>
            <DollarSign size={32} />
          </CardContent>
        </Card>

        <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
          <CardContent className="flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-400">Recent Bookings</h2>
              <p className="text-2xl font-bold">{bookings.length}</p>
            </div>
            <Calendar size={32} />
          </CardContent>
        </Card>
      </div>

      {/* Date range filter */}
      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-gray-400 mb-1">Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                 className="px-2 py-1 rounded text-black"/>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                 className="px-2 py-1 rounded text-black"/>
        </div>
        <button onClick={exportBookingsCSV} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition">
          Export Bookings
        </button>
        <button onClick={exportTransactionsCSV} className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 transition">
          Export Transactions
        </button>
      </div>

      {/* Revenue Trend */}
      <Card className="bg-gray-800 p-4">
        <h3 className="text-lg font-semibold mb-2">Revenue (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={revenueTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444"/>
            <XAxis dataKey="date" stroke="#bbb"/>
            <YAxis stroke="#bbb"/>
            <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "6px", border: "none" }}
                     labelStyle={{ color: "#fff" }} itemStyle={{ color: "#fff" }}/>
            <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Bookings Trend */}
      <Card className="bg-gray-800 p-4">
        <h3 className="text-lg font-semibold mb-2">Bookings (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={bookingTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444"/>
            <XAxis dataKey="date" stroke="#bbb"/>
            <YAxis stroke="#bbb"/>
            <Tooltip contentStyle={{ backgroundColor: "#222", borderRadius: "6px", border: "none" }}
                     labelStyle={{ color: "#fff" }} itemStyle={{ color: "#fff" }}/>
            <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
