// src/api/checkout.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const checkoutOrder = async (email) => {
  const res = await fetch(`${BASE_URL}CheckoutServlet`, {
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
