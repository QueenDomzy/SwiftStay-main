import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Booking() {
  const router = useRouter();
  const { hotelId } = router.query;
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState('Single');
  const [message, setMessage] = useState('');

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      setMessage('Select check-in and check-out dates');
      return;
    }

    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1, // hardcoded for now, replace with auth user later
        hotelId,
        roomType,
        checkIn,
        checkOut,
        totalPrice: 5000, // placeholder, calculate based on hotel price
      }),
    });
    const data = await res.json();
    if (data.error) setMessage(data.error);
    else setMessage('Booking created successfully!');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Book Hotel</h1>
      <div className="flex flex-col gap-3">
        <label>Check-In:</label>
        <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className="border p-2"/>
        <label>Check-Out:</label>
        <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className="border p-2"/>
        <label>Room Type:</label>
        <select value={roomType} onChange={e => setRoomType(e.target.value)} className="border p-2">
          <option>Single</option>
          <option>Double</option>
          <option>Suite</option>
        </select>
        <button onClick={handleBooking} className="bg-blue-600 text-white p-2 rounded">Book Now</button>
      </div>
      {message && <p className="mt-3 text-red-600">{message}</p>}
    </div>
  );
}
