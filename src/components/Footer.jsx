import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { APP_NAME } from "../utils/constants";

const Footer = () => {
  return (
    <footer className="border-t border-dark-200/70 bg-cream-dark py-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 text-sm text-dark-600 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
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
              className="block text-green-600 transition hover:text-green-700"
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="block text-yellow-600 transition hover:text-yellow-700"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-purple-600 transition hover:text-purple-700"
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
              className="block text-yellow-600 transition hover:text-yellow-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block text-purple-600 transition hover:text-purple-700"
            >
              Register
            </Link>
            <Link
              to="/cart"
              className="block text-green-600 transition hover:text-green-700"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-dark-200/70 px-4 pt-5 text-sm text-dark-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>&copy; 2026 {APP_NAME}</p>
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="transition"
            style={{
              color: "#1877F2",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0A5FDB")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1877F2")}
          >
            <FiFacebook aria-hidden="true" size={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition"
            style={{
              color: "#E4405F",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D63975")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#E4405F")}
          >
            <FiInstagram aria-hidden="true" size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="transition"
            style={{
              color: "#1DA1F2",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1A8CD8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#1DA1F2")}
          >
            <FiTwitter aria-hidden="true" size={18} />
          </a>
        </div>
        <div className="flex gap-4">
          <a
            href="/privacy-policy"
            className="transition hover:text-primary-600"
          >
            Privacy Policy
          </a>
          <a href="/terms" className="transition hover:text-primary-600">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
