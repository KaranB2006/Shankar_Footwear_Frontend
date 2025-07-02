import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Payment() {
  const { totalAmount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        // Fetch Razorpay order from backend servlet
        const res = await fetch("http://localhost:8080/footwear/CreateOrderServlet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount,
            currency: "INR",
          }),
        });

        const data = await res.json();
        if (!data || !data.id) {
           alert("❌ Failed to create Razorpay order.");
          return;
        }

        const options = {
          key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Test Key
          amount: data.amount,
          currency: data.currency,
          name: "Footwear Store",
          description: "Order Payment",
          order_id: data.id,
          handler: function (response) {
            alert("✅ Payment successful!");
            navigate("/order-success"); // or order-history
          },
          prefill: {
            name: localStorage.getItem("username") || "Customer",
            email: localStorage.getItem("userEmail") || "example@example.com",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      } catch (err) {
        console.error("Payment error:", err);
        console.log("❌ Something went wrong during payment.");
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
