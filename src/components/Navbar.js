// src/components/Navbar.js
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
      className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow sticky-top"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fw-semibold fs-4" to="/">
          👟 Footwear Store
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
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
            <li className="nav-item">
              <Link className={linkClass("/support")} to="/support">
                Customer Support
              </Link>
            </li>
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
                <button
                  className="btn btn-outline-light ms-lg-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}

            {isAdmin && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-warning ms-lg-2"
                  onClick={handleAdminLogout}
                >
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
