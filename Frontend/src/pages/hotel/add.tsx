import { useState } from 'react';

export default function AddHotel() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [roomType, setRoomType] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !location || !price || !roomType) {
      setMessage('Please fill all required fields.');
      return;
    }

    try {
      const res = await fetch('/api/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, price, roomType, photos, ownerId: 1 }),
      });
      const data = await res.json();
      if (data.error) setMessage(data.error);
      else setMessage('Hotel listing created successfully!');
    } catch (err) {
      setMessage('Error creating hotel.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add Hotel</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Hotel Name" value={name} onChange={e => setName(e.target.value)} className="border p-2"/>
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="border p-2"/>
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="border p-2"/>
        <input type="text" placeholder="Room Type" value={roomType} onChange={e => setRoomType(e.target.value)} className="border p-2"/>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Hotel</button>
      </form>
      {message && <p className="mt-3 text-red-600">{message}</p>}
    </div>
  );
         }
