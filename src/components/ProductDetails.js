import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/product";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id).then((data) => {
      console.log("Fetched product:", data);
      setProduct(data);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      Swal.fire("Please select a size!");
      return;
    }

    const productWithSize = { ...product, selectedSize };
    addToCart(productWithSize);
    Swal.fire("Added to cart!");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img src={product.image_url} alt={product.name} className="w-64 mx-auto" />
      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="text-xl text-gray-600 mt-2">₹{product.price}</p>
      <p className="text-md mt-4">{product.description}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Select Size:</h3>
        <div className="flex gap-4 mt-2">
          {["6", "7", "8", "9", "10"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded-lg ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
