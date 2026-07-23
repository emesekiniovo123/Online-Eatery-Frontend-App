import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <div className="space-y-4">
        <Sidebar />
        <div className="rounded-[2rem] border border-dark-200 bg-white/80 p-4 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-500">
            Signed in
          </p>
          <p className="mt-2 font-semibold text-dark-900">
            {user?.name || "Administrator"}
          </p>
          <Link
            to="/"
            className="mt-3 inline-flex text-sm font-semibold text-primary-500"
          >
            Back to storefront
          </Link>
          <button
            type="button"
            onClick={logout}
            className="mt-4 rounded-full border border-dark-200 px-4 py-2 text-sm font-semibold text-dark-700"
          >
            Logout
          </button>
        </div>
      </div>
      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
