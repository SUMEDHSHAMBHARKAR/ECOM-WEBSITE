import { useParams } from "react-router-dom";

function OrderDetails() {
  const { orderId } = useParams();
  const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

  const order = savedOrders.find((item) => item.orderID === orderId);

  if (!order) {
    return <h1>Order not found</h1>;
  }

  return (
    <>
      <h1>Order Details</h1>
      <br />
      <div key={order.orderID}>
        <h1>Order ID: {order.orderID}</h1>
        <h2>Date: {order.date}</h2> <br />
        {order.items.length === 0 ? (
          <p>No items in this order</p>
        ) : (
          order.items.map((product) => (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <img src={product.thumbnail} alt={product.title} />
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
          ))
        )}
        <br />
        <h2>TOTAL: ${order.total.toFixed(2)}</h2>
        <hr />
      </div>
    </>
  );
}

export default OrderDetails;
