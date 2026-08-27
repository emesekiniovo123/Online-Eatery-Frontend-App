import { Link } from "react-router-dom";
import { APP_NAME } from "../utils/constants";

const Footer = () => {
  return (
    <footer className="border-t border-dark-200/70 bg-[#fffdf9] py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm text-dark-600 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="max-w-md">
          <p className="text-lg font-semibold text-dark-900">{APP_NAME}</p>
          <p className="mt-2 leading-6 text-dark-600">
            Freshly prepared meals delivered with speed, care, and a little
            extra flavor.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-dark-500">
            Explore
          </p>
          <div className="mt-3 space-y-2">
            <Link
              to="/menu"
              className="block transition hover:text-primary-600"
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="block transition hover:text-primary-600"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block transition hover:text-primary-600"
            >
              Contact
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-dark-500">
            Account
          </p>
          <div className="mt-3 space-y-2">
            <Link
              to="/login"
              className="block transition hover:text-primary-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block transition hover:text-primary-600"
            >
              Register
            </Link>
            <Link
              to="/cart"
              className="block transition hover:text-primary-600"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
