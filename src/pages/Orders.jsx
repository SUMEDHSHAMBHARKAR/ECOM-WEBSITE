import { Link } from "react-router-dom";

function Orders() {
  const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  
  if (savedOrders.length === 0) {
    return <h1>No Orders found</h1>;
  }

  return (
    <>
      <h1>Orders</h1>
      {savedOrders.map((order) => (
        <Link key={order.orderID} to={`/orders/${order.orderID}`}>
          <div>
            <h1>Order ID: {order.orderID}</h1>
            <h2>Date: {order.date}</h2> <br />
            {order.items.map((product) => (
              <div key={product.id}>
                <h3>{product.title}</h3>
                <img src={product.thumbnail} alt={product.title} />
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            ))}
            <br />
            <h2>TOTAL: ${order.total.toFixed(2)}</h2>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Orders;
