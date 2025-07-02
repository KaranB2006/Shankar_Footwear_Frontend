// src/components/AdminRoute.js
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");

  return isLoggedIn && userRole === "admin" ? children : <Navigate to="/login" />;
}

export default AdminRoute;
