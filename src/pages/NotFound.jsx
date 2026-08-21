import { Link } from "react-router-dom";
import { HelpCircle, Home } from "lucide-react";

function NotFound() {
  return (
    <div className="empty-state" style={{ margin: "4rem auto" }}>
      <div className="empty-icon" style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)" }}>
        <HelpCircle size={40} />
      </div>
      <h1 className="empty-title" style={{ fontSize: "2rem" }}>
        404 - Page Not Found
      </h1>
      <p className="empty-desc">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
        <Link to="/products" className="btn btn-secondary btn-lg">
          <span>Browse Products</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;