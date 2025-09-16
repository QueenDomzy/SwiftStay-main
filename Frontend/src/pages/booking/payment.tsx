import { useState } from 'react';

export default function Payment({ reservationId, amount }: { reservationId: number, amount: number }) {
  const [message, setMessage] = useState('');

  const handlePay = async () => {
    // Initiate payment
    const res = await fetch('/api/payments/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reservationId, amount }),
    });
    const data = await res.json();
    if (!data.paystackUrl) {
      setMessage('Error initiating payment.');
      return;
    }

    // Open Paystack checkout in new window
    window.open(data.paystackUrl, '_blank');

    // Optional: After payment, call verify endpoint
    // In production, you would use webhook for auto verification
    setMessage('Payment in progress. Refresh after completion.');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Complete Payment</h1>
      <p>Amount: ₦{amount}</p>
      <button onClick={handlePay} className="bg-green-600 text-white p-2 rounded mt-4">Pay Now</button>
      {message && <p className="mt-3 text-red-600">{message}</p>}
    </div>
  );
    }
