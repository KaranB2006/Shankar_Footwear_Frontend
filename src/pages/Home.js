// src/pages/Home.js
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <motion.div
      className="container text-center mt-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="display-4 mb-3">Welcome to Footwear World 👟</h1>
      <p className="lead">Trendy, comfortable, and affordable footwear at your fingertips.</p>
      <Link to="/products" className="btn btn-primary btn-lg mt-4">
        Shop Now
      </Link>
    </motion.div>
  );
}

export default Home;
