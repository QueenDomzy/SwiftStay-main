import { useState, useEffect } from 'react';

export default function HotelDashboard({ hotelId }: { hotelId: number }) {
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const res = await fetch(`/api/reservations/hotel/${hotelId}`);
      const data = await res.json();
      setReservations(data);
    };
    fetchReservations();
  }, [hotelId]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Hotel Reservations</h1>
      {reservations.length === 0 && <p>No reservations found</p>}
      <div className="grid gap-3">
        {reservations.map(r => (
          <div key={r.id} className="border p-3 rounded">
            <p>User ID: {r.userId}</p>
            <p>Room Type: {r.roomType}</p>
            <p>Check-In: {new Date(r.checkIn).toLocaleDateString()}</p>
            <p>Check-Out: {new Date(r.checkOut).toLocaleDateString()}</p>
            <p>Status: {r.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
        }
