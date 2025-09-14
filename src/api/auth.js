// src/api/auth.js
const BASE_URL = "https://shankarfootwearbackend-production.up.railway.app";

// --- Signup ---
export const signupUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/SignupServlet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name,
      email,
      password,
    }),
  });

  if (!res.ok) {
    throw new Error(`Signup failed: ${res.status}`);
  }

  return await res.json();
};

// --- Login ---
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/LoginServlet`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email,
      password,
    }),
  });

  if (!res.ok) {
    throw new Error(`Login failed: ${res.status}`);
  }

  return await res.json();
};
