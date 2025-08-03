// src/api/cart.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const addToCart = async (productId, quantity) => {
  const res = await fetch(`${BASE_URL}CartServlet`, {
    method: "POST",
    credentials: "include", 
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({  
      productId,
      quantity
    })
  });

  const data = await res.json();
  return data;
};
