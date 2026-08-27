import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { APP_NAME } from "../utils/constants";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderNavLinks = (mobile = false) => (
    <>
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `text-sm font-medium transition ${isActive ? "text-primary-500" : "text-dark-600 hover:text-primary-500"} ${mobile ? "block rounded-xl px-3 py-2" : ""}`
          }
        >
          {link.label}
        </NavLink>
      ))}
      {isAuthenticated && (
        <>
          <NavLink
            to="/cart"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? "text-primary-500" : "text-dark-600 hover:text-primary-500"} ${mobile ? "block rounded-xl px-3 py-2" : ""}`
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/orders"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `text-sm font-medium transition ${isActive ? "text-primary-500" : "text-dark-600 hover:text-primary-500"} ${mobile ? "block rounded-xl px-3 py-2" : ""}`
            }
          >
            Orders
          </NavLink>
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? "text-primary-500" : "text-dark-600 hover:text-primary-500"} ${mobile ? "block rounded-xl px-3 py-2" : ""}`
              }
            >
              Admin
            </NavLink>
          )}
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-dark-200/70 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-400 text-lg font-semibold text-dark-900 shadow-md">
            OE
          </div>
          <div>
            <p className="text-lg font-semibold text-dark-900">{APP_NAME}</p>
            <p className="text-xs text-dark-500">Fresh & fast delivery</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {renderNavLinks(false)}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative rounded-full border border-dark-200 bg-white/80 p-3 text-dark-700 shadow-sm"
          >
            <span className="text-sm font-semibold">🛒</span>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-400 text-[10px] font-bold text-dark-900">
              {cartCount}
            </span>
          </Link>

          {isAuthenticated ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/profile"
                className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-medium text-dark-900"
              >
                {user?.fullName || user?.name || "Profile"}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-green-500 bg-green-500 px-4 py-2 text-sm font-medium text-white"
              >
                Logout
              </button>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="rounded-full bg-primary-400 px-4 py-2 text-sm font-medium text-dark-900"
                >
                  Admin
                </Link>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/login"
                className="rounded-full border border-dark-200 px-4 py-2 text-sm font-medium text-dark-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-primary-400 px-4 py-2 text-sm font-medium text-dark-900"
              >
                Register
              </Link>
            </div>
          )}

          <button
            type="button"
            className="rounded-full border border-dark-200 bg-white px-3 py-2 text-lg md:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle mobile menu"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-dark-200 bg-white/95 px-4 py-4 md:hidden">
          <div className="space-y-2">
            {renderNavLinks(true)}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl bg-dark-900 px-3 py-2 text-sm font-medium text-white"
                >
                  {user?.fullName || user?.name || "Profile"}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-xl border border-dark-200 px-3 py-2 text-left text-sm font-medium text-dark-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl border border-dark-200 px-3 py-2 text-sm font-medium text-dark-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl bg-primary-400 px-3 py-2 text-sm font-medium text-dark-900"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
