export async function getProductById(id) {
  const res = await fetch("	https://shankar-footwear.onrender.com/GetProductServlet");
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
 