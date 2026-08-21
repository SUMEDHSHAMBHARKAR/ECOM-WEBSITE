import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag, Clock } from "lucide-react";

function Success() {
  const location = useLocation();

  const checkoutdata = location.state;

  if (!checkoutdata) {
    return (
      <div className="empty-state">
        <div className="empty-icon" style={{ backgroundColor: "var(--amber-50)", color: "var(--amber-600)" }}>
          <ShoppingBag size={36} />
        </div>
        <h2 className="empty-title">Order Information Not Found</h2>
        <p className="empty-desc">
          We couldn't retrieve your recent order confirmation. Please place an order again.
        </p>
        <Link to="/products" className="btn btn-primary btn-lg">
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "640px", margin: "2rem auto", textAlign: "center" }}>
      <div
        className="order-summary-card"
        style={{
          padding: "3.5rem 2rem",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)"
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "var(--emerald-50)",
            color: "var(--emerald-600)",
            borderRadius: "var(--radius-full)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem",
            boxShadow: "0 8px 20px rgba(5, 150, 105, 0.2)"
          }}
        >
          <CheckCircle2 size={48} />
        </div>

        <h1 className="page-title" style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>
          Order Placed Successfully!
        </h1>

        <p style={{ color: "var(--neutral-500)", fontSize: "1.05rem", marginBottom: "2rem" }}>
          Thank you for shopping with ECOM. We have received your order and are preparing it for shipment.
        </p>

        {/* Order Details Pill Box */}
        <div
          style={{
            backgroundColor: "var(--neutral-50)",
            border: "1px solid var(--neutral-200)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
            marginBottom: "2.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem"
          }}
        >
          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--neutral-400)", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.25rem" }}>
              Order Reference
            </div>
            <div className="badge badge-indigo" style={{ fontSize: "0.95rem" }}>
              {checkoutdata.orderId}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.8rem", color: "var(--neutral-400)", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.25rem" }}>
              Amount Paid
            </div>
            <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--neutral-900)" }}>
              ${checkoutdata.total.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/orders" className="btn btn-primary btn-lg">
            <Clock size={18} />
            <span>View My Orders</span>
          </Link>
          <Link to="/products" className="btn btn-secondary btn-lg">
            <ShoppingBag size={18} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;