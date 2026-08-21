export const getProducts = async () => {
  const responce = await fetch("https://dummyjson.com/products?limit=1000");
  const data = await responce.json();
  return data.products;
}
