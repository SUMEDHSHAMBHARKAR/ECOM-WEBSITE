import { Link } from "react-router-dom";
import { Star } from "lucide-react";

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card-image"
          loading="lazy"
        />
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-description">{product.description}</p>

        <div className="product-card-footer">
          <span className="product-card-price">${Number(product.price).toFixed(2)}</span>
          {product.rating && (
            <div className="product-card-rating">
              <Star size={14} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
