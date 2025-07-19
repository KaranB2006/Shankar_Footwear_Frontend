// src/api/cart.js

export const addToCart = async (productId, quantity) => {
  const res = await fetch("	https://shankar-footwear.onrender.com/CartServlet", {
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
