import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowRight } from "lucide-react";

function Checkout() {
  const navigate = useNavigate();
  const [CheckoutForm, setCheckoutFormData] = useState({
    name: "",
    mobile: "",
    Email: "",
    address: "",
    City: "",
    Pincode: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !CheckoutForm.name ||
      !CheckoutForm.mobile ||
      !CheckoutForm.Email ||
      !CheckoutForm.address ||
      !CheckoutForm.City ||
      !CheckoutForm.Pincode
    ) {
      setError("Please fill all fields");
      return;
    }
    setError("");
    setSuccess("Order details submitted successfully!");

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(CheckoutForm.mobile)) {
      setError("Enter a valid mobile number (10 digits starting with 6-9)");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(CheckoutForm.Email)) {
      setError("Enter a valid email address");
      return;
    }
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(CheckoutForm.Pincode)) {
      setError("Enter a valid 6-digit pincode");
      return;
    }
    navigate("/order-review", {
      state: CheckoutForm,
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setCheckoutFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  }

  return (
    <div className="order-summary-card" style={{ marginTop: "1.5rem" }}>
      <h2 className="section-title" style={{ fontSize: "1.35rem", marginBottom: "1.25rem" }}>
        Shipping & Contact Details
      </h2>

      {error && (
        <div className="form-error-banner">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--neutral-500)", textTransform: "uppercase", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
            Customer Info
          </h3>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              placeholder="e.g. John Doe"
              name="name"
              value={CheckoutForm.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input
              className="form-input"
              placeholder="e.g. 9876543210"
              name="mobile"
              value={CheckoutForm.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="e.g. john@example.com"
              name="Email"
              value={CheckoutForm.Email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--neutral-500)", textTransform: "uppercase", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>
            Delivery Location
          </h3>

          <div className="form-group">
            <label className="form-label">Street Address</label>
            <input
              className="form-input"
              placeholder="House/Flat No., Street, Landmark"
              name="address"
              value={CheckoutForm.address}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                className="form-input"
                placeholder="City"
                name="City"
                value={CheckoutForm.City}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input
                className="form-input"
                placeholder="6-digit Pincode"
                name="Pincode"
                value={CheckoutForm.Pincode}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-lg">
          <span>Proceed to Order Review</span>
          <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}

export default Checkout;
