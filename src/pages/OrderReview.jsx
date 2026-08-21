import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function OrderReview() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cartItems, clearCart } = useCart();

  const checkoutData = location.state;
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
      <h1>Order Review</h1>

      <h2>Customer Details</h2>

      <p>Name: {checkoutData.name}</p>
      <p>Mobile: {checkoutData.mobile}</p>
      <p>Email: {checkoutData.Email}</p>
      <p>Address: {checkoutData.address}</p>
      <p>City: {checkoutData.City}</p>
      <p>Pincode: {checkoutData.Pincode}</p>
      <br />
      <br />
      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p> <br />
        </div>
      ))}
      <br />
      <br />
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Shipping: ${shipping}</p>
      <h2>Total: ${total.toFixed(2)}</h2>

      <button onClick={hendleClick}>Place Order</button>
    </>
  );
}

export default OrderReview;
