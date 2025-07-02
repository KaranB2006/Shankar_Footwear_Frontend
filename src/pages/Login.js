// src/pages/Login.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import { loginUser } from "../api/auth"; // Make sure this path is correct

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMsg("Please fill all fields.");
      return;
    }

    const response = await loginUser(email, password);
    console.log(response);

    if (response.status === "success") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/products");
    } else {
      setErrorMsg("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <motion.div
        className="p-5 rounded shadow bg-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <motion.h2
          className="text-center mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Login to Footwear Store
        </motion.h2>

        {errorMsg && (
          <motion.div
            className="alert alert-danger py-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {errorMsg}
          </motion.div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Email address</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary w-100"
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/signup" className="text-decoration-none">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
