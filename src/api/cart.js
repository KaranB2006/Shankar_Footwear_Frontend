// src/api/cart.js
const BASE_URL = "https://shankarfootwearbackend-production.up.railway.app";

// --- Add to Cart ---
export const addToCart = async (productId, quantity) => {
  const res = await fetch(`${BASE_URL}/CartServlet`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      productId,
      quantity,
    }),
  });

  if (!res.ok) {
    throw new Error(`Add to cart failed: ${res.status}`);
  }

  return await res.json();
};
