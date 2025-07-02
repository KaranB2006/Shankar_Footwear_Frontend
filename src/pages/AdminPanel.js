import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", image: "" });
  const [authChecked, setAuthChecked] = useState(false); // ✅ wait for auth check

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/admin-login");
    } else {
      setAuthChecked(true); // ✅ allow render only after check
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      alert("All fields are required.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: parseInt(formData.price),
      image: formData.image,
    };

    setProducts([...products, newProduct]);
    setFormData({ name: "", price: "", image: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  // ✅ Don't render anything until authChecked is true
  if (!authChecked) return null;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🛠️ Admin Panel</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form className="row g-3 mb-5" onSubmit={handleAddProduct}>
        <div className="col-md-4">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="image"
            className="form-control"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">
            Add
          </button>
        </div>
      </form>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100">
              <img
                src={p.image}
                alt={p.name}
                className="card-img-top"
                style={{ height: "220px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">₹{p.price}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
