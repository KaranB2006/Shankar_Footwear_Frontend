import React from "react";
import "./AdminDashboard.css"; // We'll create this for styling
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>🛠 Admin</h2>
        <ul>
          <li onClick={() => navigate("/admin-dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/admin-products")}>Products</li>
          <li onClick={() => navigate("/admin-orders")}>Orders</li>
          <li onClick={() => navigate("/admin-users")}>Users</li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Welcome Admin 👋</h1>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>👟 Products</h3>
            <p>42</p>
          </div>
          <div className="stat-card">
            <h3>📦 Orders</h3>
            <p>88</p>
          </div>
          <div className="stat-card">
            <h3>👤 Users</h3>
            <p>31</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
