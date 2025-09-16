import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Confirmation() {
  const router = useRouter();
  const { reference } = router.query;
  const [status, setStatus] = useState('Checking payment...');

  useEffect(() => {
    if (!reference) return;

    const verifyPayment = async () => {
      const res = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();
      setStatus(data.success ? 'Booking Confirmed! Check your email.' : `Payment Failed: ${data.message}`);
    };

    verifyPayment();
  }, [reference]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Booking Status</h1>
      <p>{status}</p>
    </div>
  );
    }
