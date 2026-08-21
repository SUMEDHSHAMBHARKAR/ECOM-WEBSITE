import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag, ShoppingCart, Home, Package, Clock, Menu, X } from "lucide-react";

function NavBar() {
  const { cartItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-icon">
            <ShoppingBag size={20} />
          </div>
          <span>ECOM</span>
        </NavLink>

        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <li>
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `nav-link-item ${isActive ? "active-link" : ""}`
              }
            >
              <Home size={18} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `nav-link-item ${isActive ? "active-link" : ""}`
              }
            >
              <Package size={18} />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `nav-link-item ${isActive ? "active-link" : ""}`
              }
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="cart-count-badge">{cartCount}</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `nav-link-item ${isActive ? "active-link" : ""}`
              }
            >
              <Clock size={18} />
              <span>Orders</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default NavBar;