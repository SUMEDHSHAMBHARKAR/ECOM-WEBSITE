import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <>
      <Link to={`/products/${product.id}`}>
        <div>
          <img src={product.thumbnail} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <h1>{product.category}</h1>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;
