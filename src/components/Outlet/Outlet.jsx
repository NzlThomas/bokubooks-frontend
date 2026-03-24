import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function NavLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}

export default NavLayout;
