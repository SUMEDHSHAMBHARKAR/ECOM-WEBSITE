import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      setError("Enter a valid mobile number");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(CheckoutForm.Email)) {
      setError("Enter a valid email");
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
    <>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        {error && <p>{error}</p>}
        <input
          placeholder="Name"
          name="name"
          value={CheckoutForm.name}
          onChange={handleChange}
        />
        <input
          placeholder="Mobile"
          name="mobile"
          value={CheckoutForm.mobile}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          name="Email"
          value={CheckoutForm.Email}
          onChange={handleChange}
        />
        <input
          placeholder="Address"
          name="address"
          value={CheckoutForm.address}
          onChange={handleChange}
        />
        <input
          placeholder="City"
          name="City"
          value={CheckoutForm.City}
          onChange={handleChange}
        />
        <input
          placeholder="Pincode"
          name="Pincode"
          value={CheckoutForm.Pincode}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
        {success && alert("Form Submited")}
      </form>
    </>
  );
}

export default Checkout;
