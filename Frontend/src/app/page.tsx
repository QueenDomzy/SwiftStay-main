// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";

// Booking type matching backend
type Booking = {
  id: string;
  userId: string;
  roomId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

const DUMMY_BOOKINGS: Booking[] = [
  {
    id: "dummy1",
    userId: "user123",
    roomId: "101",
    startDate: "2025-09-15T00:00:00.000Z",
    endDate: "2025-09-17T00:00:00.000Z",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "dummy2",
    userId: "user456",
    roomId: "102",
    startDate: "2025-09-18T00:00:00.000Z",
    endDate: "2025-09-20T00:00:00.000Z",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function HomePage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("https://swiftstay-main.onrender.com/api/bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message);
        setBookings(DUMMY_BOOKINGS); // fallback to dummy bookings
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-500">💼 SwiftStay Dashboard</h1>
        <nav className="space-x-4">
          <a href="#" className="text-blue-600 hover:underline">Home</a>
          <a href="#" className="text-green-600 hover:underline">Bookings</a>
          <a href="#" className="text-black hover:underline">Profile</a>
        </nav>
      </header>

      {/* Content */}
      {loading && <p className="text-gray-500">Loading bookings...</p>}
      {error && <p className="text-red-600 mb-4">Error: {error}. Showing sample bookings.</p>}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow"
            >
              <p className="font-semibold text-lg">Booking ID: {b.id}</p>
              <p><strong>User ID:</strong> {b.userId}</p>
              <p><strong>Room ID:</strong> {b.roomId}</p>
              <p><strong>Check-in:</strong> {new Date(b.startDate).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(b.endDate).toLocaleDateString()}</p>
              <p className="text-gray-500 text-sm">
                Created: {new Date(b.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500">
        &copy; {new Date().getFullYear()} SwiftStay Nigeria
      </footer>
    </div>
  );
}
