// src/api/auth.js
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const signupUser = async (name, email, password) => {
  const res = await fetch(`https://shankar-footwear-backend.onrender.com/SignupServlet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name: name,
      email: email,
      password: password,
    }),
  });

  const data = await res.json();
  return data;
};


export const loginUser = async (email, password) => {
  const res = await fetch(`https://shankar-footwear-backend.onrender.com/LoginServlet`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email: email,
      password: password,
    }),
  });

  const data = await res.json();
  return data;
};
