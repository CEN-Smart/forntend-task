import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const NavbarWrapper = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-28 pb-6">
        <Outlet />
      </main>
    </div>
  );
};

export default NavbarWrapper;
