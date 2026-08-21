import Checkout from "../components/Checkout";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, increaseQuantity, removeFromCart, decreaseQuantity } = useCart();
  const subTotal = cartItems.reduce((sum , item) => sum + item.price * item.quantity,0)
  const totalItems = cartItems.reduce((sum , item) => sum + item.quantity ,0)
  const shippingCharges = subTotal > 999 ? 0 : 50;
  const total = subTotal + shippingCharges
  if (cartItems.length === 0){
    return <h1>Your Cart is Empty</h1>;
  }

  return <>
    {cartItems.map((item) => (
      <div key={item.id}>
        <img src={item.thumbnail} alt={item.title} />
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <p>{item.price}</p>
        <p>{item.category}</p>
        <span>{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.id)}> + </button>
        <button onClick={() => decreaseQuantity(item.id)}> - </button>
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    ))}
    <br /><br />
    <h2>Items : {totalItems}</h2>
    <h2>Subtotal : ${subTotal.toFixed(2)}</h2>
    <h2>Shipping : ${shippingCharges}</h2>
    <br />
    <h2>Total : ${total.toFixed(2)}</h2>
    <br />
    <Checkout/>
  </>;
}

export default Cart;
