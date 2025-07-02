import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Static admin credentials (for now)
    if (email === "admin@shop.com" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="container mt-5">
      <h2>🔐 Admin Login</h2>
      <form onSubmit={handleLogin} className="w-50 mx-auto mt-4">
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@shop.com"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
          />
        </div>
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
