import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { totalAmount } = useCart();
  const userEmail = localStorage.getItem("userEmail");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    // simple field validation
    for (const field in formData) {
      if (!formData[field]) {
        alert(`Please fill ${field}`);
        return;
      }
    }

    if (!totalAmount || totalAmount <= 0) {
      alert("❌ Invalid cart total. Please add products to your cart.");
      return;
    }

    setIsLoading(true);

    try {
      const amountString = totalAmount.toFixed(2);

      const res = await fetch("http://localhost:8080/Footwear_local/CheckoutServlet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          order_amount: amountString,
          customer_id: "cust001",
          customer_email: userEmail || "test@example.com",
          customer_phone: formData.phone,
          customer_name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        }),
      });

      const data = await res.json();
      console.log("Backend response:", res.status, data);

      if (!res.ok) {
        const msg = data?.message || data?.cashfree_response?.message || "Payment server error";
        throw new Error(msg);
      }

      const sessionId = data.payment_session_id;

      if (sessionId) {
        setTimeout(() => {
          if (window.Cashfree) {
            const cashfree = window.Cashfree({
              mode: "sandbox", // change to "production" when live
            });

            console.log("Using session ID to checkout:", sessionId);

            cashfree.checkout({
              paymentSessionId: sessionId,
              redirectTarget: "_self",
              returnUrl: "http://localhost:8080/Footwear_local/PaymentCallbackServlet?order_id={order_id}"
            }).then((result) => {
              if (result.error) alert("Error: " + result.error.message);
              if (result.redirect) console.log("Redirecting to payment page...");
            });

          } else {
            alert("Cashfree SDK not loaded. Please refresh the page.");
          }
        }, 500);
      } else {
        alert("❌ No payment session ID received. See console for details.");
        console.error("Unexpected payment response:", data);
      }

    } catch (err) {
      console.error("Checkout error:", err);
      alert("❌ Payment failed. Please try again. " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout}>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-success" disabled={isLoading}>
          {isLoading ? "Processing..." : `Pay ₹${totalAmount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
