import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

function MainLayout() {
  return <>
    <NavBar />
    <Outlet />
  </>
  
}

export default MainLayout;