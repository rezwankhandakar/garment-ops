import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-primary font-semibold" : "font-medium";

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/all-products" className={navLinkClass}>
          All-Products
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-product" className={navLinkClass}>
          Add-Products
        </NavLink>
      </li>

      {!user && (
        <>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={navLinkClass}>
              Register
            </NavLink>
          </li>
        </>
      )}

      {user && (
        <>
          <li>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="text-red-500 font-medium hover:text-red-600"
            >
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Left */}
      <div className="navbar-start">
        {/* Mobile */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[1]"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          Garment<span className="text-blue-500">Ops</span>
        </Link>
      </div>

      {/* Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
      </div>

      {/* Right (optional avatar only) */}
      {user && (
        <div className="navbar-end">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co.com/20GzdKk8/download-2.png"
                }
                alt="user"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
