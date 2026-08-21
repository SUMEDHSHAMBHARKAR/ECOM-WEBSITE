import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <NavBar />
      <main className="page-wrapper">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;