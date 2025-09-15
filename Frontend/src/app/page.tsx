// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";

// Type for a booking (matches backend data)
type Booking = {
  id: string;
  userId: string;
  roomId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

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
        setBookings(data.bookings || []); // note the .bookings here
      } catch (err: any) {
        setError(err.message);
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
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings found.</p>
          ) : (
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
        </>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500">
        &copy; {new Date().getFullYear()} SwiftStay Nigeria
      </footer>
    </div>
  );
}
