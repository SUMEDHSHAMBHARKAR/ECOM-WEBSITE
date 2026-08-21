import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ShoppingBag } from "lucide-react";

function CheckoutPage() {
  const { cartItems } = useCart();
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <ShoppingBag size={36} />
        </div>
        <h2 className="empty-title">Your Cart is Empty</h2>
        <p className="empty-desc">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link to="/products" className="btn btn-primary btn-lg">
          <ArrowLeft size={18} />
          <span>Browse Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div className="breadcrumb">
        <Link to="/cart">Cart</Link>
        <span>/</span>
        <span style={{ color: "var(--neutral-800)" }}>Checkout</span>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h1 className="page-title">Checkout</h1>
        <p className="page-subtitle" style={{ marginBottom: 0 }}>
          Enter your shipping info to complete your order (${subTotal.toFixed(2)})
        </p>
      </div>

      <Checkout />
    </div>
  );
}

export default CheckoutPage;
