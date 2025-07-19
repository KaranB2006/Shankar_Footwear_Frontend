// src/pages/Checkout.js
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";

function Checkout() {
  const navigate = useNavigate();
  const { totalAmount } = useCart();
  const userEmail = localStorage.getItem("userEmail");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    pin: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      if (!val.trim()) newErrors[key] = `${key} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    try {
      const res = await fetch("https://shankar-footwear.onrender.com/CheckoutServlet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      })
      .then(res => res.json())
  .then(data => {
    console.log("Cashfree order:", data);
  })
  .catch(err=>{
    console.log("error" , err);
    
  });

      const data = await res.json();

      if (!data || !data.id) {
        alert("❌ Something went wrong during payment.");
        return;
      }

      const options = {
        key: "rzp_test_4MtRTOydSnRadF", // Replace with your Razorpay Test key
        amount: data.amount,
        currency: "INR",
        name: "Footwear Store",
        description: "Payment",
        order_id: data.id,
        handler: function (response) {
          alert("✅ Payment Successful! Payment ID: " + response.razorpay_payment_id);
          navigate("/order-history"); // Redirect after payment
        },
        prefill: {
          name: formData.name,
          email: userEmail,
          contact: formData.phone,
        },
        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log("Payment error:", err);
      alert("❌ Something went wrong during payment.");
    }
  };

  return (
    <div className="container mt-5">
      <Helmet>
                    <title>Checkout</title>
            </Helmet>
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
        🧾 Checkout
      </motion.h2>

      <div className="row">
        <motion.div className="col-md-6" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <h4>Shipping Information</h4>
          <form onSubmit={handleCheckout}>
            {["name", "address", "city", "pin", "phone"].map((field) => (
              <div className="mb-3" key={field}>
                <label className="form-label text-capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                  value={formData[field]}
                  onChange={handleChange}
                />
                {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
              </div>
            ))}
            <button type="submit" className="btn btn-success">
              Pay with Cashfree
            </button>
          </form>
        </motion.div>

        <motion.div className="col-md-6" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
          <h4>Order Summary</h4>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>₹{totalAmount}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Shipping</span>
              <strong>₹0</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total</span>
              <strong>₹{totalAmount}</strong>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default Checkout;
