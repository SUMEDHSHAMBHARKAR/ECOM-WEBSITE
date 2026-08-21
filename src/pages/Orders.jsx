import { Link } from "react-router-dom";
import { Clock, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

function Orders() {
  const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  if (savedOrders.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <Clock size={36} />
        </div>
        <h2 className="empty-title">No Orders Found</h2>
        <p className="empty-desc">
          You haven't placed any orders yet. Start exploring our store to place your first order!
        </p>
        <Link to="/products" className="btn btn-primary btn-lg">
          <span>Start Shopping</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 className="page-title">Order History</h1>
            <p className="page-subtitle" style={{ marginBottom: 0 }}>
              Track past purchases and view itemized order receipts
            </p>
          </div>
          <span className="badge badge-indigo" style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}>
            {savedOrders.length} {savedOrders.length === 1 ? "Order" : "Orders"} Placed
          </span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {savedOrders.map((order) => (
          <div
            key={order.orderID}
            className="order-summary-card"
            style={{ position: "static", transition: "all 0.2s ease" }}
          >
            {/* Order Card Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
                paddingBottom: "1rem",
                marginBottom: "1rem",
                borderBottom: "1px solid var(--neutral-200)"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="badge badge-indigo" style={{ fontSize: "0.9rem" }}>
                    {order.orderID}
                  </span>
                  <span className="badge badge-emerald">
                    <CheckCircle2 size={14} />
                    Completed
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.85rem", color: "var(--neutral-500)", marginTop: "0.5rem" }}>
                  <Calendar size={14} />
                  <span>Placed on {order.date}</span>
                </div>
              </div>

              <Link to={`/orders/${order.orderID}`} className="btn btn-outline btn-sm">
                <span>View Details</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Order Products Preview Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {order.items.map((product) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    backgroundColor: "var(--neutral-50)",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--neutral-100)"
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ width: "48px", height: "48px", objectFit: "contain", borderRadius: "var(--radius-sm)", backgroundColor: "#ffffff" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--neutral-900)" }}>
                      {product.title}
                    </div>
                    <div style={{ fontSize: "0.825rem", color: "var(--neutral-500)" }}>
                      Qty: {product.quantity} × ${Number(product.price).toFixed(2)}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--neutral-800)" }}>
                    ${(product.price * product.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Card Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.75rem",
                borderTop: "1px dashed var(--neutral-200)"
              }}
            >
              <span style={{ fontSize: "0.9rem", color: "var(--neutral-500)", fontWeight: 600 }}>
                Total Order Value
              </span>
              <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--primary)" }}>
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Orders;
