import { cn } from "./../../lib/utils";
import { Link, NavLink } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useCartStore } from "./../../store/product";
const Navbar = () => {
  const { cartItems } = useCartStore();
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <nav className="bg-gray-800 fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </Link>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return cn(
                    `inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:text-white
                 hover:border-white`,
                    {
                      "border-rose-500": isActive,
                    }
                  );
                }}
              >
                Products
              </NavLink>
            </div>
          </div>
          <Link to="/cart" className="flex items-center relative">
            <div className=" sm:ml-6 sm:flex sm:items-center">
              <button className="p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">View notifications</span>
                <TiShoppingCart className="size-8" />
                {cartItems.length > 0 && (
                  <span className="absolute bottom-2 -right-1 inline-block rounded-full bg-rose-500 text-white px-2 py-1 text-xs font-bold">
                    {quantity}
                  </span>
                )}
              </button>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
