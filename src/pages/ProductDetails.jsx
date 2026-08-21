import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Star, ArrowLeft, Check, ShieldCheck, Truck, AlertCircle } from "lucide-react";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [addedToast, setAddedToast] = useState(false);
  const { id } = useParams();
  const { addToCart } = useCart();
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAPI() {
      setLoading(true);
      setError("");
      try {
        const responce = await fetch(`https://dummyjson.com/products/${id}`);

        if (!responce.ok) {
          throw new Error("Failed to fetch product details");
        }
        const dataa = await responce.json();

        setProduct(dataa);
        setSelectedImage(dataa.thumbnail);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAPI();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="product-details-container" style={{ display: "block" }}>
        <div className="skeleton" style={{ height: "400px", borderRadius: "var(--radius-lg)" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-icon" style={{ backgroundColor: "var(--rose-50)", color: "var(--rose-600)" }}>
          <AlertCircle size={32} />
        </div>
        <h3 className="empty-title">Error Loading Product</h3>
        <p className="empty-desc">{error}</p>
        <Link to="/products" className="btn btn-primary">
          <ArrowLeft size={18} />
          <span>Back to Products</span>
        </Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      {/* Breadcrumb & Navigation Back Link */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span style={{ color: "var(--neutral-800)" }}>{product.title}</span>
      </div>

      <div className="product-details-container">
        {/* Left Column: Product Gallery */}
        <div>
          <div className="details-image-box">
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="details-image"
            />
          </div>

          {/* Additional Thumbnails if available */}
          {product.images && product.images.length > 1 && (
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", overflowX: "auto" }}>
              {product.images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "var(--radius-md)",
                    border: selectedImage === img ? "2px solid var(--primary)" : "1px solid var(--neutral-200)",
                    backgroundColor: "var(--neutral-50)",
                    padding: "0.25rem",
                    cursor: "pointer",
                    overflow: "hidden"
                  }}
                >
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="details-info">
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span className="badge badge-indigo" style={{ textTransform: "uppercase" }}>
              {product.category}
            </span>
            {product.rating && (
              <span className="badge badge-amber">
                <Star size={14} fill="currentColor" />
                {product.rating} Rating
              </span>
            )}
            <span className="badge badge-emerald">In Stock</span>
          </div>

          <h1 className="details-title">{product.title}</h1>

          <div className="details-price">${Number(product.price).toFixed(2)}</div>

          <p className="details-description">{product.description}</p>

          {/* Action Bar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "auto", paddingTop: "1.5rem", borderTop: "1px solid var(--neutral-200)" }}>
            {addedToast && (
              <div className="badge badge-emerald" style={{ padding: "0.75rem 1rem", fontSize: "0.9rem", width: "100%", justifyContent: "center" }}>
                <Check size={18} />
                <span>Added to cart successfully!</span>
              </div>
            )}

            <button onClick={handleAddToCart} className="btn btn-primary btn-lg btn-block">
              <ShoppingCart size={20} />
              <span>Add To Cart</span>
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--neutral-100)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--neutral-600)" }}>
              <Truck size={18} style={{ color: "var(--primary)" }} />
              <span>Free Shipping Over $999</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--neutral-600)" }}>
              <ShieldCheck size={18} style={{ color: "var(--primary)" }} />
              <span>Genuine Quality Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
