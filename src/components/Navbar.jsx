import { NavLink } from "react-router-dom";

function NavBar() {
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
          Cart
        </NavLink>
      </li>
    </>
  );
}


export default NavBar