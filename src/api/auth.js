// src/api/auth.js

export const signupUser = async (name, email, password) => {
  const res = await fetch("http://localhost:8080/Footwear_Backend/SignupServlet", {
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
  const res = await fetch("http://localhost:8080/Footwear_Backend/LoginServlet", {
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
