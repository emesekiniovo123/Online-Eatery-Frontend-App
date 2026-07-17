import { Link } from "react-router-dom";
import { APP_NAME } from "../utils/constants";

const Footer = () => {
  return (
    <footer className="border-t border-dark-200/70 bg-white/70 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 text-sm text-dark-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-dark-900">{APP_NAME}</p>
          <p className="mt-1 max-w-md">
            Freshly prepared meals delivered with speed and care.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link to="/about" className="hover:text-primary-500">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary-500">
            Contact
          </Link>
          <Link to="/menu" className="hover:text-primary-500">
            Menu
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
