import { useState, useEffect } from 'react';

export default function HotelDashboard({ hotelId }: { hotelId: number }) {
  const [availability, setAvailability] = useState({ Single: true, Double: true, Suite: true });

  const toggleAvailability = async (roomType: string) => {
    const newStatus = !availability[roomType];
    const res = await fetch(`/api/hotels/${hotelId}/availability`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomType, available: newStatus }),
    });
    if (res.ok) setAvailability({ ...availability, [roomType]: newStatus });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Hotel Dashboard</h1>
      {Object.keys(availability).map(roomType => (
        <div key={roomType} className="flex justify-between items-center mb-2">
          <span>{roomType} Room</span>
          <button
            onClick={() => toggleAvailability(roomType)}
            className={`p-2 rounded ${availability[roomType] ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
          >
            {availability[roomType] ? 'Available' : 'Unavailable'}
          </button>
        </div>
      ))}
    </div>
  );
    }
