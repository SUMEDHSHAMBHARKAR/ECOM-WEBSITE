export const getProducts = async () => {
  const responce = await fetch("https://dummyjson.com/products?limit=100000");
  const data = await responce.json();
  return data.products;
}
