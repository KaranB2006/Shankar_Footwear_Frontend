import React from "react";
import { addToCart } from "../api/cart";

function ProductCard({ product }) {
  const handleAdd = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("Please login first.");
      return;
    }

    const response = await addToCart(userEmail, product.id, 1);
    console.log("Cart Response:", response);

    if (response.status === "success") {
      alert("Added to cart!");
    } else {
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="card p-3">
      <img src={product.image_url} className="card-img-top" alt={product.name} />
      <h5 className="mt-2">{product.name}</h5>
      <p>₹{product.price}</p>
      <button className="btn btn-primary" onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
