import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Search, Filter, PackageSearch, RefreshCw } from "lucide-react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setError("");
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please check your internet connection.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchcategory =
      selectedCategory === "ALL" || product.category === selectedCategory;
    const matchsearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchcategory && matchsearch;
  });

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("ALL");
  };

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 className="page-title">Browse Catalog</h1>
            <p className="page-subtitle" style={{ marginBottom: 0 }}>
              Find the perfect products curated for your needs
            </p>
          </div>
          {!loading && !error && (
            <span className="badge badge-indigo" style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}>
              Showing {filteredProducts.length} of {products.length} Products
            </span>
          )}
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search products by title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Filter size={18} style={{ color: "var(--neutral-500)" }} />
          <select
            className="form-select"
            style={{ width: "auto", minWidth: "180px" }}
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="ALL">All Categories</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
            <option value="mobile-accessories">Mobile Accessories</option>
          </select>
        </div>
      </div>

      {/* Loading Skeleton Grid */}
      {loading && (
        <div className="product-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="skeleton skeleton-card" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="empty-state">
          <div className="empty-icon" style={{ backgroundColor: "var(--rose-50)", color: "var(--rose-600)" }}>
            <RefreshCw size={32} />
          </div>
          <h3 className="empty-title">Failed to Load Products</h3>
          <p className="empty-desc">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Retry Loading
          </button>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty Filter Results State */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">
            <PackageSearch size={32} />
          </div>
          <h3 className="empty-title">No Products Found</h3>
          <p className="empty-desc">
            We couldn't find any products matching "{search}" in category "{selectedCategory}".
          </p>
          <button onClick={handleResetFilters} className="btn btn-secondary">
            Clear Filters & Search
          </button>
        </div>
      )}
    </>
  );
}

export default Products;
