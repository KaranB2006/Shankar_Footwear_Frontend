// src/pages/Payment.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Payment() {
  const { totalAmount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        // 🔗 Call your backend servlet running locally
        const res = await fetch("http://localhost:8080/Footwear_local/CreateOrderServlet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // send session cookie if any
          body: JSON.stringify({
            order_amount: totalAmount,
            order_currency: "INR",
          }),
        });

        const data = await res.json();

        if (!data || !data.order_token) {
          alert("❌ Failed to create Cashfree order.");
          return;
        }

        // ✅ Initialize Cashfree
        const cashfree = new window.Cashfree({ mode: "sandbox" }); // change to "production" later

        cashfree.checkout({
          orderToken: data.order_token,
          onSuccess: (resData) => {
            console.log("✅ Payment success:", resData);
            alert("Payment successful!");
            navigate("/order-success");
          },
          onFailure: (err) => {
            console.error("❌ Payment failed:", err);
            alert("Payment failed!");
          },
        });
      } catch (err) {
        console.error("Payment error:", err);
        alert("❌ Something went wrong during payment.");
      }
    };

    initiatePayment();
  }, [totalAmount, navigate]);

  return (
    <div className="container mt-5 text-center">
      <h3>Processing your payment...</h3>
    </div>
  );
}

export default Payment;
