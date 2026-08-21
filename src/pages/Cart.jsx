import { Link } from "react-router-dom";
import Checkout from "../components/Checkout";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Truck, Check } from "lucide-react";

function Cart() {
  const { cartItems, increaseQuantity, removeFromCart, decreaseQuantity } = useCart();
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shippingCharges = subTotal > 999 ? 0 : 50;
  const total = subTotal + shippingCharges;

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <ShoppingBag size={36} />
        </div>
        <h2 className="empty-title">Your Cart is Empty</h2>
        <p className="empty-desc">
          Looks like you haven't added any items to your shopping cart yet.
        </p>
        <Link to="/products" className="btn btn-primary btn-lg">
          <ArrowLeft size={18} />
          <span>Continue Shopping</span>
        </Link>
      </div>
    );
  }

  const freeShippingNeeded = 999 - subTotal;

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <h1 className="page-title">Shopping Cart</h1>
        <p className="page-subtitle" style={{ marginBottom: 0 }}>
          Manage your items and proceed to checkout ({totalItems} {totalItems === 1 ? "item" : "items"})
        </p>
      </div>

      <div className="cart-layout">
        {/* Left Column: Cart Items List */}
        <div className="cart-items-list">
          {shippingCharges === 0 ? (
            <div className="free-shipping-badge">
              <Check size={18} />
              <span>Congratulations! You qualified for FREE Shipping!</span>
            </div>
          ) : (
            <div className="free-shipping-badge" style={{ backgroundColor: "var(--amber-50)", color: "var(--amber-600)" }}>
              <Truck size={18} />
              <span>Add ${freeShippingNeeded.toFixed(2)} more to unlock FREE Shipping</span>
            </div>
          )}

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                {item.category && (
                  <span className="cart-item-category">{item.category}</span>
                )}
                <h3 className="cart-item-title">{item.title}</h3>
                <div className="cart-item-price">${Number(item.price).toFixed(2)}</div>
              </div>

              <div className="cart-item-actions">
                <div className="qty-stepper">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item.id)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => increaseQuantity(item.id)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div style={{ textAlign: "right", minWidth: "80px" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--neutral-400)" }}>Subtotal</div>
                  <div style={{ fontWeight: 800, color: "var(--neutral-900)" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary & Embedded Checkout */}
        <div>
          <div className="order-summary-card">
            <h2 className="section-title" style={{ fontSize: "1.35rem", marginBottom: "1.25rem" }}>
              Order Summary
            </h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span style={{ fontWeight: 700, color: "var(--neutral-900)" }}>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span style={{ fontWeight: 700, color: "var(--neutral-900)" }}>${subTotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping Fee</span>
              <span style={{ fontWeight: 700, color: shippingCharges === 0 ? "var(--emerald-600)" : "var(--neutral-900)" }}>
                {shippingCharges === 0 ? "FREE" : `$${shippingCharges.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-row total">
              <span>Grand Total</span>
              <span style={{ color: "var(--primary)" }}>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Embedded Checkout Form */}
          <Checkout />
        </div>
      </div>
    </>
  );
}

export default Cart;
