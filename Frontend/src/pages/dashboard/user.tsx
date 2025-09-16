import { useState, useEffect } from 'react';

export default function UserDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch('/api/reservations?userId=1'); // replace 1 with auth user
      const data = await res.json();
      setBookings(data);
    };
    fetchBookings();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 && <p>No bookings found</p>}
      <div className="grid gap-3">
        {bookings.map(b => (
          <div key={b.id} className="border p-3 rounded">
            <p>Hotel ID: {b.hotelId}</p>
            <p>Room Type: {b.roomType}</p>
            <p>Check-In: {new Date(b.checkIn).toLocaleDateString()}</p>
            <p>Check-Out: {new Date(b.checkOut).toLocaleDateString()}</p>
            <p>Status: {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
    }
