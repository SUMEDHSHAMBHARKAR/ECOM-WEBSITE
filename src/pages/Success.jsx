import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();

  const checkoutdata = location.state;

  if (!checkoutdata) {
    return (
      <>
        <h1>Order information not found</h1>
        <p>Please place an order again.</p>
      </>
    );
  }

  return (
    <>
      <h1>🎉 Order Placed Successfully!</h1>

      <h2>Order ID: {checkoutdata.orderId}</h2>

      <h2>Amount Paid: ${checkoutdata.total.toFixed(2)}</h2>

      <h2>Thank you for your order!</h2>
    </>
  );
}

export default Success;