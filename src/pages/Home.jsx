import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Sparkles, ArrowRight, ShieldCheck, Truck, Clock, RefreshCw } from "lucide-react";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await getProducts();
        // Show first 8 products as featured
        setFeaturedProducts(data.slice(0, 8));
      } catch (err) {
        console.error("Failed to load featured products:", err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill">
            <Sparkles size={16} />
            <span>New Season Collections Available</span>
          </div>

          <h1 className="hero-title">
            Upgrade Your Lifestyle with Premium Products
          </h1>

          <p className="hero-subtitle">
            Explore hundreds of top-rated items across electronics, beauty, groceries, and home essentials with fast, reliable delivery.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-lg">
              <span>Explore Products</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/cart" className="btn btn-secondary btn-lg">
              <span>View Cart</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="hero-features">
        <div className="feature-card">
          <div className="feature-icon">
            <Truck size={22} />
          </div>
          <div className="feature-info">
            <h4>Free Shipping</h4>
            <p>On all orders above $999</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <ShieldCheck size={22} />
          </div>
          <div className="feature-info">
            <h4>100% Genuine</h4>
            <p>Direct from verified brands</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <RefreshCw size={22} />
          </div>
          <div className="feature-info">
            <h4>Easy Returns</h4>
            <p>Hassle-free 30-day policy</p>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Clock size={22} />
          </div>
          <div className="feature-info">
            <h4>24/7 Support</h4>
            <p>Dedicated customer care</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: "0.25rem" }}>Featured Products</h2>
            <p style={{ color: "var(--neutral-500)", fontSize: "0.95rem" }}>Handpicked quality products just for you</p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">
            <span>View All ({featuredProducts.length}+)</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="product-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="skeleton skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA Banner */}
      <section style={{
        backgroundColor: "var(--neutral-100)",
        borderRadius: "var(--radius-xl)",
        padding: "3rem 2rem",
        textAlign: "center",
        border: "1px solid var(--neutral-200)"
      }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--neutral-900)", marginBottom: "0.75rem" }}>
          Ready to Start Shopping?
        </h2>
        <p style={{ color: "var(--neutral-600)", maxWidth: "500px", margin: "0 auto 1.5rem auto" }}>
          Browse our extensive collection of products and enjoy exclusive deals today.
        </p>
        <Link to="/products" className="btn btn-primary btn-lg">
          <span>Browse All Categories</span>
          <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}

export default Home;
