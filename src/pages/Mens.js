// src/pages/Men.js
import React from "react";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";

export default function Men() {
  const { addToCart } = useCart();
  const userEmail = localStorage.getItem("userEmail");

  const Mens_Products = [
    {
      id: 1,
      name: "Paragon Double Sided Belt",
      price: 432,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLiE8XYmeTTiGM7TtvRw_y2DH2AEg1ncb3dw&s",
    },
    {
      id: 2,
      name: "PARAGON 8828",
      price: 255,
      image:
        "https://ganjirmart.com/wp-content/uploads/2023/06/sli.-8828-1-scaled.jpg",
    },
    {
      id: 3,
      name: "Paragon Blot K1407G",
      price: 969,
      image:
        "https://paragonfootwear.com/cdn/shop/files/8_71e8bca0-9018-4211-a746-439b8f30ceb8.jpg?v=1741864677&width=1920",
    },
  ];

  const handleAdd = (product) => {
    addToCart(product);
    // If you're syncing with backend, add API call here
    console.log("Added to cart:", product);
  };

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Mens Section💪</title>
      </Helmet>
      <h2 className="text-center mb-4">🧍‍♂️ Men's Section</h2>
      <div className="row">
        {Mens_Products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">₹{product.price}</p>
                <button
                  className="btn btn-success"
                  onClick={() => handleAdd(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
