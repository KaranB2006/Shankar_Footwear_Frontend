import React from "react";
import { useCart } from "../context/CartContext";
import { addToCart as addToCartAPI } from "../api/cart";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";



function Products() {
  const { addToCart } = useCart();
  const userEmail = localStorage.getItem("userEmail");

  const products = [
    // Men's (first 3)
    {
      id: 1,
      name: "Paragon Double Sided Belt",
      price: 400,
      image: "/images/1st_sandal.jpeg",
    },
    {
      id: 2,
      name: "PARAGON PUK2227G GREY",
      price: 400,
      image:
        "/images/2n_sandal.jpeg",
    },
    {
      id: 3,
      name: "PARAGON PUK2227G BROWN",
      price: 969,
      image:
        "/images/3rd_sandal.jpeg",
    },
    // Women's (next 3)
    {
      id: 4,
      name: "Women's Aurish Flat Sandal",
      price: 229,
      image:
        "/images/ladies_first.jpeg",
    },
    {
      id: 5,
      name: "Wolkaroo Soft Cushion",
      price: 249,
      image:
        "/images/ladies_second.jpeg",
    },
    {
      id: 6,
      name: "Paragon Comfortable Ladies Sandal",
      price: 417,
      image:
        "/images/ladies_third.jpeg",
    },
    {
      id: 7,
      name: "Paragon K7015L Ladies Sandal",
      price: 450,
      image:
        "/images/ladies_third.jpeg",
    },
    {
      id: 8,
      name: "Soft Shoes",
      price: 450,
      image:
        "/images/shoes1.jpeg",
    },
    {
      id: 9,
      name: "SNEAKERS",
      price: 650,
      image:
        "/images/shoes2.jpeg",
    },
    {
      id: 10,
      name: "TRENDY CANVAS LUXURY SHOES",
      price: 950,
      image:
        "/images/shoes3.jpeg",
    },
    {
      id: 11,
      name: "Paragon K7007l Slippers",
      price: 450,
      image:
        "/images/ladies_sixth.jpeg",
    },
    {
      id: 12,
      name: "Paragon EVK3418L Slippers",
      price: 450,
      image:
        "/images/ladies_seventh.jpeg",
    },
    {
      id: 13,
      name: "Mens Cetrino Sneakers",
      price: 849,
      image:
        "/images/shoes4.jpeg",
    },
    {
      id: 14,
      name: "BELLEGIRIAN SHOES",
      price: 699,
      image:
        "/images/shoe5.jpeg",
    },
    {
      id: 15,
      name: "MENS HURRICANE RUNNING SHOES",
      price: 999,
      image:
        "/images/shoe6.jpeg",
    },
    {
      id: 16,
      name: "MENS ASIAN WONDER SPORTS SHOES",
      price: 1100,
      image:
        "/images/shoe7.jpeg",
    },
    {
      id: 17,
      name: "AVANT RUNNING SHOES",
      price: 900,
      image:
        "/images/shoe8.jpeg",
    },
    {
      id: 18,
      name: "DEEP PEACOCK RUNNING SHOES",
      price: 450,
      image:
        "/images/shoe9.jpeg",
    },
    {
      id: 19,
      name: "MENS FORMAL CENTRINO WITH SHOELASE",
      price: 650,
      image:
        "/images/shoe10.jpeg",
    },
    {
      id: 20,
      name: "MENS HURRICANE RUNNING SHOES",
      price: 550,
      image:
        "/images/shoe11.jpeg",
    },

  ];

  const handleAdd = async (product) => {
  if (!userEmail) {
    Swal.fire({
      icon: 'warning',
      title: 'Please Login First',
      text: 'You must be logged in to add products to your cart.',
    });
    return; 
  }

  try {
    await addToCartAPI(product.id, 1); // Backend add

    addToCart(product); // ✅ Add to frontend cart after backend success

    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `"${product.name}" has been added successfully!`,
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (err) {
    console.log("Backend error:", err);

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Something went wrong while adding to cart.',
    });
  }
};



  return (
    <div className="container mt-5">
      <Helmet>
              <title>Products</title>
      </Helmet>
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
