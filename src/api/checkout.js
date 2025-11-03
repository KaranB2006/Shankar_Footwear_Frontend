// src/pages/Checkout.js
import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
    const { totalAmount } = useCart();
    const userEmail = localStorage.getItem("userEmail") || "test@example.com"; 

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    // --- LOCAL CONFIGURATION ---
    const BACKEND_URL = "http://localhost:8080/Footwear_local/CheckoutServlet";
    const FRONTEND_BASE_URL = "http://localhost:3000"; 
    // ---------------------------

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone) {
            alert("Please fill all fields!");
            return;
        }

        if (!totalAmount || totalAmount <= 0) {
            alert("❌ Invalid cart total. Please add products to your cart.");
            return;
        }

        setIsLoading(true);

        try {
            const amountString = totalAmount.toFixed(2);

            // 1. Call the Local Backend Servlet
            const res = await fetch(BACKEND_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    order_amount: amountString,
                    customer_id: "cust001",
                    customer_email: userEmail,
                    customer_phone: formData.phone,
                }),
            });

            const data = await res.json();
            console.log("Backend response:", res.status, data);

            if (!res.ok) {
                const msg = data?.message || data?.cashfree_response?.message || "Payment server error";
                throw new Error(msg);
            }

            // 2. Extract the CORRECT Session ID
            const sessionId = data.payment_session_id;

            if (sessionId) {
                // *************************************************************
                // CRITICAL FIX: Wrap SDK launch in setTimeout to ensure script is ready
                // *************************************************************
                
                setTimeout(() => {
                    if (window.Cashfree && typeof window.Cashfree.initialize === 'function') {
                        
                        console.log("Launching Cashfree Payment with Session ID:", sessionId);
                        
                        // Initialize with sandbox mode (Must match Java Servlet's USE_SANDBOX = true)
                        const cashfree = window.Cashfree.initialize({ mode: "sandbox" }); 
                        
                        // Return URL points to your local frontend payment status page
                        const returnUrl = `${FRONTEND_BASE_URL}/payment-status?order_id={order_id}&order_token={order_token}`;

                        cashfree.initiatePayment({
                            session: sessionId,
                            returnUrl: returnUrl,
                            
                            onSuccess: (successData) => {
                                console.log("Payment flow success:", successData);
                            },
                            
                            onFailure: (failureData) => {
                                console.error("Payment flow failed:", failureData);
                                alert("Payment failed or was cancelled. Check console for details.");
                            }
                        });
                    } else {
                        alert("Cashfree SDK object is not available. Please check your network tab for loading errors and ensure the script tag is correctly placed in index.html.");
                        console.error("Cashfree SDK is undefined or initialize function is missing.");
                    }
                }, 100); // 100ms delay often fixes timing issues
            
            } else {
                alert("❌ No payment session ID received. See console for response.");
                console.error("Unexpected payment response:", data);
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert("❌ Payment failed. Please try again. " + err.message);
        } finally {
            // Delay setting loading state until after the setTimeout completes
            // or use a more sophisticated state management if desired.
            // For simplicity, we keep it here.
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
                <button type="submit" className="btn btn-success" disabled={isLoading}>
                    {isLoading ? "Processing..." : `Pay ₹${totalAmount.toFixed(2)}`}
                </button>
            </form>
        </div>
    );
}

export default Checkout;