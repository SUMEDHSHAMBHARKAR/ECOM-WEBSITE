import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory ,setSelectedCategory] = useState("ALL");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  if (loading) {
    return <p>Loading Data</p>;
  }
  const filteredProducts = products.filter((product) =>{
    const matchcategory = selectedCategory === "ALL" || product.category === selectedCategory;
    const matchsearch = product.title.toLowerCase().includes(search.toLowerCase());
    return matchcategory && matchsearch;
  }  
);
  return (
    <>
      <h1>Products Page </h1>
      <input type="text" placeholder="Search Products" value={search} onChange={(event) => setSearch(event.target.value)}/>
      <select value={selectedCategory}  onChange={(event) => setSelectedCategory(event.target.value)}>
        <option value="ALL">ALL</option>
        <option value="beauty">Beauty</option>
        <option value="fragrances">Fragrances</option>
        <option value="furniture">Furniture</option>
        <option value="groceries">Groceries</option>
        <option value="mobile-accessories">Mobile-accessories</option>
      </select>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export default Products;



