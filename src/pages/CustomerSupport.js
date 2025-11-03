import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const GOOGLE_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyy3ObshHyU1MQnDl-JrWpKoaSR_ovykNKTsYB1hwQNqFOO3FeI-5JEXaz_5xgSWvlmCg/exec";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill all fields.");
      return;
    }
    
    try {
      // 1. Define the payload. Keys MUST match e.parameter in Apps Script (Name, Email, etc.)
      const payload = {
        Name: formData.name, 
        Email: formData.email,
        Subject: formData.subject,
        Message: formData.message,
      };
      
      // 2. CRITICAL CORS FIX: Convert to URL-encoded parameters for a SIMPLE POST request
      const params = new URLSearchParams(payload);

      const resp = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
        method: "POST",
        body: params, // Sends data as application/x-www-form-urlencoded
        // 3. CRITICAL: Do NOT include a 'headers' object with 'Content-Type: application/json'
      });
      
      const data = await resp.json();
      
      if (data.result === "success") {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(`Submission failed: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Customer Support</h1>
        <p style={styles.subheading}>
          We’re here to help! Fill out the form below or check our FAQs.
        </p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            Submit
          </button>
          {error && <p style={styles.error}>{error}</p>}
          {submitted && (
            <p style={styles.success}>✅ Thank you! Your message has been sent.</p>
          )}
        </form>

        <div style={styles.faq}>
          <h2>Frequently Asked Questions</h2>
          <div style={styles.faqItem}>
            <strong>Q: How long does shipping take?</strong>
            <p>A: Shipping usually takes 3-7 business days depending on your location.</p>
          </div>
          <div style={styles.faqItem}>
            <strong>Q: Can I return an item?</strong>
            <p>A: Yes! Returns are accepted within 2 days of delivery. Please check our Returns Policy.</p>
          </div>
          <div style={styles.faqItem}>
            <strong>Q: How can I track my order?</strong>
            <p>A: You will receive a tracking link via email once your order is shipped.</p>
          </div>
        </div>

        <div style={styles.contactInfo}>
          <h2>Other Ways to Contact Us</h2>
          <p>Email: support@shankarfootwear.com</p>
          <p>Phone: +91-8983232335</p>
          <p>Live Chat: Available 9 AM - 6 PM IST</p>
        </div>
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerCol}>
            <h3>Shankar Footwear</h3>
            <p>Quality footwear delivered at your doorstep.</p>
          </div>
          <div style={styles.footerCol}>
            <h3>Quick Links</h3>
            <ul style={styles.footerLinks}>
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/checkout">Checkout</a></li>
            </ul>
          </div>
          <div style={styles.footerCol}>
            <h3>Follow Us</h3>
            <div style={styles.socials}>
              <a href="https://facebook.com"><FaFacebook size={22} /></a>
              <a href="https://twitter.com"><FaTwitter size={22} /></a>
              <a href="https://instagram.com"><FaInstagram size={22} /></a>
            </div>
          </div>
        </div>
        <p style={styles.copy}>© {new Date().getFullYear()} Shankar Footwear. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  page: { display: "flex", flexDirection: "column", minHeight: "100vh" },
  container: { flex: 1, maxWidth: "800px", margin: "0 auto", padding: "2rem" },
  heading: { textAlign: "center", marginBottom: "0.5rem" },
  subheading: { textAlign: "center", marginBottom: "2rem", color: "#555" },
  form: { display: "flex", flexDirection: "column", gap: "1rem" },
  input: { padding: "0.8rem", fontSize: "1rem" },
  textarea: { padding: "0.8rem", fontSize: "1rem", minHeight: "120px" },
  button: {
    padding: "0.8rem",
    fontSize: "1rem",
    backgroundColor: "#1a73e8",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  success: { color: "green", marginTop: "1rem" },
  error: { color: "red", marginTop: "1rem" },
  faq: { marginTop: "3rem" },
  faqItem: { marginBottom: "1.5rem" },
  contactInfo: {
    marginTop: "3rem",
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    borderRadius: "8px",
  },
  footer: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "2rem 1rem",
    textAlign: "center",
    marginTop: "2rem",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    marginBottom: "1rem",
  },
  footerCol: { minWidth: "200px", margin: "1rem 0" },
  footerLinks: { listStyle: "none", padding: 0 },
  socials: { display: "flex", gap: "10px", justifyContent: "center", marginTop: "0.5rem" },
  copy: { fontSize: "0.9rem", color: "#aaa" },
};

export default CustomerSupport;