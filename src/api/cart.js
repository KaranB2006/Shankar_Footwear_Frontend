// src/api/cart.js

// ✅ Local backend (Tomcat)
const BASE_URL = "http://localhost:8080/Footwear_local";

// 🌐 Production backend (Railway)
// const BASE_URL = "https://shankarfootwearbackend-production.up.railway.app";

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
