// src/api/cart.js

export const addToCart = async (productId, quantity) => {
  const res = await fetch("http://localhost:8080/Footwear_Backend/CartServlet", {
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
