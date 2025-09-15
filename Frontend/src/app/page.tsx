// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  roomNumber: string;
};

export default function HomePage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("https://swiftstay-main-h766.onrender.com/api/bookings"); // Replace with your backend URL
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data: Booking[] = await res.json();
        setBookings(data);
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
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gold-500">💼 SwiftStay Dashboard</h1>
        <nav className="space-x-4">
          <a href="#" className="text-blue-600 hover:underline">Home</a>
          <a href="#" className="text-green-600 hover:underline">Bookings</a>
          <a href="#" className="text-black hover:underline">Profile</a>
        </nav>
      </header>

      {loading && <p className="text-gray-500">Loading bookings...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <>
          {bookings.length === 0 ? (
            <p className="text-gray-600">No bookings found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <p className="font-semibold text-lg">{booking.guestName}</p>
                  <p><strong>Room:</strong> {booking.roomNumber}</p>
                  <p><strong>Check-in:</strong> {booking.checkIn}</p>
                  <p><strong>Check-out:</strong> {booking.checkOut}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <footer className="mt-12 text-center text-gray-500">
        &copy; {new Date().getFullYear()} SwiftStay Nigeria
      </footer>
    </div>
  );
}
