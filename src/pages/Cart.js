import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, increaseQty, decreaseQty, totalAmount } =
    useCart();

  return (
    <div className="container mt-5">
      <Helmet>
          <title>Cart</title>
      </Helmet>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.name}</h5>
                  <p>₹{item.price}</p>
                  <div>
                    <button className="btn btn-sm btn-secondary me-2" onClick={() => decreaseQty(item.id)}>
                      -
                    </button>
                    {item.quantity}
                    <button className="btn btn-sm btn-secondary ms-2" onClick={() => increaseQty(item.id)}>
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <h4>Total: ₹{totalAmount}</h4>
          <motion.button
            className="btn btn-success mt-3"
            onClick={() => navigate("/checkout")}
            whileTap={{ scale: 0.95 }}
          >
              Proceed to Checkout
           </motion.button>

        </>
      )}
    </div>
  );
}

export default Cart;
