import { useLocation, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { User, Phone, Mail, MapPin, CheckCircle, ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react";

function OrderReview() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cartItems, clearCart } = useCart();

  const checkoutData = location.state;

  if (!checkoutData) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <ShoppingBag size={36} />
        </div>
        <h2 className="empty-title">No Checkout Data Found</h2>
        <p className="empty-desc">
          Please fill out your shipping information before reviewing your order.
        </p>
        <Link to="/cart" className="btn btn-primary btn-lg">
          <ArrowLeft size={18} />
          <span>Return to Cart</span>
        </Link>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 999 ? 0 : 50;
  const total = subtotal + shipping;
  
  const orderId = `ECOM-${Date.now()}`;

  const newOrder = {
    orderID: orderId,
    items: cartItems,
    total: total,
    date: new Date().toLocaleString(),
  };
  
  function hendleClick() {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updateOrders = [...existingOrders, newOrder];
    
    localStorage.setItem("orders", JSON.stringify(updateOrders));
    
    clearCart();
    navigate("/success", {
      state: { total, orderId },
    });
  }

  return (
    <>
      {/* Step Indicator */}
      <div className="step-progress">
        <div className="step-item">
          <span className="step-number">1</span>
          <span>Cart</span>
        </div>
        <div className="step-divider" />
        <div className="step-item">
          <span className="step-number">2</span>
          <span>Checkout</span>
        </div>
        <div className="step-divider" />
        <div className="step-item active">
          <span className="step-number">3</span>
          <span>Order Review</span>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h1 className="page-title">Review Your Order</h1>
        <p className="page-subtitle" style={{ marginBottom: 0 }}>
          Please verify your delivery details and order summary before placing your order.
        </p>
      </div>

      <div className="cart-layout">
        {/* Left Column: Customer Details & Items */}
        <div>
          {/* Customer & Delivery Card */}
          <div className="order-summary-card" style={{ marginBottom: "1.5rem", position: "static" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h2 className="section-title" style={{ fontSize: "1.25rem", margin: 0 }}>
                Delivery Details
              </h2>
              <Link to="/cart" className="btn btn-outline btn-sm">
                Edit Details
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <User size={18} style={{ color: "var(--primary)", marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--neutral-400)", textTransform: "uppercase", fontWeight: 700 }}>Recipient</div>
                  <div style={{ fontWeight: 700, color: "var(--neutral-900)" }}>{checkoutData.name}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <Phone size={18} style={{ color: "var(--primary)", marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--neutral-400)", textTransform: "uppercase", fontWeight: 700 }}>Mobile</div>
                  <div style={{ fontWeight: 600, color: "var(--neutral-800)" }}>{checkoutData.mobile}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <Mail size={18} style={{ color: "var(--primary)", marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--neutral-400)", textTransform: "uppercase", fontWeight: 700 }}>Email</div>
                  <div style={{ fontWeight: 600, color: "var(--neutral-800)" }}>{checkoutData.Email}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", gridColumn: "1 / -1" }}>
                <MapPin size={18} style={{ color: "var(--primary)", marginTop: "2px" }} />
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--neutral-400)", textTransform: "uppercase", fontWeight: 700 }}>Shipping Address</div>
                  <div style={{ fontWeight: 600, color: "var(--neutral-800)" }}>
                    {checkoutData.address}, {checkoutData.City} - {checkoutData.Pincode}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Card */}
          <div className="order-summary-card" style={{ position: "static" }}>
            <h2 className="section-title" style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
              Order Items ({cartItems.length})
            </h2>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card" style={{ padding: "0.85rem 1rem" }}>
                  <img src={item.thumbnail} alt={item.title} className="cart-item-image" style={{ width: "64px", height: "64px" }} />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title" style={{ fontSize: "0.95rem" }}>{item.title}</h4>
                    <div style={{ fontSize: "0.85rem", color: "var(--neutral-500)" }}>
                      ${Number(item.price).toFixed(2)} x {item.quantity}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontWeight: 800, color: "var(--neutral-900)" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Total & Place Order Button */}
        <div>
          <div className="order-summary-card">
            <h2 className="section-title" style={{ fontSize: "1.35rem", marginBottom: "1.25rem" }}>
              Final Price Summary
            </h2>

            <div className="summary-row">
              <span>Items Subtotal</span>
              <span style={{ fontWeight: 700, color: "var(--neutral-900)" }}>${subtotal.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping Fee</span>
              <span style={{ fontWeight: 700, color: shipping === 0 ? "var(--emerald-600)" : "var(--neutral-900)" }}>
                {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-row total">
              <span>Total Payable</span>
              <span style={{ color: "var(--primary)" }}>${total.toFixed(2)}</span>
            </div>

            <div style={{ margin: "1.5rem 0 1rem 0" }}>
              <button onClick={hendleClick} className="btn btn-primary btn-lg btn-block">
                <CheckCircle size={20} />
                <span>Place Order (${total.toFixed(2)})</span>
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--neutral-500)" }}>
              <ShieldCheck size={16} style={{ color: "var(--emerald-600)" }} />
              <span>Safe & Secure Order Placement</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderReview;
