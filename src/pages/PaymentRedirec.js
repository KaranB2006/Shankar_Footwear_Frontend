import React from "react";

export default function PaymentRedirect({ paymentUrl }) {
  if (!paymentUrl) {
    return <p>❌ No payment link available.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-bold mb-4">Proceed to Payment</h2>
      <a
        href={paymentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        💳 Click Here to Pay
      </a>
    </div>
  );
}
