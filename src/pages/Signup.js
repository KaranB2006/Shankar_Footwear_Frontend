// src/pages/Signup.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { signupUser } from "../api/auth";
import { Helmet } from "react-helmet";


function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      const response = await signupUser(name, email, password);
      console.log(response);

      if (response.status === "success") {
        navigate("/login");
      } else if (response.status === "exists") {
        setErrorMsg("User already exists.");
      } else {
        setErrorMsg("Signup failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error connecting to server.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Helmet>
              <title>Sign Up User</title>
            </Helmet>
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
          Create Account
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

        <form onSubmit={handleSignup}>
          <div className="form-group mb-3">
            <label>Name</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label>Email address</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaEnvelope />
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
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="btn btn-success w-100"
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
