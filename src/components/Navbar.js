// src/components/Navbar.js
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton";

function Products() {
  return (
    <div>
      <h2>All Products</h2>
      <LogoutButton />
      {/* Rest of your product list */}
    </div>
  );
}


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setIsAdmin(localStorage.getItem("adminLoggedIn") === "true");
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsAdmin(false);
    navigate("/admin-login");
  };

  const linkClass = (path) =>
    `nav-link ${location.pathname === path ? "active fw-bold" : ""}`;

  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-dark bg-dark px-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          👟 Footwear Store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left nav links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={linkClass("/")} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass("/products")} to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass("/cart")} to="/cart">
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className={linkClass("/checkout")} to="/checkout">
                Checkout
              </Link>
            </li>

            {/* ✅ Always show Admin login link */}
            {!isAdmin ? (
              <li className="nav-item">
                <Link className={linkClass("/admin-login")} to="/admin-login">
                  Admin
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link className={linkClass("/admin")} to="/admin">
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>

          {/* Right side auth buttons */}
          <ul className="navbar-nav">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className={linkClass("/login")} to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={linkClass("/signup")} to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}

            {/* ✅ Show admin logout if logged in */}
            {isAdmin && (
              <li className="nav-item ms-2">
                <button className="btn btn-outline-warning" onClick={handleAdminLogout}>
                  Admin Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
