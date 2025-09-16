import { useState, useEffect } from 'react';

export default function Search() {
  const [location, setLocation] = useState('');
  const [hotels, setHotels] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!location) return;
    const res = await fetch(`/api/hotels?location=${location}`);
    const data = await res.json();
    setHotels(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Search Hotels</h1>
      <div className="flex gap-2 mb-4">
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="border p-2 flex-1"/>
        <button onClick={handleSearch} className="bg-blue-600 text-white p-2 rounded">Search</button>
      </div>

      {hotels.length === 0 && <p>{message || 'No hotels found'}</p>}

      <div className="grid gap-4">
        {hotels.map(hotel => (
          <div key={hotel.id} className="border p-3 rounded">
            <h2 className="font-bold">{hotel.name}</h2>
            <p>{hotel.location}</p>
            <p>Price: ₦{hotel.price}</p>
            <button onClick={() => window.location.href=`/booking?hotelId=${hotel.id}`} className="mt-2 bg-green-600 text-white p-1 rounded">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
    }
