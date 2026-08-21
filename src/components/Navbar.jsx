import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function NavBar() {
  const {cartItems} = useCart();
  const cartCount = cartItems.reduce(
    (total , item) => total + item.quantity , 0
  )
  return (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          {" "}
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          {" "}
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          {" "}
          Cart({cartCount})
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          {" "}
          Orders
        </NavLink>
      </li>
    </>
  );
}


export default NavBar