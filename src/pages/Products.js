import React from "react";
import { useCart } from "../context/CartContext";
import { addToCart as addToCartAPI } from "../api/cart";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import Swal from 'sweetalert2';



function Products() {
  const { addToCart } = useCart();
  const userEmail = localStorage.getItem("userEmail");

  const products = [
    // Men's (first 3)
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
    // Women's (next 3)
    {
      id: 4,
      name: "Women's Paragon PU sole Sandal",
      price: 229,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOB04cM26H5ivWRZCMWHRMPsf2KmCwqGxQgg&s",
    },
    {
      id: 5,
      name: "Solea paragon footwear top",
      price: 249,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPN-JUMSg63Rb1la56tZy0qDgBi1h7MHaMnQ&s",
    },
    {
      id: 6,
      name: "Paragon Comfortable Ladies Sandal",
      price: 450,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8WwM1YvQimdT9Ui5n6zYwFwhuY0iamJDSDg&s",
    },
  ];

  const handleAdd = async (product) => {
  addToCart(product);

  try {
    await addToCartAPI(product.id, 1);
    
    // 🎉 SweetAlert success popup
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `"${product.name}" has been added successfully!`,
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (err) {
    console.log("Backend error:", err);

    // ❌ SweetAlert error popup
    Swal.fire({
      icon: 'error',
      title: 'Oops!',
      text: 'Something went wrong while syncing with the backend.',
    });
  }
};


  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛍️ Featured Products</h2>
      <div className="row">
        {products.map((product) => (
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
                  className="btn btn-primary"
                  onClick={
                    () => handleAdd(product)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-5 mt-5">
  <motion.div
    whileHover={{ scale: 1.15, y: -3 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Link
      to="/men"
      className="btn btn-primary btn-lg px-5 py-3 fw-bold d-flex align-items-center"
      style={{ fontSize: "1.2rem", borderRadius: "2rem" }}
    >
      👞 See More Men's <ArrowRightCircle className="ms-2" size={24} />
    </Link>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.15, y: -3 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Link
      to="/women"
      className="btn btn-danger btn-lg px-5 py-3 fw-bold d-flex align-items-center"
      style={{ fontSize: "1.2rem", borderRadius: "2rem" }}
    >
      👠 See More Women's <ArrowRightCircle className="ms-2" size={24} />
    </Link>
  </motion.div>
</div>

    </div>
  );
}

export default Products;
