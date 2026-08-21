import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertCircle, ShoppingBag } from "lucide-react";

function OrderDetails() {
  const { orderId } = useParams();
  const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  const order = savedOrders.find((item) => item.orderID === orderId);

  if (!order) {
    return (
      <div className="empty-state">
        <div className="empty-icon" style={{ backgroundColor: "var(--rose-50)", color: "var(--rose-600)" }}>
          <AlertCircle size={36} />
        </div>
        <h2 className="empty-title">Order Not Found</h2>
        <p className="empty-desc">
          We couldn't find an order matching reference ID "{orderId}".
        </p>
        <Link to="/orders" className="btn btn-primary btn-lg">
          <ArrowLeft size={18} />
          <span>Back to All Orders</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="breadcrumb">
        <Link to="/orders">Orders</Link>
        <span>/</span>
        <span style={{ color: "var(--neutral-800)" }}>{order.orderID}</span>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span className="badge badge-indigo" style={{ fontSize: "1rem", padding: "0.4rem 0.85rem" }}>
                {order.orderID}
              </span>
              <span className="badge badge-emerald">
                <CheckCircle2 size={16} />
                Completed Order
              </span>
            </div>
            <p style={{ color: "var(--neutral-500)", fontSize: "0.95rem", margin: 0 }}>
              Placed on {order.date}
            </p>
          </div>

          <Link to="/orders" className="btn btn-outline btn-sm">
            <ArrowLeft size={16} />
            <span>Back to Orders</span>
          </Link>
        </div>
      </div>

      <div className="cart-layout">
        {/* Left Column: Items Purchased */}
        <div className="order-summary-card" style={{ position: "static" }}>
          <h2 className="section-title" style={{ fontSize: "1.25rem", marginBottom: "1.25rem" }}>
            Purchased Products ({order.items ? order.items.length : 0})
          </h2>

          {!order.items || order.items.length === 0 ? (
            <p style={{ color: "var(--neutral-500)" }}>No items in this order.</p>
          ) : (
            <div className="cart-items-list">
              {order.items.map((product) => (
                <div key={product.id} className="cart-item-card" style={{ padding: "1rem" }}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="cart-item-image"
                    style={{ width: "72px", height: "72px" }}
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-title" style={{ fontSize: "1rem" }}>{product.title}</h3>
                    <div style={{ fontSize: "0.85rem", color: "var(--neutral-500)" }}>
                      ${Number(product.price).toFixed(2)} × {product.quantity}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.75rem", color: "var(--neutral-400)", textTransform: "uppercase" }}>Item Total</div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--neutral-900)" }}>
                      ${(product.price * product.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Receipt Summary */}
        <div>
          <div className="order-summary-card">
            <h2 className="section-title" style={{ fontSize: "1.35rem", marginBottom: "1.25rem" }}>
              Order Receipt
            </h2>

            <div className="summary-row">
              <span>Order Reference</span>
              <span style={{ fontWeight: 700, color: "var(--neutral-900)", fontSize: "0.85rem" }}>{order.orderID}</span>
            </div>

            <div className="summary-row">
              <span>Order Date</span>
              <span style={{ fontWeight: 600, color: "var(--neutral-700)" }}>{order.date}</span>
            </div>

            <div className="summary-row">
              <span>Status</span>
              <span className="badge badge-emerald" style={{ fontSize: "0.75rem" }}>Paid & Completed</span>
            </div>

            <div className="summary-row total">
              <span>Grand Total</span>
              <span style={{ color: "var(--primary)" }}>${order.total.toFixed(2)}</span>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <Link to="/products" className="btn btn-secondary btn-block">
                <ShoppingBag size={18} />
                <span>Order More Items</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
