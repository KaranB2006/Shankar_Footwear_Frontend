const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/ProductsServlet`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
 