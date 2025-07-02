// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // ✅ Import Navbar
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductCard from "./components/ProductCard";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/AdminLogin";
import Mens from "./pages/Mens";
import Womens from "./pages/Womens";


<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>


function App() {
  return (
    <Router>
      <Navbar />  {/* ✅ Always outside Routes so it shows on all pages */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path = "/men" element = {<Mens/>}/>
        <Route path = "/women" element = {<Womens/>}/>
      </Routes>
    </Router>
  );
}

export default App;
