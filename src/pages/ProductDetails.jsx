import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const {addToCart , cartItems} = useCart();

  console.log(cartItems);

  useEffect(() => {
    async function fetchAPI() {
      try {
        const responce = await fetch(
          `https://dummyjson.com/products/${id}`,
        );

        if (!responce.ok) {
          throw new Error("Failed to fetch data");
        }
        const dataa = await responce.json();

        setProduct(dataa);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchAPI();
  }, [id]);

  return (
    <>
      <h1>Product Details</h1>
      {product &&
      <div>
        <img src={product.thumbnail} alt={product.title} />
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <h1>{product.category}</h1> 
      </div> }

      <button onClick={() => addToCart(product)}>Add To Cart</button>
    </>
  );
}

export default ProductDetails;
