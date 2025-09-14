// src/api/checkout.js
const BASE_URL = "https://shankarfootwearbackend-production.up.railway.app";

const checkoutOrder = async (email) => {
  const res = await fetch(`${BASE_URL}/CheckoutServlet`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ email }),
  });

  if (!res.ok) {
    throw new Error(`Checkout failed: ${res.status}`);
  }

  const data = await res.json();
  return data;
};

export default checkoutOrder; // ✅ Exporting as default
