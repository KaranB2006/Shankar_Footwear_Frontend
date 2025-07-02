// src/api/checkout.js

const checkoutOrder = async (email) => {
  const res = await fetch("http://localhost:8080/Footwear_Backend/CheckoutServlet", {
    method: "POST",
    credentials: "include", 
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ email }),
  });

  const data = await res.json();
  return data;
};

export default checkoutOrder; // ✅ Exporting as default
